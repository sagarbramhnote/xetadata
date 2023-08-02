import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { GlobalConstants } from 'src/app/global/global-constants';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { ItemsListService } from 'src/app/services/items-list.service';
import { PeopleService } from 'src/app/services/people.service';
import { SavePurchaseReturnService } from 'src/app/services/save-purchase-return.service';
import { Search } from 'src/app/services/search';
import { StockLocationBalanceService } from 'src/app/services/stock-location-balance.service';
import { StockLocationListService } from 'src/app/services/stock-location-list.service';

@Component({
  selector: 'app-purchase-purchase-return',
  templateUrl: './purchase-purchase-return.component.html',
  styleUrls: ['./purchase-purchase-return.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class PurchasePurchaseReturnComponent {


  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  inProgress:boolean = false


navigateToPurchase(){
  this.router.navigate(['account/purchase'])
}

  selectedInvoice:any = {}
  viewPartyName:any;
  viewTotal:number = 0   


inv:any
purchaseInvoiceID:any
selectedEntity:any = {
  id:1
}
selectedParty:any
selectedVouchers:any[] = []


ngOnInit(): void {
  const item = localStorage.getItem('purchaseReturnHandle');
  if (item !== null) {
    this.inv = JSON.parse(item);
    console.log('INVOICE', this.inv)
    let lo:any = GlobalConstants.loginObject
    if(this.haskeys(lo.digitalkey)) {
      if(!lo.digitalkey.purchases.view) {
        this.confirm("You are not permitted to use this feature.")
        return
      }
    }
    else if(!this.haskeys(lo.digitalkey)) {
      console.log('NO KEYS ARE DEFINED')
    }

    this.purchaseInvoiceID = this.inv.id
    this.selectedEntity = this.inv.entity
    this.selectedParty = this.inv.partyaccounthead

    this.selectedVouchers = this.inv.vouchers


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

selectedDate: Date = new Date();
newInvoice:any = {}

dateSelected(event:any) {

  console.log('DATE SELECTED',event)

  let date1 = moment(event).format('YYYY-MM-DD');
  let time1 = moment(event).format('HH:mm:ss.SSSZZ')
  let isoDateTime = date1+'T'+time1
  console.log('ISO DATE',isoDateTime)
  this.newInvoice.date = isoDateTime
  //this.selectedDate = isoDateTime
 
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
selectParty:any
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

onRowSelect(event:any) {
  if(event !== null) {
    console.log('ROW SELECT',event)
    this.selectedInvoice = event.data
  }
}

selectedItem:any
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
selectedSNO:any
selectedBNO:any
selectedBrand:any
selectedExpiryDate:any;


handleEditReturnVoucher(v:any) {
    
  console.log('VOUCHER TO BE RETURNED',v)
  
  this.selectedItem = v.object
  this.selectedUIR = v.userinputrate
  this.selectedQty = 0

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

  if (v.serialno !== null && typeof v.serialno !== 'undefined') {
    this.selectedSNO = v.serialno;
  }
  if (v.batchno !== null && typeof v.batchno !== 'undefined') {
    this.selectedBNO = v.batchno;
  }
  if (v.expirydate !== null && typeof v.expirydate !== 'undefined') {
    this.selectedExpiryDate = v.expirydate;
  }
  if (v.brand !== null && typeof v.brand !== 'undefined') {
    this.selectedBrand = v.brand;
  }

  this.selectedTitleOption = v.title

  this.titleOptionChange(v.title)

  this.selectedVoucherid = v.recordid

  this.loadStockLocationBalance(this.selectedItem.id)

  this.displaySubEditReturnModal = true

}

discountAmount:number = 0

discountState:boolean = false

selectedRecordid:any

rad:any = 0

rbt:any = 0
t:any = 0
rat:any = 0
inputDiscount:any
selectDiscount:any

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

rbtString:string = "0"
tString:string = "0"
ratString:string = "0"
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

  this.rbtString = this.formatNumber(this.rbt)
  this.tString = this.formatNumber(this.t)
  this.ratString = this.formatNumber(this.rat)

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

formatNumber(a:number)
{
  return a.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits:2})
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

titleOptions:any[] = [{type:'ownership'},{type:'possession'}]
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

snoChange(event:any) {

}

bnoChange(event:any) {

}

brandChange(event:any) {

}

inStockBalanceProgress:boolean = false
_sbSub:any
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

selectedReturnVouchers:any[] = []

filteredItems:any[] = new Array
private _iSub:any

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

  

  this.selectedTaxes = this.selectedItem.taxes

  for (let index = 0; index < this.selectedTaxes.length; index++) {
    const element = this.selectedTaxes[index];
    element['recordid'] = index
  }

  this.rat = 0
  this.rbt = 0
  this.t = 0
  this.selectedUOM = this.selectedItem.uom.uom

  this.pcchange(this.ri)
}

itemChange(event:any) {

  console.log('ITEM CHANGE',event)
  this.selectedUOM = ""
  this.selectedTaxes = []

  this.selectedAccountMap = null
  
}

filteredAccountMaps:any[] = new Array

filterAccountMaps(event:any) {
  console.log('IN FILTER PARTIES',event)
  // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
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
}

accountMapChange(event:any) { 
  this.selectedAccountMap =  null

}

filteredFromLocations:any[] = new Array
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

selectedFromLocation:any


handleOnSelectFromLocation(event:any) {

  this.selectedFromLocation = event
  console.log('SELECTED ITEM',this.selectedItem)
  if (typeof this.selectedItem === 'undefined' || this.selectedItem == null || this.selectedItem.itemname === '') {
    this.confirm('You must select an item')
    return 
  }

}

fromLocationChange(event:any) {
  console.log('LOCATION CHANGE',event)
}
selectedLocationQty:number = 0

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

expiryDateSelected(event:any) {

  console.log('EXPIRY DATE SELECTED',event)

  this.selectedExpiryDate = event

}

discountLabel:string = 'Discount Percent'

handleDiscountSwitchChange(event:any) {
   this.discountState = event.checked
   console.log('DISCOUNT STATE',this.discountState)

   if(this.discountState) {
     this.discountLabel = 'Discount Amount'
     this.selectedDiscountPercent 
   }
   if(!this.discountState) {
     this.discountLabel = 'Discount Percent'
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

 
 showFieldsTax: boolean = false;
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
 
 showNewTaxDialog() {

   this.selectedTaxname = null
   this.selectedTaxcode = null
   this.selectedTaxtype = null
   this.selectedTaxpercent = null
   this.selectedTaxParty = null
   this.displayTaxModal = true;
 }

 handleOnSelectTaxParty(event:any) {
   this.selectedTaxParty = event
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


handleAddTax() {
 // let copiedTax = JSON.parse(JSON.stringify(this.selectedTax));
 // this.item.taxes.push(copiedTax)

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
 this.pcchange(this.ri)
 this.showFieldsTax = true;


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

handleUpdateReturnVoucher() {
  this.pcchange(this.ri)

  let v:any = this.recordByRecordID(this.selectedVoucherid,this.selectedVouchers)

  let vouchers:any[] = []
  let newV:any = this.rebuildReturnVoucher(v)
  console.log('NEWV',JSON.stringify(newV))

  if(newV.quantity < 0) {

    this.confirm('You cannot enter negative values for quantity')
    return
    
  }

  vouchers.push(newV)
  console.log('RETURN VOUCHERS',vouchers)

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


  if (typeof this.selectedLocationQty === 'undefined' || this.selectedLocationQty == null || this.selectedLocationQty === 0) {
    this.confirm('You must enter a location quantity greater than zero')
    return false
  }

  if(this.selectedQty != this.selectedLocationQty) {
    this.confirm('You must enter a location quantity equal to actual quantity')
    return false
  }



  this.displaySubEditReturnModal = false

  return false 

}

rebuildReturnVoucher(v:any) {
    
  console.log('VID',v.id)
  let newV:any = JSON.parse(JSON.stringify(v))

  newV['action'] = 'iss'
  newV['quantity'] = this.selectedQty
  // newV['originalrateaftertaxes'] = sbi.rate
  // newV['expirydate'] = sbi.expirydate
  newV['purchasevoucherid'] = v.id

  let slbs = []
  for (let index = 0; index < this.selectedStockLocationBalance.length; index++) {
    const element = this.selectedStockLocationBalance[index];
    if(parseFloat(element.inputqty) > 0) {
      slbs.push(element)
    }
  }

  newV['stocklocationbalanceinputs'] = slbs

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

handleSaveSaleReturn() {
  let newInvoice:any = {}
  newInvoice['date'] = this.ISODate(this.selectedDate)
  newInvoice['entity'] = this.selectedEntity
  newInvoice['partyaccounthead'] = this.selectedParty
  newInvoice['party'] = {'person':-1,'id':-1,'name':"",'endpoint':"",'displayfile':{}}
  newInvoice['vouchers'] = this.selectedReturnVouchers
  //newInvoice['saleformid'] = this.saleInvoiceID
  //newInvoice['salesformtype'] = 'sale'

  console.log('INVOICE TO BE SAVED',JSON.stringify(newInvoice))


  this.savePurchaseReturn(newInvoice)

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

savePurchaseReturn(newInvoice:any){

  this.inProgress = true
  
  let sah:SavePurchaseReturnService = new SavePurchaseReturnService(this.httpClient)
  this._siSub = sah.savePurchaseReturn(newInvoice).subscribe({
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
        this.router.navigate(['account/purchasereturn'])

        // this.displayReturnModal = false
        // this.eventBusService.emit(new EventData('PurchaseReturn','purchasereturn'))
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
