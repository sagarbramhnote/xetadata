//import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { XetaSuccess } from 'src/app/global/xeta-success';
//import { PeopleService } from 'src/app/services/people.service';
//import { Xetaerror } from 'src/app/global/xetaerror';
//import { HttpClient } from '@angular/common/http';
//import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
//import * as moment from 'moment';
//import { Search } from 'src/app/services/search';
//import { AccountHeadListService } from 'src/app/services/account-head-list.service';
//import { ItemsListService } from 'src/app/services/items-list.service';
//import {ConfirmationService,MessageService} from 'primeng/api';
//import { InvoiceListService } from 'src/app/services/invoice-list.service';
//import { SaveSaleService } from 'src/app/services/save-sale.service';
//import { ProductServiceListService } from 'src/app/services/product-service-list.service';
//import { StockBalanceItemService } from 'src/app/services/stock-balance-item.service';
//import { SaveSaleReturnService } from 'src/app/services/save-sale-return.service';

//import { EventData } from '../../global/event-data';
//import { SaveConsumptionService } from 'src/app/services/save-consumption.service';
//import { StockLocationBalanceService } from 'src/app/services/stock-location-balance.service';

//import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table/public_api';
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
//import {ConfirmationService,MessageService} from 'primeng/api';
import { InvoiceListService } from 'src/app/services/invoice-list.service';
import { SaveSaleService } from 'src/app/services/save-sale.service';
import { ProductServiceListService } from 'src/app/services/product-service-list.service';
import { StockBalanceItemService } from 'src/app/services/stock-balance-item.service';
import { SaveSaleReturnService } from 'src/app/services/save-sale-return.service';

//import { EventData } from '../../global/event-data';
import { SaveConsumptionService } from 'src/app/services/save-consumption.service';
import { StockLocationBalanceService } from 'src/app/services/stock-location-balance.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-consumption',
  templateUrl: './create-consumption.component.html',
  styleUrls: ['./create-consumption.component.scss'],
    providers: [ConfirmationService,MessageService]
})
export class CreateConsumptionComponent implements OnInit {

  selectedStockBalances:any[] = []

  
  selectedDate: Date = new Date();
  

  saleList:any = []

  sanitizedInvoiceList:any[] = []


  newInvoice:any = {}
  newVoucher:any = {}

  selectedEntity:any
  filteredEntities:any[] = new Array
  private _eSub:any
  @ViewChild('selectEntity') selectEntity:any
  placeholderEntity = 'select entity'

  selectedParty:any
  filteredParties:any[] = new Array
  private _pSub:any
  @ViewChild('selectParty') selectParty:any
  placeholderParty = 'select party'


  selectedInvoice:any = {}

  displayModal: boolean = false;
  displaySubModal: boolean = false;
  displaySubEditModal:boolean = false;

  displayViewModal:boolean = false;

  displayTaxModal:boolean = false;
  displayTaxEditModal: boolean = false;

  selectedItem:any
  filteredItems:any[] = new Array
  private _iSub:any
  @ViewChild('selectItem') selectItem:any
  placeholderItem = 'select item'

  selectedUOM:any = ""

  selectedQty:number = 0
  @ViewChild('selectQty') selectQty:any

  selectedUIR:any
  @ViewChild('selectUIR') selectUIR:any
  
  
  selectedTaxes:any[] = []
  selectedVouchers:any[] = []

  selectedTaxname:any
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

  inProgress:boolean = false


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

  private _invSub:any
  totalRecords:number = 0

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

  
  viewTotal:number = 0

  selectedStockLocationBalance:any[] = []
  selectedLocationQty:number = 0

  selectedValues: string[] = [];

  sbcols: any[] = new Array;

  titleOptions:any[] = [{type:'ownership'},{type:'possession'},{type:''}]
  selectedTitleOption:any
  disableTitleOption:boolean = false


  constructor(private router: Router,private eventBusService:EventBusServiceService,private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.sbcols = [
      {field: 'balance'},
      {field: 'rate'},
      {field: 'inputqty'},
      {field: 'title'}
    ]

    this.loadInvoices(0,0)
    this.viewTotal = 0
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
        if (voucher.objecttype === 'item') {
          let sbs = voucher.stockbalanceinputs
          for (let index = 0; index < sbs.length; index++) {
            const sb = sbs[index];
            let amt = parseFloat(sb.rate) * parseFloat(sb.inputqty)
            taxableValue = taxableValue + amt
          }
        }
        
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
    let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'consumption',attribute:''};
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

