import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component,Input,Output,ChangeDetectionStrategy, SimpleChanges,EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { SaveChequeService } from 'src/app/services/save-cheque.service';
import * as moment from 'moment';
import { ChequeByNumberService } from 'src/app/services/cheque-by-number.service';


@Component({
  selector: 'app-receive-cheque-detail',
  templateUrl: './receive-cheque-detail.component.html',
  styleUrls: ['./receive-cheque-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService,MessageService] 
})
export class ReceiveChequeDetailComponent {
  @Input() displayReceiveChequeModalDetail: boolean = false;
  // @Input() newSelectedCP:any = {
  //   'maturitydate':'',
  //   'instrumentnumber':'',
  //   'drawee':{},
  //   'amount':null
  // }
  @Input() selectedParty:any
  @Input() recVoucherList:any[] = []
  @Input() selectedReceiptVoucherIndex:any
  // @Input() selectedReceiptVoucher:any = {
  //   'drawee':{
  //     'accounthead':''
  //   }
  // }
  @Input() selectedReceiptVoucher:any
  @Input() selectedDraweeName:any
  @Output() onCloseDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() onHideDialog: EventEmitter<void> = new EventEmitter<void>();

  filteredParties:any[] = new Array
  _eSub:any

  inProgress:boolean = false
  _piSub:any
  disableDoneButton:boolean = true
  
  constructor(private httpClient:HttpClient,private changeDetectorRef:ChangeDetectorRef, private messageService:MessageService) {

  }
  
  filterParties(event:any) {
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
          this.filteredParties = dataSuccess.success;
          this.changeDetectorRef.detectChanges()
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
    console.log('SELECTED PARTY',event)
    this.selectedParty = event
  }
  receiveChequePartyChange(event:any) { 
    
  }

  closeDialog() {
    console.log('DIALOG CLOSED')
    //this.displayReceiveChequeModal = false
    // this.onCloseDialog.emit();
  }

  hideDialog() {
    console.log('HIDE IN COMPO')
    //this.displayReceiveChequeModal = false
    this.onHideDialog.emit();
  }

  



  handleSaveReceiveCheque() {

    //console.log('BANK PARTY',this.selectedBankName)

    //return

    // if (typeof this.selectedNumber === 'undefined' || this.selectedNumber == null || this.selectedNumber === '') {
    //   this.confirm('You must enter cheque number')
    //   return false
    // }

    // if (typeof this.selectedParty === 'undefined' || this.selectedParty == null) {
    //   this.confirm('You must select a party')
    //   return false
    // }

    
    // this.selectedBankParty = {
    //   name:this.selectedBankName,
    //   id: 1
    // }

    // if (typeof this.selectedReceiptVoucher.object.drawee === 'undefined' || this.selectedReceiptVoucher.object.drawee == null || this.selectedReceiptVoucher.object.drawee.name === '') {
    //   this.showErrorViaToastGlobal('globaltst','You must enter a bank')
    //   return false
    // }
  
    // if (typeof this.selectedCP.amoun === 'undefined' || this.selectedVal == null ) {
    //   this.confirm('You must enter cheque amount')
    //   return false
    // }

    let cheque:any = {
      maturitydate: this.ISODate(this.selectedReceiptVoucher.object.maturitydate),
      instrumentnumber: this.selectedReceiptVoucher.object.instrumentnumber.toString(),
      drawer: this.selectedParty,
      drawee: {
        name:this.selectedDraweeName,
        id: 1
      },
      amount: this.selectedReceiptVoucher.object.amount,
      draweeis: "anybank",
      status: "",
      unclearedchequesaccount: {
        person: "",
        rtype: "",
        id: "2139",
        neid: "",
        accounthead: "Uncleared Cheques",
        defaultgroup: "equity",
        relationship: "",
        endpoint: "",
        name: ""
      },
      cashtypeah: {
        id: "2",
        accounthead: "Cheques",
        defaultgroup: "cash",
        neid: "",
        person: "",
        endpoint: "",
        rtype: ""
      },
      files: [],
      instrumenttype: "cheque",
      uom: {
        uom: "each",
        country: "global",
        symbol: "each"
      }
    }

    cheque.drawer.person = cheque.drawer.id

    console.log('CHEQUE TO BE SAVED',JSON.stringify(cheque))

    //return

    this.saveCheque(cheque)

    return false

  }


  
  saveCheque(cheque:any) {
    this.inProgress = true
    
    let sah:SaveChequeService = new SaveChequeService(this.httpClient)
    this._piSub = sah.saveCheque(cheque).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.showErrorViaToastGlobal('globaltst','A server error occured while saving account head. '+e.message)
        return;
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //alert(dataError.error);
          this.showErrorViaToastGlobal('globaltst',dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {

          this.inProgress = false
          this.showSuccessViaToast('globaltst','Successfully saved cheque.')
          //this.onCloseDialog.emit();
          //this.disableDoneButton = false;
          return;
        }
        else if(v == null) {

          this.inProgress = false
          this.showErrorViaToastGlobal('globaltst','A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToastGlobal('globaltst','An undefined error has occurred.')
          return
        }
      }
    })

    return
  }


  handleAcceptReceiveCheque() {

    this.acceptCheque(this.selectedReceiptVoucher.object.instrumentnumber)

  }



  acceptCheque(chNumber:string) {
    let cheque = {
      'number':chNumber
    }
    let sah:ChequeByNumberService = new ChequeByNumberService(this.httpClient)
    this._piSub = sah.fetchChequeByNumber(cheque).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.showErrorViaToastGlobal('globaltst','A server error occured while saving account head. '+e.message)
        return;
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //alert(dataError.error);
          this.showErrorViaToastGlobal('globaltst',dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {

          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          console.log('ACCEPTED CHEQUE',dataSuccess)
          if(!dataSuccess.success.hasOwnProperty('id')) {
            this.showErrorViaToastGlobal('globaltst','You must save this cheque before accepting it.')
            return
          }
          this.selectedReceiptVoucher.object = dataSuccess.success
          this.recVoucherList[this.selectedReceiptVoucherIndex] = this.selectedReceiptVoucher
          this.changeDetectorRef.detectChanges()
          this.inProgress = false
         
          this.onCloseDialog.emit();
          //this.disableDoneButton = false;
          return;
        }
        else if(v == null) {

          this.inProgress = false
          this.showErrorViaToastGlobal('globaltst','A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToastGlobal('globaltst','An undefined error has occurred.')
          return
        }
      }
    })

    return
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

  ISODate(event:any) {

    console.log('DATE SELECTED',event)

    let date1 = moment(event).format('YYYY-MM-DD');
    let time1 = moment(event).format('HH:mm:ss.SSSZZ')
    let isoDateTime = date1+'T'+time1
    console.log('ISO DATE',isoDateTime) 
    
    return isoDateTime
      
  }

  

}

