import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { StockLocationListService } from 'src/app/services/stock-location-list.service';

@Component({
  selector: 'app-stock-locations',
  templateUrl: './stock-locations.component.html',
  styleUrls: ['./stock-locations.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class StockLocationsComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }
  
  @ViewChild('itemTitle') itemTitle:any

  _ahlSub:any
  inProgress:boolean = false
  stockLocations:any[] = []

  displayModal:boolean = false

  selectedLocation:any = {
    'stocklocation':''
  }

  _sahSub:any

  


  ngOnInit(): void {
    this.loadStockLocations(0,0)
  }

  loadStockLocations(offset:number,moreoffset:number) {
    
    let ahlService:StockLocationListService = new StockLocationListService(this.httpClient)
    let criteria:any = {searchtext:'',screen:'display',offset:moreoffset,searchtype:'',attribute:''};
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchStockLocations(criteria).subscribe({
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
          this.stockLocations = dataSuccess.success
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



  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

navigateToStockLocation(){
  this.router.navigate(['entity/stockLocationsCreate'])
}

}
