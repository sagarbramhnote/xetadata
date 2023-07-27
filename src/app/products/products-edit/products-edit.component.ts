import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { AccountHeadListService } from 'src/app/services/account-head-list.service';

import { Search } from 'src/app/services/search';


@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class ProductsEditComponent {

  constructor(private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService,private cdr:ChangeDetectorRef) { }

 
  
  _ahlSub:any
  inProgress:boolean = false
  
  products:any[] = []

  selectedProduct:any = {
    id: "",
    saleprice: "",
    inclinps: "",
    advertise: "",
    itemdef: {
      id: "",
      itemname: "",
      isgroup: false,
      partofgroup: -1,
      usercode: "",
      uom: {
        uom: "",
        symbol: "",
        country: ""
      },
      taxes: [
        {
          taxname: "",
          taxcode: "",
          taxpercent: "",
          taxtype: "",
          taxauthority: {
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
      ],
      files: [],
      recipe: {
        consumedunits: [],
        byproducts: []
      },
      displayfile: {},
      assocpurchaseaccounthead: {
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
        isgroup: null
      },
      assocsaleaccounthead: {
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
        isgroup: null
      },
      assocsalereturnaccounthead: {
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
        isgroup: null
      },
      assocpurchasereturnaccounthead: {
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
        isgroup: null
      },
      originalrates: [
        "0.0"
      ],
      idpath: "",
      path: "",
      uniques: {
        originalrateaftertaxes: [
          0
        ],
        expirydate: [
          "infinity"
        ],
        userinputrateperunit: [
          0
        ]
      }
    },
    files: [],
    displayfile: {},
    contextprices: []
  }

  displayModal:boolean = false
  displaySubModal:boolean = false
  displaySubEditModal:boolean = false
  displayTaxModal:boolean = false
  displayTaxEditModal:boolean = false

  selectedContext:any
  @ViewChild('selectContext') selectContext:any

  selectedSalePrice:any
  @ViewChild('selectSalePrice') selectSalePrice:any


  selectedTaxes:any[] = []

  selectedTaxname:any
  @ViewChild('selectTaxname') selectTaxname:any

  selectedTaxcode:any
  @ViewChild('selectTaxcode') selectTaxcode:any

  selectedTaxpercent:any
  @ViewChild('selectTaxpercent') selectTaxpercent:any

  selectedTaxtype:any
  @ViewChild('selectTaxtype') selectTaxtype:any

  taxTypes:any[] = [{type:''},{type:'vat'},{type:'nonvat'}]


  selectedTaxParty:any
  @ViewChild('selectTaxParty') selectTaxParty:any
  placeholderTaxParty = 'select tax authority'
  filteredParties:any[] = new Array
  private _pSub:any
  
  private _eSub:any

  selectedRecordid:any
  selectedContextid:any

  //selectedContextObject:any

  inSaveProgress:boolean = false

  private _siSub:any

  offset:number = 0


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


  inputChange(event:any) {

    // console.log('ISVALID',this.itemname.valid)
    // this.selectedProduct['isvalid'] = this.itemname.valid

  } 

  showAddSalePriceDialog() {
    
    this.selectedContext = null
    this.selectedSalePrice = null
    this.selectedTaxes = []
    this.displaySubModal = true
  }

  onRowSelect(event:any) {
    if(event !== null) {
      console.log('ROW SELECT',event)
      this.selectedProduct = event.data
    }
  }

  handleEditContext(ctp:any) {
    this.selectedContext = ctp.context
    this.selectedSalePrice = ctp.saleprice
    this.selectedTaxes = ctp.taxes
    this.selectedContextid = ctp.recordid
    this.displaySubEditModal = true
  }

  handleDeleteContext(ctp:any) {

  }
  contextChange(event:any) {

    this.selectedContext = event
    
  }
  salePriceChange(event:any) {
    this.selectedSalePrice = parseFloat(event)
  }

  showNewTaxDialog() {
    this.selectedTaxname = null
    this.selectedTaxcode = null
    this.selectedTaxtype = null
    this.selectedTaxpercent = null
    this.selectedTaxParty = null
    this.displayTaxModal = true;
  }

  handleTaxEdit(tax:any) {
    console.log('TAX TO BE EDITED',tax)
    this.selectedTaxname = tax.taxname
    this.selectedTaxcode = tax.taxcode
    this.selectedTaxpercent = tax.taxpercent
    this.selectedTaxtype = tax.taxtype
    this.selectedTaxParty = tax.taxauthority
    this.selectedRecordid = tax.recordid
    this.displayTaxEditModal = true
  }

  handleTaxDelete(event:any) {
    console.log('EVENT',event)
    this.selectedTaxes.splice(event,1)
    
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

  filterParties(event:any) {
    console.log('IN FILTER PARTIES',event)
    
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-accounthead-contains'};
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
    this.selectedTaxParty = event;
  }

  partyChange(event:any) {
    console.log('IN PARTY CHANGE',event)
    this.selectedTaxParty = event
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

  handleUpdateContextPrice() {
    if (typeof this.selectedContext === 'undefined' || this.selectedContext == null || this.selectedContext === '') {
      this.confirm('You must enter a context')
      return false
    }
    if (typeof this.selectedSalePrice === 'undefined' || this.selectedSalePrice == null || this.selectedSalePrice === '') {
      this.confirm('You must enter a sale price')
      return false
    }


    let ctp:any = this.recordByRecordID(this.selectedContextid,this.selectedProduct.contextprices)

    ctp.context = this.selectedContext
    ctp.saleprice = this.selectedSalePrice,
    ctp.taxes = this.selectedTaxes

    this.displaySubEditModal = false
    

    return false

  }

  handleAddTax() {
    if (typeof this.selectedTaxParty === 'undefined' || this.selectedTaxParty == null) {
      this.confirm('You must select a tax authority')
      return false
    }
    if (typeof this.selectedTaxpercent === 'undefined' || this.selectedTaxpercent == null ) {
      this.confirm('You must enter tax percent')
      return false
    }

    if (typeof this.selectedTaxname === 'undefined' || this.selectedTaxname == null || this.selectedTaxname === '') {
      this.confirm('You must enter a tax name')
      return false
    }

    if (typeof this.selectedTaxtype === 'undefined' || this.selectedTaxtype == null || this.selectedTaxtype === '') {
      this.confirm('You must select a tax type')
      return false
    }

    if(this.selectedTaxParty.accounthead === '') {
      this.confirm('You must select a tax authority')
    }

    let tax:any = {}
    tax['taxname'] = this.selectedTaxname
    if(this.selectedTaxcode === null) {
      this.selectedTaxcode = ""
    }
    tax['taxcode'] = this.selectedTaxcode
    tax['taxpercent'] = this.selectedTaxpercent
    tax['taxtype'] = this.selectedTaxtype
    tax['taxauthority'] = this.selectedTaxParty
    tax['recordid'] = this.highestRecordID(this.selectedTaxes) + 1

    console.log('TAX TO BE ADDED',tax)

    //return false

    this.selectedTaxes.push(tax)
    


    this.selectedTaxname = null
    this.selectedTaxcode = null
    this.selectedTaxtype = null
    this.selectedTaxpercent = null
    this.selectedTaxParty = null
    

    this.displayTaxModal = false

    return false
  }


    }
