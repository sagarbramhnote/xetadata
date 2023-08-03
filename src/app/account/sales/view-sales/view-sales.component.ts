import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class ViewSalesComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  inProgress:boolean = false


navigateToSales(){
  this.router.navigate(['account/sales'])
}

invoice:any
viewPartyName:any;
viewTotal:number = 0


ngOnInit(): void {
  const item = localStorage.getItem('salesVieww');
  if (item !== null) {
    this.invoice = JSON.parse(item);
    console.log('INVOICE',this.invoice)
    this.selectedInvoice = this.invoice
    console.log('PARTY',this.selectedInvoice.partyaccounthead.accounthead)
    this.viewPartyName = this.selectedInvoice.partyaccounthead.accounthead 
   // this.displayViewModal = true
  
    this.viewTotal = 0
    for (let index = 0; index < this.selectedInvoice.vouchers.length; index++) {
      const voucher = this.selectedInvoice.vouchers[index];
      let a:number = voucher.quantity * voucher.rateaftertaxes
      this.viewTotal = this.viewTotal + a
    }

}
}

selectedInvoice:any = {}


}
