import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Message } from 'src/app/demo/api/message';
import { User } from 'src/app/demo/api/user';
import { ChatService } from '../../service/chat.service';
import { EventBusServiceService } from '../../../global/event-bus-service.service';
import { EventData } from '../../../global/event-data';
import { GlobalConstants } from 'src/app/global/global-constants';
import { Table } from 'primeng/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import * as moment from 'moment';
import { format } from 'date-fns'; 

import { ConfirmationService,MessageService, SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Xetaerror } from '../../../global/xetaerror';
import { XetaSuccess } from '../../../global/xeta-success';
import { MessageListService } from 'src/app/services/message-list.service';
import { SendMessageService } from 'src/app/services/send-message.service';
import { TagListService } from 'src/app/services/tag-list.service';
import { ProductServiceOpenListService } from 'src/app/services/product-service-open-list.service';
import { StockLocationBalanceService } from 'src/app/services/stock-location-balance.service';
import { StockBalanceItemService } from 'src/app/services/stock-balance-item.service';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';
import { SaveSaleService } from 'src/app/services/save-sale.service';

import { ItemsListService } from 'src/app/services/items-list.service';
import { SavePurchaseService } from 'src/app/services/save-purchase.service';
import { StockLocationListService } from 'src/app/services/stock-location-list.service';
import { ChequesOfPersonService } from 'src/app/services/cheques-of-person.service';
import { SaveChequeService } from 'src/app/services/save-cheque.service';
import { ChequeListService } from 'src/app/services/cheque-list.service';
import { SavePaymentService } from 'src/app/services/save-payment.service';
import { SaveReceiptService } from 'src/app/services/save-receipt.service';




interface MyObject {
    apt: string;
    building: string;
    floor: string;
    name: string;
    endpoint: string;
  }

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ConfirmationService,MessageService]
})
export class ChatBoxComponent implements OnInit {

  //defaultUserId: number = 123;

  message!: Message;

  textContent: string = '';

  uploadedFiles: any[] = [];

  emojis = [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '🤪', '😜', '😝', '😛',
      '🤑', '😎', '🤓', '🧐', '🤠', '🥳', '🤗', '🤡', '😏', '😶', '😐', '😑', '😒', '🙄', '🤨', '🤔', '🤫', '🤭', '🤥', '😳', '😞', '😟', '😠', '😡', '🤬', '😔',
      '😟', '😠', '😡', '🤬', '😔', '😕', '🙁', '😬', '🥺', '😣', '😖', '😫', '😩', '🥱', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '🤤'
  ];

  @Input() user!: User;

  xetaperson:any
  prevPerson:any

  GlobalConstants:any = GlobalConstants

  _ahlSub:any

  messageList:any[] = []

  _iSub:any

