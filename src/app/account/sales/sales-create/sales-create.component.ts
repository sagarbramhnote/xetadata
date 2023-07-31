import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { InvoiceListService } from 'src/app/services/invoice-list.service';
import { ProductServiceListService } from 'src/app/services/product-service-list.service';
import { SaveSaleService } from 'src/app/services/save-sale.service';
import { Search } from 'src/app/services/search';
import { StockBalanceItemService } from 'src/app/services/stock-balance-item.service';
import { StockLocationBalanceService } from 'src/app/services/stock-location-balance.service';

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class SalesCreateComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  inProgress:boolean = false
  selectedDate: Date = new Date();
  newInvoice:any = {}
  selectedParty:any
  filteredParties:any[] = new Array
  private _eSub:any

  ngOnInit(): void {

  }

  navigateToListSales(){
    this.router.navigate(['account/sales'])

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
  this.pcchange('rit')
  this.selectedStockBalances = []
  this.selectedContextPrices = []
  this.displaySubModal = true;

}

deletevoucherDialog:boolean=false
handleDeleteVoucher(v:any) {
  this.deletevoucherDialog=true;

}
;

confirmDelete(v:any){
  this.selectedVouchers.splice(v,1)
  this.deletevoucherDialog=false;
  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });

}
 
dateSelected(event:any) {

  console.log('DATE SELECTED',event)

  let date1 = moment(event).format('YYYY-MM-DD');
  let time1 = moment(event).format('HH:mm:ss.SSSZZ')
  let isoDateTime = date1+'T'+time1
  console.log('ISO DATE',isoDateTime)
  this.newInvoice.date = isoDateTime
 
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

handleOnSelectParty(event:any) {
  this.selectedParty = event
  this.newInvoice.partyaccounthead = event;
}
placeholderParty = 'select party'

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
selectedInvoice:any = {}
selectedVouchers:any[] = []
onRowSelect(event:any) {
  if(event !== null) {
    console.log('ROW SELECT',event)
    this.selectedInvoice = event.data
  }
}

newVoucher:any = {}
selectedItem:any
selectedUOM:any = ""
selectedQty:number = 0
selectedUIR:any
selectedTaxes:any[] = []
selectedAccountMap:any
inputDiscount:any
rad:any = 0
selectedStockBalances:any[] = []
selectedContextPrices:any[] = []
displaySubModal: boolean = false;


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

ri:string = 'rit'
rbt:any = 0
t:any = 0
rat:any = 0
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

uneditedSbs:any[] = []


// sub sales vaoucher
filteredItems:any[] = new Array
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
sbcols: any[] = new Array;
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

snoBoolChange(event:any) {
  console.log('EV',this.selectedValues)

  const dictionary = {
    'id':this.selectedItem.itemdef.id,
    'serialnumber': this.selectedValues.includes('val1'),
    'batchnumber': this.selectedValues.includes('val2'),
    'expirydate': this.selectedValues.includes('val3'),
    'brand': this.selectedValues.includes('val4')
  };

  this.loadStockBalance(dictionary)
  this.loadStockLocationBalance(this.selectedItem.itemdef.id)
  this.selectedQty = 0
}

bnoBoolChange(event:any) {
  console.log('EV',this.selectedValues)
  const dictionary = {
    'id':this.selectedItem.itemdef.id,
    'serialnumber': this.selectedValues.includes('val1'),
    'batchnumber': this.selectedValues.includes('val2'),
    'expirydate': this.selectedValues.includes('val3'),
    'brand': this.selectedValues.includes('val4')
  };

  this.loadStockBalance(dictionary)
  this.loadStockLocationBalance(this.selectedItem.itemdef.id)
  this.selectedQty = 0
}

edtBoolChange(event:any) {
  console.log('EV',this.selectedValues)
  console.log('EV',this.selectedValues)
  const dictionary = {
    'id':this.selectedItem.itemdef.id,
    'serialnumber': this.selectedValues.includes('val1'),
    'batchnumber': this.selectedValues.includes('val2'),
    'expirydate': this.selectedValues.includes('val3'),
    'brand': this.selectedValues.includes('val4')
  };

  this.loadStockBalance(dictionary)
  this.loadStockLocationBalance(this.selectedItem.itemdef.id)
  this.selectedQty = 0
}

brandBoolChange(event:any) {
  console.log('EV',this.selectedValues)
  console.log('EV',this.selectedValues)
  const dictionary = {
    'id':this.selectedItem.itemdef.id,
    'serialnumber': this.selectedValues.includes('val1'),
    'batchnumber': this.selectedValues.includes('val2'),
    'expirydate': this.selectedValues.includes('val3'),
    'brand': this.selectedValues.includes('val4')
  };

  this.loadStockBalance(dictionary)
  this.loadStockLocationBalance(this.selectedItem.itemdef.id)
  this.selectedQty = 0
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

disableTitleOption:boolean = false
titleOptions:any[] = [{type:'ownership'},{type:'possession'},{type:''}]
selectedTitleOption:any

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
discountState:boolean = false
discountAmount:number = 0
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
discountLabel:string = 'discount percent'

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
selectedRecordid:any
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

  if (typeof this.selectedLocationQty === 'undefined' || this.selectedLocationQty == null || this.selectedLocationQty === 0) {
    this.confirm('You must enter a location quantity greater than zero')
    return false
  }

  if(this.selectedQty != this.selectedLocationQty) {
    this.confirm('You must enter a location quantity equal to actual quantity')
    return false
  }

  if (typeof this.selectedUIR === 'undefined' || this.selectedUIR == null) {
    this.confirm('You must enter a sale price greater than or equal to zero')
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
selectedVoucherid:any

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

  if (typeof this.selectedLocationQty === 'undefined' || this.selectedLocationQty == null || this.selectedLocationQty === 0) {
    this.confirm('You must enter a location quantity greater than zero')
    return false
  }

  if(this.selectedQty != this.selectedLocationQty) {
    this.confirm('You must enter a location quantity equal to actual quantity')
    return false
  }

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

selectedEntity:any
handleSaveSale() {
  this.selectedEntity = {
    id:1
  }
  if (typeof this.selectedEntity === 'undefined' || this.selectedEntity == null) {
    this.confirm('You must select an entity')
    return false
  }

  if (typeof this.selectedParty === 'undefined' || this.selectedParty == null) {
    this.confirm('You must select a party')
    return false
  }

  if(this.selectedVouchers.length === 0) {
    this.confirm('You must enter atleast one voucher')
    return false
  }

  if(this.rad < 0) {
    this.confirm('Rate after discount must be positive')
    return false
  }

  

  let newInvoice:any = {}
  newInvoice['date'] = this.ISODate(this.selectedDate)
  newInvoice['entity'] = this.selectedEntity
  newInvoice['partyaccounthead'] = this.selectedParty
  newInvoice['party'] = {'person':-1,'id':-1,'name':"",'endpoint':"",'displayfile':{}}
  newInvoice['vouchers'] = this.selectedVouchers
  newInvoice['salesformtype'] = 'sale'

  console.log('INVOICE TO BE SAVED',JSON.stringify(newInvoice))

  this.saveSale(newInvoice)

  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created', life: 3000 });

  this.router.navigate(['account/sales'])

  return false
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
displayModal: boolean = false;
sanitizedInvoiceList:any[] = []

saveSale(newInvoice:any){

  this.inProgress = true
  
  let sah:SaveSaleService = new SaveSaleService(this.httpClient)
  this._siSub = sah.saveSale(newInvoice).subscribe({
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
private _invSub:any
saleList:any = []
totalRecords:number = 0

loadInvoices(offset:number,moreoffset:number) {

  this.inProgress = true
  let ahlService:InvoiceListService = new InvoiceListService(this.httpClient)
  let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'sales',attribute:''};
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

sanitizeInvoices() {
  for (let index = 0; index < this.saleList.length; index++) {
    const element = this.saleList[index];

    let sanitInvoice:any = {}
    sanitInvoice['id'] = element.id
    sanitInvoice['date'] = element.date
    sanitInvoice['vendor'] = element.partyaccounthead.accounthead

    console.log('VENDOR',element.partyaccounthead.accounthead)
    
    let taxableValue:number = 0
    let aftertaxValue:number = 0
    let tax = 0
    for (let j = 0; j < element.vouchers.length; j++) {
      const voucher = element.vouchers[j];
      let q = Math.abs(voucher.quantity)
      taxableValue = (q*voucher.ratebeforetaxes)+taxableValue
      aftertaxValue = (q*voucher.rateaftertaxes)+aftertaxValue
    }

    tax = aftertaxValue - taxableValue

    sanitInvoice['taxablevalue'] = taxableValue
    sanitInvoice['tax'] = tax
    sanitInvoice['aftertaxvalue'] = aftertaxValue
    sanitInvoice['invoice'] = element

    this.sanitizedInvoiceList.push(sanitInvoice)
    
  }
}

}


