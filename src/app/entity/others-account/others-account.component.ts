import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { Search } from 'src/app/services/search';

@Component({
  selector: 'app-others-account',
  templateUrl: './others-account.component.html',
  styleUrls: ['./others-account.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class OthersAccountComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }
 
  accountheads:any[] = new Array
  _ahlSub:any
  inProgress:boolean = false
  masterCopy:any[] = new Array
  recordsPerPage:number = 50
  totalRecords:number = 0


  ngOnInit(): void {
    this.loadAccountHeads(0,0)
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}
navigateToCreateOtherAccount(){
  this.router.navigate(['entity/othersAccountCreate'])
}


loadAccountHeads(offset:number,moreoffset:number) {
  let ahlService:AccountHeadListService = new AccountHeadListService(this.httpClient)
  let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'nonparty-accounthead'};
  console.log('CRITERIA',criteria)
  this._ahlSub = ahlService.fetchAccountHeads(criteria).subscribe({
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
        this.masterCopy = dataSuccess.success
        this.totalRecords = this.masterCopy.length
        this.accountheads = this.masterCopy.slice(offset,this.recordsPerPage+offset);
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


handleEditOtherAccount(i:any) {
  console.log('OtherAccount TO BE EDITED',i)
  localStorage.setItem('editOtherAccount', JSON.stringify(i));
  this.router.navigate(['entity/othersAccountUpdate'])

}

}
