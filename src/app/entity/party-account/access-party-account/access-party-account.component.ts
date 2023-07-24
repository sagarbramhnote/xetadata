import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { DigitalKeyService } from 'src/app/services/digital-key.service';
import { UpdateDigitalKeyService } from 'src/app/services/update-digital-key.service';

@Component({
  selector: 'app-access-party-account',
  templateUrl: './access-party-account.component.html',
  styleUrls: ['./access-party-account.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class AccessPartyAccountComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }
 
  ah:any
  dkeyList:any[] = []

  ahid:any
  filteredComponentNames:any[] = new Array


  ngOnInit(): void {

    const access = localStorage.getItem('accessPartyAccount');
    if (access !== null) {
      this.ah = JSON.parse(access);
      console.log('Accouint TO BE access',this.ah)

      this.dkeyList = []
      this.ahid = this.ah["id"]
      this.loadAccess(this.ah["id"])
    
    } 
    this.filteredComponentNames = [
      {type: 'DashboardComponent'},
      {type: 'StockRegisterComponent'}
    ]

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

navigateToListPartyAccount(){
  this.router.navigate(['entity/partyAccount'])
}
componentChange(event:any) {

}

  inProgress:boolean = false
  _ahlSub:any
  selectedInitialComponent:any
  displayAccessModal:boolean = false


  loadAccess(ahid:any) {
  
    let ahlService:DigitalKeyService = new DigitalKeyService(this.httpClient)
    let criteria:any = {accountid: ahid}
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchDigitalKey(criteria).subscribe({
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
          this.inProgress = false
          
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          let dkey:any = dataSuccess.success
          for (const [key, value] of Object.entries(dkey)) {
            if (key !== "initialscreen") {
              let a:any = JSON.parse(JSON.stringify(value))
              a["key"] = key
              this.dkeyList.push(a)
              
            }
            else if(key === "initialscreen") {
              this.selectedInitialComponent = value
            }
            
          }
          this.displayAccessModal = true;
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

  checkChanged(i:any) {
    console.log('CLASS TO BE CHANGED:',this.dkeyList[i])
  }

  handleUpdateAccess() {

    let dk:any = {}
    for (let index = 0; index < this.dkeyList.length; index++) {
      const element = this.dkeyList[index];
      let b:any = {}
      b["name"] = element.name
      b["new"] = element.new
      b["view"] = element.view
      b["edit"] = element.edit
      dk[element.key] = b
    }
  
    let finaldk:any = {}
    dk["initialscreen"] = this.selectedInitialComponent
    finaldk["digitalkey"] = dk
    finaldk["accountid"] = this.ahid
  
    console.log('UPDATED DIGITAL KEY',JSON.stringify(finaldk))
  
    this.handleUpdateAccessService(finaldk)
  
  }
  private _sahSub:any

  handleUpdateAccessService(finaldk:any) {
    
  
    this.inProgress = true
  
    
    let sah:UpdateDigitalKeyService = new UpdateDigitalKeyService(this.httpClient)
    this._sahSub = sah.updateDigitalKey(finaldk).subscribe({
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
          
          this.displayAccessModal = false
          this.router.navigate(['entity/partyAccount'])

          //this.loadItems(0,0)
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

}
