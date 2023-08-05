import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter,Input,Output,ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { ChequesOfPersonService } from 'src/app/services/cheques-of-person.service';
// import { EventBusServiceService } from '../../../global/event-bus-service.service';
// import { EventData } from '../../../global/event-data';
import { GlobalConstants } from 'src/app/global/global-constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { TagListService } from 'src/app/services/tag-list.service';

@Component({
  selector: 'app-via-person-receipt-voucher',
  templateUrl: './via-person-receipt-voucher.component.html',
  styleUrls: ['./via-person-receipt-voucher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService,MessageService]
})

export class ViaPersonReceiptVoucherComponent {
  @Input() displayViaPersonReceiptModal:boolean = false;
  @Input() selectedReceiptVoucher:any = {
    'object':{
      'accounthead':'',
      'amount':'0'
    },
    'userinputrate': ''
  }
  @Input() selectedReceiptVoucherIndex:any
  @Input() recVoucherList:any[] = []
  @Output() onCloseDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() onHideDialog: EventEmitter<void> = new EventEmitter<void>();
  filteredViaPeople:any[] = new Array
  filteredModeTags:any[] = new Array
  _eSub:any


  constructor(private httpClient:HttpClient, private changeDetectorRef: ChangeDetectorRef, private http:HttpClient,private messageService: MessageService) {
    // if(this.selectedPerson !== -1) {
    //   this.loadChequesOfPersonReceive(this.selectedPerson)
    // }
    
  }

  filterViaPeople(event:any) {
    console.log('IN FILTER PARTIES',event)
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-accounthead-contains'};
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
          this.filteredViaPeople = dataSuccess.success;
          console.log('FILTERED PEOPLE',dataSuccess.success)
          this.changeDetectorRef.detectChanges()
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


  handleOnSelectViaPersonReceipt(event:any,v:any) {
    //this.selectedViaPerson = event
    //this.newInvoice.partyaccounthead = event;
    console.log('EVENT',event)
    v.object = event

  }

  viaPersonReceiptChange(event:any,v:any) {
    //console.log('EVENT',event)
    //this.selectedViaPerson = event
    console.log('EVENT CHANGE',event)
    v.object = event
  }

  viaPersonReceiptAmountChange(event:any,v:any) {
    console.log('EVENT',event);
    v.userinputrate = event
  }

  filterModeTags(event:any) {
    console.log('IN FILTER TAGS',event)
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'begins'};
    console.log('CRITERIA',criteria)
    
    let pService:TagListService = new TagListService(this.httpClient)
    this._eSub = pService.fetchTags(criteria).subscribe({
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
          this.filteredModeTags = dataSuccess.success;
          console.log('FILTERED TAGS',dataSuccess.success)
          this.changeDetectorRef.detectChanges()
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

  handleChange(e:any) {

  }

  // Method to close the dialog
  // closeDialog() {
  //   console.log('DIALOG CLOSED')
  //   //this.displayReceiveChequeModal = false
  //   this.onCloseDialog.emit();
  // }

  hideDialog() {
    console.log('HIDE IN COMPO')
    //this.displayReceiveChequeModal = false
    this.onHideDialog.emit();
  }

  handleAddViaPersonReceipt() {
    
    if(this.selectedReceiptVoucher.userinputrate == 0) {
      this.showErrorViaToastGlobal('globaltst','You must enter an amount greater than zero')
      return false
    }

    if(typeof this.selectedReceiptVoucher.paymentmode === 'undefined' || this.selectedReceiptVoucher.paymentmode == null) {
      this.showErrorViaToastGlobal('globaltst','You must select a payment mode.')
      return false
    }
    
    //let v:any = this.buildViaPersonVoucher()

    this.selectedReceiptVoucher['isviaperson'] = true
    this.recVoucherList[this.selectedReceiptVoucherIndex] = this.selectedReceiptVoucher

    this.onCloseDialog.emit()

    return false

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
