import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ReplaceZeroWithEmptyForCSPipe } from 'src/app/pipes/replace-zero-with-empty-for-cs.pipe';
import {ConfirmationService,MessageService} from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { PeopleService } from 'src/app/services/people.service';
import { Xetaerror } from 'src/app/global/xetaerror';
import { HttpClient } from '@angular/common/http';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { Search } from 'src/app/services/search';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { ItemsListService } from 'src/app/services/items-list.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-opening-balance',
  templateUrl: './opening-balance.component.html',
  styleUrls: ['./opening-balance.component.scss'],
  providers: [ConfirmationService,MessageService,ReplaceZeroWithEmptyForCSPipe]
})
export class OpeningBalanceComponent implements OnInit{



  openingBalances:any[] = []
  selectedAsOnDate:Date = new Date()
  asOnDateString:any
  displayCSModal: boolean = false;
  displayCSSubModal:boolean = false;
  selectedItem:any
  selectedUOM:any = ""

  selectedQty:number = 0

  selectedUIR:any
  @ViewChild('selectUIR') selectUIR:any

  constructor(private eventBusService:EventBusServiceService,private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }


  ngOnInit(): void {
    let cs = {
      accounthead:'Closing Stock',
      debit:0,
      credit:0
    }
    this.openingBalances.push(cs)
    let accpl = {
      accounthead:'Accumulated Profit or Loss',
      debit:0,
      credit:0
    }
    this.openingBalances.push(accpl)

    this.selectedAsOnDate = new Date()

  }



  onRowSelect(e:any) {

  }

  asOnDateSelected(event:any) {

    console.log('DATE SELECTED',event)

    let date1 = moment(event).format('YYYY-MM-DD');
    let time1 = moment(event).format('HH:mm:ss.SSSZZ')
    let isoDateTime = date1+'T'+time1
    console.log('ISO DATE',isoDateTime)
    this.asOnDateString = isoDateTime
    //this.selectedDate = isoDateTime
   
  }

  handleEdit(inv:any) {

  }


  showNewVoucherDialog() {


    this.selectedItem = null   
    this.selectedUIR = 0
    this.selectedQty = 0 
    this.selectedUOM = ""
    this.displayCSSubModal = true;

  }

  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}
}
