import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { GlobalConstants } from 'src/app/global/global-constants';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { Search } from 'src/app/services/search';

@Component({
  selector: 'app-party-account',
  templateUrl: './party-account.component.html',
  styleUrls: ['./party-account.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class PartyAccountComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }
 
  accountheads:any[] = new Array
  _ahlSub:any
  inProgress:boolean = false

  filteredComponentNames:any[] = new Array

  lo:any

  ngOnInit(): void {
    
    this.lo = GlobalConstants.loginObject

    this.filteredComponentNames = [
      {type: 'DashboardComponent'},
      {type: 'StockRegisterComponent'}
    ]
    
    this.loadAccountHeads(0,0)
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}
navigateToCreatePartyAccount(){
  this.router.navigate(['entity/partyAccountCreate'])
}

@ViewChild('paginator') paginator:any
  
@ViewChild('listview') listview:any

  loadAccountHeads(offset:number,moreoffset:number) {
    let ahlService:AccountHeadListService = new AccountHeadListService(this.httpClient)
    let criteria:Search = <Search>{searchtext:'',screen:'display',offset:moreoffset,searchtype:'party-accounthead'};
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
          this.accountheads = dataSuccess.success
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

  handleAccessPartyAccount(i:any) {
    localStorage.setItem('accessPartyAccount', JSON.stringify(i));
    this.router.navigate(['entity/partyAccountAccess'])
  
  }

}
