import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { GlobalConstants } from 'src/app/global/global-constants';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { InvoiceListService } from 'src/app/services/invoice-list.service';
import { Search } from 'src/app/services/search';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class PurchaseComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  lo:any
  inProgress:boolean = false
  sanitizedInvoiceList:any[] = []



onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

navigateToCreateSales(){
  this.router.navigate(['account/purchaseCreate'])
}

viewPartyName:any;
viewTotal:number = 0   
ngOnInit(): void {

  this.lo = GlobalConstants.loginObject
  this.loadInvoices(0,0)
  
  this.viewPartyName = ''
  this.viewTotal = 0
}

selectedInvoice:any = {}

onRowSelect(event:any) {
  if(event !== null) {
    console.log('ROW SELECT',event)
    this.selectedInvoice = event.data
  }
}

private _invSub:any
purchaseList:any = []
totalRecords:number = 0

loadInvoices(offset:number,moreoffset:number) {

  this.inProgress = true
  let ahlService:InvoiceListService = new InvoiceListService(this.httpClient)
  let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'purchases',attribute:''};
  console.log('CRITERIA',criteria)
  //return
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
        this.purchaseList = []
        this.purchaseList = dataSuccess.success
        this.totalRecords = this.purchaseList.length
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
  for (let index = 0; index < this.purchaseList.length; index++) {
    const element = this.purchaseList[index];

    let sanitInvoice:any = {}
    sanitInvoice['id'] = element.id
    sanitInvoice['date'] = this.parseDateNew(element.date)
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

parseDateNew(dateString: string) {
  const parsedDate = parseISO(dateString);
  const formattedDate = format(parsedDate, 'dd-MMM-yyyy hh:mm a');
  return formattedDate;
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

handleView(invoice:any) {

  localStorage.setItem('purchaseViewInvoicee', JSON.stringify(invoice));

  this.router.navigate(['account/purchaseView'])

}

handleReturn(inv:any) {

  localStorage.setItem('purchaseReturnHandle', JSON.stringify(inv));

  this.router.navigate(['account/purchaseReturnn'])

}


}
