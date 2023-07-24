import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { SaveStockLocationService } from 'src/app/services/save-stock-location.service';
import { StockLocationListService } from 'src/app/services/stock-location-list.service';

@Component({
  selector: 'app-stock-locations-create',
  templateUrl: './stock-locations-create.component.html',
  styleUrls: ['./stock-locations-create.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class StockLocationsCreateComponent {

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


  inputChange(event:any) {

  }

  handleSave() {

    if(this.itemTitle.errors)
    {
      console.log('there is an error in the form !')
      this.confirm('There are errors in the form.  Please check before saving.')
      return
    }

    
    
    console.log('ITEM TO BE SAVED',JSON.stringify(this.selectedLocation))

    //return
    
    this.inProgress = true
    
    let sah:SaveStockLocationService = new SaveStockLocationService(this.httpClient)
    this._sahSub = sah.saveStockLocation(this.selectedLocation).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.confirm('A server error occured while saving stock location. '+e.message)
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
          this.loadStockLocations(0,0)
          this.router.navigate(['entity/stockLocations'])
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


  navigateToStockLocationList(){
    this.router.navigate(['entity/stockLocations'])

  }

}
