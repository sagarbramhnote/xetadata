import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { GlobalConstants } from 'src/app/global/global-constants';
import { ReorderContact } from 'src/app/global/reorderContact';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { ItemLevelListService } from 'src/app/services/item-level-list.service';
import { ItemsListService } from 'src/app/services/items-list.service';
import { SaveItemService } from 'src/app/services/save-item.service';
import { Search } from 'src/app/services/search';
import { UOMListService } from 'src/app/services/uomlist.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class ItemCreateComponent implements OnInit{

  // showFields: boolean = false;

// toggleFields() {
//   this.showFields = !this.showFields;
//*ngIf="showFields"
// }

  ngOnInit(): void {
    this.lo = GlobalConstants.loginObject

    this.level1.push('')
    this.level2.push('') 
    this.level3.push('')

    this.loadItemLevels(0,0)
    
    this.loadItems(0,0)
    this.pes = [{value: ''},{value: 'PHONE'},{value: 'EMAIL'}]
    this.ces = [{value: ''},{value: 'INTERNAL'},{value: 'VENDOR'}]

  }

  lo:any
  pes:any[] = []
  ces:any[] = []

  item:any = {
    itemname: "",
    uom: {
      uom: "",
      symbol: "",
      country: ""
    },
    partofgroup: -1,
    usercode: "",
    isgroup: false,
    files: [],
    taxes: [],
    recipe: {
      consumedunits: [],
      byproducts: []
    },
    reorderquantity: 0,
    reordercontacts: [],
    level1:'',
    level2:'',
    level3:'',
    itemfatype:''
  }

  displayModal:boolean = false

  displayRecipeModal:boolean = false
  displayRecipeEditModal:boolean = false

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  @ViewChild('itemTitle') itemTitle:any
  @ViewChild('selectUOM') selectUOM:any 

  items:any[] = new Array
  selectedRows:any[] = new Array
  _ahlSub:any

  selectedUOM:any
  filteredUOMs:any[] = new Array
  private _pweSub:any

  navigateToListItems(){
    this.router.navigate(['entity/item'])
 }

 inputChange(event:any) {

  console.log('ISVALID',this.itemTitle.valid)
  this.item['isvalid'] = this.itemTitle.valid

}
handleOnSelect(event:any) {
  this.selectedUOM = event
  this.item.uom = event;
}
  
UOMChange(event:any) {
  this.item.uom = {uom:'',symbol:'',country:''}
  //this.item.uom = ''
}

selectedTaxes:any[] = []

itemLevels:any[] = []
itemtypes:any[] = [{type:''},{type:'stock'},{type:'asset'},{type:'other'}]

selectedReorderContacts:any[] = []
clonedObjects: { [s: string]: Object; } = {};

selectedRecordid:any

selectedExpressionUOMS:any[] = []

selectedExpressionUOM:any
filteredExpressionUOMs:any[] = new Array

selectedConsumedUnits:any[] = new Array
filteredConsumedItems:any[] = new Array

inProgress:boolean = false
private _sahSub:any


itemFATypeChange(event:any) {

  console.log('CP DROPDOWN CHANGE',event)
  this.item.itemfatype = event

}
level1:any[] = []
level2:any[] = []
level3:any[] = []


itemLevelOneTypeChange(event:any) {

  console.log('CP DROPDOWN CHANGE',event)
  this.item.level1 = event

}

itemLevelTwoTypeChange(event:any) {

  console.log('CP DROPDOWN CHANGE',event)
  this.item.level2 = event
}

itemLevelThreeTypeChange(event:any) {

  console.log('CP DROPDOWN CHANGE',event)
  this.item.level3 = event
}


