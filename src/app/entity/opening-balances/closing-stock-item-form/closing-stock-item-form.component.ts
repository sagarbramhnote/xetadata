import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output,ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild,EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { ItemsListService } from 'src/app/services/items-list.service';
import { StockLocationListService } from 'src/app/services/stock-location-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-closing-stock-item-form',
  templateUrl: './closing-stock-item-form.component.html',
  styleUrls: ['./closing-stock-item-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService,MessageService]
})
export class ClosingStockItemFormComponent implements OnInit{
  @Input() voucher:any = {
    'object':{
      'itemname':'',
      'uom':''
    },
    'quantity':0,
    'rate':0,
    'serialno':'',
    'batchno':'',
    'expirydate':null,
    'brand':'',
    'title':'',
    'location':''
  }
  @Input() displayCSItemFormModal:boolean = false
  @Input() mode:string = 'new'
  
  filteredItems:any[] = []
  titleOptions:any[] = [{type:''},{type:'ownership'},{type:'possession'}]
  filteredFromLocations:any[] = new Array
  _iSub:any
  csItemForm:any

  @Output() onHideDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSaveDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient:HttpClient, private changeDetectorRef: ChangeDetectorRef,private messageService: MessageService) {

  }

  ngOnInit(): void {
    
    this.csItemForm = new FormGroup({
      object: new FormControl('',[Validators.required]),
      quantity: new FormControl('',[Validators.required]),
      rate: new FormControl('',[Validators.required]),
      serialno: new FormControl('',[]),
      batchno: new FormControl('',[]),
      expirydate: new FormControl('',[]),
      brand: new FormControl('',[]),
      title: new FormControl('',[Validators.required]),
      location: new FormControl('',[Validators.required])

    });
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

  hideDialog() {
    this.csItemForm.reset()
    this.onHideDialog.emit()
  }

  handleSaveCSItem() {

    this.csItemForm.controls['object'].touched = true
    this.csItemForm.controls['quantity'].touched = true
    this.csItemForm.controls['rate'].touched = true
    this.csItemForm.controls['title'].touched = true
    this.csItemForm.controls['location'].touched = true
    

    if (this.csItemForm.controls['object'].errors || this.csItemForm.controls['object'].invalid) {
      const input = document.getElementById('object');
      if (input) {
        input.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }
      
      
      
    if (this.csItemForm.controls['quantity'].errors ||  this.csItemForm.controls['quantity'].invalid) {
      const input = document.getElementById('quantity');
      if (input) {
        input.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }

    if (this.csItemForm.controls['rate'].errors ||  this.csItemForm.controls['rate'].invalid) {
        const input = document.getElementById('rate');
        if (input) {
          input.classList.add('ng-dirty', 'ng-invalid');
        }
        //return
    }

    if (this.csItemForm.controls['title'].errors ||  this.csItemForm.controls['title'].invalid) {
        const input = document.getElementById('taxtype');
        if (input) {
          input.classList.add('ng-dirty', 'ng-invalid');
        }
        //return
    }


    if (this.csItemForm.invalid) {
      console.log('FORM IS INVALID')
      for (const controlName in this.csItemForm.controls) {
          if (this.csItemForm.controls.hasOwnProperty(controlName)) {
            const control = this.csItemForm.controls[controlName];
            
            if (control.errors) {
              console.log(`Validation errors for control ${controlName}:`, control.errors);
            }
          }
      }
      return;
    }

    this.onSaveDialog.emit(this.csItemForm)
    this.csItemForm.reset()


  }

  clearDate() {
    this.csItemForm.get('expirydate').setValue(null);
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
