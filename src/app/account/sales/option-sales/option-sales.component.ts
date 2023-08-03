import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { InvoiceListService } from 'src/app/services/invoice-list.service';
import { Search } from 'src/app/services/search';
import { UpdateSaleInvoiceService } from 'src/app/services/update-sale-invoice.service';

@Component({
  selector: 'app-option-sales',
  templateUrl: './option-sales.component.html',
  styleUrls: ['./option-sales.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class OptionSalesComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  inProgress:boolean = false
  selectedPODate:Date = new Date()

navigateToSales(){
  this.router.navigate(['account/sales'])
}

inv:any
selectedEWayBillNo:string = ""
selectedPONO:string = ""
selectedPaymentMethods:string = ""
selectedPOFormattedDate:string = ''
selectedInvoice:any = {}

ngOnInit(): void {
  const item = localStorage.getItem('salesOptions');
  if (item !== null) {
    this.inv = JSON.parse(item);
    console.log('INVOICE',this.inv)

  if(!this.inv.hasOwnProperty("ewaybillno")) {
    this.selectedEWayBillNo = ""
  }
  else if(this.inv.hasOwnProperty("ewaybillno")) {
    this.selectedEWayBillNo = this.inv.ewaybillno
  }

  if(!this.inv.hasOwnProperty("paymentmethods")) {
    this.selectedPaymentMethods = ""
  }
  else if(this.inv.hasOwnProperty("paymentmethods")) {
    this.selectedPaymentMethods = this.inv.paymentmethods
  }

  if(!this.inv.hasOwnProperty("pono")) {
    this.selectedPONO = ""
  }
  else if(this.inv.hasOwnProperty("pono")) {
    this.selectedPONO = this.inv.pono
  }

  if(!this.inv.hasOwnProperty("podate")) {
    this.selectedPOFormattedDate = ""
  }
  else if(this.inv.hasOwnProperty("podate")) {
    this.selectedPOFormattedDate = this.inv.ponodate
  }


  this.selectedInvoice = this.inv

}
}

poDateChangedStatus:boolean = false

poDateSelected(event:any) {

  console.log('PO DATE SELECTED',event)

  let date1 = moment(event).format('YYYY-MM-DD');
  let time1 = moment(event).format('HH:mm:ss.SSSZZ')
  let isoDateTime = date1+'T'+time1
  console.log('PO ISO DATE',isoDateTime)
  this.poDateChangedStatus = true
 
}
private _siSub:any

saveOptions() {

  this.selectedInvoice["ewaybillno"] = this.selectedEWayBillNo
  this.selectedInvoice["paymentmethods"] = this.selectedPaymentMethods
  this.selectedInvoice["pono"] = this.selectedPONO
  this.selectedInvoice["podate"] = this.selectedPODate

  console.log("SALE TO BE UPDATED",JSON.stringify(this.selectedInvoice))

  this.inProgress = true
  
  let sah:UpdateSaleInvoiceService = new UpdateSaleInvoiceService(this.httpClient)
  this._siSub = sah.updateSaleInvoice(this.selectedInvoice).subscribe({
    complete:() => {console.info('complete')},
    error:(e) => {
      console.log('ERROR',e)
      this.inProgress = false
      this.confirm('A server error occured while updating invoice. '+e.message)
      return;
    },
    next:(v) => {
      console.log('NEXT',v);
      if (v.hasOwnProperty('error')) {
        let dataError:Xetaerror = <Xetaerror>v; 
        //alert(dataError.error);
        this.confirm(dataError.error)
        this.inProgress = false
        return;
      }
      else if(v.hasOwnProperty('success')) {

        this.inProgress = false
        this.loadInvoices(0,0)
        this.router.navigate(['account/sales'])

        return;

      }
      else if(v == null) {

        this.inProgress = false
        this.confirm('A null object has been returned. An undefined error has occurred.')
        return;
      }
      else {
        //alert('An undefined error has occurred.')
        this.inProgress = false
        this.confirm('An undefined error has occurred.')
        return
      }
    }
  })

  return

}

confirm(msg:string) {
  this.confirmationService.confirm({
      header:'Error',
      message: msg,
      acceptVisible: true,
      rejectVisible: false,
      acceptLabel: 'Ok',
      accept: () => {
          //Actual logic to perform a confirmation
      }
  });
}

private _invSub:any
saleList:any = []
totalRecords:number = 0
sanitizedInvoiceList:any[] = []


loadInvoices(offset:number,moreoffset:number) {

  this.inProgress = true
  let ahlService:InvoiceListService = new InvoiceListService(this.httpClient)
  let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'sales',attribute:''};
  console.log('CRITERIA',criteria)
  this._invSub = ahlService.fetchInvoiceList(criteria).subscribe({
    complete:() => {console.info('complete')},
    error:(e) => {
      this.inProgress = false
      this.confirm('A server error occured while fetching account heads. '+e.message)
      return
    },
    next:(v) => {
      console.log('NEXT',v);
      if (v.hasOwnProperty('error')) {
        let dataError:Xetaerror = <Xetaerror>v; 
        this.confirm(dataError.error)
        this.inProgress = false
        return
      }
      else if(v.hasOwnProperty('success')) {
        let dataSuccess:XetaSuccess = <XetaSuccess>v;
        this.saleList = []
        this.saleList = dataSuccess.success
        this.totalRecords = this.saleList.length
        console.log('TOTAL RECORDS',this.totalRecords)
        // this.items = this.masterCopy.slice(offset,this.recordsPerPage+offset);
        this.sanitizedInvoiceList = []
        this.sanitizeInvoices()
        this.inProgress = false
        return
      }
      else if(v == null) { 
        this.inProgress = false
        this.confirm('A null object has been returned. An undefined error has occurred.')
        return
      }
      else {
        //alert('An undefined error has occurred.')
        this.inProgress = false
        this.confirm('An undefined error has occurred.')
        return false
      }
    }
  })

}

sanitizeInvoices() {
  for (let index = 0; index < this.saleList.length; index++) {
    const element = this.saleList[index];

    let sanitInvoice:any = {}
    sanitInvoice['id'] = element.id
    sanitInvoice['date'] = element.date
    sanitInvoice['vendor'] = element.partyaccounthead.accounthead

    console.log('VENDOR',element.partyaccounthead.accounthead)
    
    let taxableValue:number = 0
    let aftertaxValue:number = 0
    let tax = 0
    for (let j = 0; j < element.vouchers.length; j++) {
      const voucher = element.vouchers[j];
      let q = Math.abs(voucher.quantity)
      taxableValue = (q*voucher.ratebeforetaxes)+taxableValue
      aftertaxValue = (q*voucher.rateaftertaxes)+aftertaxValue
    }

    tax = aftertaxValue - taxableValue

    sanitInvoice['taxablevalue'] = taxableValue
    sanitInvoice['tax'] = tax
    sanitInvoice['aftertaxvalue'] = aftertaxValue
    sanitInvoice['invoice'] = element

    this.sanitizedInvoiceList.push(sanitInvoice)
    
  }
}


}
