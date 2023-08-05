import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GlobalConstants } from 'src/app/global/global-constants';
import { SaveOpeningBalancesService } from 'src/app/services/save-opening-balances.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { Table } from 'primeng/table';
import * as moment from 'moment';

@Component({
  selector: 'app-opening-balances',
  templateUrl: './opening-balances.component.html',
  styleUrls: ['./opening-balances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService,MessageService]
})
export class OpeningBalancesComponent {

  lo:any
  openingBalances:any[] = []
  loading:boolean = false
  showCSList:boolean = false
  showCashEntry:boolean = false
  inProgress:boolean = false
  _siSub:any

  opbalSaveList:any = {
    'invoicedate':'',
    'data':[[],[],[],[],[],[],[]]
  }
  
  constructor(private httpClient:HttpClient,private messageService: MessageService) {

    let obal:any = {
      'accounthead':'Closing Stock',
      'debit':0,
      'credit':0,
      'details':[]
    }
    this.openingBalances.push(obal)

    let chqobal:any = {
      'accounthead':'Cheques',
      'debit':0,
      'credit':0,
      'details':[]
    }
    this.openingBalances.push(chqobal)

    let cashobal:any = {
      'accounthead':'Cash',
      'debit':0,
      'credit':0,
      'details':[]
    }
    this.openingBalances.push(cashobal)
    this.opbalSaveList['data'][2].push(cashobal)

    this.lo = GlobalConstants.loginObject

  }

  onRowSelect(e:any) {

  }
  selectedAsOnDate:Date = new Date()

  asOnDateString:any

  asOnDateSelected(event:any) {

    console.log('DATE SELECTED',event)

    let date1 = moment(event).format('YYYY-MM-DD');
    let time1 = moment(event).format('HH:mm:ss.SSSZZ')
    let isoDateTime = date1+'T'+time1
    console.log('ISO DATE',isoDateTime)
    this.asOnDateString = isoDateTime
    //this.selectedDate = isoDateTime
   
  }

  handleEdit(inv:any) {

  }


  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}



  handleDetails(i:any) {
    if (i===0) {
      this.showCSList = true
    }
    else if(i===2) {
      this.showCashEntry = true
    }
    
  }

  hideCSList() {
    this.showCSList = false
  }

  hideCashEntry() {
    this.showCashEntry = false
  }

  saveCSList(e:any) {
    console.log('CS LIST',e)
    this.openingBalances[0]['details'] = e
    this.opbalSaveList['data'][0] = e

    for (let index = 0; index < e.length; index++) {
      const element = e[index];
      this.openingBalances[0]['debit'] = (element.rate*element.quantity) + this.openingBalances[0]['debit']
    }

    this.showCSList = false
  }

  saveCashEntry(e:any) {
    console.log('CEF',e.value)
    this.openingBalances[2]['debit'] = e.value.amount
    let ce:any = {
      'accounthead':'Cash',
      'debit':e.value.amount,
      'credit':0
    }
    this.opbalSaveList['data'][2][0] = ce
    this.showCashEntry = false
  }


  saveOpeningBalancesForm() {
    const earliesttrdatetime = this.lo.earliesttrdatetime;
    let formattedDate:any = null
    if (earliesttrdatetime !== null || typeof earliesttrdatetime !== 'undefined') {
      const dateObject = new Date(earliesttrdatetime);
      dateObject.setSeconds(dateObject.getSeconds() - 1);
      // Format the date to the desired date string format (ISO 8601)
      formattedDate = dateObject.toISOString();
      console.log(earliesttrdatetime)
      console.log(formattedDate);
    }
    else if (earliesttrdatetime === null || typeof earliesttrdatetime === 'undefined') {
      formattedDate = new Date().toISOString()
    }
    

    this.opbalSaveList['invoicedate'] = formattedDate

    let debittotal = 0
    let credittotal = 0

    for (let index = 0; index < this.openingBalances.length; index++) {
      const element = this.openingBalances[index];
      debittotal = element.debit + debittotal
      credittotal = element.credit + credittotal
    }

    


    if (debittotal === 0 && credittotal === 0) {
      this.showErrorViaToastGlobal('globaltst','You must enter opening balances for one or more accounts.')
      return
    }

    let acce:any = {
      'accounthead':'Accumulated Profit or Loss',
      'debit':debittotal > credittotal ? 0 : debittotal-credittotal,
      'credit':credittotal > debittotal ? 0 : credittotal-debittotal
    }

    this.opbalSaveList['data'][6][0] = acce
    console.log('OP BAL TO BE SAVED',this.opbalSaveList)

    this.saveOpeningBalances(this.opbalSaveList)

  }

  saveOpeningBalances(newInvoice:any){

    this.inProgress = true
    
    let sah:SaveOpeningBalancesService = new SaveOpeningBalancesService(this.httpClient)
    this._siSub = sah.saveOpeningBalances(newInvoice).subscribe({
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
          this.showErrorViaToastGlobal('globaltst',dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {

          this.inProgress = false
          this.showSuccessViaToast('globaltst','Successfully saved Opening Balances')
          
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
