import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from '../global/xeta-success';
import { Xetaerror } from '../global/xetaerror';
import { ProductServiceListService } from '../services/product-service-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class ProductsComponent {

  product:any[] = []
  loading:boolean = false

  private _ahlSub:any

  offset:number = 0

  showForm:boolean = false

  mode:string = 'new'

  buttonText:string = 'Save'


  constructor(private httpClient:HttpClient) {}

  ngOnInit(): void {
    this.loadProduct(0,0)
  }

  loadProduct(offset:number,moreoffset:number) {
    
    this.loading = true
    
    let ahlService:ProductServiceListService = new ProductServiceListService(this.httpClient)
    let criteria:any = {searchtext:'',screen:'display',offset:offset,searchtype:'party'};
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchProductServiceList(criteria).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        this.loading = false
        return
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.loading = false
       //   this.showErrorViaToast(dataError.error)
          return
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          console.log('FRESH PRODUCT',dataSuccess.success)
          this.product = dataSuccess.success
          this.loading = false
          return
        }
        // else if(v == null) { 
        //   this.loading = false
        //   this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
        //   return
        // }
        // else {
        //   this.loading = false
        //   this.showErrorViaToast('An undefined error has occurred.')
        //   return false
        // }
      }
    })

  }

  // handleNew(e:any) {
  //   if (e.checked) {
  //     this.initPerson()
  //     this.mode = 'new'
  //     this.buttonText = 'Save'
  //   }
  //   console.log('NEW',e)
  //   console.log('MODE',this.mode) 
  // }

  // // initPerson() {
  //   //this.currentMode = 'new'
  //   this.person = this.returnNewPerson()
  //   this.isperson = true;
  //   this.iscompany = false;
  //   this.names = []
  //   this.emailids = []
  //   this.telephones = []
  //   this.postalAddresses = []
  //   this.govtids = []

  //   for (let index = 0; index < this.person.endpoints.length; index++) {
  //     const element = this.person.endpoints[index];
  //     if(element.type === 'telephone') {
  //       let t:any = JSON.parse(JSON.stringify(element))
  //       this.telephones.push(element)
  //     }
  //     if(element.type === 'emailid') {
  //       let e:any = JSON.parse(JSON.stringify(element))
  //       this.emailids.push(element)
  //     }
  //     if(element.type === 'address') {
  //       let e:any = JSON.parse(JSON.stringify(element))
  //       this.postalAddresses.push(element)
  //     }
      
  //   }
  //   console.log('EMAILIDS',this.emailids)
  //   console.log('TELEPHONES',this.telephones)
  //   console.log('ADDRESSES',this.postalAddresses)
  //   //this.displayNewModal = true
  // }
}
