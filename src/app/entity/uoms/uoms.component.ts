import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import {ConfirmationService,FilterService,FilterMatchMode,MessageService} from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { UOMListService } from 'src/app/services/uomlist.service';
import { Xetaerror } from 'src/app/global/xetaerror';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { SaveUOMService } from 'src/app/services/save-uom.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-uoms',
  templateUrl: './uoms.component.html',
  styleUrls: ['./uoms.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class UOMsComponent implements OnInit{

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

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}
navigateToCreateUoms(){
  this.router.navigate(['entity/uomsCreate'])
}


}
