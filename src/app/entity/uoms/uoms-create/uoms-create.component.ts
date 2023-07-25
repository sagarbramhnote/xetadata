import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import {ConfirmationService,FilterService,FilterMatchMode,MessageService} from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { UOMListService } from 'src/app/services/uomlist.service';
import { Xetaerror } from 'src/app/global/xetaerror';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { SaveUOMService } from 'src/app/services/save-uom.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-uoms-create',
  templateUrl: './uoms-create.component.html',
  styleUrls: ['./uoms-create.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class UomsCreateComponent implements OnInit{
  uoms:any[] = []
  uom:any = {}
  inProgress:boolean = false;

  displayModal:boolean = false;

  private _ahlSub:any
  private _sahSub:any

  @ViewChild('uomTitle') uomTitle:any
  @ViewChild('symbolTitle') symbolTitle:any
  @ViewChild('countryTitle') countryTitle:any

  offset:number = 0;

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  ngOnInit(): void {
    this.loadUOMs(0,0)
  }

  loadUOMs(offset:number,moreoffset:number) {
    
    let ahlService:UOMListService = new UOMListService(this.httpClient)
    let criteria:any = {searchtext:'',screen:'',offset:moreoffset,searchtype:'display',attribute:''};
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchUOMs(criteria).subscribe({
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
          this.uoms = dataSuccess.success
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

  inputChange(event:any) {

  }


  showModalDialog() {
    
    this.uom = {
      uom: "",
      symbol: "",
      country:""
    }

    this.displayModal = true

  }

  handleSave() {

    
    console.log('UOM TO BE SAVED',JSON.stringify(this.uom))
    if(this.uomTitle.errors || this.symbolTitle.errors || this.countryTitle.errors)
    {
      console.log('there is an error in the form !')
      this.confirm('There are errors in the form.  Please check before saving.')
      return
    }

    
    console.log('ITEM TO BE SAVED',JSON.stringify(this.uom))

    //return
    
    this.inProgress = true
    
    let sah:SaveUOMService = new SaveUOMService(this.httpClient)
    this._sahSub = sah.saveUOM(this.uom).subscribe({
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
          
          this.displayModal = false
          this.loadUOMs(0,0)
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Created', life: 3000 });

          this.router.navigate(['entity/UOMs']) 
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

  onRowSelect(e:any) {

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

  navigateToListUoms(){
    this.router.navigate(['entity/UOMs'])
 }


}