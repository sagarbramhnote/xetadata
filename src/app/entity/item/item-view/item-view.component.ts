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


filteredUOMs:any[] = new Array
private _pweSub:any



itemLevels:any[] = []
itemtypes:any[] = [{type:''},{type:'stock'},{type:'asset'},{type:'other'}]

level1:any[] = []
level2:any[] = []
level3:any[] = []


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
pes:any[] = []
ces:any[] = []
filteredExpressionUOMs:any[] = new Array

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


}

