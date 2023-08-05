import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';


@Component({
  selector: 'app-payments-view',
  templateUrl: './payments-view.component.html',
  styleUrls: ['./payments-view.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class PaymentsViewComponent implements OnInit{

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  inProgress:boolean = false


navigateToSales(){
  this.router.navigate(['account/payments'])
}


viewPartyName:any;
viewTotal:number = 0


ngOnInit(): void {
  const item = localStorage.getItem('paymentsView');
  if (item !== null) {
    this.invoice = JSON.parse(item);
    console.log('INVOICE',this.invoice)
    this.selectedInvoice = this.invoice
    console.log('PARTY',this.selectedInvoice.partyaccounthead.accounthead)
    this.viewPartyName = this.selectedInvoice.partyaccounthead.accounthead 
    this.displayViewModal = true

    this.viewTotal = 0
    for (let index = 0; index < this.selectedInvoice.vouchers.length; index++) {
      const voucher = this.selectedInvoice.vouchers[index];
      let a:number = parseFloat(voucher.object.amount) 
      this.viewTotal = this.viewTotal + a
    }

}
}
displayViewModal:boolean = false;
invoice:any
selectedInvoice:any = {}


}

