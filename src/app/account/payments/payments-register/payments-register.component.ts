import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { PeopleService } from 'src/app/services/people.service';
import { Xetaerror } from 'src/app/global/xetaerror';
import { HttpClient } from '@angular/common/http';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import * as moment from 'moment';
import { Search } from 'src/app/services/search';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import {ConfirmationService,MessageService} from 'primeng/api';
import { InvoiceListService } from 'src/app/services/invoice-list.service';
import { ChequesOfPersonService } from 'src/app/services/cheques-of-person.service';
import { SavePaymentService } from 'src/app/services/save-payment.service';
import { PartyAccountBalanceListService } from 'src/app/services/party-account-balance-list.service';
import { GlobalConstants } from 'src/app/global/global-constants';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-register',
  templateUrl: './payments-register.component.html',
  styleUrls: ['./payments-register.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class PaymentsRegisterComponent {
  selectedDate: Date = new Date();
  
  paymentList:any = []

  sanitizedInvoiceList:any[] = []

  inProgress:boolean = false

  selectedInvoice:any = {}

  displayModal = false;
  displayViewModal = false;

  newInvoice:any = {}
  newVoucher:any = {}
  private _invSub:any
  totalRecords:number = 0
  sanitizedPabList:any[] = []
  pabList:any[] = []

  constructor(private router:Router,private eventBusService:EventBusServiceService,private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    
    this.loadInvoices(0,0)
    
  }

  sanitizeInvoices() {
    for (let index = 0; index < this.paymentList.length; index++) {
      const element = this.paymentList[index];

      let sanitInvoice:any = {}
      sanitInvoice['date'] = element.date
      sanitInvoice['vendor'] = element.partyaccounthead.accounthead

      console.log('VENDOR',element.partyaccounthead.accounthead)
      
      let amount:number = 0
    
      for (let j = 0; j < element.vouchers.length; j++) {
        const voucher = element.vouchers[j];
        let amt = Math.abs(voucher.userinputrate)
        amount = amt + amount
        
      }

      sanitInvoice['amount'] = amount
      sanitInvoice['invoice'] = element

      this.sanitizedInvoiceList.push(sanitInvoice)
      
    }
  }

  loadInvoices(offset:number,moreoffset:number) {

    this.inProgress = true
    let ahlService:InvoiceListService = new InvoiceListService(this.httpClient)
    let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'payments',attribute:''};
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
          this.paymentList = []
          this.paymentList = dataSuccess.success
          this.totalRecords = this.paymentList.length
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

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}


  handleView(invoice:any) {
    localStorage.setItem('paymentsView', JSON.stringify(invoice));
    this.router.navigate(['account/paymentsView'])
  }

}
