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
import { ProfileService } from 'src/app/services/profile.service';
import { Search } from 'src/app/services/search';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class SalesComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  sanitizedInvoiceList:any[] = []
  lo:any


onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

navigateToCreateSales(){
//  localStorage.removeItem('createSaleVoucher')
  this.router.navigate(['account/salesCreate'])
}

ngOnInit(): void {

  this.lo = GlobalConstants.loginObject
  this.loadInvoices(0,0)

  this.loadEntity()

}

inProgress:boolean = false
_ahlSub:any
private _invSub:any
saleList:any = []
totalRecords:number = 0

selectedPerson:any = {}
selectedEntityName:string = ""
selectedEntityAddress:string = ""
selectedEntityTelephone:string = ""
selectedEntityEmail:string = ""
selectedEntityGSTNumber:string = ""
selectedInvoiceDate:string = ""
selectedInvoiceNumber:string = ""

loadEntity() {
    
  this.inProgress = true
  
  a:ProfileService
  let ahlService:ProfileService = new ProfileService(this.httpClient)
  let criteria:any = {};
  console.log('CRITERIA',criteria)
  this._ahlSub = ahlService.fetchProfile(criteria).subscribe({
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
        this.selectedPerson = dataSuccess.success
        //this.handleView()
        this.selectedEntityName = this.selectedPerson.names[0].name

        let telephones = this.selectedPerson.endpoints.filter((endpoint:any) => endpoint.type === 'telephone');
        let addresses = this.selectedPerson.endpoints.filter((endpoint:any) => endpoint.type === 'address');

        let address = '';
        if (addresses.length > 0) {
          let cd = addresses[0].detail;
          this.selectedEntityAddress = cd.doorno + ' ' + cd.street + ' ' + cd.area + ' ' + cd.city + ' ' + cd.state + ' ' + cd.country + ' ' + cd.pincode
        }
        if (telephones.length > 0) {
          this.selectedEntityTelephone = telephones[0].detail.telephone;
        }

        
        

        console.log('NAME',this.selectedEntityName)
        console.log('ADDRESS',this.selectedEntityAddress)
        console.log('TELEPHONE',this.selectedEntityTelephone)
        console.log('EMAIL',this.selectedEntityEmail)


        this.selectedEntityGSTNumber = ""
        this.selectedInvoiceDate = ""
        this.selectedInvoiceNumber = ""
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

}
