import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { Search } from 'src/app/services/search';
import { UpdateAccountheadService } from 'src/app/services/update-accounthead.service';

@Component({
  selector: 'app-update-other-account',
  templateUrl: './update-other-account.component.html',
  styleUrls: ['./update-other-account.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class UpdateOtherAccountComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  ngOnInit(): void {

    const item = localStorage.getItem('editOtherAccount');
    if (item !== null) {
      this.accountHead = JSON.parse(item);
      console.log('Accouint TO BE View',this.accountHead)
    } 

  }

  navigateToListOtherAccount(){
    this.router.navigate(['entity/othersAccount'])
 }

 accountHead:any = {
  id: "",
  accounthead: "",
  defaultgroup: "",
  relationship: "",
  neid: "-1",
  person: "",
  name: "",
  endpoint: "",
  accounttype: "",
  partofgroup: -1,
  isgroup: false,
  partof:""
}



inputChange(event:any) {


}

defaultGroups:any[] = [{type:''},{type:'sales'},{type:'purchases'},{type:'cash'},{type:'equity'}]
partofList:any[] = [{type:''},{type:'TRD'},{type:'P&L'},{type:'BAL'}]

disablePartof:boolean = false

defaultGroupChange(event:any) {
  console.log('CP DROPDOWN CHANGE',event)
  if(event === 'equity' || event === 'cash') {
    this.accountHead.partof = 'BAL'
    this.disablePartof = true
  }
  else {
    this.disablePartof = false
  }
}

partofChange(event:any) {

  console.log('CP DROPDOWN CHANGE',event)
  this.accountHead.partof = event

}

inProgress:boolean = false
private _sahSub:any
disableSaveButton:boolean = true
displayModal:boolean = false

handleUpdate() {

  if(this.accountHead.partof === '') {
    this.confirm('You must select a part of account.')
    return
  }

  console.log('ITEM TO BE UPDATED',JSON.stringify(this.accountHead))
  

  this.inProgress = true

  //return

  
  
  let sah:UpdateAccountheadService = new UpdateAccountheadService(this.httpClient)
  this._sahSub = sah.updateAccountHead(this.accountHead).subscribe({
    complete:() => {console.info('complete')},
    error:(e) => {
      console.log('ERROR',e)
      this.inProgress = false
      this.confirm('A server error occured while saving account head. '+e.message)
      return;
    },
    next:(v) => {
      console.log('NEXT',v);
      if (v.hasOwnProperty('error')) {
        let dataError:Xetaerror = <Xetaerror>v; 
        //alert(dataError.error);
        this.confirm(dataError.error)
        this.inProgress = false
        return;
      }
      else if(v.hasOwnProperty('success')) {

        this.inProgress = false
        
        this.loadAccountHeads(0,0)
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created', life: 3000 });
        this.router.navigate(['entity/othersAccount'])
        return;

      }
      else if(v == null) {

        this.inProgress = false
        this.confirm('A null object has been returned. An undefined error has occurred.')
        return;
      }
      else {
        //alert('An undefined error has occurred.')
        this.inProgress = false
        this.confirm('An undefined error has occurred.')
        return
      }
    }
  })

  return

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

_ahlSub:any
masterCopy:any[] = new Array
recordsPerPage:number = 50
totalRecords:number = 0
accountheads:any[] = new Array


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

}
