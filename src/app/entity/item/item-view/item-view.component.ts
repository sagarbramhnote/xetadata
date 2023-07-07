import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { UOMListService } from 'src/app/services/uomlist.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class ItemViewComponent {

  ngOnInit(): void {

    const item = localStorage.getItem('editView');
    if (item !== null) {
      this.item = JSON.parse(item);
      console.log('ITEM TO BE View',this.item)
      this.displayEditModal = true;
      this.selectedUOM = this.item.uom
      this.selectedTaxes = this.item.taxes;
      this.selectedReorderContacts = this.item.reordercontacts;
      this.selectedExpressionUOMS = this.item.expressionuoms
      this.selectedConsumedUnits = this.item.recipe.consumedunits
    }   
}

constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }


displayEditModal:boolean = false;
selectedTaxes:any[] = []
selectedReorderContacts:any[] = []
selectedExpressionUOMS:any[] = []
selectedUOM:any
selectedConsumedUnits:any[] = new Array

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

navigateToListItems(){
  this.router.navigate(['entity/item'])
}

itemTitle:any
selectUOM:any 

inputChange(event:any) {

  console.log('ISVALID',this.itemTitle.valid)
  this.item['isvalid'] = this.itemTitle.valid

} 
filteredUOMs:any[] = new Array
private _pweSub:any

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

handleOnSelect(event:any) {
  this.selectedUOM = event
  this.item.uom = event;
}
UOMChange(event:any) {
  this.item.uom = {uom:'',symbol:'',country:''}
  //this.item.uom = ''
}

itemLevels:any[] = []
itemtypes:any[] = [{type:''},{type:'stock'},{type:'asset'},{type:'other'}]

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

}