  showModalDialog() {
    this.newInvoice = this.returnNewInvoice()
    this.selectedEntity = null
    this.selectedDate = new Date()
    this.selectedParty = null
    this.selectedVouchers = []
    this.selectedStockBalances = []
    this.selectedCP = null
    this.selectedContextPrices = []
    this.displayModal = true;
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


  // handleView(invoice:any) {
  //   console.log('INVOICE',invoice)
  //   this.selectedInvoice = invoice
  //   this.displayViewModal = true
  // }
  
  handleView(invoice:any) { 
    console.log('INVOICE',invoice)
    this.selectedInvoice = invoice
    
    this.displayViewModal = true

    this.viewTotal = 0
    for (let index = 0; index < this.selectedInvoice.vouchers.length; index++) {
      const voucher = this.selectedInvoice.vouchers[index];
      let a:number = voucher.quantity * voucher.rateaftertaxes
      this.viewTotal = this.viewTotal + a
    }

  }

  



  

  

  handleViewVoucher(v:any) {

  }

 
  handleDeleteVoucher(v:any) {
    this.selectedVouchers.splice(v,1)
  }


  filterParties(event:any) {
    console.log('IN FILTER PARTIES',event)
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-accounthead-contains'};
    console.log('CRITERIA',criteria)
    let pService:AccountHeadListService = new AccountHeadListService(this.httpClient)
    this._eSub = pService.fetchAccountHeads(criteria).subscribe({
      complete: () => {
        console.info('complete')
      },
      error: (e) => {
        console.log('ERROR',e)
        alert('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          alert(dataError.error);
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredParties = dataSuccess.success;
          console.log('FILTERED PEOPLE',dataSuccess.success)
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }


  filterItems(event:any) {
    console.log('IN FILTER ITEMS',event)
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'itemname-contains',attribute:''};
    console.log('CRITERIA',criteria)
    let iService:ItemsListService = new ItemsListService(this.httpClient)
    this._iSub = iService.fetchItems(criteria).subscribe({
      complete: () => {
        console.info('complete')
      },
      error: (e) => {
        console.log('ERROR',e)
        alert('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          alert(dataError.error);
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredItems = dataSuccess.success;
          console.log('FILTERED ITEMS',dataSuccess.success)
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }



  handleOnSelectItem(event:any) {
    
    this.selectedItem = event

    const dictionary = {
      'id':this.selectedItem.id,
      'serialnumber': this.selectedValues.includes('val1'),
      'batchnumber': this.selectedValues.includes('val2'),
      'expirydate': this.selectedValues.includes('val3'),
      'brand': this.selectedValues.includes('val4')
    };

    this.loadStockBalance(dictionary)

    this.loadStockLocationBalance(this.selectedItem.id)

    this.selectedContextPrices = this.selectedItem.contextprices

    console.log('SELECTED CPS',this.selectedContextPrices)


    this.rat = 0
    this.rbt = 0
    this.t = 0
    this.selectedUOM = this.selectedItem.uom.uom

    //this.pcchange(this.ri)


  }


  snoBoolChange(event:any) {
    console.log('EV',this.selectedValues)

    const dictionary = {
      'id':this.selectedItem.id,
      'serialnumber': this.selectedValues.includes('val1'),
      'batchnumber': this.selectedValues.includes('val2'),
      'expirydate': this.selectedValues.includes('val3'),
      'brand': this.selectedValues.includes('val4')
    };

    this.loadStockBalance(dictionary)
    this.loadStockLocationBalance(this.selectedItem.id)
    this.selectedQty = 0
  }

  bnoBoolChange(event:any) {
    console.log('EV',this.selectedValues)
    const dictionary = {
      'id':this.selectedItem.id,
      'serialnumber': this.selectedValues.includes('val1'),
      'batchnumber': this.selectedValues.includes('val2'),
      'expirydate': this.selectedValues.includes('val3'),
      'brand': this.selectedValues.includes('val4')
    };

    this.loadStockBalance(dictionary)
    this.loadStockLocationBalance(this.selectedItem.id)
    this.selectedQty = 0
  }

  edtBoolChange(event:any) {
    console.log('EV',this.selectedValues)
    console.log('EV',this.selectedValues)
    const dictionary = {
      'id':this.selectedItem.id,
      'serialnumber': this.selectedValues.includes('val1'),
      'batchnumber': this.selectedValues.includes('val2'),
      'expirydate': this.selectedValues.includes('val3'),
      'brand': this.selectedValues.includes('val4')
    };

    this.loadStockBalance(dictionary)
    this.loadStockLocationBalance(this.selectedItem.id)
    this.selectedQty = 0
  }

  brandBoolChange(event:any) {
    console.log('EV',this.selectedValues)
    console.log('EV',this.selectedValues)
    const dictionary = {
      'id':this.selectedItem.id,
      'serialnumber': this.selectedValues.includes('val1'),
      'batchnumber': this.selectedValues.includes('val2'),
      'expirydate': this.selectedValues.includes('val3'),
      'brand': this.selectedValues.includes('val4')
    };

    this.loadStockBalance(dictionary)
    this.loadStockLocationBalance(this.selectedItem.id)
    this.selectedQty = 0
  }

  titleOptionChange(event:any) {
    console.log('TITLE CHANGE',event)
    if (event === 'possession') {
      this.disableTitleOption = true
      this.selectedAccountMap = null
    }
    else if(event === 'ownership') {
      this.disableTitleOption = false
      this.selectedAccountMap = null
    }
  }

  loadStockBalance(itemid:any) {

    this.inStockBalanceProgress = true

    console.log('IN STOCK BALANCES')
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:any = itemid;
    console.log('CRITERIA',criteria)
    let iService:StockBalanceItemService = new StockBalanceItemService(this.httpClient)
    this._sbSub = iService.fetchStockBalance(criteria).subscribe({
      complete: () => {
        console.info('complete')
      },
      error: (e) => {
        console.log('ERROR',e)
        alert('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          alert(dataError.error);
          this.inStockBalanceProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.selectedStockBalances = dataSuccess.success;
          let tempsbs = []
          for (let index = 0; index < this.selectedStockBalances.length; index++) {
            const element = this.selectedStockBalances[index];
            element['inputqty'] = 0
            if(element['balance'] > 0) {
              tempsbs.push(element)
            }
          }
          this.selectedStockBalances = tempsbs

          if (this.selectedStockBalances.length > 0) {
            let obj = this.selectedStockBalances[0]
            const dictionaryList = Object.keys(obj).map(key => {
              return { field: key };
            });
            this.sbcols = dictionaryList
          }
          
          console.log('STOCK BALANCES',this.selectedStockBalances)
          this.inStockBalanceProgress = false
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          this.inStockBalanceProgress = false
          return;
        }
        else {
          this.inStockBalanceProgress = false
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }

  


  // onSearchChange(event:any,i:any): void {  
  //   console.log('VALUE',event.target.value);
  //   this.selectedStockBalances[i].inputqty = event.target.value
  //   console.log('SBS',this.selectedStockBalances)

  //   this.selectedQty = 0

  //   if(parseFloat(this.selectedStockBalances[i].inputqty) < 0){
  //     this.confirm('You cannot consume negative stock')
  //     event.target.value = 0
  //     this.selectedStockBalances[i].inputqty = 0
  //   }

  //   if(parseFloat(this.selectedStockBalances[i].inputqty) < 0){
  //     this.confirm('You cannot issue negative stock')
  //     event.target.value = 0
  //     this.selectedStockBalances[i].inputqty = 0
  //   }
  
  //   if(parseFloat(this.selectedStockBalances[i].balance) < parseFloat(event.target.value)) {
  //     this.confirm('You cannot issue stock more than the available quantity')
  //     event.target.value = 0
  //     this.selectedStockBalances[i].inputqty = 0
  //   }

  //   this.selectedQty = 0
  //   for (let index = 0; index < this.selectedStockBalances.length; index++) {
  //     const element = this.selectedStockBalances[index];
  //     this.selectedQty = parseFloat(element.inputqty) + this.selectedQty
      
  //   }

  // }


  onNewSearchChange(event:any,i:any,sb:any): void {
    
    sb.inputqty = event.target.value
    
    this.selectedQty = 0

    if(parseFloat(this.selectedStockBalances[i].inputqty) < 0){
      this.confirm('You cannot issue negative stock')
      event.target.value = 0
      sb.inputqty = 0
    }

    if(parseFloat(sb.balance) < parseFloat(event.target.value)) {
      this.confirm('You cannot issue stock more than the available quantity')
      event.target.value = 0
      sb.inputqty = 0
    }

    this.selectedQty = 0
    for (let index = 0; index < this.selectedStockBalances.length; index++) {
      const element = this.selectedStockBalances[index];
      this.selectedQty = parseFloat(element.inputqty) + this.selectedQty
      
    }

  }


  onSearchSLBChange(event:any,i:any): void {  
    console.log('VALUE',event.target.value);
    this.selectedStockLocationBalance[i].inputqty = event.target.value
    console.log('S Locaiton B',this.selectedStockLocationBalance)

    // this.selectedQty = 0

    if(parseFloat(this.selectedStockLocationBalance[i].inputqty) < 0){
      this.confirm('You cannot issue negative stock')
      event.target.value = 0
      this.selectedStockLocationBalance[i].inputqty = 0
    }

    if(parseFloat(this.selectedStockLocationBalance[i].quantity) < parseFloat(event.target.value)) {
      this.confirm('You cannot issue stock more than the available quantity')
      event.target.value = 0
      this.selectedStockLocationBalance[i].inputqty = 0
    }

    this.selectedLocationQty = 0
    for (let index = 0; index < this.selectedStockLocationBalance.length; index++) {
      const element = this.selectedStockLocationBalance[index];
      this.selectedLocationQty = parseFloat(element.inputqty) + this.selectedLocationQty
      
    }

  }




  itemChange(event:any) {

    console.log('ITEM CHANGE',event)
    this.selectedUOM = ""
    this.selectedStockBalances = []
    this.selectedContextPrices = []
    this.selectedTaxes = []
    
  } 


  

  loadStockLocationBalance(itemid:any) {

    this.inStockBalanceProgress = true

    console.log('IN STOCK BALANCES')
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:any = {id:itemid};
    console.log('CRITERIA',criteria)
    
    let iService:StockLocationBalanceService = new StockLocationBalanceService(this.httpClient)
    this._sbSub = iService.fetchStockLocationBalance(criteria).subscribe({
      complete: () => {
        console.info('complete')
      },
      error: (e) => {
        console.log('ERROR',e)
        alert('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          alert(dataError.error);
          this.inStockBalanceProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.selectedStockLocationBalance = dataSuccess.success;
          let tempsbs = []
          for (let index = 0; index < this.selectedStockLocationBalance.length; index++) {
            const element = this.selectedStockLocationBalance[index];
            element['inputqty'] = 0
            tempsbs.push(element)
            // if(element['balance'] > 0) {
            //   tempsbs.push(element)
            // }
          }
          this.selectedStockLocationBalance = tempsbs
          console.log('STOCK LOCATION BALANCES',this.selectedStockLocationBalance)
          this.inStockBalanceProgress = false
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          this.inStockBalanceProgress = false
          return;
        }
        else {
          this.inStockBalanceProgress = false
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }





  returnNewVoucher() {
    let v:any = {
      action: "rec",
      objecttype: "item",
      object: {
        itemname:null
      },
      quantity: null,
      currency: "",
      fromdatetime: "",
      todatetime: "",
      duedatetime: "",
      userinputrate: null,
      rateincludesvat: "True",
      taxes: [],
      discountpercent: null,
      discountamount: null,
      rateafterdiscount: null,
      rateaftertaxes: null,
      taxfactor: 1,
      taxesperunit: null,
      uom: {
        uom: "",
        symbol: "",
        country: ""
      },
      nonvattaxperunit: null,
      vattaxperunit: null,
      nonvatpercent: null,
      vatpercent: null,
      ratebeforetaxes: null,
      intofrom: {
        id: "0",
        itemname: "",
        iscontainer: "True",
        usercode: "",
        uom: {
          uom: "each",
          symbol: "each",
          country: "global"
        },
        taxes: [],
        files: [],
        recipe: {
          consumedunits: [],
          byproducts: []
        }
      },
      by: {
        itemid: "0",
        neid: "",
        relationshipid: "",
        name: ""
      },
      delivery: {
        id: "-1",
        accounthead: "",
        defaultgroup: "",
        relationship: "-1",
        neid: "-1",
        person: "-1",
        name: "",
        endpoint: "",
        rtype: ""
      },
      title: "",
      accountmap: {
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
      files: [],
      expirydate: new Date(),
      vendorperson: null
    }

    return v

  }

  showNewVoucherDialog() {

    this.newVoucher = this.returnNewVoucher()
    this.selectedItem = null
    this.selectedUIR = 0
    this.selectedQty = 0
    this.selectedAccountMap = null
    this.selectedUOM = ""
    this.selectedTaxes = []
    this.inputDiscount = 0
    this.rad = 0
    //this.pcchange('rit')
    this.selectedStockBalances = []
    this.selectedContextPrices = []
    this.displaySubModal = true;

  }

 

  filterAccountMaps(event:any) {
    
    console.log('IN FILTER PARTIES',event)
    let searchtype = ''
    console.log('SELECTED ITEM',this.selectedItem)
    
    
    if(this.selectedItem === null) {
      this.confirm('You must select an item')
      return
    }
    else if (this.selectedItem.itemfatype === 'stock') {
      searchtype = 'stockitem-accounthead-contains'
    }
    else if(this.selectedItem.itemfatype === 'asset') {
      searchtype = 'assetitem-accounthead-contains'
    }
    else if(this.selectedItem.itemfatype === 'other') {
      searchtype = 'otheritem-accounthead-contains'
    }  
    

    let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:searchtype};
    console.log('CRITERIA',criteria)

    let pService:AccountHeadListService = new AccountHeadListService(this.httpClient)
    this._eSub = pService.fetchAccountHeads(criteria).subscribe({
      complete: () => {
        console.info('complete')
      },
      error: (e) => {
        console.log('ERROR',e)
        alert('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          alert(dataError.error);
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredAccountMaps = dataSuccess.success;
          console.log('FILTERED PEOPLE',dataSuccess.success)
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }

  handleOnSelectAccountMap(event:any) {
    this.selectedAccountMap = event
    //this.newInvoice.partyaccounthead = event;
  }

  accountMapChange(event:any) {
    this.selectedAccountMap =  {
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
    }
  }


  ISODate(event:any) {

    console.log('DATE SELECTED',event)

    let date1 = moment(event).format('YYYY-MM-DD');
    let time1 = moment(event).format('HH:mm:ss.SSSZZ')
    let isoDateTime = date1+'T'+time1
    console.log('ISO DATE',isoDateTime)
    
    return isoDateTime
   
  }

  handleSaveSale() {
    

    if(this.selectedVouchers.length === 0) {
      this.confirm('You must enter atleast one voucher')
      return false
    }

    
    let newInvoice:any = {}
    newInvoice['date'] = this.ISODate(this.selectedDate)
    newInvoice['vouchers'] = this.selectedVouchers
    newInvoice['type'] = 'consumption'

    console.log('CONSUMPTION INVOICE TO BE SAVED',JSON.stringify(newInvoice))


    this.saveConsumption(newInvoice)
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created', life: 3000 });
  
    this.router.navigate(['account/consumption'])
    
    return false

  }


  saveConsumption(newInvoice:any){

    this.inProgress = true
    
    let sah:SaveConsumptionService = new SaveConsumptionService(this.httpClient)
    this._siSub = sah.saveConsumption(newInvoice).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.confirm('A server error occured while saving account head. '+e.message)
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
          this.displayModal = false
          this.sanitizedInvoiceList
          this.loadInvoices(0,0)
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



//my meyhods

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
  );
}

navigateToListConsumprtions(){
  this.router.navigate(['account/consumption'])
} 

disableDynPrice:boolean = true

cpChange(event:any) {

  console.log('CP DROPDOWN CHANGE',event.value)

  if (event.value.context === 'DYNAMIC') {
    this.disableDynPrice = false
  }
  else if (event.value.context !== 'DYNAMIC') {
    this.disableDynPrice = true
  }

  if(event.value !== null) {

    this.selectedUIR = event.value.saleprice
    this.selectedTaxes = event.value.taxes

    // if context is DYNAMIC, selected UIR is dynamic price input

    for (let index = 0; index < this.selectedTaxes.length; index++) {
      const element = this.selectedTaxes[index];
      element['recordid'] = index
    }

    this.uirChange({})

  }

  if(event.value === null) {
    this.selectedUIR = 0
    this.selectedTaxes = []
    this.uirChange({})
  }

}


pcchange(event:any) {

  console.log('RI EVENT',event)

  this.ri = event

  if(this.ri === 'rit') {
    this.rbt = this.rad/this.calculateTaxFactor()
    this.rat = this.rad
    this.t = this.rat - this.rbt
    
  }
  if(this.ri === 'ret') {
    this.rbt = this.rad
    this.rat = this.rad*this.calculateTaxFactor()
    this.t = this.rat - this.rbt
  }

  this.calculateSeparateTaxes()
  
}
calculateTaxFactor() {
  let totaltaxperc:number = 0
  for (let index = 0; index < this.selectedTaxes.length; index++) {
    const tax = this.selectedTaxes[index];
    console.log('TAX',parseFloat(tax.taxpercent))
    totaltaxperc = parseFloat(tax.taxpercent) + totaltaxperc
    
  }
  let tf = 1+(totaltaxperc/100)
  console.log('TAXFACTOR',tf)
  return tf
  
}

calculateSeparateTaxes() {
  this.totalvatperc = 0
  this.totalnonvatperc = 0
  
  for (let index = 0; index < this.selectedTaxes.length; index++) {
    const element = this.selectedTaxes[index];
    let tt = element.taxtype.toLowerCase()
    if(tt === 'vat') {
      this.totalvatperc = this.totalvatperc + parseFloat(element.taxpercent)
    }
    if(tt === 'nonvat') {
      this.totalnonvatperc = this.totalnonvatperc + parseFloat(element.taxpercent)
    }
  }

  let totaltaxperc = this.totalvatperc + this.totalnonvatperc
  this.vattaxperunit = (this.totalvatperc/totaltaxperc)*this.t
  this.nonvattaxperunit = (this.totalnonvatperc/totaltaxperc)*this.t

  if (isNaN(this.vattaxperunit)) {
    this.vattaxperunit = 0
  }

  if (isNaN(this.nonvattaxperunit)) {
    this.nonvattaxperunit = 0
  }


  console.log('TOTALVATPERC',this.totalvatperc)
  console.log('TOTALNONVATPERC',this.totalnonvatperc)
  console.log('TOTALTAXPERC',totaltaxperc)
  console.log('T',this.t)
  console.log('VATTAXPU',this.vattaxperunit)
  console.log('NONVATTAXPU',this.nonvattaxperunit)


  // individual taxperc / totaltaxperc * this.t

  for (let index = 0; index < this.selectedTaxes.length; index++) {
    const element = this.selectedTaxes[index];

    let ta = ((element.taxpercent / totaltaxperc) * this.t)
    element['taxamount'] = ta
    
  }


}

uirChange(event:any) {
  let uir:number = parseFloat(event)
  
  if(!this.discountState) {
    this.discountAmount = uir*(this.inputDiscount/100)
    this.selectedDiscountAmount = this.discountAmount
    this.selectedDiscountPercent = this.inputDiscount
    this.rad = this.selectedUIR - this.discountAmount
  }

  if(this.discountState) {
    this.discountAmount = this.inputDiscount
    this.selectedDiscountAmount = this.inputDiscount
    this.selectedDiscountPercent = (this.inputDiscount*100)/uir
    this.rad = this.selectedUIR - this.discountAmount
  }

  if(isNaN(this.discountAmount)) {
    this.discountAmount = 0
    this.selectedDiscountAmount = 0
    this.rad = this.selectedUIR - this.discountAmount
  }

  if(isNaN(this.rad)) {
    this.rad = this.selectedUIR
  }

  

  this.pcchange(this.ri)
}

handleDiscountSwitchChange(event:any) {
  this.discountState = event.checked
  console.log('DISCOUNT STATE',this.discountState)

  if(this.discountState) {
    this.discountLabel = 'discount amount'
    this.selectedDiscountPercent 
  }
  if(!this.discountState) {
    this.discountLabel = 'discount percent'
  }

  if(this.inputDiscount === null || this.selectedUIR === null) {
    return
  }

  if(this.discountState) {
    this.discountAmount = this.inputDiscount
    this.selectedDiscountAmount = this.inputDiscount
    this.selectedDiscountPercent = (this.inputDiscount*100)/this.selectedUIR
    this.rad = this.selectedUIR - this.discountAmount
  }
  if(!this.discountState) {
    this.discountAmount = this.selectedUIR*(this.inputDiscount/100)
    this.selectedDiscountAmount = this.discountAmount
    this.selectedDiscountPercent = this.inputDiscount
    this.rad = this.selectedUIR - this.discountAmount
  }

  if(isNaN(this.discountAmount)) {
    this.discountAmount = 0
    this.selectedDiscountAmount = 0
    this.rad = this.selectedUIR - this.discountAmount
  }

  if(isNaN(this.rad)) {
    this.rad = this.selectedUIR
  }

  this.pcchange(this.ri)

}

discountChange(event:any) {
  
  let d:number = parseFloat(event)

  if(this.selectedUIR === null) {
    return
  }

  if(!this.discountState) {
    this.discountAmount = this.selectedUIR*(d/100)
    this.selectedDiscountAmount = this.discountAmount
    this.selectedDiscountPercent = d
    this.rad = this.selectedUIR - this.discountAmount

  }
  if(this.discountState) {
    this.discountAmount = d
    this.selectedDiscountAmount = d
    this.selectedDiscountPercent = (d*100)/this.selectedUIR
    this.rad = this.selectedUIR - d
  }

  if(isNaN(this.discountAmount)) {
    this.discountAmount = 0
    this.selectedDiscountAmount = 0
    this.rad = this.selectedUIR - this.discountAmount
  }

  if(isNaN(this.rad)) {
    this.rad = this.selectedUIR
  }

  this.pcchange(this.ri)

}

showNewTaxDialog() {

  this.selectedTaxname = null
  this.selectedTaxcode = null
  this.selectedTaxtype = null
  this.selectedTaxpercent = null
  this.selectedTaxParty = null
  this.displayTaxModal = true;
}


handleTaxEdit(tax:any) {
  console.log('TAX TO BE EDITED',tax)
  this.selectedTaxname = tax.taxname
  this.selectedTaxcode = tax.taxcode
  this.selectedTaxpercent = tax.taxpercent
  this.selectedTaxtype = tax.taxtype
  this.selectedTaxParty = tax.taxauthority
  this.selectedRecordid = tax.recordid
  this.displayTaxEditModal = true
}

deleteTaxDialog:boolean=false;
handleTaxDelete(event:any) {
console.log('EVENT',event)
this.deleteTaxDialog=true;

}
confirmDeletee(event:any){
this.selectedTaxes.splice(event,1)
this.pcchange(this.ri)
this.deleteTaxDialog=false;
this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });

}

handleOnSelectTaxParty(event:any) {
this.selectedTaxParty = event
}

handleOnSelectParty(event:any) {
  this.selectedParty = event
  this.newInvoice.partyaccounthead = event;
}

partyChange(event:any) {
  this.newInvoice.partyaccounthead =  {
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
  }
}

// showFieldsTax: boolean = false;
// *ngIf="showFieldsTax"
handleAddTax() {

if (typeof this.selectedTaxParty === 'undefined' || this.selectedTaxParty == null) {
  this.confirm('You must select a tax authority')
  return false
}
if (typeof this.selectedTaxpercent === 'undefined' || this.selectedTaxpercent == null ) {
  this.confirm('You must enter tax percent')
  return false
}

if (typeof this.selectedTaxname === 'undefined' || this.selectedTaxname == null || this.selectedTaxname === '') {
  this.confirm('You must enter a tax name')
  return false
}

if (typeof this.selectedTaxtype === 'undefined' || this.selectedTaxtype == null || this.selectedTaxtype === '') {
  this.confirm('You must select a tax type')
  return false
}

if(this.selectedTaxParty.accounthead === '') {
  this.confirm('You must select a tax authority')
}

let tax:any = {}
tax['taxname'] = this.selectedTaxname
if(this.selectedTaxcode === null) {
  this.selectedTaxcode = ""
}
tax['taxcode'] = this.selectedTaxcode
tax['taxpercent'] = this.selectedTaxpercent
tax['taxtype'] = this.selectedTaxtype
tax['taxauthority'] = this.selectedTaxParty
tax['recordid'] = this.highestRecordID(this.selectedTaxes) + 1

console.log('TAX TO BE ADDED',tax)

//return false

this.selectedTaxes.push(tax)
// this.showFieldsTax = true;
this.pcchange(this.ri)


this.selectedTaxname = null
this.selectedTaxcode = null
this.selectedTaxtype = null
this.selectedTaxpercent = null
this.selectedTaxParty = null


this.displayTaxModal = false

return false

}

highestRecordID(objectArray:any[]) {
let recid = 0
for (let index = 0; index < objectArray.length; index++) {
  const element = objectArray[index];
  if(element.recordid > recid) {
    recid = element.recordid
  }
}
return recid

}

handleUpdateTax() {
  
let tax:any = this.recordByRecordID(this.selectedRecordid,this.selectedTaxes)
tax.taxname = this.selectedTaxname
if(this.selectedTaxcode === null) {
  this.selectedTaxcode = ""
}
tax.taxcode = this.selectedTaxcode
tax.taxpercent = this.selectedTaxpercent
tax.taxauthority = this.selectedTaxParty
tax.taxtype = this.selectedTaxtype
this.pcchange(this.ri)
this.displayTaxEditModal = false
console.log('TAX TO BE UPDATED',tax)

}

recordByRecordID(recordid:any,array:any) {
let object:any
for (let index = 0; index < array.length; index++) {
  const element = array[index];
  if(element.recordid === recordid) {
    object = element
  }
}
return object
}

handleAddVoucher(){

  console.log('ITEM',this.selectedItem)
  console.log('QUANTITY',this.selectedQty)
  console.log('USER INPUT RATE',this.selectedUIR)

  if (typeof this.selectedItem === 'undefined' || this.selectedItem == null) {
    this.confirm('You must select an item')
    return false
  }
  if (typeof this.selectedQty === 'undefined' || this.selectedQty == null || this.selectedQty === 0) {
    this.confirm('You must enter a quantity greater than zero')
    return false
  }

  // if (typeof this.selectedLocationQty === 'undefined' || this.selectedLocationQty == null || this.selectedLocationQty === 0) {
  //   this.confirm('You must enter a location quantity greater than zero')
  //   return false
  // }

  // if(this.selectedQty != this.selectedLocationQty) {
  //   this.confirm('You must enter a location quantity equal to actual quantity')
  //   return false
  // }

  // if (typeof this.selectedUIR === 'undefined' || this.selectedUIR == null) {
  //   this.confirm('You must enter a sale price greater than or equal to zero')
  //   return false
  // }

  if ((typeof this.selectedAccountMap === 'undefined' || this.selectedAccountMap == null) && this.selectedTitleOption === 'ownership') {
    this.confirm('You must select an account')
    return false
  }

  if(this.taxPartyCheck()) {
    this.confirm('One or more tax entries do not have tax authority selected.')
    return false
  }


  for (let index = 0; index < this.selectedStockBalances.length; index++) {
    const element = this.selectedStockBalances[index];
    if (element.title === 'possession' && this.selectedTitleOption === 'ownership') {
      this.confirm('One or more items that are on possession are being transfered with ownership title.')
      return false
    }
  }


  this.pcchange(this.ri)

  let v:any = this.buildVoucher()
  this.selectedVouchers.push(v)
  
  this.displaySubModal = false
  return false

}

taxPartyCheck() {

for (let index = 0; index < this.selectedTaxes.length; index++) {
  const element = this.selectedTaxes[index];
  //console.log("key" in obj)
  if(!("taxauthority" in element) || (element.taxauthority.accounthead === '')) {
    return true
  }
}
return false
}

buildVoucher() {

let v:any = {}
v['action'] = 'iss'
v['objecttype'] = 'item'
v['object'] = JSON.parse(JSON.stringify(this.selectedItem))
v['quantity'] = this.selectedQty
v['currency'] = '',
v['fromdatetime'] = 'infinity'
v['todatetime'] = 'infinity'
v['duedatetime'] = 'infinity'
v['userinputrate'] = this.selectedUIR
if(this.ri === 'rit'){
  v['rateincludesvat'] = true
}
if(this.ri === 'ret') {
  v['rateincludesvat'] = false
}

v['taxes'] = JSON.parse(JSON.stringify(this.selectedTaxes))
if(isNaN(this.selectedDiscountPercent)) {
  this.selectedDiscountPercent = 0
}
v['discountpercent'] = this.selectedDiscountPercent
v['discountamount'] = this.selectedDiscountAmount
v['rateafterdiscount'] = this.rad
v['rateaftertaxes'] = this.rat
v['taxfactor'] = this.calculateTaxFactor()
v['taxesperunit'] = this.t
v['uom'] = { 
  uom: "",
  symbol: "",
  country: ""
}

v['nonvattaxperunit'] = this.nonvattaxperunit

v['vattaxperunit'] = this.vattaxperunit
v['nonvatpercent'] = this.totalnonvatperc
v['vatpercent'] = this.totalvatperc
v['ratebeforetaxes'] = this.rbt

v['intofrom'] = {
  id: "0",
  itemname: "",
  iscontainer: "True",
  usercode: "",
  uom: {
    uom: "each",
    symbol: "each",
    country: "global"
  },
  taxes: [],
  files: [],
  recipe: {
    consumedunits: [],
    byproducts: []
  }
}
v['by'] = {
  itemid: "0",
  neid: "",
  relationshipid: "",
  name: ""
}
v['delivery'] ={
  id: "-1",
  accounthead: "",
  defaultgroup: "",
  relationship: "-1",
  neid: "-1",
  person: "-1",
  name: "",
  endpoint: "",
  rtype: ""
}
v['title'] = this.selectedTitleOption

v['accountmap'] = JSON.parse(JSON.stringify(this.selectedAccountMap))
v['files'] = []
v['expirydate'] = new Date()
v['vendorperson'] = null
v['recordid'] = this.highestRecordID(this.selectedVouchers) + 1

this.uneditedSbs = JSON.parse(JSON.stringify(this.selectedStockBalances))

let sbs = []
for (let index = 0; index < this.selectedStockBalances.length; index++) {
  const element = this.selectedStockBalances[index];
  if(parseFloat(element.inputqty) > 0) {
    sbs.push(element)
  }
}

v['stockbalanceinputs'] = sbs


let slbs = []
for (let index = 0; index < this.selectedStockLocationBalance.length; index++) {
  const element = this.selectedStockLocationBalance[index];
  if(parseFloat(element.inputqty) > 0) {
    slbs.push(element)
  }
}

v['stocklocationbalanceinputs'] = slbs

return v

}


handleEditVoucher(v:any) {
    
  console.log('VOUCHER TO BE EDITED',v)
  
  this.selectedItem = v.object
  this.selectedUIR = v.userinputrate
  this.selectedQty = v.quantity
  this.selectedStockBalances = this.uneditedSbs
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
  this.pcchange(ri)
  this.selectedVoucherid = v.recordid
  this.displaySubEditModal = true

}

handleUpdateVoucher() {

  if (typeof this.selectedItem === 'undefined' || this.selectedItem == null) {
    this.confirm('You must select an item')
    return false
  }
  if (typeof this.selectedQty === 'undefined' || this.selectedQty == null || this.selectedQty === 0) {
    this.confirm('You must enter a quantity greater than zero')
    return false
  }

  // if (typeof this.selectedLocationQty === 'undefined' || this.selectedLocationQty == null || this.selectedLocationQty === 0) {
  //   this.confirm('You must enter a location quantity greater than zero')
  //   return false
  // }

  // if(this.selectedQty != this.selectedLocationQty) {
  //   this.confirm('You must enter a location quantity equal to actual quantity')
  //   return false
  // }

  if (typeof this.selectedUIR === 'undefined' || this.selectedUIR == null) {
    this.confirm('You must enter a quantity greater than or equal to zero')
    return false
  }

  if ((typeof this.selectedAccountMap === 'undefined' || this.selectedAccountMap == null) && this.selectedTitleOption === 'ownership') {
    this.confirm('You must select an account')
    return false
  }

  if(this.taxPartyCheck()) {
    this.confirm('One or more tax entries do not have tax authority selected.')
    return false
  }

  for (let index = 0; index < this.selectedStockBalances.length; index++) {
    const element = this.selectedStockBalances[index];
    if (element.title === 'possession' && this.selectedTitleOption === 'ownership') {
      this.confirm('One or more items that are on possession are being transfered with ownership title.')
      return false
    }
  }

  this.pcchange(this.ri)

  let v:any = this.recordByRecordID(this.selectedVoucherid,this.selectedVouchers)
  console.log('VOUCHER',v)
  this.rebuildVoucher(v)
  this.displaySubEditModal = false

  return false

}


rebuildVoucher(v:any) {

  this.pcchange(this.ri)
  
  v['action'] = 'iss'
  v['objecttype'] = 'item'
  v['object'] = JSON.parse(JSON.stringify(this.selectedItem)) // only this.selectedItem because it is assigned in handleEditVoucher
  v['quantity'] = this.selectedQty
  v['currency'] = '',
  v['fromdatetime'] = 'infinity'
  v['todatetime'] = 'infinity'
  v['duedatetime'] = 'infinity'
  v['userinputrate'] = this.selectedUIR
  if(this.ri === 'rit'){
    v['rateincludesvat'] = true
  }
  if(this.ri === 'ret') {
    v['rateincludesvat'] = false
  }

  v['taxes'] = JSON.parse(JSON.stringify(this.selectedTaxes))
  if(isNaN(this.selectedDiscountPercent)) {
    this.selectedDiscountPercent = 0
  }
  v['discountpercent'] = this.selectedDiscountPercent
  v['discountamount'] = this.selectedDiscountAmount
  v['rateafterdiscount'] = this.rad
  v['rateaftertaxes'] = this.rat
  v['taxfactor'] = this.calculateTaxFactor()
  v['taxesperunit'] = this.t
  v['uom'] = {
    uom: "",
    symbol: "",
    country: ""
  }
  v['nonvattaxperunit'] = this.nonvattaxperunit
  v['vattaxperunit'] = this.vattaxperunit
  v['nonvatpercent'] = this.totalnonvatperc
  v['vatpercent'] = this.totalvatperc
  v['ratebeforetaxes'] = this.rbt

  v['intofrom'] = {
    id: "0",
    itemname: "",
    iscontainer: "True",
    usercode: "",
    uom: {
      uom: "each",
      symbol: "each",
      country: "global"
    },
    taxes: [],
    files: [],
    recipe: {
      consumedunits: [],
      byproducts: []
    }
  }
  v['by'] = {
    itemid: "0",
    neid: "",
    relationshipid: "",
    name: ""
  }
  v['delivery'] ={
    id: "-1",
    accounthead: "",
    defaultgroup: "",
    relationship: "-1",
    neid: "-1",
    person: "-1",
    name: "",
    endpoint: "",
    rtype: ""
  }
  v['title'] = this.selectedTitleOption
  v['accountmap'] = JSON.parse(JSON.stringify(this.selectedAccountMap))
  v['files'] = []
  v['expirydate'] = new Date()
  v['vendorperson'] = null
  //v['recordid'] = this.highestRecordID(this.selectedVouchers) + 1

  this.uneditedSbs = JSON.parse(JSON.stringify(this.selectedStockBalances))

  let sbs = []
  for (let index = 0; index < this.selectedStockBalances.length; index++) {
    const element = this.selectedStockBalances[index];
    if(parseFloat(element.inputqty) > 0) {
      sbs.push(element)
    }
  }

  v['stockbalanceinputs'] = sbs

  let slbs = []
  for (let index = 0; index < this.selectedStockLocationBalance.length; index++) {
    const element = this.selectedStockLocationBalance[index];
    if(parseFloat(element.inputqty) > 0) {
      slbs.push(element)
    }
  }

  v['stocklocationbalanceinputs'] = slbs


  return v
} 


} 
