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
//import { EventData } from '../../global/event-data';
import { SaveConsumptionService } from 'src/app/services/save-consumption.service';
import { SaveProductionService } from 'src/app/services/save-production.service';
import { StockLocationListService } from 'src/app/services/stock-location-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-view',
  templateUrl: './production-view.component.html',
  styleUrls: ['./production-view.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class ProductionViewComponent {
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
  private _invSub:any
  totalRecords:number = 0
  viewTotal:number = 0

  @ViewChild('selectItem') selectItem:any
  placeholderItem = 'select item'

  selectedRelatedItem:any
  filteredRelatedItems:any[] = new Array
  private _irSub:any
  @ViewChild('selectRelatedItem') selectRelatedItem:any
  placeholderRelatedItem = 'select related item'

  selectedUOM:any = ""

  selectedQty:number = 0
  @ViewChild('selectQty') selectQty:any

  selectedUIR:any
  @ViewChild('selectUIR') selectUIR:any
  
  
  selectedTaxes:any[] = []
  selectedVouchers:any[] = []
  selectedItem:any
  selectedTaxname:any
  displaySubEditModal:boolean = false;
  @ViewChild('selectTaxname') selectTaxname:any

  selectedTaxcode:any
  @ViewChild('selectTaxcode') selectTaxcode:any

  selectedTaxpercent:any
  @ViewChild('selectTaxpercent') selectTaxpercent:any

  selectedTaxtype:any
  @ViewChild('selectTaxtype') selectTaxtype:any

  taxTypes:any[] = [{type:''},{type:'vat'},{type:'nonvat'}]


  selectedTaxParty:any
  @ViewChild('selectTaxParty') selectTaxParty:any
  placeholderTaxParty = 'select tax authority'



  inputDiscount:any
  @ViewChild('selectDiscount') selectDiscount:any

  selectedDiscountAmount:any
  selectedDiscountPercent:any

  
  // @ViewChild('discountPercentInput') discountPercentInput:ElementRef = new ElementRef({}); 
  // @ViewChild('discountAmountInput') discountAmountInput:ElementRef = new ElementRef({});

  discountLabel:string = 'discount percent'
  discountAmount:number = 0

  discountState:boolean = false

  selectedRecordid:any
  selectedVoucherid:any

  ri:string = 'rit'

  rad:any = 0

  rbt:any = 0
  t:any = 0
  rat:any = 0

  

  // private totaltaxfactor:any
  // private nonvatpu:any
  // private vatpu:any
  
  // private totaltaxperc:number = 0

  private vattaxperunit:number = 0
  private nonvattaxperunit:number = 0

  private totalvatperc:number = 0
  private totalnonvatperc:number = 0
  
  selectedAccountMap:any
  filteredAccountMaps:any[] = new Array
  private _amSub:any
  @ViewChild('selectAccountMap') selectAccountMap:any
  placeholderAccountMap = 'select account map'

  

  private _siSub:any

  inStockBalanceProgress:boolean = false
  private _sbSub:any

  selectedContextPrices:any[] = []

  selectedCP:any
  @ViewChild('selectCP') selectCP:any


  uneditedSbs:any[] = []
  displayReturnModal:boolean = false
  displaySubEditReturnModal:boolean = false

  selectedReturnVouchers:any[] = []

  saleInvoiceID:any


  selectedExpiryDate: Date = new Date();


  selectedFromLocation:any
  filteredFromLocations:any[] = new Array
  @ViewChild('selectFromLocation') selectFromLocation:any
  placeholderFromLocation = 'select location'


  titleOptions:any[] = [{type:'ownership'},{type:'possession'},{type:''}]
  selectedTitleOption:any
  disableTitleOption:boolean = false


  selectedSNO:any
  selectedBNO:any
  selectedBrand:any



  constructor(private router:Router,private eventBusService:EventBusServiceService,private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    const list= localStorage.getItem('productionView');
    if (list !== null) {
      this.selectedInvoice = JSON.parse(list);
    //  console.log('PARTY',this.selectedInvoice.partyaccounthead.accounthead)
   // this.viewPartyName = this.selectedInvoice.partyaccounthead.accounthead 
    this.displayViewModal = true

    this.viewTotal = 0
    for (let index = 0; index < this.selectedInvoice.vouchers.length; index++) {
      const voucher = this.selectedInvoice.vouchers[index];
      let a:number = voucher.quantity * voucher.originalrateaftertaxes
      this.viewTotal = this.viewTotal + a
    }
    }

    this.loadInvoices(0,0)
  }

  displayViewModal:boolean = false;
  selectedInvoice:any = {}
  viewPartyName:any;

  navigateToProductionList(){
    this.router.navigate(['account/production'])
  }

  sanitizeInvoices() {
    for (let index = 0; index < this.saleList.length; index++) {
      const element = this.saleList[index];

      let sanitInvoice:any = {} 
      sanitInvoice['date'] = element.date
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

  handleView(invoice:any) { 
    console.log('INVOICE',invoice)
    this.selectedInvoice = invoice
    
    this.displayViewModal = true

    this.viewTotal = 0
    for (let index = 0; index < this.selectedInvoice.vouchers.length; index++) {
      const voucher = this.selectedInvoice.vouchers[index];
      let a:number = voucher.quantity * voucher.originalrateaftertaxes
      this.viewTotal = this.viewTotal + a
    }

  }

  handleEditVoucher(v:any) {
    
    console.log('VOUCHER TO BE EDITED',v)

    if(this.selectedQty < 0) {
      this.confirm('You cannot enter negative values for quantity')
      return
    }

    if(this.selectedUIR < 0) {
      this.confirm('You cannot enter negative values for rate')
      return
    }
    
    this.selectedItem = v.object
    this.selectedUIR = v.originalrateaftertaxes
    this.selectedQty = v.quantity
    this.selectedStockBalances = v.stockbalanceinputs
    this.selectedAccountMap = v.accountmap
    this.selectedUOM = v.object.uom.uom
    this.selectedTaxes = v.taxes
    let ri = ""
    if(v.rateincludesvat) {
      ri = 'rit'
    }
    if(!v.rateincludesvat) {
      ri = 'ret'
    }
    //this.pcchange(ri)
    this.selectedRelatedItem = v.relateditem
    this.selectedVoucherid = v.recordid
    this.displaySubEditModal = true

    this.selectedFromLocation = v.location

  }

  handleDeleteVoucher(v:any) {
    this.selectedVouchers.splice(v,1)
  }

}
