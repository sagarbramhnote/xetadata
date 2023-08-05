import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component,Input,Output,ChangeDetectionStrategy, SimpleChanges,EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import * as moment from 'moment';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { SaveChequeService } from 'src/app/services/save-cheque.service';
import { ChequeListService } from 'src/app/services/cheque-list.service';
import { ChequesOfPersonService } from 'src/app/services/cheques-of-person.service';


@Component({
  selector: 'app-written-cheque-detail',
  templateUrl: './written-cheque-detail.component.html',
  styleUrls: ['./written-cheque-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService,MessageService] 
})
export class WrittenChequeDetailComponent {
  @Input() displayWriteChequeDetailModal:boolean = false
  @Input() selectedParty:any
  @Input() payVoucherList:any[] = []
  selectedWriteChequeDate:any
  newCheque:any = {}
  _pSub:any
  filteredBankParties:any[] = []
  selectedWriteChequeBankParty:any = {}
  selectedWriteChequeNumber:any
  selectedWriteChequeVal:any
  inProgress:boolean = false
  _piSub:any
  _invSub:any
  writtenChequesoffset:number = 0
  writtenChequeList:any[] = []
  _eSub:any
  filteredParties:any[] = []
  @Output() onCloseDialog: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() onHideDialog: EventEmitter<void> = new EventEmitter<void>();
  _chSub:any
  selectedChequesOfPerson:any[] = []
  

  constructor(private httpClient:HttpClient,private changeDetectorRef:ChangeDetectorRef, private messageService:MessageService) {

  }

  writeChequeDateSelected(event:any) {

    console.log('DATE SELECTED',event)

    let date1 = moment(event).format('YYYY-MM-DD');
    let time1 = moment(event).format('HH:mm:ss.SSSZZ')
    let isoDateTime = date1+'T'+time1
    console.log('ISO DATE',isoDateTime)
    this.newCheque.date = isoDateTime
    //this.selectedDate = isoDateTime
   
  }

  writeChequePartyChange(event:any) {
    this.newCheque.drawer =  {
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


  filterWriteChequeBankParties(event:any) {
    console.log('IN FILTER PARTIES',event)
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'bank-party-accounthead-contains'};
    console.log('CRITERIA',criteria)
    
    let pService:AccountHeadListService = new AccountHeadListService(this.httpClient)
    this._pSub = pService.fetchAccountHeads(criteria).subscribe({
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
          this.filteredBankParties = dataSuccess.success;
          console.log('FILTERED BANKS',dataSuccess.success)
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




  handleOnSelectWriteChequeBankParty(event:any) {
    this.selectedWriteChequeBankParty = event
    this.newCheque.drawee = event;
  }

  writeChequeBankPartyChange(event:any) {
    this.newCheque.drawee =  {
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


  handleSaveWrittenCheque() {

    if (typeof this.selectedWriteChequeNumber === 'undefined' || this.selectedWriteChequeNumber == null || this.selectedWriteChequeNumber === '') {
      this.showErrorViaToast('You must enter cheque number')
      return false
    }

    if (typeof this.selectedParty === 'undefined' || this.selectedParty == null) {
      this.showErrorViaToast('You must select a party')
      return false
    }

    if (typeof this.selectedWriteChequeBankParty === 'undefined' || this.selectedWriteChequeBankParty == null) {
      this.showErrorViaToast('You must select a bank')
      return false
    }
  
    if (typeof this.selectedWriteChequeVal === 'undefined' || this.selectedWriteChequeVal == null ) {
      this.showErrorViaToast('You must enter cheque amount')
      return false
    }

    

    this.selectedParty.person = this.selectedParty.id 

    let cheque:any = {
      maturitydate: this.ISODate(this.selectedWriteChequeDate),
      instrumentnumber: this.selectedWriteChequeNumber.toString(),
      drawer: this.selectedParty,
      drawee: this.selectedWriteChequeBankParty,
      amount: this.selectedWriteChequeVal,
      draweeis: "ourbank",
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

    console.log('CHEQUE TO BE SAVED',JSON.stringify(cheque))

    this.saveWrittenCheque(cheque)

    return false

  }


  
  saveWrittenCheque(cheque:any) {
    this.inProgress = true
    let sah:SaveChequeService = new SaveChequeService(this.httpClient)
    this._piSub = sah.saveCheque(cheque).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.showErrorViaToast('A server error occured while saving account head. '+e.message)
        return;
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //alert(dataError.error);
          this.showErrorViaToastGlobal('global',dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {

          this.inProgress = false
          //this.displayWriteChequeDetailModal = false
          //this.loadWrittenCheques(0,0)
          // instead we call loadChequesOfPerson
          this.loadChequesOfPerson(this.selectedParty.id)
          //this.onCloseDialog.emit()
          return;
        }
        else if(v == null) {

          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return
        }
      }
    })

    return
  }








  handleMore() {
    this.writtenChequesoffset = this.writtenChequesoffset + 500
    this.loadWrittenChequesMore(this.writtenChequesoffset)
  }


  loadChequesOfPerson(personid:any) {

    this.inProgress = true

    console.log('IN CHEQUES OF PERSON')
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    
    let criteria:any = {
      person: personid,
      offset: 0,
      draweeis: "ourbank"
    }
    
    console.log('CRITERIA',criteria)
    
    let iService:ChequesOfPersonService = new ChequesOfPersonService(this.httpClient)
    this._chSub = iService.fetchChequesOfPerson(criteria).subscribe({
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
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.selectedChequesOfPerson = dataSuccess.success;
          console.log('CHEQUES OF PERSON',dataSuccess.success)
          this.inProgress = false
          //this.displayChequeModal = true
          this.onCloseDialog.emit(this.selectedChequesOfPerson)
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          this.inProgress = false
          return;
        }
        else {
          this.inProgress = false
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }


  loadWrittenCheques(offset:number,moreoffset:number) {

    this.inProgress = true
    
    let ahlService:ChequeListService = new ChequeListService(this.httpClient)
    let criteria:any = {draweeis:'ourbank',offset:moreoffset};
    console.log('CRITERIA',criteria)
    this._invSub = ahlService.fetchCheques(criteria).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        this.inProgress = false
        this.showErrorViaToast('A server error occured while fetching cheques. '+e.message)
        return
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.showErrorViaToast(dataError.error)
          this.inProgress = false
          return
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.writtenChequeList = []
          this.writtenChequeList = dataSuccess.success
          //this.totalRecords = this.chequeList.length
          //console.log('TOTAL RECORDS',this.totalRecords)
          // this.items = this.masterCopy.slice(offset,this.recordsPerPage+offset);
          
          this.inProgress = false
          return
        }
        else if(v == null) { 
          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return false
        }
      }
    })

  }


  loadWrittenChequesMore(offset:number) {

    this.inProgress = true
    
    let ahlService:ChequeListService = new ChequeListService(this.httpClient)
    let criteria:any = {draweeis:'anybank',offset:offset};
    console.log('CRITERIA',criteria)
    this._invSub = ahlService.fetchCheques(criteria).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        this.inProgress = false
        this.showErrorViaToast('A server error occured while fetching cheques. '+e.message)
        return
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.showErrorViaToast(dataError.error)
          this.inProgress = false
          return
        }
        else if(v.hasOwnProperty('success')) {
          
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          let newCheques:any[] = dataSuccess.success
          for (let index = 0; index < newCheques.length; index++) {
            const element = newCheques[index];
            this.writtenChequeList.push(JSON.parse(JSON.stringify(element)))
          }
          
          this.inProgress = false
          return
        }
        else if(v == null) { 
          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return false
        }
      }
    })

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

  hideDialog() {
    console.log('HIDE IN COMPO')
    //this.displayReceiveChequeModal = false
    this.onHideDialog.emit();
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
