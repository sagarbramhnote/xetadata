import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { ItemsListService } from 'src/app/services/items-list.service';
import { StockLocationListService } from 'src/app/services/stock-location-list.service';

@Component({
  selector: 'app-closing-stock-item-list',
  templateUrl: './closing-stock-item-list.component.html',
  styleUrls: ['./closing-stock-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService,MessageService]
})
export class ClosingStockItemListComponent {
  @Input() displayClosingStockList:boolean = false
  csList:any[] = []
  loading:boolean = false
  filteredItems:any[] = []
  titleOptions:any[] = [{type:''},{type:'ownership'},{type:'possession'}]
  filteredFromLocations:any[] = new Array
  _iSub:any
  showCSItemForm:boolean = false
  
  @Output() onHideDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSaveDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient:HttpClient, private changeDetectorRef: ChangeDetectorRef,private messageService: MessageService) {

    // let v:any = {
    //   'object':{
    //     'itemname':'',
    //     'uom':''
    //   },
    //   'quantity':0,
    //   'rate':0,
    //   'serialno':'',
    //   'batchno':'',
    //   'expirydate':null,
    //   'brand':'',
    //   'title':'',
    //   'location':''
      
    // }
    // this.csList.push(v)

  }

  filterItems(event:any) {
    console.log('IN FILTER ITEMS',event)
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
          this.changeDetectorRef.detectChanges()
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
        this.showErrorViaToast('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.showErrorViaToast(dataError.error);
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredFromLocations = dataSuccess.success;
          console.log('FILTERED STOCK LOCATIONS',dataSuccess.success)
          this.changeDetectorRef.detectChanges()
          return;
        }
        else if(v == null) {
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }

  handleOnSelectItem(e:any,v:any) {

  }
  
  itemChange(e:any,v:any) {

  }

  newCSItem() {
    this.showCSItemForm = true
  }

  handleDeleteVoucher(voucher:any) {
    console.log('VOUCHER TBD',voucher)
    this.csList.splice(voucher,1)
  }

  saveClosingStockList() {
    this.onSaveDialog.emit(this.csList)
    this.showCSItemForm = false
  }

  hideCSForm() {
    this.showCSItemForm = false
  }

  saveCSForm(e:any) {
    console.log('E',e)
    let cs:any = e.value
    let newobj:any = {
      'id':cs.object.id,
      'uom':cs.object.uom,
      'itemname':cs.object.itemname
    }
    cs.object = newobj 
    this.csList.push(cs)
    console.log('CS LIST',this.csList)
    this.showCSItemForm = false
  }



  showInfoViaToast() {
    this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }
    
  showWarnViaToast() {
    this.messageService.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
  }

  showErrorViaToast(detMsg:string) {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: detMsg });
  }

  showErrorViaToastGlobal(key:string,detMsg:string) {
    this.messageService.add({ key: key, severity: 'error', summary: 'Error Message', detail: detMsg });
  }

  showSuccessViaToast(key:string,detMsg:string) {
    this.messageService.add({ key: key, severity: 'success', summary: 'Success Message', detail: detMsg });
  }

  
  
}
