import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GlobalConstants } from 'src/app/global/global-constants';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { GeneralLedgerService } from 'src/app/services/general-ledger.service';
import { Search } from 'src/app/services/search';

@Component({
  selector: 'app-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class GeneralLedgerComponent {

  constructor(private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }

  generalLedger:any[] = []

  inProgress:boolean = false
  filteredAccounts:any[] = []

  selectedAccount:any

  placeholderAccount = 'select account'

  selectedFromDate:Date = new Date()
  selectedToDate:Date = new Date()

  fromDateString:any
  toDateString:any
  exportColumns:any[] = [];

  ngOnInit(): void {
    this.exportColumns = [
      { title: 'Date', dataKey: 'trdatetime' },
      { title: 'Particulars', dataKey: 'accounthead' },
      { title: 'Debit', dataKey: 'debit'},
      { title: 'Credit', dataKey: 'credit'},
      { title: 'Balance', dataKey: 'balance'}
    ];

    //this.getGeneralLedger()

    this.selectedFromDate = new Date()
    this.selectedToDate = new Date()
  }  

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

onRowSelect(event:any) {
    
}
_eSub:any

filterAccounts(event:any) {
  console.log('IN FILTER ACCOUNTS',event)

  let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'all-accounthead-contains'};
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
        this.filteredAccounts = dataSuccess.success;
        console.log('FILTERED ACCOUNTS',dataSuccess.success)
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

handleOnSelectAccount(event:any) {
  this.selectedAccount = event
  
}

accountChange(event:any) {

}

fromDateSelected(event:any) {

  console.log('DATE SELECTED',event)

  let date1 = moment(event).format('YYYY-MM-DD');
  let time1 = moment(event).format('HH:mm:ss.SSSZZ')
  let isoDateTime = date1+'T'+time1
  console.log('ISO DATE',isoDateTime)
  this.fromDateString = isoDateTime
  //this.selectedDate = isoDateTime
 
}


toDateSelected(event:any) {

  console.log('DATE SELECTED',event)

  let date1 = moment(event).format('YYYY-MM-DD');
  let time1 = moment(event).format('HH:mm:ss.SSSZZ')
  let isoDateTime = date1+'T'+time1
  console.log('ISO DATE',isoDateTime)
  this.toDateString = isoDateTime
  //this.selectedDate = isoDateTime
 
}

getGeneralLedger() {


  if (this.selectedFromDate >= this.selectedToDate){
    this.confirm('From date should be less than to date')
    return
  }
  
  if (this.selectedAccount == null || this.selectedAccount == undefined) {
    this.confirm('You must select an account')
    return
  }

  let criteria:any = {}
  criteria["timezone"] = GlobalConstants.loginObject.timezone
  criteria["fromdate"] = this.selectedFromDate
  criteria["todate"] = this.selectedToDate
  // criteria["accounthead"] = {'id': '6', 'accounthead': 'Food Purchases', 'defaultgroup': 'purchases', 'relationship': '', 'neid': '', 'person': '', 'name': '', 'endpoint': '', 'accounttype': '', 'partofgroup': -1, 'isgroup': false}
  criteria["accounthead"] = this.selectedAccount
  criteria["offset"] = 0

  console.log('CRITERIA',JSON.stringify(criteria))

  this.loadGeneralLedger(criteria)

}

_invSub:any

loadGeneralLedger(criteria:any) {
  this.inProgress = true
  let ahlService:GeneralLedgerService = new GeneralLedgerService(this.httpClient)
  console.log('CRITERIA',criteria)
  this._invSub = ahlService.fetchGeneralLedger(criteria).subscribe({
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
        console.log('DATAERROR',dataError.error) 
        this.confirm(dataError.error)
        this.inProgress = false
        return
      }
      else if(v.hasOwnProperty('success')) {
        let dataSuccess:XetaSuccess = <XetaSuccess>v;
        let unprocessedData = dataSuccess
        console.log('GENERAL LEDGER',unprocessedData)
        this.generalLedger = unprocessedData.success
        //this.processFinalAccounts(unprocessedData)
        this.processGL(unprocessedData.success)
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


processGL(upd:any) { 

  let firstele:any = upd[0]
  if (firstele.debit == null) {
    firstele.debit = 0
  }
  if (firstele.credit == null) {
    firstele.credit = 0
  }

  let amt:number = 0
  if(firstele.debit > firstele.credit) {
    amt = firstele.debit * 1
  }

  if(firstele.debit < firstele.credit) {
    amt = firstele.credit * -1
  }


  for (let index = 0; index < upd.length; index++) {
    const element = upd[index];

    if (element.debit > element.credit) {
      amt = amt + element.debit
      if (amt < 0) {
        element["baltype"] = 'Cr'
      }
      else if (amt > 0) {
        element["baltype"] = 'Dr'
      }
      else if (amt == 0) {
        element["baltype"] = ''
      }
      element["balance"] = Math.abs(amt)
      
    }
    else if(element.debit < element.credit) {
      amt = amt - element.credit
      if (amt < 0) {
        element["baltype"] = 'Cr'
      }
      else if (amt > 0) {
        element["baltype"] = 'Dr'
      }
      else if (amt == 0) {
        element["baltype"] = ''
      }
      element["balance"] = Math.abs(amt)

    }

    else if(element.debit == element.credit) {
      element["baltype"] = ''
      element["balance"] = 0
    }

    console.log('AMT',amt)
    
  }

  this.generalLedger = upd

  console.log('PROCESSED GL',this.generalLedger)

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

  newExportPdf() {
    //console.log('PRINT LIST',this.printList)
    const doc: jsPDF = new jsPDF("p", "pt", "a4");
    let datePipe: DatePipe = new DatePipe("en-US");

    //let b = this.selectedAccount.accounthead;
    //let b = `Account Statement of ${this.selectedAccount.accounthead} for the period ${this.selectedFromDate} to ${this.selectedToDate}`;
    
    let b = 'Account: '+this.selectedAccount.accounthead
    let formattedFromDate = datePipe.transform(this.selectedFromDate, 'dd-MM-yyyy');
    let formattedToDate = datePipe.transform(this.selectedToDate, 'dd-MM-yyyy');
    let c = `Account Statement for the period ${formattedFromDate} to ${formattedToDate}`;

    let loginObject = GlobalConstants.loginObject
    let a = loginObject.entityname
    console.log(loginObject)

    let glpdf:any = JSON.parse(JSON.stringify(this.generalLedger))

    let formattedBody = glpdf.map((item:any) => {
      item.trdatetime = datePipe.transform(item.trdatetime, 'dd-MM-yyyy');
      // item.debit = this.replZero.transform(item.debit,'')
      // item.credit = this.replZero.transform(item.credit,'')
      // item.balance = this.replZero.transform(item.balance) + ' '+ item.baltype
      return item;
    });

    autoTable(doc,{
      columns: this.exportColumns, 
      body:formattedBody,
      didDrawPage: function (data) {
        doc.setFontSize(15)
        doc.setFont("helvetica","bold")
        doc.text(a, data.settings.margin.left + 0, 20);
        doc.setFontSize(10)
        doc.setTextColor(40)
        doc.text(b, data.settings.margin.left + 0, 35)
        doc.text(c, data.settings.margin.left + 0, 50)
        console.log('MARGINS',data.settings.margin);
      },
      margin: { top: 60 },
      theme: "grid",
      columnStyles: {
      debit: { halign: 'right' },
      credit: { halign: 'right' },
      balance: {halign: 'right'}
      }
    });
    //doc.save('stockregister.pdf');
    doc.output("dataurlnewwindow")
  }


}
