import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { GlobalConstants } from 'src/app/global/global-constants';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { PersonService } from 'src/app/services/person.service';
import { SendHTMLInvoiceLinkService } from 'src/app/services/send-htmlinvoice-link.service';

@Component({
  selector: 'app-send-invoice-sales',
  templateUrl: './send-invoice-sales.component.html',
  styleUrls: ['./send-invoice-sales.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class SendInvoiceSalesComponent {

  constructor(private router:Router,private httpClient:HttpClient,private eventBusService:EventBusServiceService,private confirmationService:ConfirmationService, private messageService: MessageService,private filterService: FilterService) { }

  inProgress:boolean = false


navigateToSales(){
  this.router.navigate(['account/sales'])
}
selectedEndpoint:any = {}
whatsappShortName:string = ""

invoice:any
pid:any
base64Invoice:string = ''

ngOnInit(): void {
  this.lo = GlobalConstants.loginObject;
  if (!this.lo.hasOwnProperty('whatsappshortname')) {
    this.lo.whatsappshortname = '';
  }
  this.whatsappShortName = this.lo.whatsappshortname;
  
  const item = localStorage.getItem('salesSendInvoice');
  if (item !== null) {
    this.invoice = JSON.parse(item);
    console.log('PAH',this.invoice.partyaccounthead)
    this.pid = this.invoice.partyaccounthead.id
  
    this.loadParty(this.pid)
  
    this.base64Invoice = btoa(this.makeHtmlString(this.invoice))

}
}

filteredEndpoints:any[] = []
_ahlSub:any
selectedPartyPerson:any = {}

loadParty(pid:any) {
    
  this.inProgress = true
  
  let ahlService:PersonService = new PersonService(this.httpClient)
  let criteria:any = {id:pid};
  console.log('CRITERIA IN LOAD',JSON.stringify(criteria))
  this._ahlSub = ahlService.fetchPerson(criteria).subscribe({
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
        this.selectedPartyPerson = dataSuccess.success
        let endpoints = this.selectedPartyPerson.endpoints
        console.log('ENDPOINTS',endpoints)
        this.filteredEndpoints = []
        
        for (let index = 0; index < endpoints.length; index++) {
          const element = endpoints[index];
          if(element.type == 'telephone') {
            element['recordid'] = index
            element['endpointdetail'] = element.detail.telephone
            this.filteredEndpoints.push(element) 
          }
          // if(element.type == 'emailid') {
          //   element['recordid'] = index
          //   element['endpointdetail'] = element.detail.emailid
          //   this.filteredEndpoints.push(element)
          // }
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

selectedPartyName:string = ""
selectedPartyEndpoint:string = ""
selectedPartyGSTCode:string = ""
selectedEntityName:string = ""
selectedEntityAddress:string = ""
selectedEntityTelephone:string = ""
selectedEntityEmail:string = ""
selectedEntityGSTNumber:string = ""
selectedInvoiceDate:string = ""
selectedInvoiceNumber:string = ""
selectedPOFormattedDate:string = ''


selectedPlaceOfSale:string = ""
selectedEWayBillNo:string = ""
selectedPONO:string = ""
selectedAmountInWords:string = ""
selectedTotalDiscAmt:string = ""
selectedPaymentMethods:string = ""

makeHtmlString(invoice:any):string {

  let style:string = `<style type="text/css">*{margin:0;padding:0;text-indent:0}.s1{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:15pt}.s2{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:8pt}.s3{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:5pt}.s4{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:10.5pt}.s5{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:4.5pt}.s6{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:5.5pt}.s7{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:7.5pt}.s8{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:8.5pt}.s9{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:9pt}.s10{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:400;text-decoration:none;font-size:5pt}.s11{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:6.5pt}.s12{color:#000;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:6pt}.s13{color:red;font-family:"Times New Roman",serif;font-style:normal;font-weight:700;text-decoration:none;font-size:6pt}table,tbody{vertical-align:top;overflow:visible}</style>`

  let compheader = '<p style="text-indent:0;text-align:left"><br></p><table style="border-collapse:collapse;margin-left:5.97pt" cellspacing="0"><tr style="height:46pt"><td style="width:560pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="14"><p class="s1" style="padding-top:1pt;padding-left:100pt;padding-right:101pt;text-indent:0;text-align:center">'+this.selectedEntityName+'</p><p class="s2" style="padding-left:174pt;padding-right:175pt;text-indent:0;line-height:111%;text-align:center"><a href="mailto:info@netlogon.in" class="s2" target="_blank">'+this.selectedEntityAddress+' E-mail:</a>'+this.selectedEntityEmail+', Cell.: '+this.selectedEntityTelephone+'</p></td></tr>' 

  let invtitle = '<tr style="height:14pt"><td style="width:560pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="14"><p class="s4" style="padding-left:100pt;padding-right:100pt;text-indent:0;text-align:center">GST INVOICE</p></td></tr>'

  let billto = '<tr style="height:9pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="5"><p style="text-indent:0;text-align:left"><br></p><p class="s5" style="padding-left:10pt;text-indent:0;text-align:left">BILL TO</p></td><td style="width:162pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2" rowspan="5"><p style="text-indent:0;text-align:left"><br></p><p class="s6" style="padding-left:1pt;text-indent:0;text-align:left">TO</p><p class="s6" style="padding-left:1pt;text-indent:0;line-height:115%;text-align:left">'+this.selectedPartyName+', '+this.selectedPartyEndpoint+'</p></td>'

  let shiptogst = '<td style="width:176pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="5"><p class="s7" style="padding-left:71pt;padding-right:71pt;text-indent:0;line-height:7pt;text-align:center">SHIP TO</p></td><td style="width:70pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s8" style="padding-left:20pt;text-indent:0;line-height:7pt;text-align:left">GSTIN:</p></td><td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="4"><p class="s9" style="padding-left:5pt;text-indent:0;line-height:7pt;text-align:left">'+this.selectedEntityGSTNumber+'</p></td><tr style="height:10pt"><td style="width:176pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="5" rowspan="4"><p style="text-indent:0;text-align:left"><br></p><p class="s10" style="padding-left:1pt;text-indent:0;text-align:left">TO</p><p class="s10" style="padding-left:1pt;text-indent:0;line-height:111%;text-align:left">'+ this.selectedPartyName+', '+this.selectedPartyEndpoint+'</p></td>'

  let invoicenumber = '<td style="width:70pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s8" style="padding-left:7pt;text-indent:0;line-height:9pt;text-align:left">INVOICE NO.</p></td><td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="4"><p class="s7" style="padding-left:5pt;text-indent:0;text-align:left">'+this.selectedInvoiceNumber+'</p></td>'

  let invoicedate = '<tr style="height:10pt"><td style="width:70pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s8" style="padding-left:2pt;text-indent:0;line-height:9pt;text-align:left">INVOICE DATE:</p></td><td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="4"><p class="s7" style="padding-left:5pt;text-indent:0;text-align:left">'+this.selectedInvoiceDate+'</p></td></tr>'

  let placeofsale = '<tr style="height:10pt"><td style="width:70pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s8" style="padding-left:2pt;text-indent:0;line-height:9pt;text-align:left">POS</p></td><td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="4"><p class="s7" style="padding-left:5pt;text-indent:0;text-align:left">'+this.selectedPlaceOfSale+'</p></td></tr>'

  let ewaybillno = '<tr style="height:10pt"><td style="width:70pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s8" style="padding-left:2pt;text-indent:0;line-height:9pt;text-align:left">E-Way Bill No:</p></td><td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="4"><p class="s7" style="padding-left:5pt;text-indent:0;text-align:left">'+this.selectedEWayBillNo+'</p></td></tr>'

  let partygstcodeorderdatenumber = '<tr style="height:10pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s5" style="padding-top:2pt;text-indent:0;text-align:center">GSTIN</p></td><td style="width:162pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s7" style="padding-left:1pt;text-indent:0;text-align:left">'+this.selectedPartyGSTCode+'</p></td><td style="width:22pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s6" style="padding-top:1pt;padding-right:1pt;text-indent:0;text-align:center">PO.NO.</p></td><td style="width:224pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="6"><p class="s11" style="padding-left:5pt;text-indent:0;text-align:left">'+this.selectedPONO+'</p></td><td style="width:30pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s6" style="padding-top:1pt;padding-left:9pt;text-indent:0;text-align:left">Date</p></td><td style="width:106pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s5" style="padding-top:1pt;padding-left:5pt;text-indent:0;text-align:left">'+this.selectedPOFormattedDate+'</p></td></tr>'

  let voucherheader = '<tr style="height:10pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s7" style="padding-top:1pt;padding-left:3pt;text-indent:0;text-align:left">Sl.</p><p class="s7" style="padding-left:2pt;text-indent:0;text-align:left">No.</p></td><td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s7" style="padding-top:6pt;padding-left:34pt;text-indent:0;text-align:left">Product Description</p></td><td style="width:26pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s6" style="padding-top:4pt;padding-left:2pt;text-indent:0;text-align:left">HSN/SA</p><p class="s6" style="padding-top:1pt;padding-left:3pt;text-indent:0;text-align:left">C Code</p></td><td style="width:22pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s7" style="padding-top:6pt;padding-left:5pt;text-indent:0;text-align:left">Qty</p></td><td style="width:37pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s7" style="padding-top:6pt;padding-left:11pt;text-indent:0;text-align:left">Rate</p></td><td style="width:41pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s7" style="padding-top:6pt;padding-left:3pt;text-indent:0;text-align:left">Total Sale</p></td><td style="width:22pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s7" style="padding-top:6pt;padding-left:3pt;text-indent:0;text-align:left">Disc.</p></td><td style="width:54pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s7" style="padding-top:6pt;padding-left:3pt;text-indent:0;text-align:left">Taxable Value</p></td><td style="width:70pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s7" style="padding-left:24pt;padding-right:23pt;text-indent:0;line-height:9pt;text-align:center">CGST</p></td><td style="width:73pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s7" style="padding-left:25pt;padding-right:25pt;text-indent:0;line-height:9pt;text-align:center">SGST</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s7" style="padding-left:21pt;padding-right:21pt;text-indent:0;line-height:9pt;text-align:center">IGST</p></td></tr><tr style="height:12pt"><td style="width:28pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:1pt;text-indent:0;text-align:right">Rate %</p></td><td style="width:42pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:1pt;padding-left:7pt;text-indent:0;text-align:left">Amount</p></td><td style="width:30pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:1pt;padding-right:2pt;text-indent:0;text-align:right">Rate %</p></td><td style="width:43pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:1pt;padding-left:7pt;text-indent:0;text-align:left">Amount</p></td><td style="width:31pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:1pt;padding-left:1pt;padding-right:1pt;text-indent:0;text-align:center">Rate %</p></td><td style="width:32pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:1pt;padding-left:1pt;padding-right:1pt;text-indent:0;text-align:center">Amount</p></td></tr>'


  let vouchers = invoice.vouchers

  let vlines = ''

  let ts:number = 0 //total sale
  let td:number = 0 // total discount
  let ttv:number = 0 // total taxable value
  let tcgst:number = 0
  let tsgst:number = 0
  let tigst:number = 0
  let sumgst:number = 0
  let gt:number = 0

  


  for (let index = 0; index < vouchers.length; index++) {
    const element = vouchers[index];

    let cgstamt = 0
    let cgstrat = 0
    let sgstamt = 0
    let sgstrat = 0
    let igstamt = 0
    let igstrat = 0
    

    if(element.taxes.length == 0) {

    }
    if(element.taxes.length == 1) {
      cgstamt = element.taxes[0].taxamount * element.quantity 
      cgstrat = element.taxes[0].taxpercent
    }
    if(element.taxes.length == 2) {
      cgstamt = element.taxes[0].taxamount * element.quantity
      cgstrat = element.taxes[0].taxpercent
      sgstamt = element.taxes[1].taxamount * element.quantity
      sgstrat = element.taxes[1].taxpercent  
    }
    if(element.taxes.length == 3) {
      cgstamt = element.taxes[0].taxamount * element.quantity
      cgstrat = element.taxes[0].taxpercent
      sgstamt = element.taxes[1].taxamount * element.quantity
      sgstrat = element.taxes[1].taxpercent
      igstamt = element.taxes[2].taxamount * element.quantity
      igstrat = element.taxes[2].taxpercent

    }
    
    console.log('TAXES',element)
    let hsncode = ''
    if (element.taxes.length > 0) {
      hsncode = element.taxes[0].taxcode
    }
     

    vlines = vlines + '<tr style="height:35pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-left:1pt;text-indent:0;text-align:center">'+(index+1).toString()+'</p></td><td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s6" style="padding-left:1pt;text-indent:0;line-height:6pt;text-align:justify">'+element.object.itemname+' '+element.object.uom.uom+'</p></td><td style="width:26pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-left:5pt;text-indent:0;text-align:left">'+hsncode+'</p></td><td style="width:22pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="text-indent:0;text-align:center">'+this.formatNumber(element.quantity)+'</p></td><td style="width:37pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(element.userinputrate)+'</p></td><td style="width:41pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(element.quantity*element.userinputrate)+'</p></td><td style="width:22pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(element.discountamount*element.quantity)+'</p></td><td style="width:54pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber((element.quantity*element.userinputrate)-(element.quantity*element.discountamount))+'</p></td><td style="width:28pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-right:1pt;text-indent:0;text-align:right">'+this.formatNumber(cgstrat)+'%</p></td><td style="width:42pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-right:1pt;text-indent:0;text-align:right">'+this.formatNumber(cgstamt)+'</p></td><td style="width:30pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-right:1pt;text-indent:0;text-align:right">'+this.formatNumber(sgstrat)+'%</p></td><td style="width:43pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-right:1pt;text-indent:0;text-align:right">'+this.formatNumber(sgstamt)+'</p></td><td style="width:31pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-left:3pt;padding-right:1pt;text-indent:0;text-align:center">'+this.formatNumber(igstrat)+'%</p></td><td style="width:32pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p><p class="s7" style="padding-left:3pt;padding-right:1pt;text-indent:0;text-align:center">'+this.formatNumber(igstamt)+'</p></td></tr>'
    
    ts = ts+(parseFloat(element.userinputrate)*parseFloat(element.quantity))
    td = td+(parseFloat(element.discountamount)*parseFloat(element.quantity))
    tcgst = tcgst +cgstamt
    tsgst = tsgst +sgstamt
    tigst = tigst +igstamt

  }

  ttv = ts - td
  sumgst = tcgst+tsgst+tigst

  gt = ttv+sumgst

  this.selectedAmountInWords = 'Rupees '+this.numberToCurrency(gt)

  console.log('VLINES',vlines)

  this.selectedTotalDiscAmt = this.formatNumber(td)


  let emptyrowspace = '<tr style="height:35pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:26pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:22pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:37pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:41pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:22pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:54pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:28pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:42pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:30pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:43pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:31pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:32pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td></tr><tr style="height:45pt"><td style="width:560pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="14"><p style="text-indent:0;text-align:left"><br></p></td></tr>'

  let totals = '<tr style="height:15pt"><td style="width:237pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="5"><p class="s6" style="padding-top:3pt;padding-right:1pt;text-indent:0;text-align:right">TOTAL</p></td><td style="width:41pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:3pt;text-indent:0;text-align:right;padding-right:5pt">'+this.formatNumber(ts)+'</p></td><td style="width:22pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:3pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(td)+'</p></td><td style="width:54pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:3pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(ttv)+'</p></td><td style="width:28pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:42pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:3pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(tcgst)+'</p></td><td style="width:30pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:43pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s7" style="padding-top:3pt;padding-right:13pt;text-indent:0;text-align:right">'+this.formatNumber(tsgst)+'</p></td><td style="width:31pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:32pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s6" style="padding-top:4pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(tigst)+'</p></td></tr>'

  let remarks = '<tr style="height:8pt"><td style="width:300pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="7"><p class="s6" style="padding-left:1pt;text-indent:0;line-height:6pt;text-align:left">Remarks:</p></td><td style="width:197pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="5"><p class="s5" style="padding-left:88pt;padding-right:88pt;text-indent:0;text-align:center">Summary</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s5" style="padding-left:21pt;padding-right:21pt;text-indent:0;text-align:center">Amount</p></td></tr>'

  let amtinwords = '<tr style="height:16pt"><td style="width:382pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="9"><p class="s6" style="padding-top:4pt;padding-left:1pt;text-indent:0;text-align:left">'+this.selectedAmountInWords+'</p></td><td style="width:115pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s12" style="padding-top:3pt;padding-left:59pt;text-indent:0;text-align:left">Total Invoice Value</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s7" style="padding-top:2pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(ts)+'</p></td></tr>'

  let paymethoddiscamt = '<tr style="height:16pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:221pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="4" rowspan="3"><p class="s6" style="padding-top:5pt;padding-left:1pt;text-indent:0;text-align:left">Payment Methods: '+this.selectedPaymentMethods+'</p></td><td style="width:145pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="4" rowspan="3"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:115pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s12" style="padding-top:3pt;padding-left:70pt;text-indent:0;text-align:left">Total Discounts</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p style="text-indent:0;text-align:left"><br></p><p class="s5" style="padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(td)+'</p></td></tr>' 

  let totaltaxablevalue = '<tr style="height:16pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:115pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s12" style="padding-top:3pt;padding-left:57pt;text-indent:0;text-align:left">Total Taxable Value</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s7" style="padding-top:2pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(ttv)+'</p></td></tr>'

  let totalcgstamt = '<tr style="height:17pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:115pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s12" style="padding-top:4pt;padding-right:1pt;text-indent:0;text-align:right">Total CGST</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s7" style="padding-top:3pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(tcgst)+'</p></td></tr>'

  let totalsgstamt = '<tr style="height:16pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:136pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:85pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s6" style="padding-top:4pt;padding-left:2pt;text-indent:0;text-align:left">Receiver&#39;s Signature with Stamp</p></td><td style="width:145pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="4"><p class="s6" style="padding-top:4pt;padding-left:49pt;text-indent:0;text-align:left">Accounts Manager</p></td><td style="width:115pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s12" style="padding-top:3pt;padding-right:1pt;text-indent:0;text-align:right">Total SGST</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s7" style="padding-top:2pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(tsgst)+'</p></td></tr>'

  let totaligstamt = '<tr style="height:16pt"><td style="width:16pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:221pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="4"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:41pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:22pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:54pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:28pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="text-indent:0;text-align:left"><br></p></td><td style="width:115pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s12" style="padding-top:3pt;padding-right:1pt;text-indent:0;text-align:right">Total IGST</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s7" style="padding-top:2pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(tigst)+'</p></td></tr>'

  let totalgst = '<tr style="height:16pt"><td style="width:382pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="9"><p class="s6" style="padding-top:4pt;padding-left:126pt;padding-right:126pt;text-indent:0;text-align:center">Note: Make all cheques payable to Company Name</p></td><td style="width:115pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s12" style="padding-top:3pt;padding-right:1pt;text-indent:0;text-align:right">Total GST</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p style="text-indent:0;text-align:left"><br></p><p class="s5" style="padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(sumgst)+'</p></td></tr>'

  let grandtotal = '<tr style="height:16pt"><td style="width:382pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="9"><p class="s6" style="padding-top:4pt;padding-left:126pt;padding-right:126pt;text-indent:0;text-align:center">Thank you for your Business</p></td><td style="width:115pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p class="s12" style="padding-top:3pt;padding-right:1pt;text-indent:0;text-align:right">Grand Total</p></td><td style="width:63pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s8" style="padding-top:2pt;padding-right:5pt;text-indent:0;text-align:right">'+this.formatNumber(gt)+'</p></td></tr></table>'



  let final = '<!DOCTYPE html><head>'+style+'</head><body>'+compheader+invtitle+billto+shiptogst+invoicenumber+invoicedate+placeofsale+ewaybillno+partygstcodeorderdatenumber+voucherheader + vlines + emptyrowspace+totals+remarks+amtinwords+paymethoddiscamt+totaltaxablevalue+totalcgstamt+totalsgstamt+totaligstamt+totalgst+grandtotal+'</body></html>'

  return final
  
}

numberToCurrency(num: number): string {

  console.log('NUMBER',num)
  //return ''

  const wholeNum = Math.floor(num); // 1514
  const fraction = +(num - wholeNum).toFixed(2); // 0.29

  let newfrac = parseInt((fraction * 100).toFixed(2))
  //console.log('UNFLOORED',parseInt(newfrac.toFixed(2)))
  //console.log('NEWFRAC',Math.floor(newfrac))

  let currency = "";

  if (wholeNum > 0) {
    currency = this.numberToWords(wholeNum) + " rupees";
  } else {
    currency = "zero rupees";
  }

  if (newfrac > 0) {
    currency += " and " + this.numberToWords(newfrac) + " paise";
  }

  return currency;

}

numberToWords(num: any): any {

  console.log("NUMNUM", num)

  let ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  let tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  if (num < 20) {
    return ones[num];
  }
  if (num < 100) {
    return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + ones[num % 10] : "");
  }
  if (num < 1000) {
    return ones[Math.floor(num / 100)] + " hundred" + (num % 100 !== 0 ? " and " + this.numberToWords(num % 100) : "");
  }
  if (num < 100000) {
    return this.numberToWords(Math.floor(num / 1000)) + " thousand" + (num % 1000 !== 0 ? " " + this.numberToWords(num % 1000) : "");
  }
  if (num < 10000000) {
    return this.numberToWords(Math.floor(num / 100000)) + " lakh" + (num % 100000 !== 0 ? " " + this.numberToWords(num % 100000) : "");
  }
  if (num < 1000000000) {
    return this.numberToWords(Math.floor(num / 10000000)) + " crore" + (num % 10000000 !== 0 ? " " + this.numberToWords(num % 10000000) : "");
  }
  return this.numberToWords(Math.floor(num / 1000000000)) + " billion" + (num % 1000000000 !== 0 ? " " + this.numberToWords(num % 1000000000) : "");
}

formatNumber(n:any):string {
  let td = 4000.6984;
  let formatted = n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  console.log('FORMATTED',formatted);
  return formatted
}

lo:any

sendInvoice() {

  this.lo.whatsappshortname = this.whatsappShortName;
  GlobalConstants.loginObject = this.lo;

  //console.log('A PRINT',this.base64Invoice)
  // call api to send base64
  console.log('WHATSAPP',this.selectedEndpoint)
  //console.log('PID',this.pid)
  // url
  // pid
  //console.log(window.location.href);

  let url = window.location.href
  //let domain = url.split("//")[-1].split("/")[0].split(":")[0]
  const domain = new URL(url).hostname;

  if (!this.selectedEndpoint || Object.keys(this.selectedEndpoint).length === 0) {
    // this.selectedEndpoint is empty
    this.confirm('You must select a telephone number')
    return
  }

  if (this.selectedEndpoint === null) {
    this.confirm('You must select a telephone number')
    return
  }
  if(this.whatsappShortName === '') {
    this.confirm('You must enter a short name')
    return
  }

  let a:any = {
    html:this.base64Invoice,
    url:domain,
    ahid:this.pid,
    phone:this.selectedEndpoint.endpointdetail,
    entityname:this.whatsappShortName
  }

  console.log('A',a)

  

  this.handleSendLink(a)
  

}

_piSub:any

handleSendLink(ch:any) {
  this.inProgress = true
  
  let sah:SendHTMLInvoiceLinkService = new SendHTMLInvoiceLinkService(this.httpClient)
  this._piSub = sah.sendInvoice(ch).subscribe({
    complete:() => {console.info('complete')},
    error:(e) => {
      console.log('ERROR',e)
      this.inProgress = false
      this.confirm('A server error occured while sending invoice. '+e.message)
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

        this.selectedEndpoint =  null
        this.pid = null
        this.base64Invoice = ''
        //this.loadCheques(0,0)
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
