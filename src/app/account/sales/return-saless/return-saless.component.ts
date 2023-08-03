import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { EventData } from 'src/app/global/event-data';
import { GlobalConstants } from 'src/app/global/global-constants';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { PeopleService } from 'src/app/services/people.service';
import { ProductServiceListService } from 'src/app/services/product-service-list.service';
import { SaveSaleReturnService } from 'src/app/services/save-sale-return.service';
import { Search } from 'src/app/services/search';
import { StockBalanceItemService } from 'src/app/services/stock-balance-item.service';
import { StockLocationBalanceService } from 'src/app/services/stock-location-balance.service';
import { StockLocationListService } from 'src/app/services/stock-location-list.service';

@Component({
  selector: 'app-return-saless',
  templateUrl: './return-saless.component.html',
  styleUrls: ['./return-saless.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class ReturnSalessComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  inProgress:boolean = false


navigateToSales(){
  this.router.navigate(['account/sales'])
}

inv:any
saleInvoiceID:any
selectedEntity:any
selectedParty:any
selectedVouchers:any[] = []


ngOnInit(): void {
  const item = localStorage.getItem('salesReturnInvoice');
  if (item !== null) {
    this.inv = JSON.parse(item);
    console.log('INVOICE',this.inv)
  
  let lo:any = GlobalConstants.loginObject
  if(this.haskeys(lo.digitalkey)) {
    if(!lo.digitalkey.purchases.edit) {
      this.confirm("You are not permitted to use this feature.")
      return
    }
  }
  else if(!this.haskeys(lo.digitalkey)) {
    console.log('NO KEYS ARE DEFINED')
  }

  this.saleInvoiceID = this.inv.id
  this.selectedEntity = this.inv.entity
  this.selectedParty = this.inv.partyaccounthead

  this.selectedVouchers = this.inv.vouchers

}
}


selectedDate: Date = new Date();
newInvoice:any = {}

dateSelected(event:any) {

  console.log('DATE SELECTED',event)

  let date1 = moment(event).format('YYYY-MM-DD');
  let time1 = moment(event).format('HH:mm:ss.SSSZZ')
  let isoDateTime = date1+'T'+time1
  console.log('ISO DATE',isoDateTime)
  this.newInvoice.date = isoDateTime
 
}

filteredEntities:any[] = new Array
private _eSub:any

filterEntities(event:any) {
  console.log('IN FILTER UOMs',event)
  // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
  let criteria:any = {
    searchtext: event.query,
    screen: "tokenfield",
    searchtype: "entity-name-begins",
    offset: 0
  }
  console.log('CRITERIA',criteria)
  let eService:PeopleService = new PeopleService(this.httpClient)
  this._eSub = eService.fetchPeople(criteria).subscribe({
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
        this.filteredEntities = dataSuccess.success;
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

handleOnSelect(event:any) {
  this.selectedEntity = event
  this.newInvoice.entity = event;
}

placeholderEntity = 'select entity'
entityChange(event:any) {
  this.newInvoice.entity = {
    person: "",
    id: "",
    name: "",
    endpoint: "",
    displayfile: {},
    isanonymous: "",
    endpointtype: ""
  }
  
}

filteredParties:any[] = new Array
private _pSub:any
@ViewChild('selectParty') selectParty:any
placeholderParty = 'select party'

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

haskeys(o:any) {
  let hasKeys = false;

  for (const key in o) {
    if (o.hasOwnProperty(key)) {
      // a key exists at this point, for sure!
      hasKeys = true;
      break; // break when found
    }
  }
  return hasKeys
}

selectedInvoice:any = {}

onRowSelect(event:any) {
  if(event !== null) {
    console.log('ROW SELECT',event)
    this.selectedInvoice = event.data
  }
}

selectedItem:any
filteredItems:any[] = new Array
selectedQty:number = 0
selectedUIR:any
selectedStockBalances:any[] = []
sbcols: any[] = new Array;
selectedAccountMap:any
selectedUOM:any = ""
selectedTaxes:any[] = []
ri:string = 'rit'

selectedVoucherid:any
selectedTitleOption:any
displaySubEditReturnModal:boolean = false


handleEditReturnVoucher(v:any) {
    
  console.log('VOUCHER TO BE RETURNED',v)
  
  this.selectedItem = v.object
  this.selectedUIR = v.userinputrate
  this.selectedQty = 0
  this.selectedStockBalances = JSON.parse(JSON.stringify(v.stockbalanceinputs))

  for (let index = 0; index < this.selectedStockBalances.length; index++) {
    const element = this.selectedStockBalances[index];
    element.balance = element.inputqty
    element.inputqty = 0
  }

  if (this.selectedStockBalances.length > 0) {
    let obj = this.selectedStockBalances[0]
    const dictionaryList = Object.keys(obj).map(key => {
      return { field: key };
    });
    this.sbcols = dictionaryList
  }

  this.selectedAccountMap = v.accountmap
  this.selectedUOM = v.object.uom.uom
  this.selectedTaxes = v.taxes
  let ri = ""
  if(v.rateincludesvat) {
    this.ri = 'rit'
  }
  if(!v.rateincludesvat) {
    this.ri = 'ret'
  }
  
  this.uirChange(v.userinputrate)
  this.selectedVoucherid = v.recordid

  this.selectedTitleOption = v.title
  this.titleOptionChange(v.title)

  this.displaySubEditReturnModal = true

}
disableTitleOption:boolean = false

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

discountLabel:string = 'discount percent'
discountAmount:number = 0

discountState:boolean = false

selectedRecordid:any

rad:any = 0

rbt:any = 0
t:any = 0
rat:any = 0
inputDiscount:any
@ViewChild('selectDiscount') selectDiscount:any

selectedDiscountAmount:any
selectedDiscountPercent:any

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

private totalvatperc:number = 0
private totalnonvatperc:number = 0

private vattaxperunit:number = 0
private nonvattaxperunit:number = 0

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

selectedReturnVouchers:any[] = []

navigateToListSales(){
  this.router.navigate(['account/sales'])

}

uneditedSbs:any[] = []

selectedContextPrices:any[] = []

selectedFromLocation:any
filteredFromLocations:any[] = new Array
@ViewChild('selectFromLocation') selectFromLocation:any
placeholderFromLocation = 'select location'

filterFromLocations(event:any) {
  console.log('IN FILTER ITEMS',event)
  // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
  let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'contains',attribute:''};
  console.log('CRITERIA',criteria)
  let iService:StockLocationListService = new StockLocationListService(this.httpClient)
  this._iSub = iService.fetchStockLocations(criteria).subscribe({
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
        this.filteredFromLocations = dataSuccess.success;
        console.log('FILTERED STOCK LOCATIONS',dataSuccess.success)
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



handleOnSelectFromLocation(event:any) {

  this.selectedFromLocation = event
  // call the xetadata_stockbalance_ofitem_inlocation
  console.log('SELECTED ITEM',this.selectedItem)
  if (typeof this.selectedItem === 'undefined' || this.selectedItem == null || this.selectedItem.itemname === '') {
    this.confirm('You must select an item')
    return 
  }
  // let a = {
  //   'itemid':this.selectedItem.id,
  //   'location':this.selectedFromLocation.location
  // }
  //this.stockItemInLocation(a)
}

fromLocationChange(event:any) {
  console.log('LOCATION CHANGE',event)
  //this.selectedItemQuantity = ''
}

// sub sales vaoucher
private _iSub:any


filterProductsServices(event:any) {
  console.log('IN FILTER ITEMS',event)
  let criteria:any = {searchtext:event.query,screen:'search',offset:0,searchtype:'item-name-contains',attribute:''};
  console.log('CRITERIA',criteria)
  let iService:ProductServiceListService = new ProductServiceListService(this.httpClient)
  this._iSub = iService.fetchProductServiceList(criteria).subscribe({
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
selectedValues: string[] = [];
handleOnSelectItem(event:any) {
  
  this.selectedItem = event

  // here we'll add DYNAMIC sale price

  let dyncp:any = {
    context: 'DYNAMIC',
    saleprice: 0,
    taxes: []
  }

  this.selectedItem.contextprices = [...this.selectedItem.contextprices,dyncp]

  const dictionary = {
    'id':this.selectedItem.itemdef.id,
    'serialnumber': this.selectedValues.includes('val1'),
    'batchnumber': this.selectedValues.includes('val2'),
    'expirydate': this.selectedValues.includes('val3'),
    'brand': this.selectedValues.includes('val4')
  }; 

  this.loadStockBalance(dictionary)
  this.loadStockLocationBalance(this.selectedItem.itemdef.id)

  this.selectedContextPrices = this.selectedItem.contextprices

  console.log('SELECTED CPS',this.selectedContextPrices)

  //return

  this.rat = 0
  this.rbt = 0
  this.t = 0
  this.selectedUOM = this.selectedItem.itemdef.uom.uom

  this.pcchange(this.ri)


}
inStockBalanceProgress:boolean = false
private _sbSub:any
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
          element['id'] = index
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

selectedStockLocationBalance:any[] = []
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
placeholderItem = 'select item'
itemChange(event:any) {

  console.log('ITEM CHANGE',event)
  this.selectedUOM = ""
  this.selectedStockBalances = []
  this.selectedContextPrices = []
  this.selectedTaxes = []

  this.selectedAccountMap = null
  
} 



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

selectedLocationQty = 0
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

filteredAccountMaps:any[] = new Array
displayReturnModal:boolean = false

filterAccountMaps(event:any) {
  console.log('IN FILTER PARTIES',event)
  // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
  
  let searchtype = ''
  console.log('SELECTED ITEM',this.selectedItem)

  if (!this.displayReturnModal) {
    if(this.selectedItem === null) {
      this.confirm('You must select an item')
      return
    }
    else if (this.selectedItem.itemdef.itemfatype === 'stock') {
      searchtype = 'stockitem-accounthead-contains'
    }
    else if(this.selectedItem.itemdef.itemfatype === 'asset') {
      searchtype = 'assetitem-accounthead-contains'
    }
    else if(this.selectedItem.itemdef.itemfatype === 'other') {
      searchtype = 'otheritem-accounthead-contains'
    } 
  }

  else if (this.displayReturnModal) {
    if (this.selectedItem.itemfatype === 'stock') {
      searchtype = 'stockitem-accounthead-contains'
    }
    else if(this.selectedItem.itemfatype === 'asset') {
      searchtype = 'assetitem-accounthead-contains'
    }
    else if(this.selectedItem.itemfatype === 'other') {
      searchtype = 'otheritem-accounthead-contains'
    }
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

placeholderAccountMap = 'select account map'

handleOnSelectAccountMap(event:any) {
  this.selectedAccountMap = event
  //this.newInvoice.partyaccounthead = event;
}

accountMapChange(event:any) {
  this.selectedAccountMap = null

}


titleOptions:any[] = [{type:'ownership'},{type:'possession'},{type:''}]

selectedCP:any
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

displayTaxModal:boolean = false;

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
displayTaxEditModal: boolean = false;


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

showFieldsTax: boolean = false;
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
this.showFieldsTax = true;
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
v['object'] = JSON.parse(JSON.stringify(this.selectedItem.itemdef))
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

displaySubEditModal:boolean = false;

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

handleUpdateReturnVoucher() {
  this.pcchange(this.ri)

  let v:any = this.recordByRecordID(this.selectedVoucherid,this.selectedVouchers)

  

  let vouchers:any[] = []

  for (let index = 0; index < this.selectedStockBalances.length; index++) {
    const element = this.selectedStockBalances[index];

    let newV:any = this.rebuildReturnVoucher(v,element)
    if (element.hasOwnProperty('serialno')) {
      newV.serialno = element.serialno;
    }
    if (element.hasOwnProperty('batchno')) {
      newV.batchno = element.batchno;
    }
    if (element.hasOwnProperty('brand')) {
      newV.brand = element.brand;
    }
    if (element.hasOwnProperty('expirydate')) {
      newV.expirydate = element.expirydate;
    }

    vouchers.push(newV)
    
  }

  
  console.log('RETURN VOUCHERS',vouchers)

  // if this voucher is not there, add it
  //this.selectedReturnVouchers.push(newV)
  // if this voucher is already there, update it

  let tempV:any = this.recordByRecordID(v.recordid,this.selectedReturnVouchers)
  console.log('TEMPV',tempV)

  if(typeof tempV === 'undefined') {
    console.log('RETURN VOUCHERS NOT THERE')
    this.selectedReturnVouchers = vouchers
  }
  else if(typeof tempV !== 'undefined') {
    console.log('RETURN VOUCHERS THERE')

    for (let index = 0; index < this.selectedReturnVouchers.length; index++) {
      const element = this.selectedReturnVouchers[index];
      let a:any = this.indexByRecordID(this.selectedReturnVouchers[index],this.selectedReturnVouchers)
      this.selectedReturnVouchers.splice(a,1)
      
    }

    this.selectedReturnVouchers = vouchers
    

  }

  if (typeof this.selectedFromLocation === 'undefined' || this.selectedFromLocation == null || this.selectedFromLocation === '') {
    this.confirm('You must select a location')
    return false
  }

  this.displaySubEditReturnModal = false

  return false
}


rebuildReturnVoucher(v:any,sbi:any) {
    


  let newV:any = JSON.parse(JSON.stringify(v))

  newV['action'] = 'rec'
  newV['quantity'] = sbi.inputqty
  newV['originalrateaftertaxes'] = sbi.rate
  newV['expirydate'] = sbi.expirydate
  newV['salevoucherid'] = v.id
  newV['location'] = this.selectedFromLocation

  return newV

}


indexByRecordID(v:any,array:any[]) {

  let a = null
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if(element['recordid'] === v.recordid) {
      a = index
    }
  }
  return a
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


handleSaveSaleReturn() {
  let newInvoice:any = {}
  newInvoice['date'] = this.ISODate(this.selectedDate)
  newInvoice['entity'] = this.selectedEntity
  newInvoice['partyaccounthead'] = this.selectedParty
  newInvoice['party'] = {'person':-1,'id':-1,'name':"",'endpoint':"",'displayfile':{}}
  newInvoice['vouchers'] = this.selectedReturnVouchers
  newInvoice['saleformid'] = this.saleInvoiceID
  //newInvoice['salesformtype'] = 'sale'

  console.log('INVOICE TO BE SAVED',JSON.stringify(newInvoice))


  this.saveSaleReturn(newInvoice)
  

}


ISODate(event:any) {

  console.log('DATE SELECTED',event)

  let date1 = moment(event).format('YYYY-MM-DD');
  let time1 = moment(event).format('HH:mm:ss.SSSZZ')
  let isoDateTime = date1+'T'+time1
  console.log('ISO DATE',isoDateTime) 
  
  return isoDateTime
 
}

private _siSub:any
saveSaleReturn(newInvoice:any){

  this.inProgress = true
  
  let sah:SaveSaleReturnService = new SaveSaleReturnService(this.httpClient)
  this._siSub = sah.saveSaleReturn(newInvoice).subscribe({
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
        this.router.navigate(['account/sales-return'])
        this.displayReturnModal = false
       // this.eventBusService.emit(new EventData('SalesReturn','salesreturn'))
        

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

}
