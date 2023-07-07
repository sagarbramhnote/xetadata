import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { ItemLevelListService } from 'src/app/services/item-level-list.service';
import { ItemsListService } from 'src/app/services/items-list.service';
import { Search } from 'src/app/services/search';
import { UOMListService } from 'src/app/services/uomlist.service';
import { UpdateItemService } from 'src/app/services/update-item.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class UpdateItemComponent{

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }


  ngOnInit(): void {

    const item = localStorage.getItem('editItem');
    if (item !== null) {
      this.item = JSON.parse(item);
      console.log('ITEM TO BE EDITED in update',this.item)
      this.displayEditModal = true;
      this.selectedUOM = this.item.uom
      this.selectedTaxes = this.item.taxes;
      this.selectedReorderContacts = this.item.reordercontacts;
      this.selectedExpressionUOMS = this.item.expressionuoms
      this.selectedConsumedUnits = this.item.recipe.consumedunits
    }

    this.loadItemLevels(0,0)
    
    this.loadItems(0,0)
}

displayEditModal:boolean = false;
selectedTaxes:any[] = []
selectedReorderContacts:any[] = []
selectedExpressionUOMS:any[] = []
selectedUOM:any
selectedConsumedUnits:any[] = new Array

navigateToListItems(){
  this.router.navigate(['entity/item'])
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

  @ViewChild('itemTitle') itemTitle:any
  @ViewChild('selectUOM') selectUOM:any 
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

  inProgress:boolean = false
  private _sahSub:any
  handleUpdate() {


    if(this.item.itemfatype === '') {
      this.confirm('You must select item type for report.')
      return
    }

    this.item.taxes = this.selectedTaxes
    
    let a = "reorderquantity" in this.item
    console.log('YESNO',a)

    if (!a) {
      this.item['reorderquantity'] = 0;
    }

    this.item.taxes = this.selectedTaxes
    this.item.reordercontacts = this.selectedReorderContacts
    this.item.expressionuoms = this.selectedExpressionUOMS
    this.item.recipe.consumedunits = this.selectedConsumedUnits


    
    console.log('ITEM TO BE UPDATED',JSON.stringify(this.item))
    console.log('ITEM',this.item.reorderquantity)

    this.inProgress = true

    //return
    
    let sah:UpdateItemService = new UpdateItemService(this.httpClient)
    this._sahSub = sah.updateItem(this.item).subscribe({
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
          
          this.displayEditModal = false
          this.loadItems(0,0)
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
  items:any[] = new Array
  selectedRows:any[] = new Array
  _ahlSub:any
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

}
