import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GlobalConstants } from 'src/app/global/global-constants';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { StockBalanceRegisterService } from 'src/app/services/stock-balance-register.service';


@Component({
  selector: 'app-stock-register',
  templateUrl: './stock-register.component.html',
  styleUrls: ['./stock-register.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class StockRegisterComponent {

  stockList:any[] = []
  //printList:any[] = []
  inProgress:boolean = false

  constructor(private router:Router,private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

exportColumns:any[] = [];
today: number = Date.now();

ngOnInit(): void {

  this.exportColumns = [
    { title: 'ID', dataKey: 'id' },
    { title: 'Item', dataKey: 'item' },
    { title: 'UOM', dataKey: 'uom' },
    { title: 'Quantity', dataKey: 'quantity'},
    { title: 'Reorder', dataKey: 'reorder'},
    { title: 'Status', dataKey: 'status'}
    
  ]; 

  this.loadStockBalances(0,0)
}

private _invSub:any


loadStockBalances(offset:number,moreoffset:number) {
  
  this.inProgress = true
  
  let ahlService:StockBalanceRegisterService = new StockBalanceRegisterService(this.httpClient)
  let criteria:any = {};
  console.log('CRITERIA',criteria)
  this._invSub = ahlService.fetchStockBalanceRegister(criteria).subscribe({
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
        
        this.stockList = []
        this.stockList = dataSuccess.success

        

        for (let index = 0; index < this.stockList.length; index++) {
          const element = this.stockList[index];
          element.quantity = parseFloat(element.quantity)
          element.quantity = parseFloat(element.quantity.toFixed(2))
          
          element["reorder"] = element.itemdetail.reorderquantity

          let ro = parseFloat(element.itemdetail.reorderquantity)
          
          if (element.quantity > ro) {
            element["status"] = "ok"
          }
          if (element.quantity <= ro) {
            element["status"] = "reorder"
          }
         
          
        }
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

selectedItem:any = {
  'item':'',
  'uom':''
}

handleView(item:any) {
  localStorage.setItem('ViewStock', JSON.stringify(item));
  this.selectedItem = item
//  this.loadStockDetailBalance(item.id)
this.router.navigate(['report/stockRegisterView'])
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

onRowSelect(event:any) {
    
}

//xls
exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.stockList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xls', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "products");
  });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  //let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_TYPE = 'application/vnd.ms-excel;charset=utf-8';
  let EXCEL_EXTENSION = '.xls';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION); 
}

//pdf
newExportPdf() {
  //console.log('PRINT LIST',this.printList)
  const doc: jsPDF = new jsPDF("p", "pt", "a4");
  let datePipe: DatePipe = new DatePipe("en-US");

  let b = 'Closing Stock as on ' + datePipe.transform(this.today,'fullDate');
  let loginObject = GlobalConstants.loginObject
  let a = loginObject.entityname
  console.log(loginObject)

  autoTable(doc,{
    columns: this.exportColumns, 
    body:this.stockList,
    didDrawPage: function (data) {
      doc.setFontSize(15)
      doc.setFont("helvetica","bold")
      doc.text(a, data.settings.margin.left + 0, 20);
      doc.setFontSize(10)
      doc.setTextColor(40)
      doc.text(b, data.settings.margin.left + 0, 35)
      console.log('MARGINS',data.settings.margin);
    },
    margin: { top: 40 },
    theme: "grid"
  });
  //doc.save('stockregister.pdf');
  doc.output("dataurlnewwindow")
}

exports: any;
exportPDFHtml() {
  const doc = new jsPDF('p', 'pt', 'letter');

  const content = this.exports.nativeElement;

  console.log(content)

  const margins = {
    top: 80,
    bottom: 60,
    left: 40,
    width: 522
  };
  console.log(doc);
//   setTimeout(() => { ** REMOVE **
    (doc as any).fromHTML(content, margins.left, margins.top, {}, function () {
      doc.output("dataurlnewwindow",{filename: "export.pdf"}); 
      //doc.save("export.pdf");
    }, margins);

}


}