  items: any[] = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
  ];
  
  strucattachs:any[] = []
  files:any[] = []

  @ViewChild('chatWindow', { static: false }) chatWindowRef!: ElementRef;

  display: boolean = false;

  loading:boolean = false

  showForm:boolean = false
  showSubForm:boolean = false


  irqForm:any

  selectedItems:any[] = []
  filteredItems:any[] = new Array

  _eSub:any

  voucherList:any[] = new Array

  pVoucherList:any[] = new Array

  

  splitItems: MenuItem[] = [];


  selectedVoucher:any = {}

  voucherMode:string = 'new'

  voucherButtonText:string = 'Save'

  currentFormName:string = ''

  form:any = {}


  formMode = 'new'
  formButtonText = 'Save Form'

  //finalstrucs:any[] = []

  displayViewTo:boolean = false

  displaySaleFromIndent:boolean = false

  toStrucattachs:any[] = []

  // showPickStockForm:boolean = false
  showSaleDetailsForm:boolean = false

  sbcols: any[] = new Array;

  selectedStockBalances:any[] = []
  selectedStockLocationBalance:any[] = []

  @ViewChild('selectQty') selectQty:any

  inStockBalanceProgress:boolean = false

  selectedLocationQty = 0

  selectedValues: string[] = [];

  selectedItem:any
  @ViewChild('selectItem') selectItem:any

  

  _sbSub:any
  
  selectedContextPrices:any[] = []

  filteredAccountMaps:any[] = new Array
  private _amSub:any
  @ViewChild('selectAccountMap') selectAccountMap:any
  placeholderAccountMap = 'select account map'


  displayReturnModal:boolean = false

  titleOptions:any[] = [{type:''},{type:'ownership'},{type:'possession'}]
  selectedTitleOption:any
  disableTitleOption:boolean = false

  discountLabel:string = 'discount percent'

  discountState:boolean = false

  selectedCP:any = {
    'maturitydate':'',
    'instrumentnumber':'',
    'drawee':{},
    'amount':null
  }
  @ViewChild('selectCP') selectCP:any

  @ViewChild('selectUIR') selectUIR:any

  disableDynPrice:boolean = true

  inputDiscount:number = 0
  @ViewChild('selectDiscount') selectDiscount:any

  discountAmount:number = 0

  ri:string = 'rit'

  
  selectedTaxes:any[] = []

  
  @ViewChild('selectTaxname') selectTaxname:any

    
  @ViewChild('selectTaxcode') selectTaxcode:any

  @ViewChild('selectTaxpercent') selectTaxpercent:any

  
  @ViewChild('selectTaxtype') selectTaxtype:any

  taxTypes:any[] = [{type:''},{type:'vat'},{type:'nonvat'}]


  
  @ViewChild('selectTaxParty') selectTaxParty:any
  placeholderTaxParty = 'select tax authority'

  displayTaxModal:boolean = false

  selectedInvoiceDate:string = ""
  selectedInvoiceNumber:string = ""

  selectedInvoice:any = {}


  displayTaxEditModal: boolean = false;


  taxForm:any

  filteredParties:any[] = new Array

  taxFormMode:string = 'new'

  selectedTax:any

  selectedParty:any

  selectedToMessage:any

  selectedAttachment:any

  inProgress:boolean = false

  _siSub:any

  displayPurchaseFromSale:boolean = false



  selectedPurchaseItem:any

  selectedPurchaseVoucher:any

  showPurchaseDetailsForm:boolean = false

  displayTaxForPurchaseModal:boolean = false

  disableTax:boolean = false

  displayCashModal:boolean = false

  displayEditReceiveChequeModal:boolean = false

  selectedPaymentVoucher:any = {
    'object':{
      'amount':'0'
    }
  }

  selectedReceiptVoucherIndex:any

  filteredFromLocations:any[] = new Array
  @ViewChild('selectFromLocation') selectFromLocation:any
  placeholderFromLocation = 'select location'




  showPaymentForm:boolean = false

  payVoucherList:any[] = new Array

  cashVoucher:any = {
    taxesperunit: "0.00",
    originalrateaftertaxes: "0.00",
    fromdatetime: "",
    vattaxperunit: "0.00",
    ratebeforetaxes: "0.00",
    title: "",
    files: [],
    discountamount: "0.00",
    isviaperson:false,
    object: {
      id: "1",
      uom: {
        uom: "each",
        country: "global",
        symbol: "each"
      },
      promisorah: {
        accounthead: "",
        id: "-1",
        endpoint: "",
        neid: "-1",
        defaultgroup: "",
        person: "-1"
      },
      instrumenttype: "cash",
      amount: "0",
      instrumentnumber: "",
      promiseeah: {
        accounthead: "",
        id: "-1",
        endpoint: "",
        neid: "-1",
        defaultgroup: "",
        person: "-1"
      },
      maturitydate: "",
      promisee: {
        endpoint: "",
        id: "-1",
        name: "",
        similarity: "0.000000",
        person: "-1"
      },
      cashtypeah: {
        accounthead: "Cash",
        id: "1",
        endpoint: "",
        neid: "0",
        defaultgroup: "cash",
        person: "0"
      },
      status: "",
      promisor: {
        endpoint: "",
        id: "-1",
        name: "",
        similarity: "0.000000",
        person: "-1"
      }
    },
    taxfactor: "0.00",
    instrumenttype: "cash",
    action: "iss",
    todatetime: "",
    vatpercent: "0.00",
    delivery: {
      accounthead: "",
      id: "-1",
      endpoint: "",
      neid: "-1",
      defaultgroup: "",
      person: "-1"
    },
    quantity: "1.00",
    rateaftertaxes: "0.00",
    taxes: [],
    rateincludesvat: false,
    duedatetime: "",
    nonvattaxperunit: "0.00",
    accountmap: {
      accounthead: "",
      id: "-1",
      endpoint: "",
      neid: "-1",
      defaultgroup: "",
      person: "-1"
    },
    objecttype: "instrument",
    userinputrate: "0",
    expirydate: "",
    nonvatpercent: "0.00",
    brandname: "",
    discountpercent: "0.00",
    rateafterdiscount: "0.00"
  }


  displayChequeModal:boolean = false

  selectedChequesOfPerson:any[] = []

  _chSub:any

  displayViaPersonModal:boolean = false


  displayWriteChequeListModal:boolean = false

  lo:any

  displayWriteChequeDetailModal:boolean = false

  writtenChequeList:any[] = []

  selectedWriteChequeDate:any
  selectedWriteChequeNumber:any
  selectedWriteChequeBankParty:any

  filteredBankParties:any[] = []

  selectedWriteChequeVal:any

  newCheque:any = {}

  _pSub:any

  writtenChequesoffset:number = 0

  _invSub:any

  _piSub:any

  selectedViaPerson:any
  filteredViaPeople:any[] = new Array
  private _vpSub:any
  @ViewChild('selectViaPerson') selectViaPerson:any
  placeholderViaPerson = 'select via person'

  filteredModeTags:any[] = new Array

  selectedPaymentMode:any

  selectedViaPersonAmount:any



  recVoucherList:any[] = new Array

  displayReceipt:boolean = false


  selectedReceiptVoucher:any = {
    'object':{
      'accounthead':'',
      'amount':'0'
    },
    'userinputrate': ''
  }

  displayReceiveChequeModal:boolean = false

  displayReceiveChequeModalDetail:boolean = false

  displayReceiveChequeListModal:boolean = false

  displayViaPersonReceiptModal:boolean = false

  newSelectedCP:any = {}

  selectedRecChequeIndex:any

  selectedDraweeName:string = ''

  showSelectCheque:boolean = false;
  showReceiveChequeDetail:boolean = false;
  showViaPersonReceipt:boolean = false;
  showChequeWrittenDetailModal:boolean = false;



  constructor(private httpClient:HttpClient, private changeDetectorRef: ChangeDetectorRef, private chatService: ChatService, private eventService:EventBusServiceService,private http:HttpClient,private messageService: MessageService) {
      
  }

  setMessage() { }

  ngOnInit(): void {
    
    this.lo = GlobalConstants.loginObject

    this.xetaperson = {
      'name':'',
      'entitycontent':{
        names:[{
          name:''
        }],
        endpoints:[{
          detail:{
            telephone:''
          }
        }]
      }
    }

    this.eventService.on('MessageClicked',(data:any) => {
      console.log('MSG CLICK',data)
      this.xetaperson = data
      let lo:any = {
        appurl:this.GlobalConstants.loginObject.appurl,
        database:this.GlobalConstants.loginObject.database,
        schema:this.GlobalConstants.loginObject.schema,
        accountid:this.GlobalConstants.loginObject.accountid,
        timezone:this.GlobalConstants.loginObject.timezone
      }
      console.log('LO',JSON.stringify(lo))
      console.log('XP',JSON.stringify(this.xetaperson))

      console.log('PREV PERSON',typeof this.prevPerson)
      if (typeof this.prevPerson === 'undefined' || this.prevPerson.id !== this.xetaperson.id) {
        this.voucherList = []
        this.strucattachs = []
        this.files = []
        this.loadMessageList(lo, this.xetaperson, 0);
      } 
    })

    this.irqForm = new FormGroup({
      item: new FormControl('', [Validators.required]),
      // rate: new FormControl('', [Validators.required]),
      quantity: new FormControl('',[Validators.required])
    });

    this.splitItems = [
      { label: 'Purchase Indent',command: () => { this.purchaseIndent()} },
      { label: 'Purchase Order', command: () => {this.purchaseOrder()} },
      { label: 'Payment', command: () => {this.payment()}}
    ];

    this.selectedVoucher = {
        'item': {
            'itemdef': {
                'itemname':'',
                'uom': {
                    'uom':''
                }
            }
        }
    }

    this.selectedPurchaseVoucher = {
      'item': {
        'itemname':'',
        'uom': {
            'uom':''
        }
      }
    }

    this.sbcols = [
      {field: 'balance'},
      {field: 'rate'},
      {field: 'serialno'},
      {field: 'batchno'},
      {field: 'expirydate'},
      {field: 'brand'},
      {field: 'location'},
      {field: 'title'},
      {field: 'inputqty'},
    ]

    this.taxForm = new FormGroup({
        taxname: new FormControl({ value: '', disabled: this.disableTax }, [Validators.required]),
        taxcode: new FormControl('',[]),
        taxauthority: new FormControl('',[Validators.required]),
        taxpercent: new FormControl('',[Validators.required]),
        taxtype: new FormControl('',[Validators.required])
        
    });

    this.newSelectedCP = {
      'maturitydate':'',
      'instrumentnumber':'',
      'drawee':{
        'id':1,
        'name':''
      },
      'amount':''
  
    }

    this.selectedParty = {
      'id':-1
    }

        
  } 




  sendMessage() {
    if (this.textContent == '' || this.textContent === ' ') {
      return;
    }
    else {
      let fps = []
      let tps = []

      // console.log('XP MAIN',this.GlobalConstants.loginObject.xetamainperson)
      fps.push(this.GlobalConstants.loginObject.xetamainperson)
      tps.push(this.xetaperson)

      let xetamail = {
        from:fps,
        to:tps,
        subject:'',
        body:this.textContent,
        strucattachs:this.strucattachs,
        files:this.files
      }
      
      console.log('SEND MSG',JSON.stringify(xetamail))
      this.sendMessageTo(xetamail)
      this.textContent = '';
      this.strucattachs = []
      this.files = []

    }
        
  }


  sendMessageTo(message:any) {
      
    let ahlService:SendMessageService = new SendMessageService(this.http)
    this._ahlSub = ahlService.sendMessage(message).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        //this.loading = false
        return 
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //this.subLoading = false
          this.showErrorViaToast(dataError.error)
          return
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          console.log('SEND MSG',dataSuccess.success)

          let lo:any = {
            appurl:this.GlobalConstants.loginObject.appurl,
            database:this.GlobalConstants.loginObject.database,
            schema:this.GlobalConstants.loginObject.schema,
            accountid:this.GlobalConstants.loginObject.accountid,
            timezone:this.GlobalConstants.loginObject.timezone
          }
          console.log('LO',JSON.stringify(lo))
          console.log('XP',JSON.stringify(this.xetaperson))

          this.loadMessageList(lo, this.xetaperson, 0);
          
          return

        }
        else if(v == null) { 
          //this.subLoading = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return
        }
        else {
          //this.subLoading = false
          this.showErrorViaToast('An undefined error has occurred.')
          return false
        }
      }
    })

  }



  loadMessageList(lo:any,xetaperson:any,offset:number) {
    
    let ahlService:MessageListService = new MessageListService(this.http)
    let criteria:any = {
        'lo':lo,
        'xetaperson':xetaperson,
        'offset':offset 
    };
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchMessageList(criteria).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        //this.loading = false
        return 
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //this.subLoading = false
          this.showErrorViaToast(dataError.error)
          return
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          console.log('MESSAGE LIST',dataSuccess.success)
          this.messageList = dataSuccess.success
          this.changeDetectorRef.detectChanges(); // Trigger change detection
          this.prevPerson = JSON.parse(JSON.stringify(this.xetaperson))
          this.scrollToBottom()
          return
        }
        else if(v == null) { 
          //this.subLoading = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return
        }
        else {
          //this.subLoading = false
          this.showErrorViaToast('An undefined error has occurred.')
          return false
        }
      }
    })

  }

  onEmojiSelect(emoji: string) {
    this.textContent += emoji;
  }

  parseDate(timestamp: number) {
    return new Date(timestamp).toTimeString().split(':').slice(0, 2).join(':');
  }

  parseDateNew(timestamp: number) {
    const formattedDate = format(new Date(timestamp), 'dd-MMM-yyyy hh:mm a');
    return formattedDate;
  }

  trackByFn(index: number, item: any): number {
    return item.xetamail; // Use the 'id' property as the unique identifier
  }

  scrollToBottom(): void {
    const chatWindowElement = this.chatWindowRef.nativeElement;
    chatWindowElement.scrollTop = chatWindowElement.scrollHeight;
  }

    


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

    

  handleEditVoucher(voucher:any) {

    this.voucherMode = 'edit'
    this.voucherButtonText = 'Update Voucher'
    console.log('V TBE',voucher)
    this.selectedVoucher = voucher
    this.irqForm.patchValue({
        item: voucher.item,
        quantity: voucher.quantity
    });
    
    this.showSubForm = true
  }

  handleDeleteVoucher(voucher:any) {
    console.log('VOUCHER TBD',voucher)
    this.voucherList.splice(voucher,1)
  }

  handleNewVoucher(e:any) {
    this.irqForm.reset()
    this.voucherButtonText = 'Save Voucher'
    this.voucherMode = 'new'
  }

  onShow() {
    this.voucherList = []
    //this.strucattachs = []
    this.filteredItems = []
    this.showForm = false
    this.showSubForm = false
    this.irqForm.reset()
  }

  filterTags(event:any) {
    console.log('IN FILTER TAGS',event)
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'begins'};
    console.log('CRITERIA',criteria)
    
    let pService:TagListService = new TagListService(this.httpClient)
    this._eSub = pService.fetchTags(criteria).subscribe({
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
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredItems = dataSuccess.success;
          console.log('FILTERED TAGS',dataSuccess.success)
          this.changeDetectorRef.detectChanges()
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }

  filterProductsServices(event:any) {
    console.log('IN FILTER ITEMS',event)
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:any = {searchtext:event.query,screen:'search',offset:0,searchtype:'item-name-contains',attribute:''};
    criteria['appurl'] = this.xetaperson.building
    criteria['database'] = this.xetaperson.floor
    criteria['schema'] = this.xetaperson.apt
    console.log('CRITERIA',criteria)

    //return 
      
    let iService:ProductServiceOpenListService = new ProductServiceOpenListService(this.httpClient)
    this._iSub = iService.fetchOpenProductServiceList(criteria).subscribe({
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
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredItems = dataSuccess.success;
          this.changeDetectorRef.detectChanges()
          console.log('FILTERED ITEMS',dataSuccess.success)
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }


  handleOnSelectItem(event:any) {
      console.log('ITEM',event)
      this.selectedVoucher.item = event
  }


  handleChange(e:any) {

  }

  saveVoucher(): void {
      // Verify if the endpoint input has errors or is not touched or is invalid
  
      console.log('GET RECI')
  
      this.irqForm.controls['item'].touched = true
      this.irqForm.controls['quantity'].touched = true
      
  
      if (this.irqForm.controls['item'].errors || this.irqForm.controls['item'].invalid) {
        const input = document.getElementById('item');
        if (input) {
          input.classList.add('ng-dirty', 'ng-invalid');
        }
        //return
      }
      
      
      
      if (this.irqForm.controls['quantity'].errors ||  this.irqForm.controls['quantity'].invalid) {
        const input = document.getElementById('quantity');
        if (input) {
          input.classList.add('ng-dirty', 'ng-invalid');
        }
        //return
      }
  
      
  
      //console.log(this.loginForm.invalid)
      
  
      if (this.irqForm.invalid) {
        return;
      }
  
      let voucher = this.irqForm.value;
      
      console.log('VOUCHER',voucher)

      if (this.voucherMode === 'new') {
          voucher['recordid'] = this.highestRecordID(this.voucherList)+1
          this.voucherList.push(voucher)
      }
      else if(this.voucherMode === 'edit') {
          console.log('EDIT V',this.irqForm.value)
          let v:any = this.recordByRecordID(this.selectedVoucher.recordid,this.voucherList)
          console.log('VID',v.recordid)
          v['item'] = this.irqForm.value.item
          v['quantity'] = this.irqForm.value.quantity

          this.voucherMode = 'new'
          this.voucherButtonText = 'Save Voucher'
          //console.log('V TBE',v)
      }
      
      this.irqForm.reset()

      this.selectedVoucher = {
          'item': {
              'itemdef': {
                  'uom': {
                      'uom':''
                  }
              }
          }
      }

      //this.showSubForm = false
  
      //this.loadRecipients(address)
  
      // Rest of the save form code
  
  }

  purchaseIndent() {
    this.showForm = true
    this.showPaymentForm = false
    this.currentFormName = 'purchaseindent'
  }

  purchaseOrder() {

  }

    



  highestRecordID(objectArray:any[]) {
    let recid = 0
    for (let index = 0; index < objectArray.length; index++) {
      const element = objectArray[index];
      if(element.recordid > recid) {
        recid = element.recordid
      }
    }
    return recid
  
  }

  recordByRecordID(recordid:any,array:any) {
    let object:any
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.recordid === recordid) {
        object = element
      }
    }
    return object
  }

  saveForm() {

    if (this.formMode === 'new') {
      this.form = {
        'id': this.highestRecordID(this.strucattachs)+1,
        'formname':this.currentFormName,
        'vouchers':this.voucherList
      }
      this.strucattachs.push(this.form) 
    }
    else if(this.formMode === 'edit') {
      let a:any = this.recordByRecordID(this.form.id,this.voucherList)
      console.log('AID',a.id)
      a['vouchers'] = this.voucherList
        
    }

      
    console.log('STRUCATTACHS',this.strucattachs)
    //this.finalstrucs = JSON.parse(JSON.stringify(this.strucattachs))

    this.showSubForm = false
    this.showForm = false

    this.showPaymentForm = false

  }

  saveAttachment() {
      
    this.display = false
      
  }


  handleEditAttachment(attach:any,formname:any) {
    if (formname === 'purchaseindent') {
      this.formMode = 'edit'
      this.formButtonText = 'Update Form'
      console.log('A TBE',attach)
      this.voucherList = attach.vouchers
      this.showForm = true
    }
    else if(formname === 'payment') {
      this.formMode = 'edit'
      this.formButtonText = 'Update Form'
      console.log('A TBE',attach)
      this.payVoucherList = attach.vouchers
      this.showPaymentForm = true
    }
    
  }

  handleDeleteAttachment(attach:any) {
    this.strucattachs.splice(attach,1)
  }

  openAttachments(e:any) {
    //this.strucattachs = [...this.finalstrucs]
    console.log('OPEN ATTACHS',this.strucattachs)
    this.display = true
    this.showForm = false
    this.showPaymentForm = false
  }

  cancelMessage(e:any) {
    this.textContent = ''
    this.strucattachs = []
    this.files = []
  }



  viewAttachFrom(e:any) {
    console.log('VIEW MESSAGE FROM',e)
  }

  viewAttachTo(e:any,message:any) {
    console.log('VIEW MESSAGE TO',message)
    this.selectedToMessage = message
    this.displayViewTo = true
    this.toStrucattachs = message.strucattachs
  }


  // createSale(attach:any) {
  //     console.log('ATTACH',attach)
  //     this.selectedAttachment = attach
  //     this.selectedCP = null
  //     this.displaySaleFromIndent = true
  //     this.voucherList = []
  //     this.voucherList = attach.vouchers
  //     this.voucherList = attach.vouchers.map((voucher: any) => {
  //         return { ...voucher, quantityreq: voucher.quantity, quantity: 0,rateaftertaxes: 0 };
  //     });
  //     console.log('NEW VCHS',this.voucherList)
  // }

  handlePickStock(v:any) {
      
    this.selectedItem = v.item
    this.selectedVoucher = v
    this.selectedStockBalances = v['stockbalanceinputs']
    this.selectedStockLocationBalance = v['stocklocationbalanceinputs']
    console.log('SSLBIs',this.selectedStockLocationBalance)
    console.log('V FOR PICK',v)
    const dictionary = {
      'id':v.item.itemdef.id,
      // 'serialnumber': false,
      // 'batchnumber': false,
      // 'expirydate': false,
      // 'brand': false
    };
    
    //this.showPickStockForm = true

    this.loadStockBalance(dictionary)
    this.loadStockLocationBalance(v.item.itemdef.id)

  }

    



    


    

  loadStockBalance(itemid:any) {

    this.inStockBalanceProgress = true

    console.log('IN STOCK BALANCES')
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:any = itemid;
    console.log('CRITERIA',criteria)
    let iService:StockBalanceItemService = new StockBalanceItemService(this.httpClient)
    this._sbSub = iService.fetchStockBalance(criteria).subscribe({
      complete: () => {
        console.info('complete')
      },
      error: (e) => {
        console.log('ERROR',e)
        this.showErrorViaToast('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.showErrorViaToast(dataError.error);
          this.inStockBalanceProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.selectedStockBalances = dataSuccess.success;
          let tempsbs = []
          for (let index = 0; index < this.selectedStockBalances.length; index++) {
            const element = this.selectedStockBalances[index];
            console.log('SSB',this.selectedVoucher['stockbalanceinputs'][index])
            element['id'] = index
            element['inputqty'] = this.selectedVoucher['stockbalanceinputs'][index]?.inputqty || 0;
            if(element['balance'] > 0) {
              const balance = Number(element['balance']).toFixed(2); // Limit to two decimal places
              element['balance'] = Number(balance);
              tempsbs.push(element)
            }
          }
          this.selectedStockBalances = tempsbs

          if (this.selectedStockBalances.length > 0) {
            let obj = this.selectedStockBalances[0]
            const dictionaryList = Object.keys(obj).map(key => {
              return { field: key };
            });
            this.sbcols = dictionaryList
          }
          console.log('SBCOLS',this.sbcols)
          console.log('STOCK BALANCES',this.selectedStockBalances)
          this.inStockBalanceProgress = false
          this.changeDetectorRef.detectChanges(); // Trigger change detection
          return;
        }
        else if(v == null) {
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          this.inStockBalanceProgress = false
          return;
        }
        else {
          this.inStockBalanceProgress = false
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }
  
  
  loadStockLocationBalance(itemid:any) {
  
      this.inStockBalanceProgress = true
  
      console.log('IN STOCK BALANCES')
      // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
      let criteria:any = {id:itemid};
      console.log('CRITERIA',criteria)
      
      let iService:StockLocationBalanceService = new StockLocationBalanceService(this.httpClient)
      this._sbSub = iService.fetchStockLocationBalance(criteria).subscribe({
        complete: () => {
          console.info('complete')
        },
        error: (e) => {
          console.log('ERROR',e)
          this.showErrorViaToast('A server error occured. '+e.message)
          return;
        },
        next: (v) => {
          console.log('NEXT',v);
          if (v.hasOwnProperty('error')) {
            let dataError:Xetaerror = <Xetaerror>v; 
            alert(dataError.error);
            this.inStockBalanceProgress = false
            return;
          }
          else if(v.hasOwnProperty('success')) {
            let dataSuccess:XetaSuccess = <XetaSuccess>v;
            this.selectedStockLocationBalance = dataSuccess.success;
            let tempsbs = []
            for (let index = 0; index < this.selectedStockLocationBalance.length; index++) {
              const element = this.selectedStockLocationBalance[index];
              element['inputqty'] = this.selectedVoucher['stocklocationbalanceinputs'][index]?.inputqty || 0;
              tempsbs.push(element)
              // if(element['balance'] > 0) {
              //   tempsbs.push(element)
              // }
            }
            this.selectedStockLocationBalance = tempsbs
            console.log('STOCK LOCATION BALANCES',this.selectedStockLocationBalance)
            this.inStockBalanceProgress = false
            this.changeDetectorRef.detectChanges(); // Trigger change detection
            return;
          }
          else if(v == null) {
            this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
            this.inStockBalanceProgress = false
            return;
          }
          else {
            this.inStockBalanceProgress = false
            this.showErrorViaToast('An undefined error has occurred.')
            return
          }
        }
      })
  }

  doneStockPick() {

      if (typeof this.selectedLocationQty === 'undefined' || this.selectedLocationQty == null || this.selectedLocationQty === 0) {
          this.showErrorViaToast('You must enter a location quantity greater than zero')
          return false
      }
    
      if(this.selectedVoucher['quantity'] != this.selectedLocationQty) {
          this.showErrorViaToast('You must enter a location quantity equal to actual quantity')
          return false
      }

      if(this.selectedVoucher['quantity'] == 0) {
          this.showErrorViaToast('You must enter a quantity greater than zero')
          return false
      }

      for (let index = 0; index < this.selectedStockBalances.length; index++) {
          const element = this.selectedStockBalances[index];
          if (element.title === 'possession' && this.selectedTitleOption === 'ownership') {
            this.showErrorViaToast('One or more items that are on possession are being transfered with ownership title.')
            return false
          }
      }

      
      console.log('SBS JP-WATER',JSON.stringify(this.selectedStockBalances))
  
      let sbs = []
      for (let index = 0; index < this.selectedStockBalances.length; index++) {
        const element = this.selectedStockBalances[index];
        if(parseFloat(element.inputqty) > 0) {
          sbs.push(element)
        }
      }


      this.selectedVoucher['stockbalanceinputs'] = JSON.parse(JSON.stringify(sbs))
  
      
      let slbs = []
      for (let index = 0; index < this.selectedStockLocationBalance.length; index++) {
        const element = this.selectedStockLocationBalance[index];
        if(parseFloat(element.inputqty) > 0) {
          slbs.push(element)
        }
      }

      this.selectedVoucher['stocklocationbalanceinputs'] = JSON.parse(JSON.stringify(slbs))


      console.log('VCHS',this.voucherList)
      //this.showPickStockForm = false

      return null

  }












  handleSaleDetails(v:any) {

    console.log('V IN SELECT PRICE',v)
    this.selectedItem = v.item
    this.selectedVoucher = v

    this.selectedStockBalances = v['stockbalanceinputs']
    this.selectedStockLocationBalance = v['stocklocationbalanceinputs']
    console.log('SSLBIs',this.selectedStockLocationBalance)
    console.log('V FOR PICK',v)
    const dictionary = {
      'id':v.item.itemdef.id,
      // 'serialnumber': false,
      // 'batchnumber': false,
      // 'expirydate': false,
      // 'brand': false
    };
  
    this.loadStockBalance(dictionary)
    this.loadStockLocationBalance(v.item.itemdef.id)

    this.selectedContextPrices = v.item.contextprices
    let dyncp:any = {
      context: 'DYNAMIC',
      saleprice: 0,
      taxes: []
    }
  
    this.selectedContextPrices = [...this.selectedContextPrices,dyncp]
    
    this.showSaleDetailsForm = true
      
  }



    

  ISODate(event:any) {

    console.log('DATE SELECTED',event)

    let date1 = moment(event).format('YYYY-MM-DD');
    let time1 = moment(event).format('HH:mm:ss.SSSZZ')
    let isoDateTime = date1+'T'+time1
    console.log('ISO DATE',isoDateTime) 
    
    return isoDateTime
      
  }




  filterAccountMaps(event:any) {
    console.log('IN FILTER PARTIES',event)
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    
    let searchtype = ''
    console.log('SELECTED ITEM',this.selectedItem)

    if (!this.displayReturnModal) {
      if(this.selectedItem === null) {
        this.showErrorViaToast('You must select an item')
        return
      }
      else if (this.selectedItem.itemdef.itemfatype === 'stock') {
        searchtype = 'stockitem-accounthead-contains'
      }
      else if(this.selectedItem.itemdef.itemfatype === 'asset') {
        searchtype = 'assetitem-accounthead-contains'
      }
      else if(this.selectedItem.itemdef.itemfatype === 'other') {
        searchtype = 'otheritem-accounthead-contains'
      } 
    }

    else if (this.displayReturnModal) {
      if (this.selectedPurchaseItem.itemfatype === 'stock') {
        searchtype = 'stockitem-accounthead-contains'
      }
      else if(this.selectedPurchaseItem.itemfatype === 'asset') {
        searchtype = 'assetitem-accounthead-contains'
      }
      else if(this.selectedPurchaseItem.itemfatype === 'other') {
        searchtype = 'otheritem-accounthead-contains'
      }
    }

    
    

    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:searchtype};
    console.log('CRITERIA',criteria)
    
    let pService:AccountHeadListService = new AccountHeadListService(this.httpClient)
    this._eSub = pService.fetchAccountHeads(criteria).subscribe({
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
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredAccountMaps = dataSuccess.success;
          this.changeDetectorRef.detectChanges()
          console.log('FILTERED PEOPLE',dataSuccess.success)
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }


    

  showNewTaxDialog() {
    this.taxFormMode = 'new'
    this.taxForm.reset()
    this.displayTaxModal = true;
  }

  onRowSelect(event:any) {
    if(event !== null) {
      console.log('ROW SELECT',event)
      this.selectedInvoice = event.data
    }
  }

    



  filterParties(event:any) {
    console.log('IN FILTER PARTIES',event)
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-accounthead-contains'};
    console.log('CRITERIA',criteria)
    let pService:AccountHeadListService = new AccountHeadListService(this.httpClient)
    this._eSub = pService.fetchAccountHeads(criteria).subscribe({
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
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredParties = dataSuccess.success;
          this.changeDetectorRef.detectChanges()
          console.log('FILTERED PEOPLE',dataSuccess.success)
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }

  handleOnSelectTaxParty(event:any) {
    //this.selectedTaxParty = event
  }

  handleOnSelectParty(event:any) {
    console.log('SELECTED PARTY',event)
    this.selectedParty = event
  }



  checkNameAndEndpointMatch(name: string, endpoint: string): boolean {
    // Convert name and endpoint to lowercase for case-insensitive comparison
    const lowerCaseName = name.toLowerCase();
    const lowerCaseEndpoint = endpoint.toLowerCase();
  
    // Iterate over each name in the names array
    for (const nm of this.xetaperson.entitycontent.names) {
      // Iterate over each endpoint in the endpoints array
      for (const ep of this.xetaperson.entitycontent.endpoints) {
        // Check if the endpoint type matches 'telephone' or 'emailid'
        if (ep.type === 'telephone' || ep.type === 'emailid') {
          // Check if the name and endpoint values match (case-insensitive)
          if (nm.name.toLowerCase() === lowerCaseName && ep.detail[ep.type].toLowerCase() === lowerCaseEndpoint) {
            return true;
          }
        }
      }
    }
  
    return false;
  }


  checkNameMatch(name: string): boolean {
    // Convert name to lowercase for case-insensitive comparison
    const lowerCaseName = name.toLowerCase();
  
    // Iterate over each name in the names array
    for (const nm of this.xetaperson.entitycontent.names) {
      // Check if the name value matches (case-insensitive)
      if (nm.name.toLowerCase() === lowerCaseName) {
        return true;
      }
    }
  
    return false;
  }



  saveSaleFromIndentForm() {



    for (let index = 0; index < this.voucherList.length; index++) {
      const element = this.voucherList[index];
      // if (typeof element.quantity === 'undefined' || element.quantity == null || element.quantity === 0) {
      //     this.showErrorViaToast('You must enter a quantity greater than zero for item '+element.item.itemdef.itemname)
      //     return false
      // }
      // if ((typeof element.accountmap === 'undefined' || element.accountmap == null) && element.title === 'ownership') {
      //     this.showErrorViaToast('You must select an account for '+element.item.itemdef.itemname)
      //     return false
      // }
      // if(element['title'] === '') {
      //     this.showErrorViaToast('You must select a title in SELECT PRICE for '+element.item.itemdef.itemname)
      //     return false
      // }

      const filteredStockBalanceInputs = element['stockbalanceinputs'].filter((item: { inputqty: any; }) => parseFloat(item.inputqty) > 0);
      element['stockbalanceinputs'] = filteredStockBalanceInputs
    }

    let nvList:any = JSON.parse(JSON.stringify(this.voucherList))

    for (let index = 0; index < nvList.length; index++) {
      const element = nvList[index];
      delete element.item
    }


    

    if (typeof this.selectedParty === 'undefined' || this.selectedParty == null) {
        this.showErrorViaToast('You must select a party')
        return false
    }

    if(!this.checkNameMatch(this.selectedParty.accounthead)) {
        this.showErrorViaToast('You must select a party that matches your customer name')
        return false
    }

    if(nvList.length === 0) {
        this.showErrorViaToast('You must enter atleast one voucher')
        return false
    }

    
    

    console.log('INVOICE',JSON.stringify(nvList))

    let invoice:any = {
      date:this.ISODate(new Date()),
      entity: {
        id:1
      },
      partyaccounthead:this.selectedParty,
      party: {
        "person": -1,
        "id": -1,
        "name": "",
        "endpoint": "",
        "displayfile": {}
      },
      vouchers:nvList,
      salesformtype:'sale',
      linkedmsgattach: {
        strucattach:this.selectedAttachment,
        fromp:this.selectedToMessage.fromp,
        top:this.selectedToMessage.top,
        subject:this.selectedToMessage.subject,
        body:this.selectedToMessage.body,
        timezone:this.selectedToMessage.timezone,
        xetamail:this.selectedToMessage.xetamail,
        direction:this.selectedToMessage.direction
      }

    }

    //console.log('XETAPERSON',JSON.stringify(this.xetaperson))

    console.log('SALEINVOICE',JSON.stringify(invoice))

    //return

    this.saveSale(invoice)

    

    
    let strucatts:any[] = []
    let f:any = {
      'id': this.highestRecordID(strucatts)+1,
      'formname':'sale',
      'vouchers':nvList
    }
    strucatts.push(f)
    let fls:any[] = []

    let fps = []
    let tps = []

    // console.log('XP MAIN',this.GlobalConstants.loginObject.xetamainperson)
    fps.push(this.GlobalConstants.loginObject.xetamainperson)
    tps.push(this.xetaperson)

    let xetamail = {
      from:fps,
      to:tps,
      subject:'',
      body:'Sale Invoice (auto reply)',
      strucattachs:strucatts,
      files:fls
    }
  
    console.log('SEND SALE MSG',JSON.stringify(xetamail))

    this.sendMessageTo(xetamail)

    return null

  }




  saveSale(newInvoice:any){

    this.inProgress = true
    
    let sah:SaveSaleService = new SaveSaleService(this.httpClient)
    this._siSub = sah.saveSale(newInvoice).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.showErrorViaToast('A server error occured while saving account head. '+e.message)
        return;
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //alert(dataError.error);
          this.showErrorViaToast(dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {

          this.inProgress = false
          this.showSuccessViaToast('globaltst','Successfully saved Sale Invoice.')
          this.displaySaleFromIndent = false
          this.displayViewTo = false
          
          return;
        }
        else if(v == null) {

          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return
        }
      }
    })

    return
  
  }

  




  








  showInfoViaToast() {
    this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }
    
  showWarnViaToast() {
    this.messageService.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
  }

  showErrorViaToast(detMsg:string) {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: detMsg });
  }

  showErrorViaToastGlobal(key:string,detMsg:string) {
    this.messageService.add({ key: key, severity: 'error', summary: 'Error Message', detail: detMsg });
  }

  showSuccessViaToast(key:string,detMsg:string) {
    this.messageService.add({ key: key, severity: 'success', summary: 'Success Message', detail: detMsg });
  }





  createSaleNew(attach:any) {
    console.log('ATTACH',attach)
    this.selectedAttachment = attach
    this.displaySaleFromIndent = true
    this.voucherList = attach.vouchers
    this.voucherList = attach.vouchers.map((voucher: any) => {
        return { ...voucher, quantityreq: voucher.quantity };
    });

    this.voucherList.forEach((voucher: any) => {
        this.rebuildVoucherNew(voucher);
    });

    console.log('NEW VCHS',this.voucherList)
  }


  rebuildVoucherNew(v:any) {
      
    // IN REBUILD VOUCHER

    
    
    v['action'] = 'iss'
    v['objecttype'] = 'item'
    v['object'] = JSON.parse(JSON.stringify(v.item.itemdef)) // only this.selectedItem because it is assigned in handleEditVoucher
    v['quantity'] = 0
    v['currency'] = '',
    v['fromdatetime'] = 'infinity'
    v['todatetime'] = 'infinity'
    v['duedatetime'] = 'infinity'
    v['userinputrate'] = 0
    if(this.ri === 'rit'){
      v['rateincludesvat'] = true
    }
    if(this.ri === 'ret') {
      v['rateincludesvat'] = false
    }

    v['taxes'] = []
    // if(isNaN(this.selectedDiscountPercent)) {
    //   this.selectedDiscountPercent = 0
    // }
    v['discountpercent'] = 0
    v['discountamount'] = 0
    v['rateafterdiscount'] = 0
    v['rateaftertaxes'] = 0
    v['taxfactor'] = this.calculateTaxFactorNew(v)
    v['taxesperunit'] = 0
    v['uom'] = {
      uom: "",
      symbol: "",
      country: ""
    }
    v['nonvattaxperunit'] = 0
    v['vattaxperunit'] = 0
    v['nonvatpercent'] = 0
    v['vatpercent'] = 0
    v['ratebeforetaxes'] = 0

    v['intofrom'] = {
      id: "0",
      itemname: "",
      iscontainer: "True",
      usercode: "",
      uom: {
        uom: "each",
        symbol: "each",
        country: "global"
      },
      taxes: [],
      files: [],
      recipe: {
        consumedunits: [],
        byproducts: []
      }
    }
    v['by'] = {
      itemid: "0",
      neid: "",
      relationshipid: "",
      name: ""
    }
    v['delivery'] ={
      id: "-1",
      accounthead: "",
      defaultgroup: "",
      relationship: "-1",
      neid: "-1",
      person: "-1",
      name: "",
      endpoint: "",
      rtype: ""
    }
    v['passedtitle'] = 'ownership'
    v['accountmap'] = null
    v['files'] = []
    v['expirydate'] = new Date()
    v['vendorperson'] = null
    
    v['location'] = {
      'location':''
    }

    v['stockbalanceinputs'] = []


    v['stocklocationbalanceinputs'] = []

    this.pcchangeNew(this.ri,v)

    return v

  }



  calculateTaxFactorNew(voucher:any) {

    let totaltaxperc:number = 0
    for (let index = 0; index < voucher['taxes'].length; index++) {
      const tax = voucher['taxes'][index];
      console.log('TAX',parseFloat(tax.taxpercent))
      totaltaxperc = parseFloat(tax.taxpercent) + totaltaxperc
      
    }
    let tf = 1+(totaltaxperc/100)
    console.log('TAXFACTOR',tf)
    //voucher['taxfactor'] = tf
    return tf
      
  }



  uirChangeNew(event:any,v:any) {

    let uir:number = parseFloat(event)

    
    if(!this.discountState) {
      this.discountAmount = uir*(this.inputDiscount/100)
      v['discountamount'] = this.discountAmount
      v['discountpercent'] = this.inputDiscount
      v['rateafterdiscount'] = v['userinputrate'] - this.discountAmount
    }

    if(this.discountState) {
      this.discountAmount = this.inputDiscount
      v['discountamount'] = this.inputDiscount
      v['discountpercent'] = (this.inputDiscount*100)/uir
      v['rateafterdiscount'] = v['userinputrate'] - this.discountAmount
    }

    if(isNaN(this.discountAmount)) {
      this.discountAmount = 0
      v['discountamount'] = 0
      v['rateafterdiscount'] = v['userinputrate'] - this.discountAmount
    }

    if(isNaN(v['rateafterdiscount'])) {
        v['rateafterdiscount'] = v['userinputrate']
    }

    console.log('V IN UIRCHANGE',v)

    this.pcchangeNew(this.ri,v)

  }


  cpChangeNew(event:any,v:any) {

      console.log('CP DROPDOWN CHANGE',event.value)
  
      if (event.value.context === 'DYNAMIC') {
        this.disableDynPrice = false
      }
      else if (event.value.context !== 'DYNAMIC') {
        this.disableDynPrice = true
      }
  
      if(event.value !== null) {
  
        v['userinputrate'] = event.value.saleprice
        v['taxes'] = event.value.taxes
        this.changeDetectorRef.detectChanges()
  
        // if context is DYNAMIC, selected UIR is dynamic price input
  
        for (let index = 0; index < v['taxes'].length; index++) {
          const element = v['taxes'][index];
          element['recordid'] = index
        }
  
        this.uirChangeNew({},v)
  
      }
  
      if(event.value === null) {
        v['userinputrate'] = 0
        v['taxes'] = []
        this.uirChangeNew({},v)
      }
  
      console.log('V IN CP CHANGE',v)
  
  }
    


  pcchangeNew(event:any,v:any) {
  
    console.log('RI EVENT',event)

    this.ri = event

    if(this.ri === 'rit') {
      v['ratebeforetaxes'] = v['rateafterdiscount']/this.calculateTaxFactorNew(v)
      v['rateaftertaxes'] = v['rateafterdiscount']
      v['taxesperunit'] = v['rateaftertaxes'] - v['ratebeforetaxes']
      
    }
    if(this.ri === 'ret') {
        v['ratebeforetaxes'] = v['rateafterdiscount']
        v['rateaftertaxes'] = v['rateafterdiscount']*this.calculateTaxFactorNew(v)
        v['taxesperunit'] = v['rateaftertaxes'] - v['ratebeforetaxes']
    }

    this.calculateSeparateTaxesNew(v)
      
  }
  
  
  calculateSeparateTaxesNew(v:any) {
      // this.totalvatperc = 0
      // this.totalnonvatperc = 0
      
      for (let index = 0; index < v['taxes'].length; index++) {
        const element = v['taxes'][index];
        let tt = element.taxtype.toLowerCase()
        if(tt === 'vat') {
          v['vatpercent'] = v['vatpercent'] + parseFloat(element.taxpercent)
        }
        if(tt === 'nonvat') {
          v['nonvatpercent'] = v['nonvatpercent'] + parseFloat(element.taxpercent)
        }
      }
  
      let totaltaxperc = v['vatpercent'] + v['nonvatpercent']
      v['vattaxperunit'] = (v['vatpercent']/totaltaxperc)*v['taxesperunit']
      v['nonvattaxperunit'] = (v['nonvatpercent']/totaltaxperc)*v['taxesperunit']
  
      if (isNaN(v['vattaxperunit'])) {
          v['vattaxperunit'] = 0
      }
  
      if (isNaN(v['nonvattaxperunit'])) {
          v['nonvattaxperunit'] = 0
      }
  
  
      console.log('TOTALVATPERC',v['vatpercent'])
      console.log('TOTALNONVATPERC',v['nonvatpercent'])
      console.log('TOTALTAXPERC',totaltaxperc)
      console.log('T',v['taxesperunit'])
      console.log('VATTAXPU',v['vattaxperunit'])
      console.log('NONVATTAXPU',v['nonvattaxperunit'])
  
  
      // individual taxperc / totaltaxperc * this.t
  
      for (let index = 0; index < v['taxes'].length; index++) {
        const element = v['taxes'][index];
  
        let ta = ((element.taxpercent / totaltaxperc) * v['taxesperunit'])
        element['taxamount'] = ta
        
      }
  
  
  }


  handleDiscountSwitchChangeNew(event:any,v:any) {
    this.discountState = event.checked
    console.log('DISCOUNT STATE',this.discountState)

    if(this.discountState) {
      this.discountLabel = 'discount amount'
      //this.selectedDiscountPercent 
    }
    if(!this.discountState) {
      this.discountLabel = 'discount percent'
    }

    if(this.inputDiscount === null || v['userinputrate'] === null) {
      return
    }

    if(this.discountState) {
      this.discountAmount = this.inputDiscount
      v['discountamount'] = this.inputDiscount
      v['discountpercent'] = (this.inputDiscount*100)/v['userinputrate']
      v['rateafterdiscount'] = v['userinputrate'] - this.discountAmount
    }
    if(!this.discountState) {
      this.discountAmount = v['userinputrate']*(this.inputDiscount/100)
      v['discountamount'] = this.discountAmount
      v['discountpercent'] = this.inputDiscount
      v['rateafterdiscount'] = v['userinputrate'] - this.discountAmount
    }

    if(isNaN(this.discountAmount)) {
      this.discountAmount = 0
      v['discountamount'] = 0
      v['rateafterdiscount'] = v['userinputrate'] - this.discountAmount
    }

    if(isNaN(v['rateafterdiscount'])) {
        v['rateafterdiscount'] = v['userinputrate']
    }

    this.pcchangeNew(this.ri,v)
  
  }



  discountChangeNew(event:any,v:any) {
  
    let d:number = parseFloat(event)

    if(v['userinputrate'] === null) {
      return
    }

    if(!this.discountState) {
      this.discountAmount = v['userinputrate']*(d/100)
      v['discountamount'] = this.discountAmount
      v['discountpercent'] = d
      v['rateafterdiscount'] = v['userinputrate'] - this.discountAmount

    }
    if(this.discountState) {
      this.discountAmount = d
      v['discountamount'] = d
      v['discountpercent'] = (d*100)/v['userinputrate']
      v['rateafterdiscount'] = v['userinputrate'] - d
    }

    if(isNaN(this.discountAmount)) {
      this.discountAmount = 0
      v['discountamount'] = 0
      v['rateafterdiscount'] = v['userinputrate'] - this.discountAmount
    }

    if(isNaN(v['rateafterdiscount'])) {
        v['rateafterdiscount'] = v['userinputrate']
    }

    this.pcchangeNew(this.ri,v)
  
  }


  handleOnSelectAccountMapNew(event:any,v:any) {
    v['accountmap'] = event
    //this.selectAccountMap.errors.required = false;
    if (this.selectAccountMap.errors !== null) {
      this.selectAccountMap.errors['required'] = false;
    }
  }
    
  accountMapChangeNew(event:any,v:any) {
    v['accountmap'] = null
    // console.log('AMAP ERRORS',this.selectAccountMap.errors)
    if (this.selectAccountMap.errors !== null) {
      this.selectAccountMap.errors['required'] = true;
    }
      
  }

  titleOptionChangeNew(event:any,v:any) {
      console.log('TITLE CHANGE',event)
      if (event === 'possession') {
        this.disableTitleOption = true
        v['accountmap'] = null
      }
      else if(event === 'ownership') {
        this.disableTitleOption = false
        v['accountmap'] = null
      }
  }

  handleAddTaxNew(v:any) {
      

    this.taxForm.controls['taxname'].touched = true
    this.taxForm.controls['taxauthority'].touched = true
    this.taxForm.controls['taxpercent'].touched = true
    this.taxForm.controls['taxtype'].touched = true
    

    if (this.taxForm.controls['taxname'].errors || this.taxForm.controls['taxname'].invalid) {
      const input = document.getElementById('taxname');
      if (input) {
        input.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }
      
      
      
    if (this.taxForm.controls['taxauthority'].errors ||  this.taxForm.controls['taxauthority'].invalid) {
      const input = document.getElementById('taxauthority');
      if (input) {
        input.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }

    if (this.taxForm.controls['taxpercent'].errors ||  this.taxForm.controls['taxpercent'].invalid) {
        const input = document.getElementById('taxpercent');
        if (input) {
          input.classList.add('ng-dirty', 'ng-invalid');
        }
        //return
    }

    if (this.taxForm.controls['taxtype'].errors ||  this.taxForm.controls['taxtype'].invalid) {
        const input = document.getElementById('taxtype');
        if (input) {
          input.classList.add('ng-dirty', 'ng-invalid');
        }
        //return
    }


    if (this.taxForm.invalid) {
      console.log('TAX FORM IS INVALID')
      for (const controlName in this.taxForm.controls) {
          if (this.taxForm.controls.hasOwnProperty(controlName)) {
            const control = this.taxForm.controls[controlName];
            
            if (control.errors) {
              console.log(`Validation errors for control ${controlName}:`, control.errors);
            }
          }
      }
      return;
    }
  

    if (this.taxFormMode === 'new') {
      this.taxForm.value['recordid'] = this.highestRecordID(v['taxes'])+1
      v['taxes'] = [...v['taxes'],this.taxForm.value]
    }
    else if (this.taxFormMode === 'edit') {

      console.log('EDIT T',this.taxForm.value)
      this.taxForm.value['recordid'] = this.selectedTax.recordid
      
      const index = v['taxes'].findIndex((tax:any) => tax.recordid === this.taxForm.value.recordid);
      console.log('T INDEX',index)

      if (index !== -1) {
          v['taxes'][index] = this.taxForm.value;
      }

      this.taxFormMode = 'new'
      this.taxForm.reset()
        
    }

    this.pcchangeNew(this.ri,v)

    this.displayTaxModal = false

    

  }


  handleTaxDeleteNew(event:any,v:any) {
      console.log('EVENT',event)
      v['taxes'].splice(event,1)
      this.pcchangeNew(this.ri,v)
  }
  
  handleTaxEditNew(tax:any,form:any) {
      this.taxFormMode = 'edit'
      console.log('TAX TO BE EDITED',tax)
      this.selectedTax = tax
      
      this.taxForm.patchValue({
          taxname: tax.taxname,
          taxcode: tax.taxcode,
          taxauthority: tax.taxauthority,
          taxpercent:tax.taxpercent,
          taxtype: tax.taxtype
      });
      if (form === 'sale') {
        this.displayTaxModal = true
      }
      else if(form === 'purchase') {
        this.displayTaxForPurchaseModal = true
        this.disableTax = true
      }
      
  }


  doneChangeSaleDetail(v:any) {

    console.log('VOUCHER IN SELECT PRICE',JSON.stringify(v))

    if (isNaN(this.selectedVoucher['quantity']) || this.selectedVoucher['quantity'] === 0) {
      this.showErrorViaToast('You must enter a valid quantity greater than zero');
      return false;
    }

    for (let index = 0; index < this.selectedStockBalances.length; index++) {
        const element = this.selectedStockBalances[index];
        if (element.title === 'possession' && v['passedtitle'] === 'ownership' && parseFloat(element.inputqty) > 0) {
          this.showErrorViaToast('One or more items that are on possession are being transfered with ownership title.')
          return false
        }
    }
    
    if (typeof this.selectedCP === 'undefined' || this.selectedCP == null) {
        this.showErrorViaToast('You must enter a sale price greater than or equal to zero')
        return false
    }

    if (typeof v['userinputrate'] === 'undefined' || v['userinputrate'] == null) {
        this.showErrorViaToast('You must enter a sale price greater than or equal to zero')
        return false
    }
  
    if ((typeof v['accountmap'] === 'undefined' || v['accountmap'] === null) && (v['title'] === 'ownership')) {
        this.showErrorViaToast('You must select an account')
        return false
    }

    if(v['title'] === '') {
        this.showErrorViaToast('You must select a title')
        return false
    }
    
    //this.rebuildVoucher(this.selectedVoucher)
    
    this.showSaleDetailsForm = false

    let sbs:any = []
    for (let index = 0; index < this.selectedStockBalances.length; index++) {
      const element = this.selectedStockBalances[index];
      // if(parseFloat(element.inputqty) > 0) {
      //   sbs.push(element)
      // }
      sbs.push(element)
      
    }


    this.selectedVoucher['stockbalanceinputs'] = JSON.parse(JSON.stringify(sbs))

    
    let slbs = []
    for (let index = 0; index < this.selectedStockLocationBalance.length; index++) {
      const element = this.selectedStockLocationBalance[index];
      if(parseFloat(element.inputqty) > 0) {
        slbs.push(element)
      }
    }

    this.selectedVoucher['stocklocationbalanceinputs'] = JSON.parse(JSON.stringify(slbs))


    console.log('VCHS',this.voucherList)

    this.selectedContextPrices = []
    
    

    return null

      

  }


  onNewSearchChangeNew(event:any,i:any,sb:any,v:any): void {
  
    //sb.inputqty = event.target.value
    
    this.selectedStockBalances[i].inputqty = event.target.value

    v['quantity'] = 0
    

    //console.log('V SBS',v['stockbalanceinputs'])

    if(parseFloat(this.selectedStockBalances[i].inputqty) < 0){
      this.showErrorViaToast('You cannot issue negative stock')
      event.target.value = 0
      sb.inputqty = 0
    }

    if(parseFloat(this.selectedStockBalances[i].balance) < parseFloat(event.target.value)) {
      this.showErrorViaToast('You cannot issue stock more than the available quantity')
      event.target.value = 0
      sb.inputqty = 0
    }

    v['stockbalanceinputs'] = this.selectedStockBalances

    console.log('V SBS AFTER',v['stockbalanceinputs'])

    v['quantity'] = 0
    for (let index = 0; index < this.selectedStockBalances.length; index++) {
      const element = this.selectedStockBalances[index];
      v['quantity'] = parseFloat(element.inputqty) + v['quantity']
      
    }
  
  }

    



    // onSearchSLBChangeNew(event:any,i:any,slb:any,v:any): void {  
    //     console.log('VALUE',event.target.value);
    //     slb.inputqty = event.target.value
    //     v['stocklocationbalanceinputs'][i] = slb
    //     //console.log('S Locaiton B',this.selectedStockLocationBalance)
    
    //     // this.selectedQty = 0
    
    //     if(parseFloat(this.selectedStockLocationBalance[i].inputqty) < 0){
    //       this.showErrorViaToast('You cannot issue negative stock')
    //       event.target.value = 0
    //       this.selectedStockLocationBalance[i].inputqty = 0
    //     }
    
    //     if(parseFloat(this.selectedStockLocationBalance[i].quantity) < parseFloat(event.target.value)) {
    //       this.showErrorViaToast('You cannot issue stock more than the available quantity')
    //       event.target.value = 0
    //       this.selectedStockLocationBalance[i].inputqty = 0
    //     }
    
    //     this.selectedLocationQty = 0
    //     for (let index = 0; index < this.selectedStockLocationBalance.length; index++) {
    //       const element = this.selectedStockLocationBalance[index];
    //       this.selectedLocationQty = parseFloat(element.inputqty) + this.selectedLocationQty
          
    //     }
    
    // }










































    // PURCHASE // PURCHASE // PURCHASE // PURCHASE //

  createPurchaseNew(attach:any) {

    console.log('ATTACH',attach)
    this.selectedAttachment = attach
    this.displayPurchaseFromSale = true
    this.pVoucherList = attach.vouchers
    this.displayReturnModal = true

    this.pVoucherList.forEach((voucher: any) => {
      // Loop through each tax in taxes
      voucher.taxes.forEach((tax: any) => {
        // Set the taxauthority to null
        tax.taxauthority = {
          'accounthead':''
        };
      });
      this.rebuildPurchaseVoucher(voucher);
    });

    console.log('NEW VCHS',this.pVoucherList)

  }

  rebuildPurchaseVoucher(v:any) {
    
    
    // IN REBUILD PURCHASE VOUCHER

    let vch:any = JSON.parse(JSON.stringify(v))

    //this.pcchange(this.ri)
    
    v['item'] = v.object
    v['action'] = 'rec'
    v['objecttype'] = 'item'
    v['object'] = {
      "itemname": "",
      "uom": {
        "uom": "",
        "symbol": "",
        "country": ""
      }
    }
    v['quantity'] = v['quantity']
    v['currency'] = '',
    v['fromdatetime'] = 'infinity'
    v['todatetime'] = 'infinity'
    v['duedatetime'] = 'infinity'
    v['expirydate'] = vch.expirydate
    v['userinputrate'] = vch.userinputrate
    if(vch['rateincludesvat'] == true) {
      this.ri = 'rit'
    }
    if(vch['rateincludesvat'] == false) {
      this.ri = 'ret'
    }
    if(this.ri === 'rit'){
      v['rateincludesvat'] = true
    }
    if(this.ri === 'ret') {
      v['rateincludesvat'] = false
    }

    v['taxes'] = JSON.parse(JSON.stringify(vch.taxes))
    // if(isNaN(this.selectedDiscountPercent)) {
    //   this.selectedDiscountPercent = 0
    // }
    v['discountpercent'] = vch.discountpercent
    v['discountamount'] = vch.discountamount
    v['rateafterdiscount'] = vch.rateafterdiscount
    v['rateaftertaxes'] = vch.rateaftertaxes
    v['taxfactor'] = vch.taxfactor
    v['taxesperunit'] = vch.taxesperunit
    v['uom'] = {
      uom: "",
      symbol: "",
      country: ""
    }
    v['nonvattaxperunit'] = vch.nonvattaxperunit
    v['vattaxperunit'] = vch.vattaxperunit
    v['nonvatpercent'] = vch.nonvatpercent
    v['vatpercent'] = vch.vatpercent
    v['ratebeforetaxes'] = vch.ratebeforetaxes

    v['intofrom'] = {
      id: "0",
      itemname: "",
      iscontainer: "True",
      usercode: "",
      uom: {
        uom: "each",
        symbol: "each",
        country: "global"
      },
      taxes: [],
      files: [],
      recipe: {
        consumedunits: [],
        byproducts: []
      }
    }
    v['by'] = {
      itemid: "0",
      neid: "",
      relationshipid: "",
      name: ""
    }
    v['delivery'] ={
      id: "-1",
      accounthead: "",
      defaultgroup: "",
      relationship: "-1",
      neid: "-1",
      person: "-1",
      name: "",
      endpoint: "",
      rtype: ""
    }
    v['title'] = vch.title
    v['accountmap'] = null
    v['files'] = []
    v['vendorperson'] = null
    

    v['location'] = null
    

    v['serialno'] = vch.serialno
    v['batchno'] = vch.batchno
    v['brand'] = vch.brand

    return v


  }




  filterItems(event:any) {
    console.log('IN FILTER ITEMS',event)
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'itemname-contains',attribute:''};
    console.log('CRITERIA',criteria)
    let iService:ItemsListService = new ItemsListService(this.httpClient)
    this._iSub = iService.fetchItems(criteria).subscribe({
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
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredItems = dataSuccess.success;
          this.changeDetectorRef.detectChanges()
          console.log('FILTERED ITEMS',dataSuccess.success)
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }

  filterFromLocations(event:any) {
    console.log('IN FILTER ITEMS',event)
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'contains',attribute:''};
    console.log('CRITERIA',criteria)
    
    let iService:StockLocationListService = new StockLocationListService(this.httpClient)
    this._iSub = iService.fetchStockLocations(criteria).subscribe({
      complete: () => {
        console.info('complete')
      },
      error: (e) => {
        console.log('ERROR',e)
        this.showErrorViaToast('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.showErrorViaToast(dataError.error);
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredFromLocations = dataSuccess.success;
          console.log('FILTERED STOCK LOCATIONS',dataSuccess.success)
          this.changeDetectorRef.detectChanges()
          return;
        }
        else if(v == null) {
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }



  handleOnSelectFromLocation(event:any,v:any) {
    v['location'] = event
    if (this.selectFromLocation.errors !== null) {
      this.selectFromLocation.errors['required'] = false;
    }
  }
  
  fromLocationChange(event:any,v:any) {
    console.log('LOCATION CHANGE',event)
    //this.selectedItemQuantity = ''
    if (this.selectFromLocation.errors !== null) {
      this.selectFromLocation.errors['required'] = false;
    }
  }


    

  handlePurchaseDetails(v:any) {

    console.log('V FOR PURCH',v)
    this.selectedPurchaseItem = v.item
    this.selectedPurchaseVoucher = v
    console.log('TAXES',this.selectedPurchaseVoucher.taxes)
    this.changeDetectorRef.detectChanges()

    //v['quantity'] = v['quantityreq']
    v['title'] = v['passedtitle']

    if (v['title'] === 'ownership') {
      this.disableTitleOption = false
    }
    else if (v['title'] === 'possession') {
      this.disableTitleOption = true
    }


    this.showPurchaseDetailsForm = true

  }

  handleOnSelectTaxPartyForPurchase(event:any,tax:any) {
    tax.taxauthority = event
  }

  doneChangePurchaseDetail(v:any) {

    if((v['accountmap'] === null || typeof v['accountmap'] === 'undefined') && (v['title'] === 'ownership')) {
      this.showErrorViaToast('You must select an account map')
      return
    }

    // Iterate through the taxes array and check if tax.taxauthority.accounthead is empty
    for (const tax of v['taxes']) {
      if (tax.taxauthority.accounthead === '') {
        this.showErrorViaToast('One or more taxes does not have tax authority selected.')
        return
      }
    }

    if(v['location'] === '') {
      this.showErrorViaToast('You must select a location.')
    }

    console.log('V TBS',v)

    //console.log('PARTY',this.selectedParty)

    this.showPurchaseDetailsForm = false

  }


  purchaseItemChange(e:any,v:any) {
    //console.log('V IN CHANGE',v)

    v.object = {
      'item': {
        'itemname':'',
        'uom': {
            'uom':''
        }
      }
    }

  }

  handleOnSelectPurchaseItem(e:any,v:any) {
    //console.log('V E',e)
    v.object = e
  }

  savePurchaseFromSaleInvoice() {

    for (let index = 0; index < this.pVoucherList.length; index++) {
      const element = this.pVoucherList[index];
      // if (typeof element.quantity === 'undefined' || element.quantity == null || element.quantity === 0) {
      //     this.showErrorViaToast('You must enter a quantity greater than zero for item '+element.item.itemdef.itemname)
      //     return false
      // }
      // if ((typeof element.accountmap === 'undefined' || element.accountmap == null) && element.title === 'ownership') {
      //     this.showErrorViaToast('You must select an account for '+element.item.itemdef.itemname)
      //     return false
      // }
      // if(element['title'] === '') {
      //     this.showErrorViaToast('You must select a title in SELECT PRICE for '+element.item.itemdef.itemname)
      //     return false
      // }

      if (element['object']['itemname'] === '') {
        this.showErrorViaToast('You must select an item for one or more vouchers')
        return
      }

      if (element['location'] === '') {
        this.showErrorViaToast('You must select location for one or more vouchers')
        return
      }
      

      if((element['accountmap'] === null || typeof element['accountmap'] === 'undefined') && (element['title'] === 'ownership')) {
        this.showErrorViaToast('You must select an account map for one or more vouchers')
        return
      }

      // Iterate through the taxes array and check if tax.taxauthority.accounthead is empty
      for (const tax of element['taxes']) {
        if (tax.taxauthority.accounthead === '') {
          this.showErrorViaToast('One or more taxes does not have tax authority selected.')
          return
        }
      }

      
    }

    let nvList:any = JSON.parse(JSON.stringify(this.pVoucherList))

    for (let index = 0; index < nvList.length; index++) {
        const element = nvList[index];
        delete element.item
    }


  

    if (typeof this.selectedParty === 'undefined' || this.selectedParty == null) {
        this.showErrorViaToast('You must select a party')
        return false
    }

    if(!this.checkNameMatch(this.selectedParty.accounthead)) {
        this.showErrorViaToast('You must select a party that matches your customer name')
        return false
    }

    if(nvList.length === 0) {
        this.showErrorViaToast('You must enter atleast one voucher')
        return false
    }

    let invoice:any = {
      date:this.ISODate(new Date()),
      entity: {
          id:1
      },
      partyaccounthead:this.selectedParty,
      party: {
          "person": -1,
          "id": -1,
          "name": "",
          "endpoint": "",
          "displayfile": {}
      },
      vouchers:nvList,
      linkedmsgattach: {
          strucattach:this.selectedAttachment,
          fromp:this.selectedToMessage.fromp,
          top:this.selectedToMessage.top,
          subject:this.selectedToMessage.subject,
          body:this.selectedToMessage.body,
          timezone:this.selectedToMessage.timezone,
          xetamail:this.selectedToMessage.xetamail,
          direction:this.selectedToMessage.direction
      }

    }

    console.log('INVOICE TO BE SAVED',JSON.stringify(invoice))

    this.savePurchase(invoice)

    return null

  }


  savePurchase(newInvoice:any){

    this.inProgress = true
    
    let sah:SavePurchaseService = new SavePurchaseService(this.httpClient)
    this._siSub = sah.savePurchase(newInvoice).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.showErrorViaToast('A server error occured while saving account head. '+e.message)
        return;
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //alert(dataError.error);
          this.showErrorViaToast(dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {

          this.inProgress = false
          this.showSuccessViaToast('globaltst','Successfully saved Purchase Invoice')
          this.displayPurchaseFromSale = false
          this.displayViewTo = false
          // this.displayModal = false
          // this.sanitizedInvoiceList
          // this.loadInvoices(0,0)
          return;
        }
        else if(v == null) {

          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return
        }
      }
    })

    return

  }

    
    
























  // PAYMENT PAYMENT PAYMENT PAYMENT PAYMENT
  
  payment() {
    this.showForm = false;
    this.showPaymentForm = true
    this.currentFormName = 'payment'

    // Check if payVoucherList contains a voucher with instrumenttype 'cash'
    const hasCashVoucher = this.payVoucherList.some(voucher => voucher.object.instrumenttype === 'cash');
    // Add cashVoucher to payVoucherList only if it doesn't already exist
    if (!hasCashVoucher) {
        this.payVoucherList.push(this.cashVoucher);
    }
    console.log('PAY VOUCHERS',this.payVoucherList)
  }


  showChequeDialog() {

    if (this.selectedParty === null || typeof this.selectedParty === 'undefined') {
      this.showErrorViaToast('You must select a party.')
      return
    }

    if(!this.checkNameMatch(this.selectedParty.accounthead)) {
      this.showErrorViaToast('You must select a party that matches your vendor name')
      return
    }

    console.log('XP',this.xetaperson)
    console.log('SP',this.selectedParty)

    this.selectedCP = null
    // displayChequeModal is set in loadCheques
    console.log('SELE PARTY',this.selectedParty)
    this.loadChequesOfPerson(this.selectedParty.id)

    this.displayChequeModal = true

    
  }

  showViaPersonDialog() {

    this.selectedViaPerson = null
    this.selectedViaPersonAmount = null
    this.selectedPaymentMode = null
    this.displayViaPersonModal = true;
  }

  handleEditPaymentVoucher(v:any) {
    
    console.log('VOUCHER TO BE EDITED',v)

    this.selectedPaymentVoucher = v

    if(v.object.instrumenttype === 'cash') {

      //this.selectedCashAmount = v.object.amount
      this.displayCashModal = true
      return
    }

    if(v.object.instrumenttype === 'cheque') {
      this.selectedCP = v.object
      //this.selectedVoucherid = v.recordid
      this.displayReceiveChequeModal = true
    }

  }


  handleDeletePaymentVoucher(index:any) {
    console.log('V',index)
    if (index===0) {
      return
    }
    this.payVoucherList.splice(index,1)
  }

  cashAmountChange(event:any) {

    let ca:number = parseFloat(event)

    if(isNaN(ca)) {
      ca = 0
    }

    // this.selectedCashAmount = ca
    // let cashVoucher:any = this.selectedVouchers[0]
    
    this.selectedPaymentVoucher.object.amount = ca
    this.selectedPaymentVoucher.userinputrate = ca

  }

  cpChange(event:any) {

    if(event.value !== null) {

      this.selectedCP = event.value
      
      //this.selectedCP.drawer = this.selectedParty
      
    }
    console.log('SELECTED CP',this.selectedCP)

    if(event.value === null) {
      this.selectedCP = null
    }
  }

  

  loadWrittenCheques(offset:number,moreoffset:number) {

    this.inProgress = true
    
    let ahlService:ChequeListService = new ChequeListService(this.httpClient)
    let criteria:any = {draweeis:'ourbank',offset:moreoffset};
    console.log('CRITERIA',criteria)
    this._invSub = ahlService.fetchCheques(criteria).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        this.inProgress = false
        this.showErrorViaToast('A server error occured while fetching cheques. '+e.message)
        return
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.showErrorViaToast(dataError.error)
          this.inProgress = false
          return
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.writtenChequeList = []
          this.writtenChequeList = dataSuccess.success
          //this.totalRecords = this.chequeList.length
          //console.log('TOTAL RECORDS',this.totalRecords)
          // this.items = this.masterCopy.slice(offset,this.recordsPerPage+offset);
          
          this.inProgress = false
          return
        }
        else if(v == null) { 
          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return false
        }
      }
    })

  }


  loadChequesOfPerson(personid:any) {

    this.inProgress = true

    console.log('IN CHEQUES OF PERSON')
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    
    let criteria:any = {
      person: personid,
      offset: 0,
      draweeis: "ourbank"
    }
    
    console.log('CRITERIA',criteria)
    
    let iService:ChequesOfPersonService = new ChequesOfPersonService(this.httpClient)
    this._chSub = iService.fetchChequesOfPerson(criteria).subscribe({
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
          this.selectedChequesOfPerson = dataSuccess.success;
          console.log('CHEQUES OF PERSON',dataSuccess.success)
          this.inProgress = false
          //this.displayChequeModal = true
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



  handleAddCheque(){

    console.log('CHEQUE',this.selectedCP)
    

    if (typeof this.selectedCP === 'undefined' || this.selectedCP == null) {
      this.showErrorViaToast('You must select a cheque')
      return false
    }

    if(this.chequeAlreadySelected(this.selectedCP)) {
      this.showErrorViaToast('This cheque has already been selected.')
      return false
    }

    
    
    let v:any = this.buildChequeVoucher()
    v['isviaperson'] = false
    this.payVoucherList.push(v)
    
    this.displayChequeModal = false
    return false

  }



  buildChequeVoucher() {
    
    let v:any = {}
    v['action'] = 'iss'
    v['objecttype'] = 'instrument'
    v['object'] = JSON.parse(JSON.stringify(this.selectedCP))
    v['isviaperson'] = false
    v['quantity'] = 1
    v['currency'] = '',
    v['fromdatetime'] = 'infinity'
    v['todatetime'] = 'infinity'
    v['duedatetime'] = 'infinity'
    v['userinputrate'] = this.selectedCP.amount
    v['rateincludesvat'] = true
    

    v['taxes'] = []
    
    v['discountpercent'] = 0
    v['discountamount'] = 0
    v['rateafterdiscount'] = 0
    v['rateaftertaxes'] = 0
    v['taxfactor'] = 0
    v['taxesperunit'] = 0
    v['uom'] = {
      uom: "each",
      symbol: "each",
      country: "global"
    }
    
    v['nonvattaxperunit'] = 0
    
    v['vattaxperunit'] = 0
    v['nonvatpercent'] = 0
    v['vatpercent'] = 0
    v['ratebeforetaxes'] = 0

    v['intofrom'] = {
      id: "0",
      itemname: "",
      iscontainer: "True",
      usercode: "",
      uom: {
        uom: "each",
        symbol: "each",
        country: "global"
      },
      taxes: [],
      files: [],
      recipe: {
        consumedunits: [],
        byproducts: []
      }
    }
    v['by'] = {
      itemid: "0",
      neid: "",
      relationshipid: "",
      name: ""
    }
    v['delivery'] ={
      id: "-1",
      accounthead: "",
      defaultgroup: "",
      relationship: "-1",
      neid: "-1",
      person: "-1",
      name: "",
      endpoint: "",
      rtype: ""
    }
    v['title'] = ""
    v['accountmap'] = JSON.parse(JSON.stringify(this.selectedCP.cashtypeah))
    v['files'] = []
    v['expirydate'] = new Date()
    v['vendorperson'] = null

    v['recordid'] = this.highestRecordID(this.payVoucherList) + 1


    return v

  }

  chequeAlreadySelected(ch:any) {
    let there:boolean = false
    for (let index = 0; index < this.payVoucherList.length; index++) {
      const element = this.payVoucherList[index];
      console.log('ELEMENT',element)
      console.log('CH',ch)
      if(element.object.instrumentnumber === ch.instrumentnumber) {
        there = true
        break
      }
    }
    return there
  }


  showWriteChequeListDialog() {
    //this.displayWriteChequeListModal = true
    this.showChequeWrittenDetailModal = true
  }

  showWriteChequeDetailDialog() {
    this.selectedWriteChequeDate = new Date()
    this.selectedParty = null
    this.selectedWriteChequeBankParty = null
    this.displayWriteChequeDetailModal = true
  }

  handleMoreWriteChequeList() {

  }

  handleViewWrittenCheque(ch:any) {

  }

  writeChequeDateSelected(event:any) {

    console.log('DATE SELECTED',event)

    let date1 = moment(event).format('YYYY-MM-DD');
    let time1 = moment(event).format('HH:mm:ss.SSSZZ')
    let isoDateTime = date1+'T'+time1
    console.log('ISO DATE',isoDateTime)
    this.newCheque.date = isoDateTime
    //this.selectedDate = isoDateTime
   
  }

  writeChequePartyChange(event:any) {
    this.newCheque.drawer =  {
      id: "",
      accounthead: "",
      defaultgroup: "",
      relationship: "",
      neid: "",
      person: "",
      name: "",
      endpoint: "",
      accounttype: "",
      partofgroup: -1,
      isgroup: false
    }
  }


  filterWriteChequeBankParties(event:any) {
    console.log('IN FILTER PARTIES',event)
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'bank-party-accounthead-contains'};
    console.log('CRITERIA',criteria)
    let pService:AccountHeadListService = new AccountHeadListService(this.httpClient)
    this._pSub = pService.fetchAccountHeads(criteria).subscribe({
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
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredBankParties = dataSuccess.success;
          console.log('FILTERED BANKS',dataSuccess.success)
          this.changeDetectorRef.detectChanges()
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }




  handleOnSelectWriteChequeBankParty(event:any) {
    this.selectedWriteChequeBankParty = event
    this.newCheque.drawee = event;
  }

  writeChequeBankPartyChange(event:any) {
    this.newCheque.drawee =  {
      id: "",
      accounthead: "",
      defaultgroup: "",
      relationship: "",
      neid: "",
      person: "",
      name: "",
      endpoint: "",
      accounttype: "",
      partofgroup: -1,
      isgroup: false
    }
  }


  handleSaveWrittenCheque() {

    if (typeof this.selectedWriteChequeNumber === 'undefined' || this.selectedWriteChequeNumber == null || this.selectedWriteChequeNumber === '') {
      this.showErrorViaToast('You must enter cheque number')
      return false
    }

    if (typeof this.selectedParty === 'undefined' || this.selectedParty == null) {
      this.showErrorViaToast('You must select a party')
      return false
    }

    if (typeof this.selectedWriteChequeBankParty === 'undefined' || this.selectedWriteChequeBankParty == null) {
      this.showErrorViaToast('You must select a bank')
      return false
    }
  
    if (typeof this.selectedWriteChequeVal === 'undefined' || this.selectedWriteChequeVal == null ) {
      this.showErrorViaToast('You must enter cheque amount')
      return false
    }

    

    this.selectedParty.person = this.selectedParty.id 

    let cheque:any = {
      maturitydate: this.ISODate(this.selectedWriteChequeDate),
      instrumentnumber: this.selectedWriteChequeNumber.toString(),
      drawer: this.selectedParty,
      drawee: this.selectedWriteChequeBankParty,
      amount: this.selectedWriteChequeVal,
      draweeis: "ourbank",
      status: "",
      unclearedchequesaccount: {
        person: "",
        rtype: "",
        id: "2139",
        neid: "",
        accounthead: "Uncleared Cheques",
        defaultgroup: "equity",
        relationship: "",
        endpoint: "",
        name: ""
      },
      cashtypeah: {
        id: "2",
        accounthead: "Cheques",
        defaultgroup: "cash",
        neid: "",
        person: "",
        endpoint: "",
        rtype: ""
      },
      files: [],
      instrumenttype: "cheque",
      uom: {
        uom: "each",
        country: "global",
        symbol: "each"
      }
    }

    console.log('CHEQUE TO BE SAVED',JSON.stringify(cheque))

    this.saveWrittenCheque(cheque)

    return false

  }


  
  saveWrittenCheque(cheque:any) {
    this.inProgress = true
    let sah:SaveChequeService = new SaveChequeService(this.httpClient)
    this._piSub = sah.saveCheque(cheque).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.showErrorViaToast('A server error occured while saving account head. '+e.message)
        return;
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //alert(dataError.error);
          this.showErrorViaToast(dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {

          this.inProgress = false
          this.displayWriteChequeDetailModal = false
          this.loadWrittenCheques(0,0)
          return;
        }
        else if(v == null) {

          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return
        }
      }
    })

    return
  }








  handleMore() {
    this.writtenChequesoffset = this.writtenChequesoffset + 500
    this.loadWrittenChequesMore(this.writtenChequesoffset)
  }


  loadWrittenChequesMore(offset:number) {

    this.inProgress = true
    
    let ahlService:ChequeListService = new ChequeListService(this.httpClient)
    let criteria:any = {draweeis:'anybank',offset:offset};
    console.log('CRITERIA',criteria)
    this._invSub = ahlService.fetchCheques(criteria).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        this.inProgress = false
        this.showErrorViaToast('A server error occured while fetching cheques. '+e.message)
        return
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.showErrorViaToast(dataError.error)
          this.inProgress = false
          return
        }
        else if(v.hasOwnProperty('success')) {
          
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          let newCheques:any[] = dataSuccess.success
          for (let index = 0; index < newCheques.length; index++) {
            const element = newCheques[index];
            this.writtenChequeList.push(JSON.parse(JSON.stringify(element)))
          }
          
          this.inProgress = false
          return
        }
        else if(v == null) { 
          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return false
        }
      }
    })

  }


  handleAddViaPerson() {
    
    if(this.selectedViaPersonAmount == 0) {
      this.showErrorViaToast('You must enter an amount greater than zero')
      return false
    }

    if(typeof this.selectedPaymentMode === 'undefined' || this.selectedPaymentMode == null) {
      this.showErrorViaToast('You must select a payment mode.')
      return false
    }
    
    let v:any = this.buildViaPersonVoucher()
    v['isviaperson'] = true
    this.payVoucherList.push(v)
    
    this.displayViaPersonModal = false
    return false

  }


  buildViaPersonVoucher() {
    /*
      {
      action: "rec",
      objecttype: "item",
      object: {
        itemname:null
      },
      quantity: null,
      currency: "",
      fromdatetime: "",
      todatetime: "",
      duedatetime: "",
      userinputrate: null,
      rateincludesvat: "True",
      taxes: [],
      discountpercent: null,
      discountamount: null,
      rateafterdiscount: null,
      rateaftertaxes: null,
      taxfactor: 1,
      taxesperunit: null,
      uom: {
        uom: "",
        symbol: "",
        country: ""
      },
      nonvattaxperunit: null,
      vattaxperunit: null,
      nonvatpercent: null,
      vatpercent: null,
      ratebeforetaxes: null,
      intofrom: {
        id: "0",
        itemname: "",
        iscontainer: "True",
        usercode: "",
        uom: {
          uom: "each",
          symbol: "each",
          country: "global"
        },
        taxes: [],
        files: [],
        recipe: {
          consumedunits: [],
          byproducts: []
        }
      },
      by: {
        itemid: "0",
        neid: "",
        relationshipid: "",
        name: ""
      },
      delivery: {
        id: "-1",
        accounthead: "",
        defaultgroup: "",
        relationship: "-1",
        neid: "-1",
        person: "-1",
        name: "",
        endpoint: "",
        rtype: ""
      },
      title: "",
      accountmap: {
        id: "",
        accounthead: "",
        defaultgroup: "",
        relationship: "",
        neid: "",
        person: "",
        name: "",
        endpoint: "",
        accounttype: "",
        partofgroup: -1,
        isgroup: false
      },
      files: [],
      expirydate: new Date(),
      vendorperson: null
    }
    */

    

    let v:any = {}
    v['action'] = 'iss'
    v['objecttype'] = 'person'
    v['object'] = JSON.parse(JSON.stringify(this.selectedViaPerson))
    v['isviaperson'] = true;
    v['quantity'] = 1
    v['currency'] = '',
    v['fromdatetime'] = 'infinity'
    v['todatetime'] = 'infinity'
    v['duedatetime'] = 'infinity'
    v['userinputrate'] = this.selectedViaPersonAmount
    v['rateincludesvat'] = true
    

    v['taxes'] = []
    
    v['discountpercent'] = 0
    v['discountamount'] = 0
    v['rateafterdiscount'] = 0
    v['rateaftertaxes'] = 0
    v['taxfactor'] = 0
    v['taxesperunit'] = 0
    v['uom'] = {
      uom: "each",
      symbol: "each",
      country: "global"
    }
    
    v['nonvattaxperunit'] = 0
    
    v['vattaxperunit'] = 0
    v['nonvatpercent'] = 0
    v['vatpercent'] = 0
    v['ratebeforetaxes'] = 0

    v['intofrom'] = {
      id: "0",
      itemname: "",
      iscontainer: "True",
      usercode: "",
      uom: {
        uom: "each",
        symbol: "each",
        country: "global"
      },
      taxes: [],
      files: [],
      recipe: {
        consumedunits: [],
        byproducts: []
      }
    }
    v['by'] = {
      itemid: "0",
      neid: "",
      relationshipid: "",
      name: ""
    }
    v['delivery'] ={
      id: "-1",
      accounthead: "",
      defaultgroup: "",
      relationship: "-1",
      neid: "-1",
      person: "-1",
      name: "",
      endpoint: "",
      rtype: ""
    }
    v['title'] = ""
    v['accountmap'] = null
    v['files'] = []
    v['expirydate'] = new Date()
    v['vendorperson'] = null
    v['paymentmode'] = this.selectedPaymentMode

    v['recordid'] = this.highestRecordID(this.payVoucherList) + 1


    return v

  }

  filterViaPeople(event:any) {
    console.log('IN FILTER PARTIES',event)
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-accounthead-contains'};
    console.log('CRITERIA',criteria)
    let pService:AccountHeadListService = new AccountHeadListService(this.httpClient)
    this._eSub = pService.fetchAccountHeads(criteria).subscribe({
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
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredViaPeople = dataSuccess.success;
          console.log('FILTERED PEOPLE',dataSuccess.success)
          this.changeDetectorRef.detectChanges()
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }



  handleOnSelectViaPerson(event:any) {
    this.selectedViaPerson = event
    //this.newInvoice.partyaccounthead = event;

  }

  viaPersonChange(event:any) {
    //console.log('EVENT',event)
    this.selectedViaPerson = event
    this.selectedReceiptVoucher.object = event
  }

  viaPersonAmountChange(event:any) {
    console.log('EVENT',event);
  }


  // handleChange(e:any) {
  //   //this.companyName.tags = this.selectedTags 
  // }

  filterModeTags(event:any) {
    console.log('IN FILTER TAGS',event)
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'begins'};
    console.log('CRITERIA',criteria)
    
    let pService:TagListService = new TagListService(this.httpClient)
    this._eSub = pService.fetchTags(criteria).subscribe({
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
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredModeTags = dataSuccess.success;
          console.log('FILTERED TAGS',dataSuccess.success)
          this.changeDetectorRef.detectChanges()
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }


  savePaymentForm() {
    // this.selectedEntity = {
    //   id:1
    // }
    // if (typeof this.selectedEntity === 'undefined' || this.selectedEntity == null) {
    //   this.confirm('You must select an entity')
    //   return false
    // }

    if (typeof this.selectedParty === 'undefined' || this.selectedParty == null) {
      this.showErrorViaToast('You must select a party')
      return false
    }

    if(!this.checkNameMatch(this.selectedParty.accounthead)) {
      this.showErrorViaToast('You must select a party that matches your vendor name')
      return false
    }

    if(this.payVoucherList.length === 1) {
      console.log('CASH VOUCHER',this.payVoucherList[0].object)
      
      if(parseFloat(this.payVoucherList[0].object.amount) === 0) {
        this.showErrorViaToast('You must enter cash greater than zero')
        return false
      }
      
    }

    console.log('FORM MODE',this.formMode)

    if (this.formMode === 'new') {
      this.form = {
        'id': this.highestRecordID(this.strucattachs)+1,
        'formname':this.currentFormName,
        'vouchers':this.payVoucherList
      }
      this.strucattachs.push(this.form) 
    }
    else if(this.formMode === 'edit') {
      let a:any = this.recordByRecordID(this.form.id,this.payVoucherList)
      console.log('AID',a.id)
      a['vouchers'] = this.payVoucherList
        
    }

    

    

    let newInvoice:any = {}
    newInvoice['date'] = this.ISODate(this.selectedWriteChequeDate)
    newInvoice['entity'] = {
      id:1
    }
    newInvoice['partyaccounthead'] = this.selectedParty
    newInvoice['party'] = {'person':-1,'id':-1,'name':"",'endpoint':"",'displayfile':{}}
    newInvoice['vouchers'] = this.payVoucherList
    // newInvoice['linkedmsgattach'] = {
    //   strucattach:this.selectedAttachment,
    //   fromp:this.selectedToMessage.fromp,
    //   top:this.selectedToMessage.top,
    //   subject:this.selectedToMessage.subject,
    //   body:this.selectedToMessage.body,
    //   timezone:this.selectedToMessage.timezone,
    //   xetamail:this.selectedToMessage.xetamail,
    //   direction:this.selectedToMessage.direction
    // }


    console.log('INVOICE TO BE SAVED',JSON.stringify(newInvoice))

    this.savePayment(newInvoice)

    return false

  }


  savePayment(newInvoice:any){

    this.inProgress = true
    
    let sah:SavePaymentService = new SavePaymentService(this.httpClient)
    this._piSub = sah.savePayment(newInvoice).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.showErrorViaToast('A server error occured while saving account head. '+e.message)
        return;
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //alert(dataError.error);
          this.showErrorViaToast(dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {

          this.inProgress = false
          
          // this.displayModal = false
          // this.sanitizedInvoiceList
          // this.loadInvoices(0,0)
          // this.loadPartyBalances(0,0)

          let strucatts:any[] = []
          let f:any = {
            'id': this.highestRecordID(strucatts)+1,
            'formname':'payment',
            'vouchers':this.payVoucherList
          }
          strucatts.push(f)
          let fls:any[] = []

          let fps = []
          let tps = []

          // console.log('XP MAIN',this.GlobalConstants.loginObject.xetamainperson)
          fps.push(this.GlobalConstants.loginObject.xetamainperson)
          tps.push(this.xetaperson)

          let xetamail = {
            from:fps,
            to:tps,
            subject:'',
            body:'Payment (auto reply)',
            strucattachs:strucatts,
            files:fls
          }
        
          console.log('SEND SALE MSG',JSON.stringify(xetamail))

          this.sendMessageTo(xetamail)

          this.showPaymentForm = false;
          this.display = false;

          this.cancelMessage({})

          return;
        }
        else if(v == null) {

          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return
        }
      }
    })

    return

  }






























  // RECEIPT // RECEIPT // RECEIPT // RECEIPT //

  createReceiptNew(attach:any) { 

    console.log('ATTACH',attach)
    this.selectedAttachment = attach
    
    this.recVoucherList = attach.vouchers
    this.displayReceipt = true

    //this.displayReturnModal = true

    this.recVoucherList.forEach((voucher: any) => {
      // Loop through each tax in taxes
      // voucher.taxes.forEach((tax: any) => {
      //   // Set the taxauthority to null
      //   // tax.taxauthority = {
      //   //   'accounthead':''
      //   // };
      // });
      //this.rebuildReceiptVoucher(voucher);

      //console.log('VCH OBJECT',voucher)

      if (voucher.objecttype === 'person') {
        voucher = this.rebuildViaPersonVoucher(voucher)
      }
      else if (voucher.objecttype === 'instrument') {
        if(voucher.object.instrumenttype === 'cash') {
          voucher = this.rebuildCashVoucher(voucher)
        }
        else if(voucher.object.instrumenttype === 'cheque') {
          voucher = this.rebuildChequeVoucher(voucher)
        }
      }
      

    });

    console.log('NEW VCHS',this.recVoucherList)

  }


  rebuildCashVoucher(v:any) {
    
    v['taxesperunit'] = "0.00",
    v['originalrateaftertaxes']= "0.00",
    v['fromdatetime']= "",
    v['vattaxperunit'] = "0.00",
    v['ratebeforetaxes'] = "0.00",
    v['title']= "",
    v['files'] = [],
    v['discountamount'] = "0.00",
    v['isviaperson']=false,
    v['object'] = {
      id: "1",
      uom: {
        uom: "each",
        country: "global",
        symbol: "each"
      },
      promisorah: {
        accounthead: "",
        id: "-1",
        endpoint: "",
        neid: "-1",
        defaultgroup: "",
        person: "-1"
      },
      instrumenttype: "cash",
      amount: v['object']['amount'],
      instrumentnumber: "",
      promiseeah: {
        accounthead: "",
        id: "-1",
        endpoint: "",
        neid: "-1",
        defaultgroup: "",
        person: "-1"
      },
      maturitydate: "",
      promisee: {
        endpoint: "",
        id: "-1",
        name: "",
        similarity: "0.000000",
        person: "-1"
      },
      cashtypeah: {
        accounthead: "Cash",
        id: "1",
        endpoint: "",
        neid: "0",
        defaultgroup: "cash",
        person: "0"
      },
      status: "",
      promisor: {
        endpoint: "",
        id: "-1",
        name: "",
        similarity: "0.000000",
        person: "-1"
      }
    },
    v['taxfactor']="0.00",
    v['instrumenttype']= "cash",
    v['action']= "rec",
    v['todatetime']= "",
    v['vatpercent']= "0.00",
    v['delivery']= {
      accounthead: "",
      id: "-1",
      endpoint: "",
      neid: "-1",
      defaultgroup: "",
      person: "-1"
    },
    v['quantity']= "1.00",
    v['rateaftertaxes']= "0.00",
    v['taxes']= [],
    v['rateincludesvat']= false,
    v['duedatetime']= "",
    v['nonvattaxperunit']= "0.00",
    v['accountmap']= {
      accounthead: "",
      id: "-1",
      endpoint: "",
      neid: "-1",
      defaultgroup: "",
      person: "-1"
    },
    v['objecttype']="instrument",
    v['userinputrate'] = v['userinputrate'],
    v['expirydate']= "",
    v['nonvatpercent']= "0.00",
    v['brandname']= "",
    v['discountpercent']= "0.00",
    v['rateafterdiscount']= "0.00"

    return v
  }


  rebuildChequeVoucher(v:any) {
    

    // IN REBUILD VOUCHER


    v['action'] = 'rec'
    v['objecttype'] = 'instrument'
    v['object'] = v['object']
    // v['object']['id'] = null
    // v['object']['drawee'] = null
    // v['object']['drawer'] = null
    // v['object']['schema'] = null
    // v['object']['status'] = null

    
    v['quantity'] = 1
    v['currency'] = '',
    v['fromdatetime'] = 'infinity'
    v['todatetime'] = 'infinity'
    v['duedatetime'] = 'infinity'
    v['userinputrate'] = v['userinputrate']
    v['rateincludesvat'] = true
    

    v['taxes'] = []
    
    v['discountpercent'] = 0
    v['discountamount'] = 0
    v['rateafterdiscount'] = 0
    v['rateaftertaxes'] = 0
    v['taxfactor'] = 0
    v['taxesperunit'] = 0
    v['uom'] = {
      uom: "each",
      symbol: "each",
      country: "global"
    }
    
    v['nonvattaxperunit'] = 0
    
    v['vattaxperunit'] = 0
    v['nonvatpercent'] = 0
    v['vatpercent'] = 0
    v['ratebeforetaxes'] = 0

    v['intofrom'] = {
      id: "0",
      itemname: "",
      iscontainer: "True",
      usercode: "",
      uom: {
        uom: "each",
        symbol: "each",
        country: "global"
      },
      taxes: [],
      files: [],
      recipe: {
        consumedunits: [],
        byproducts: []
      }
    }
    v['by'] = {
      itemid: "0",
      neid: "",
      relationshipid: "",
      name: ""
    }
    v['delivery'] ={
      id: "-1",
      accounthead: "",
      defaultgroup: "",
      relationship: "-1",
      neid: "-1",
      person: "-1",
      name: "",
      endpoint: "",
      rtype: ""
    }
    v['title'] = ""
    v['accountmap'] = v['accountmap']
    v['files'] = []
    v['expirydate'] = v['expirydate']
    v['vendorperson'] = null


    return v

  }


  rebuildViaPersonVoucher(v:any) {
    

    v['action'] = 'rec'
    v['objecttype'] = 'person'
    v['object'] = {
      'accounthead':''
    }
    v['isviaperson'] = true;
    v['quantity'] = 1
    v['currency'] = '',
    v['fromdatetime'] = 'infinity'
    v['todatetime'] = 'infinity'
    v['duedatetime'] = 'infinity'
    v['userinputrate'] = v['userinputrate']
    v['rateincludesvat'] = true
    

    v['taxes'] = []
    
    v['discountpercent'] = 0
    v['discountamount'] = 0
    v['rateafterdiscount'] = 0
    v['rateaftertaxes'] = 0
    v['taxfactor'] = 0
    v['taxesperunit'] = 0
    v['uom'] = {
      uom: "each",
      symbol: "each",
      country: "global"
    }
    
    v['nonvattaxperunit'] = 0
    
    v['vattaxperunit'] = 0
    v['nonvatpercent'] = 0
    v['vatpercent'] = 0
    v['ratebeforetaxes'] = 0

    v['intofrom'] = {
      id: "0",
      itemname: "",
      iscontainer: "True",
      usercode: "",
      uom: {
        uom: "each",
        symbol: "each",
        country: "global"
      },
      taxes: [],
      files: [],
      recipe: {
        consumedunits: [],
        byproducts: []
      }
    }
    v['by'] = {
      itemid: "0",
      neid: "",
      relationshipid: "",
      name: ""
    }
    v['delivery'] ={
      id: "-1",
      accounthead: "",
      defaultgroup: "",
      relationship: "-1",
      neid: "-1",
      person: "-1",
      name: "",
      endpoint: "",
      rtype: ""
    }
    v['title'] = ""
    v['accountmap'] = null
    v['files'] = []
    v['expirydate'] = v['expirydate']
    v['vendorperson'] = null
    v['paymentmode'] = null

    //v['recordid'] = this.highestRecordID(this.recVoucherList) + 1


    return v

  }



  receiptPartyChange(e:any) {

  }

  cashReceiptAmountChange(event:any) {

    let ca:number = parseFloat(event)

    if(isNaN(ca)) {
      ca = 0
    }

    // this.selectedCashAmount = ca
    // let cashVoucher:any = this.selectedVouchers[0]
    
    this.selectedReceiptVoucher.object.amount = ca
    this.selectedReceiptVoucher.userinputrate = ca

  }

  handleEditReceiptVoucher(v:any,i:any) {

    console.log('SELECTED PARTY',this.selectedParty)
    // if(!this.checkNameMatch(this.selectedParty.accounthead)) {
    //   this.showErrorViaToast('You must select a party that matches your customer name')
    //   return
    // }

    if (typeof this.selectedParty === 'undefined' || this.selectedParty == null) {
      this.showErrorViaToastGlobal('globaltst','You must select a party')
      return
    }

    if(!this.checkNameMatch(this.selectedParty.accounthead)) {
        this.showErrorViaToastGlobal('globaltst','You must select a party that matches your customer name')
        return
    } 
    
    console.log('VOUCHER TO BE EDITED IN RECEIPT',v)

    console.log('V INSTRTYPE',v.object.instrumenttype)

    this.selectedReceiptVoucher = JSON.parse(JSON.stringify(v))
    this.selectedReceiptVoucherIndex = i

    if (v.objecttype === 'person') {
      
      //this.displayViaPersonReceiptModal = true
      this.showViaPersonReceipt = true;
    }

    else if(v.objecttype === 'instrument') {

      if(v.object.instrumenttype === 'cash') {
        //this.selectedCashAmount = v.object.amount
        this.displayCashModal = true
        return
      }
  
      if(v.object.instrumenttype === 'cheque') {
        console.log('SELE PERSO',this.selectedParty)
        //this.selectedDraweeName = v.object.drawee.accounthead
        this.selectedDraweeName = v.object.drawee?.accounthead || v.object.drawee?.name;
        this.showReceiveChequeDetail = true
      }
    }

  }


  


  handleDeleteReceiptVoucher(index:any) {
    console.log('V',index)
    if (index===0) {
      return
    }
    this.recVoucherList.splice(index,1)
  }




  handleSaveReceipt() {

    // this.selectedEntity = {
    //   id:1
    // }
    // if (typeof this.selectedEntity === 'undefined' || this.selectedEntity == null) {
    //   this.confirm('You must select an entity')
    //   return false
    // }
  
    if (typeof this.selectedParty === 'undefined' || this.selectedParty == null) {
      this.showErrorViaToastGlobal('globaltst','You must select a party')
      return false
    }
  
    if(this.recVoucherList.length === 1) {
      console.log('CASH VOUCHER',this.recVoucherList[0].object)
      
      if(parseFloat(this.recVoucherList[0].object.amount) === 0) {
        this.showErrorViaToastGlobal('globaltst','You must enter cash greater than zero')
        return false
      }
      
    }

   

    for (let index = 0; index < this.recVoucherList.length; index++) {
      const voucher = this.recVoucherList[index];
      if (voucher.objecttype === 'person') {
        
      }
      else if (voucher.objecttype === 'instrument') {
        if(voucher.object.instrumenttype === 'cash') {
          
        }
        else if(voucher.object.instrumenttype === 'cheque') {
          if (voucher.object.draweeis === 'ourbank') {
            this.showErrorViaToastGlobal('globaltst','You must select the correct cheque.')
            return
          }
        }
      }
    }


  
    let newInvoice:any = {}
    newInvoice['date'] = this.ISODate(new Date())
    newInvoice['entity'] = {
      id:1
    }
    newInvoice['partyaccounthead'] = this.selectedParty
    newInvoice['party'] = {'person':-1,'id':-1,'name':"",'endpoint':"",'displayfile':{}}
    newInvoice['vouchers'] = this.recVoucherList
  
  
    console.log('RECEIPT INVOICE TO BE SAVED',JSON.stringify(newInvoice))
  
    this.saveReceipt(newInvoice)
  
    return false

  }





  saveReceipt(newInvoice:any) {
    this.inProgress = true
    
    let sah:SaveReceiptService = new SaveReceiptService(this.httpClient)
    this._piSub = sah.saveReceipt(newInvoice).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        console.log('ERROR',e)
        this.inProgress = false
        this.showErrorViaToastGlobal('globaltst','A server error occured while saving account head. '+e.message)
        return;
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          //alert(dataError.error);
          this.showErrorViaToastGlobal('globaltst',dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {

          //this.inProgress = false
          this.displayReceipt = false
          this.displayReceipt = false
          this.displayViewTo = false
          this.showSuccessViaToast('globaltst','Successfully saved Receipt')
          
          return;
        }
        else if(v == null) {
          this.inProgress = false
          this.showErrorViaToastGlobal('globaltst','A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          //alert('An undefined error has occurred.')
          this.inProgress = false
          this.showErrorViaToastGlobal('globaltst','An undefined error has occurred.')
          return
        }
      }
    })

    return
  } 



  handleSelectReceiveCheques(v:any,recChequeIndex:any) {
    
    if (v.objecttype === 'instrument') {
      if(v.object.instrumenttype === 'cheque') {
        this.newSelectedCP = v.object
        this.selectedRecChequeIndex = recChequeIndex
        this.showSelectCheque = true;
      }
    }
  }

  handleSelectChequeDialogClose() {
    this.showSelectCheque = false;
  }

  handleSelectChequeDialogHide() {
    console.log('HIDE IN PARENT')
    this.showSelectCheque = false;
  }

  handleReceiveChequeDetailDialogHide() {
    this.showReceiveChequeDetail = false;
  }
  
  handleReceiveChequeDetailDialogClose() {
    this.showReceiveChequeDetail = false;
  }

  handleViaPersonReceiptDialogClose() {
    this.showViaPersonReceipt = false;
  }

  handleViaPersonReceiptDialogHide() {
    this.showViaPersonReceipt = false;
  }

  handleWrittenChequeDetailDialogHide() {
    this.showChequeWrittenDetailModal = false;
  }
  
  handleWrittenChequeDetailDialogClose(e:any) {
    //console.log('WRITTEN CHEQUES',e)
    this.selectedChequesOfPerson = e
    this.showChequeWrittenDetailModal = false;
  }

  


}
