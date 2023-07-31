import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GlobalConstants } from 'src/app/global/global-constants';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { ClosingStockService } from 'src/app/services/closing-stock.service';


@Component({
  selector: 'app-item-movement-register',
  templateUrl: './item-movement-register.component.html',
  styleUrls: ['./item-movement-register.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class ItemMovementRegisterComponent {

  constructor(private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) { }

  today: number = Date.now();
  stockList:any[] = []
  inProgress:boolean = false
  offset:number = 0
  private _invSub:any
  exportColumns:any[] = []; 

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
}

onRowSelect(event:any) {
    
}

ngOnInit(): void {
  this.exportColumns = [
    { title: 'Id', dataKey: 'item' },
    { title: 'Item', dataKey: 'item_name' },
    { title: 'UOM', dataKey: 'uom'},
    { title: 'Purchase', dataKey: 'purchase'},
    { title: 'P Return', dataKey: 'pret'},
    { title: 'Consume', dataKey: 'consume'},
    { title: 'Produce', dataKey: 'produce'},
    { title: 'Sale', dataKey: 'sale'},
    { title: 'S Return', dataKey: 'sret'},
    { title: 'Quantity', dataKey: 'qty'},
    { title: 'Rate', dataKey: 'org'},
    { title: 'Value', dataKey: 'amount'}
  ];
  this.loadClosingStock(this.offset)
}


loadClosingStock(offset:number) { 
  
  this.inProgress = true
  
  let ahlService:ClosingStockService = new ClosingStockService(this.httpClient)
  let criteria:any = {offset:offset};
  console.log('CRITERIA',criteria)
  this._invSub = ahlService.fetchClosingStock(criteria).subscribe({
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
        
        //this.stockList = []
        //this.stockList = dataSuccess.success
        let newItems:any[] = dataSuccess.success
        for (let index = 0; index < newItems.length; index++) {
          const element = newItems[index];
          this.stockList.push(JSON.parse(JSON.stringify(element)))
        }
          this.stockList = []
          this.stockList = dataSuccess.success
         
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

handleMore() {
  this.offset = this.offset + 500
  this.loadClosingStock(this.offset)
}


newExportPdf() {

  let glpdf:any = JSON.parse(JSON.stringify(this.stockList))

  let formattedBody = glpdf.map((item:any) => {
    
    // item.purchase = this.replZero.transform(item.purchase,'')
    // item.pret = this.replZero.transform(item.pret,'')
    // item.consume = this.replZero.transform(item.consume,'')
    // item.produce = this.replZero.transform(item.produce,'')
    // item.sale = this.replZero.transform(item.sale,'')
    // item.sret = this.replZero.transform(item.sret,'')
    // item.qty = this.replZero.transform(item.qty,'')
    // item.org = this.replZero.transform(item.org,'0')
    // item.amount = this.replZero.transform(item.amount,'0')

    return item;
  });

  const doc: jsPDF = new jsPDF("l", "pt", "a4");
  let datePipe: DatePipe = new DatePipe("en-US");

  let b = 'Closing Stock as on ' + datePipe.transform(this.today,'fullDate');
  let loginObject = GlobalConstants.loginObject
  let a = loginObject.entityname
  console.log(loginObject)

  autoTable(doc,{
    columns: this.exportColumns, 
    body:formattedBody,
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
    theme: "grid",
    columnStyles: {
      purchase: { halign: 'right' },
      pret: { halign: 'right' },
      consume: {halign: 'right'},
      produce: {halign: 'right'},
      sale: {halign: 'right'},
      sret: {halign: 'right'},
      qty: {halign: 'right'},
      org: {halign: 'right'},
      amount: {halign: 'right'}
      }
  });
  //doc.save('stockregister.pdf');
  doc.output("dataurlnewwindow")
}


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

handleView(inv:any) {

}

getTotalAmount() {
  let totalAmount:number = 0
  for (let index = 0; index < this.stockList.length; index++) {
    const element = this.stockList[index];
    totalAmount = totalAmount + parseFloat(element.amount)
  }
  return totalAmount
}


}

