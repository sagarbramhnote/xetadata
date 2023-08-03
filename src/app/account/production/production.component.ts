import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { PeopleService } from 'src/app/services/people.service';
import { Xetaerror } from 'src/app/global/xetaerror';
import { HttpClient } from '@angular/common/http';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import * as moment from 'moment';
import { Search } from 'src/app/services/search';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { ItemsListService } from 'src/app/services/items-list.service';
import {ConfirmationService,MessageService} from 'primeng/api';
import { InvoiceListService } from 'src/app/services/invoice-list.service';
import { SaveSaleService } from 'src/app/services/save-sale.service';
import { ProductServiceListService } from 'src/app/services/product-service-list.service';
import { StockBalanceItemService } from 'src/app/services/stock-balance-item.service';
import { SaveSaleReturnService } from 'src/app/services/save-sale-return.service';
import { Table } from 'primeng/table';
import { EventData } from '../../global/event-data';
import { SaveConsumptionService } from 'src/app/services/save-consumption.service';
import { SaveProductionService } from 'src/app/services/save-production.service';
import { StockLocationListService } from 'src/app/services/stock-location-list.service';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class ProductionComponent {

  selectedStockBalances:any[] = []

  
  selectedDate: Date = new Date();
  

  saleList:any = []

  sanitizedInvoiceList:any[] = []

  inProgress:boolean = false
  newInvoice:any = {}
  newVoucher:any = {}
 
  selectedEntity:any
  filteredEntities:any[] = new Array
  private _eSub:any
  selectedInvoice: any;
  private _invSub:any
  totalRecords:number = 0

  constructor(private router:Router,private eventBusService:EventBusServiceService,private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.loadInvoices(0,0)
  }


  sanitizeInvoices() {
    for (let index = 0; index < this.saleList.length; index++) {
      const element = this.saleList[index];

      let sanitInvoice:any = {} 
      sanitInvoice['date'] = this.parseDateNew(element.date)

      //sanitInvoice['vendor'] = element.partyaccounthead.accounthead

      //console.log('VENDOR',element.partyaccounthead.accounthead)
      
      let taxableValue:number = 0
      let aftertaxValue:number = 0
      let tax = 0
      for (let j = 0; j < element.vouchers.length; j++) {
        const voucher = element.vouchers[j];
        let amt = parseFloat(voucher.originalrateaftertaxes) * parseFloat(voucher.quantity)
        taxableValue = taxableValue + amt
      }

      tax = aftertaxValue - taxableValue

      sanitInvoice['taxablevalue'] = taxableValue
      sanitInvoice['invoice'] = element

      this.sanitizedInvoiceList.push(sanitInvoice)
      
    }
  }

  parseDateNew(dateString: string) {
    const parsedDate = parseISO(dateString);
    const formattedDate = format(parsedDate, 'dd-MMM-yyyy hh:mm a');
    return formattedDate;
  }

  loadInvoices(offset:number,moreoffset:number) {

    this.inProgress = true
    let ahlService:InvoiceListService = new InvoiceListService(this.httpClient)
    let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'production',attribute:''};
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

  returnNewInvoice() {
    let ni = {
      date: new Date(),
      entity:{
        person: "",
        id: "",
        name: "",
        endpoint: "",
        displayfile: {},
        isanonymous: "",
        endpointtype: ""
      },
      partyaccounthead: {
        id: "",
        accounthead: "",
        defaultgroup: "",
        relationship: "",
        neid: "",
        person: "",
        name: "",
        endpoint: "",
        accounttype: "",
        partofgroup: -1,
        isgroup: false
      },
      vouchers:[]
    }
    return ni
  }

  

  onRowSelect(event:any) {
    if(event !== null) {
      console.log('ROW SELECT',event)
      this.selectedInvoice = event.data
    }
  }

  dateSelected(event:any) {

    console.log('DATE SELECTED',event)

    let date1 = moment(event).format('YYYY-MM-DD');
    let time1 = moment(event).format('HH:mm:ss.SSSZZ')
    let isoDateTime = date1+'T'+time1
    console.log('ISO DATE',isoDateTime)
    this.newInvoice.date = isoDateTime
    //this.selectedDate = isoDateTime
   
  }
 

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

navigateToCreateProduction(){
   this.router.navigate(['account/productioncreate'])
}

handleView(invoice:any) {
  localStorage.setItem('productionView', JSON.stringify(invoice));
  this.router.navigate(['account/productionview'])
}
}
