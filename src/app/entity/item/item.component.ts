import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { ItemLevelListService } from 'src/app/services/item-level-list.service';
import { ItemsListService } from 'src/app/services/items-list.service';
import { Search } from 'src/app/services/search';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class ItemComponent{

  
  moreoffset:number = 0
  totalRecords:number = 0


  selectedItem:any

  pes:any[] = []
  ces:any[] = []

  ues:any[] = []

  offset:number = 0
  _ahlSub:any
  inProgress:boolean = false
  private _sahSub:any
  customers=[];

  items:any[] = new Array

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  ngOnInit() {

    this.loadItemLevels(0,0)
    
    this.loadItems(0,0)
     // this.customerService.getCustomersLarge().then(customers => this.customers = customers);
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  navigateToCreateItems(){
     this.router.navigate(['entity/itemCreate'])
  }

  loadItemLevels(offset:number,moreoffset:number) {
    
    let ahlService:ItemLevelListService = new ItemLevelListService(this.httpClient)
    let criteria:any = {searchtext:'',screen:'display',offset:moreoffset,searchtype:'',attribute:''};
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchItemLevels(criteria).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        this.inProgress = false
      //  this.confirm('A server error occured while fetching account heads. '+e.message)
        return
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
        //  this.confirm(dataError.error)
          this.inProgress = false
          return
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          // this.itemLevels = dataSuccess.success
          // console.log('ITEMLEVELS',JSON.stringify(this.itemLevels))
          // this.processItemLevels(this.itemLevels)
          this.inProgress = false
          return
        }
        // else if(v == null) { 
        //   this.inProgress = false
        //   this.confirm('A null object has been returned. An undefined error has occurred.')
        //   return
        // }
        // else {
        //   //alert('An undefined error has occurred.')
        //   this.inProgress = false
        //   this.confirm('An undefined error has occurred.')
        //   return false
        // }
      }
    })
  }

  loadItems(offset:number,moreoffset:number) {
    let ahlService:ItemsListService = new ItemsListService(this.httpClient)
    let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'',attribute:''};
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchItems(criteria).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        this.inProgress = false
      //  this.confirm('A server error occured while fetching account heads. '+e.message)
        return
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
        //  this.confirm(dataError.error)
          this.inProgress = false
          return
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.items = dataSuccess.success
          console.log('fdc....',this.items)
          this.inProgress = false
          return
        }
        // else if(v == null) { 
        //   this.inProgress = false
        //   this.confirm('A null object has been returned. An undefined error has occurred.')
        //   return
        // }
        // else {
        //   //alert('An undefined error has occurred.')
        //   this.inProgress = false
        //   this.confirm('An undefined error has occurred.')
        //   return false
        // }
      } 
    })

  }

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
  displayEditModal:boolean = false;

  displayTaxModal:boolean = false;
  displayTaxEditModal: boolean = false;
  selectedUOM:any
  selectedTaxes:any[] = []
  selectedReorderContacts:any[] = []
  selectedExpressionUOMS:any[] = []
  selectedConsumedUnits:any[] = new Array

  handleEditItem(i:any) {
    console.log('ITEM TO BE EDITED',i)
    localStorage.setItem('editItem', JSON.stringify(i));
    this.router.navigate(['entity/itemUpdate'])

  }

  handleViewItem(item:any) {
    localStorage.setItem('editView', JSON.stringify(item));
    this.router.navigate(['entity/itemView'])

  }
}
