import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { SaveAccountHeadService } from 'src/app/services/save-account-head.service';
import { Search } from 'src/app/services/search';

@Component({
  selector: 'app-create-other-account',
  templateUrl: './create-other-account.component.html',
  styleUrls: ['./create-other-account.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class CreateOtherAccountComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

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

@ViewChild('accountHeadTitle') accountHeadTitle:any
@ViewChild('selectAccountType') selectAccountType:any


inputChange(event:any) {
  console.log('ISVALID',this.accountHeadTitle.valid)
  this.accountHead['isvalid'] = this.accountHeadTitle.valid

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

handleSave(){

  console.log(this.accountHeadTitle.errors ? true : false)
  console.log(this.selectAccountType.errors ? true : false)


  if(this.accountHeadTitle.errors || this.selectAccountType.errors)
  {
    console.log('there is an error in the form !')
    this.confirm('There are errors in the form.  Please check before saving.')
    return
  }

  if(this.accountHead.partof === '') {
    this.confirm('You must select a part of account.')
    return
  }


  console.log('SAVE FORM',this.accountHead)
  
  //return
  
  this.inProgress = true

  

  let sah:SaveAccountHeadService = new SaveAccountHeadService(this.httpClient)
  this._sahSub = sah.saveAccountHead(this.accountHead).subscribe({
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
       
        this.disableSaveButton = true;
        this.inProgress = false
        
        this.displayModal = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created', life: 3000 });
        this.loadAccountHeads(0,0)
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
