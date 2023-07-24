import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {ConfirmationService,FilterService,FilterMatchMode,MessageService} from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { ItemLevelListService } from 'src/app/services/item-level-list.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-item-levels',
  templateUrl: './item-levels.component.html',
  styleUrls: ['./item-levels.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class ItemLevelsComponent {
  itemLevels:any[] = []  
  itemLevel:any = {}
  inProgress:boolean = false;

  displayModal:boolean = false;

  private _ahlSub:any
  private _sahSub:any

  itemLevelTypes:any[] = [{level:''},{level:'level1'},{level:'level2'},{level:'level3'}]

  @ViewChild('itemTitle') itemTitle:any
  

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  ngOnInit(): void {
    this.loadItemLevels(0,0)
  }

  loadItemLevels(offset:number,moreoffset:number) {
    
    let ahlService:ItemLevelListService = new ItemLevelListService(this.httpClient)
    let criteria:any = {searchtext:'',screen:'display',offset:moreoffset,searchtype:'',attribute:''};
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchItemLevels(criteria).subscribe({
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
          this.itemLevels = dataSuccess.success
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

navigateToCreateItemList() {
  this.router.navigate(['entity/itemLevelCeate'])
}



}
