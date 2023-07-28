import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { StockBalanceItemForReportService } from 'src/app/services/stock-balance-item-for-report.service';

@Component({
  selector: 'app-stock-register-view',
  templateUrl: './stock-register-view.component.html',
  styleUrls: ['./stock-register-view.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class StockRegisterViewComponent {


  inProgress:boolean = false

  constructor(private router:Router,private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }

  selectedItem:any = {
    'item':'',
    'uom':''
  }

  ngOnInit(): void {

    const item = localStorage.getItem('ViewStock');
    if (item !== null) {
      this.selectedItem = JSON.parse(item);
      console.log('Stock TO BE View',this.selectedItem)
      this.loadStockDetailBalance(this.selectedItem.id)

    }     
}

private _sbSub:any
stockDetailList:any[] = []
displayViewDetailModal:boolean = false;

navigateToStockList(){
  this.router.navigate(['report/stockRegister'])
}

loadStockDetailBalance(itemid:any) {

  this.inProgress = true

  console.log('IN STOCK DETAIL BALANCES')
  let criteria:any = {id:itemid};
  console.log('CRITERIA',criteria)
  let iService:StockBalanceItemForReportService = new StockBalanceItemForReportService(this.httpClient)
  this._sbSub = iService.fetchStockBalance(criteria).subscribe({
    complete: () => {
      console.info('complete')
    },
    error: (e) => {
      console.log('ERROR',e)
      alert('A server error occured. '+e.message)
      return;
    },
    next: (v) => {
      console.log('NEXT',v);
      if (v.hasOwnProperty('error')) {
        let dataError:Xetaerror = <Xetaerror>v; 
        alert(dataError.error);
        this.inProgress = false
        return;
      }
      else if(v.hasOwnProperty('success')) {
        let dataSuccess:XetaSuccess = <XetaSuccess>v;
        this.stockDetailList = dataSuccess.success;

        for (let index = 0; index < this.stockDetailList.length; index++) {
          const element = this.stockDetailList[index];
          element.balance = parseFloat(element.balance.toFixed(2))
        }
        console.log('STOCK BALANCES',this.stockDetailList)

        this.displayViewDetailModal = true
        this.inProgress = false
        return;
      }
      else if(v == null) {
        alert('A null object has been returned. An undefined error has occurred.')
        this.inProgress = false
        return;
      }
      else {
        this.inProgress = false
        alert('An undefined error has occurred.')
        return
      }
    }
  })
}

onRowSelect(event:any) {
    
}

}