filterUOMs(event:any) {
  console.log('IN FILTER UOMs',event)
  // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
  let criteria:any = {
    searchtext: event.query,
    screen: "",
    searchtype: "begins",
    offset: 0
  }
  console.log('CRITERIA',criteria)
  let pweService:UOMListService = new UOMListService(this.httpClient)
  this._pweSub = pweService.fetchUOMs(criteria).subscribe({
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
        this.filteredUOMs = dataSuccess.success;
        console.log('FILTERED UOMS',dataSuccess.success)
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

handleSave(){


  if(this.itemTitle.errors || this.selectUOM.errors)
  {
    console.log('there is an error in the form !')
    this.confirm('There are errors in the form.  Please check before saving.')
    return
  }

  if(this.item.itemfatype === '') {
    this.confirm('You must select item type for report.')
    return
  }

  if(/"/.test(this.item.itemname)) {
    this.confirm('You cannot enter double quotes in item name')
    return
  }

  if(/\[|\]/.test(this.item.itemname)) {
    this.confirm('You cannot enter square brackets in item name')
    return
  }

  if(/\{|\}/.test(this.item.itemname)) {
    this.confirm('You cannot enter curly braces in item name')
    return
  }

  console.log("iiiiiiiiiiiiiiiiiiiii...",this.item.itemname)


  this.item.taxes = this.selectedTaxes
  this.item.reordercontacts = this.selectedReorderContacts
  this.item.expressionuoms = this.selectedExpressionUOMS
  this.item.recipe.consumedunits = this.selectedConsumedUnits

  console.log('CONUNITS',this.selectedConsumedUnits)
  

  let a = "reorderquantity" in this.item
  console.log('YESNO',a)

  if (!a) {
    this.item['reorderquantity'] = 0;
  }
  
  console.log('ITEM TO BE SAVED',JSON.stringify(this.item))
  console.log('ITEM',this.item.reorderquantity)

  //return
  
  this.inProgress = true

  let sah:SaveItemService = new SaveItemService(this.httpClient)
  this._sahSub = sah.saveItem(this.item).subscribe({
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
        this.loadItems(0,0) 
        this.router.navigate(['entity/item'])      
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

loadItemLevels(offset:number,moreoffset:number) {
    
  let ahlService:ItemLevelListService = new ItemLevelListService(this.httpClient)
  let criteria:any = {searchtext:'',screen:'display',offset:moreoffset,searchtype:'',attribute:''};
  console.log('CRITERIA',criteria)
  this._ahlSub = ahlService.fetchItemLevels(criteria).subscribe({
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
        this.itemLevels = dataSuccess.success
        console.log('ITEMLEVELS',JSON.stringify(this.itemLevels))
        this.processItemLevels(this.itemLevels)
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

processItemLevels(levels:any) {
  for (let index = 0; index < levels.length; index++) {
    const element = levels[index];
    if (element.level === 'level1') {
      this.level1.push(element)
    }
    else if(element.level === 'level2') {
      this.level2.push(element)
    }
    else if(element.level === 'level3') {
      this.level3.push(element)
    }
  }
}


loadItems(offset:number,moreoffset:number) {
  let ahlService:ItemsListService = new ItemsListService(this.httpClient)
  let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'',attribute:''};
  console.log('CRITERIA',criteria)
  this._ahlSub = ahlService.fetchItems(criteria).subscribe({
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
        this.items = dataSuccess.success
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

selectedTax:any = {
  taxname: "",
  taxcode: "",
  taxpercent: "",
  taxtype: "",
  taxamount: "0.00",
  taxauthority: {}
}
onRowSelect(event:any) {
  if(event !== null) {
    console.log('ROW SELECT',event)
    this.selectedTax = event.data
  }
  
}
selectedTaxname:any
@ViewChild('selectTaxname') selectTaxname:any

selectedTaxcode:any
@ViewChild('selectTaxcode') selectTaxcode:any

selectedTaxpercent:any
@ViewChild('selectTaxpercent') selectTaxpercent:any

selectedTaxtype:any
@ViewChild('selectTaxtype') selectTaxtype:any

selectedTaxParty:any
  @ViewChild('selectTaxParty') selectTaxParty:any
  placeholderTaxParty = 'select tax authority'

  displayTaxModal:boolean = false;
  displayTaxEditModal: boolean = false;
showNewTaxDialog() {

  this.selectedTaxname = null
  this.selectedTaxcode = null
  this.selectedTaxtype = null
  this.selectedTaxpercent = null
  this.selectedTaxParty = null
  this.displayTaxModal = true;

}
filteredParties:any[] = new Array
private _eSub:any
private _iSub:any

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
handleOnSelectTaxParty(event:any) {
  this.selectedTaxParty = event
}

partyChange(event:any) {
  this.selectedTaxParty =  {
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
taxTypes:any[] = [{type:''},{type:'vat'},{type:'nonvat'}]

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

handleTaxDelete(event:any) {
  console.log('EVENT',event)
  this.selectedTaxes.splice(event,1)
  
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
handleUpdateTax() {


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

  
  let tax:any = this.recordByRecordID(this.selectedRecordid,this.selectedTaxes)
  tax.taxname = this.selectedTaxname
  if(this.selectedTaxcode === null) {
    this.selectedTaxcode = ""
  }
  tax.taxcode = this.selectedTaxcode
  tax.taxpercent = this.selectedTaxpercent
  tax.taxauthority = this.selectedTaxParty
  tax.taxtype = this.selectedTaxtype
  
  this.displayTaxEditModal = false
  console.log('TAX TO BE UPDATED',tax)

  return false

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


addReorderContact() {
    
  let i = 0
  for (let index = 0; index < this.selectedReorderContacts.length; index++) {
    const element = this.selectedReorderContacts[index];
    if(element.id > i) {
      i = element.id
    }
  }

  let reco = {} as ReorderContact;
  reco.contact = ""
  reco.contactname = ""
  reco.id = i
  reco.contacttype = ""
  reco.phoneoremail = ""

  this.selectedReorderContacts.push(reco)
  
}

onRowEditInit(product: ReorderContact, index:number) {
  //this.clonedObjects[index!] = {...product};
}

onRowEditSave(product: ReorderContact, index:number) {
  
    // if (product.price > 0) {
    //     delete this.clonedObjects[product.id!];
    //     this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    // }
    // else {
    //     this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
    // }

    //delete this.clonedObjects[index];
    //this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
}

onRowEditCancel(product: ReorderContact, index: number) {
    //this.selectedReorderContacts[index] = this.clonedObjects[index];
    //delete this.selectedReorderContacts[index];
    this.selectedReorderContacts.splice(index,1)
}

addExpressionUOM() {
  let i = 0
  for (let index = 0; index < this.selectedExpressionUOMS.length; index++) {
    const element = this.selectedExpressionUOMS[index];
    if(element.id > i) {
      i = element.id
    }
  }

  let euom:any = {}
  euom["uom"] = {
    uom:'',
    country: '',
    symbol: ''
  }
  euom["quantity"] = 0

  this.selectedExpressionUOMS.push(euom)

}

onEUOMRowEditInit(product: ReorderContact, index:number) {
  
}

onEUOMRowEditSave(product: ReorderContact, index:number) {
  
 
}

onEUOMRowEditCancel(product: any, index: number) {

  this.selectedExpressionUOMS.splice(index,1)
}

filterExpressionUOMs(event:any) {
  console.log('IN FILTER EXPRESSION UOMs',event)
  // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
  let criteria:any = {
    searchtext: event.query,
    screen: "",
    searchtype: "begins",
    offset: 0
  }
  console.log('CRITERIA',criteria)
  let pweService:UOMListService = new UOMListService(this.httpClient)
  this._pweSub = pweService.fetchUOMs(criteria).subscribe({
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
        this.filteredExpressionUOMs = dataSuccess.success;
        console.log('FILTERED EXPRESSION UOMS',dataSuccess.success)
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
handleOnSelectExpressionUOM(event:any) {

}
expressionUOMChange(event:any,ri:any,product:any) {
  console.log('EVENT',event)
  console.log('PRODUCT',product)
  console.log('RI',ri)
  console.log('EXPRUOMS',this.selectedExpressionUOMS)
}

selectedCUOM:any
selectedCItem:any
selectedCQty:any
selectedCUIndex:any
selectedRecipeItem:any
cus:any[] = []

recipeMode:boolean = false

showNewRecipeDialog() {

  this.selectedCItem = null
  this.selectedCQty = null
  this.selectedCUOM = null
  
  this.cus = []

  this.recipeMode = false;

  this.displayRecipeModal = true; 

}

onCURowEditInit(product: ReorderContact, index:number) {
  
}

handleRecipeEdit(recipe:any,i:any) {

  console.log('EUOMS AN LENGTH',recipe.consumeditem.expressionuoms.length)
  if(recipe.consumeditem.expressionuoms.length == 0) {
    this.confirm("You cannot select and item that has no expression uoms")
    return;
  }
  
  console.log('RECIPE ITEM',recipe)
  this.selectedCUIndex = i
  this.selectedRecipeItem = recipe
  this.selectedCItem = recipe.consumeditem
  this.selectedCQty = recipe.quantity
  this.selectedCUOM = recipe.uom

  this.recipeMode = true;

  //this.cus = recipe.expressionuoms

  this.displayRecipeEditModal = true

}

handleRecipeDelete(recipe:any,index:any) {
  this.selectedConsumedUnits.splice(index,1)
}

handleRecipeDeleteInEdit(recipe:any,index:any) {
  this.selectedConsumedUnits.splice(index,1)
}

handleUpdateRecipe(product: any, index:number) {
  
  product.consumeditem = this.selectedCItem
  product.uom = this.selectedCUOM
  product.quantity = this.selectedCQty
  console.log('UPDATED RECIPE ITEM',product)

  this.displayRecipeEditModal = false

}

onCURowEditCancel(product: any, index: number) {

  this.selectedConsumedUnits.splice(index,1)
}

filterConsumedItems(event:any) {
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
        this.filteredConsumedItems = dataSuccess.success;
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
handleOnSelectConsumedItem(event:any) {
  console.log('EVENT',event)
  this.cus = event.expressionuoms
  // console.log('PRODUCT',product)
  // console.log('RI',ri)
}
consumedItemChange(event:any) {

}

addConsumedUnit() {
  // let i = 0
  // for (let index = 0; index < this.selectedConsumedUnits.length; index++) {
  //   const element = this.selectedConsumedUnits[index];
  //   if(element.id > i) {
  //     i = element.id
  //   }
  // }


  if (typeof this.selectedCItem === 'undefined' || this.selectedCItem == null) {
    this.confirm('You must select an item')
    return false
  }

  if (typeof this.selectedCQty === 'undefined' || this.selectedCQty == null ) {
    this.confirm('You must enter quantity')
    return false
  }

  if (typeof this.selectedCUOM === 'undefined' || this.selectedCUOM == null || this.selectedCUOM === '') {
    this.confirm('You must select a uom')
    return false
  }

  let cu:any = {}
  cu["consumeditem"] = this.selectedCItem
  cu["uom"] = this.selectedCUOM
  
  cu["quantity"] = this.selectedCQty

  this.selectedConsumedUnits.push(cu)

  this.displayRecipeModal = false

  return false

}

}
