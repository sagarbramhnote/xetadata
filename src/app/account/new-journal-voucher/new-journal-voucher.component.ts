import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';

@Component({
  selector: 'app-new-journal-voucher',
  templateUrl: './new-journal-voucher.component.html',
  styleUrls: ['./new-journal-voucher.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class NewJournalVoucherComponent implements OnInit {

  journalVoucherList:any[] = [] 
  selectedDate:Date = new Date()

  displayModal:boolean = false
  //router: any;

  constructor(private router:Router,private eventBusService:EventBusServiceService,private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

navigateToCreateVoucher(){
   this.router.navigate(['account/createVoucher'])
}

handleView(inv:any) {

}
narrationChange(event:any) {

}

handleDeleteVoucher(i:any) {

}




}
