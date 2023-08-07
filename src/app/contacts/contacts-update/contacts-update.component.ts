import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { PeopleFreshService } from 'src/app/services/people-fresh.service';
import { UpdatePersonService } from 'src/app/services/update-person.service';

@Component({
  selector: 'app-contacts-update',
  templateUrl: './contacts-update.component.html',
  styleUrls: ['./contacts-update.component.scss'],
  providers: [ConfirmationService,MessageService]

})
export class ContactsUpdateComponent {

  constructor(private router:Router,private httpClient:HttpClient,private confirmationService:ConfirmationService, private messageService: MessageService) {}

  person:any
  isperson:boolean = true;
  iscompany:boolean = false;

  names:any[] = []
  emailids:any[] = []
  telephones:any[] = []
  postalAddresses:any[] = []
  govtids:any[] = [] 

  ngOnInit(): void {
    const item = localStorage.getItem('editContacts');
    if (item !== null) {
      this.person = JSON.parse(item);
      this.handleEdit(this.person);
    }
    
      this.cities = [
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
  ];
  }

  inProgress:boolean = false

  navigateToListContacts(){
    this.router.navigate(['contacts'])
 }

  viewNames:any[] = [] 

  handleEdit(person:any) {

    let ahid = person.id // we are adding the id in person for editing.

    this.person = person.content

    this.person["ahid"] = ahid
    
    console.log('PERSON TO BE EDITED',JSON.stringify(this.person))

    this.viewNames = this.person.names
    console.log('EDIT NAMES',this.viewNames)

    //this.displayEditModal = true

    let pc = ''

    if (this.person.hasOwnProperty("person-or-company")) {
      this.person["pc"] = this.person["person-or-company"]
      pc = this.person["person-or-company"]
      // console.log('INPC',pc)
    }
    else if(this.person.hasOwnProperty("pc")) {
      pc = this.person["pc"]
    }
    

    if(pc === 'company') {
      
      this.isperson = false;
      this.iscompany = true;
    }
    if(pc === 'person') {
      
      this.isperson = true;
      this.iscompany = false;
    }

    this.emailids = []
    this.telephones = []
    this.postalAddresses = []

    for (let index = 0; index < this.person.endpoints.length; index++) {
      const element = this.person.endpoints[index];
      if(element.type === 'telephone') {
        let t:any = JSON.parse(JSON.stringify(element))
        this.telephones.push(element)
      }
      if(element.type === 'emailid') {
        let e:any = JSON.parse(JSON.stringify(element))
        this.emailids.push(element)
      }
      if(element.type === 'address') {
        let e:any = JSON.parse(JSON.stringify(element))
        this.postalAddresses.push(element)
      }
      
    }

    this.govtids = []
    this.govtids = this.person.govtids
    
  }

  pcchange(event:any) {

    console.log('EVENT',event)

    this.person.pc = event
    

    if(event == 'person') {

      console.log('IN PERSON')

      this.names.splice(0,this.names.length)
      this.isperson = true
      this.iscompany = false

      this.names.push({
        firstname: "",
        middlename: "",
        lastname: "",
        fullname: "",
        "tags":[]
      })

      this.person.names = this.names
    }
    else if (event == 'company') {

      console.log('IN COMPANY')

      this.names.splice(0,this.names.length)
      this.isperson = false
      this.iscompany = true

      let cnArray = [{
        name:"",
        "tags":[]
      }]

      this.names = cnArray
      console.log(this.names)

      this.person.names = this.names

    }
  }

  accountTypes:any[] = [{type:''},{type:'customer'},{type:'vendor'},{type:'employee'},{type:'bank'}]

  cities: SelectItem[] = [];
  

  selectedState:any

  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];

  handleDeleteOfName(event:any,i:number) {
    
    this.person.names.splice(i, 1);

  }

  handleAddName() {
    if(this.person.pc == 'person') {
      this.person.names.push({
        firstname: "",
        middlename: "",
        lastname: "",
        fullname: ""
      })
    }
    if(this.person.pc == 'company') {
      this.person.names.push({
        name:""
      })
    }
    
    //this.person.names = this.names
    
  }

  
  handleAddTelephone() {

    this.telephones.push({
      type: "telephone",
      detail: {
        "telephone": "",
        "tags":[]
      } 
    })
    
    this.make()
    
  }





  handleDeleteOfTelephone(event:any,i:number) {
    this.telephones.splice(i, 1);
    this.make()
  }


  handleAddAddress() {

    this.postalAddresses.push({
      type: "address",
      detail: {
        "doorno": "",
        "street": "",
        "area":"",
        "city":"",
        "state":"",
        "country":"",
        "pincode":"",
        "tags":[]
      } 
    })
    
    
    this.make()
    
  }

  handleDeleteOfPostalAddress(event:any,i:number) {
    this.postalAddresses.splice(i, 1);
    this.make()
  }

  make() {

    let endpointList:any = []
    
    this.telephones.forEach(function(value:any) {
      endpointList.push(value)
    })

    this.emailids.forEach(function(value:any) {
      endpointList.push(value)
    })

    this.postalAddresses.forEach(function(value:any){
      endpointList.push(value)
    })

    
    this.person.endpoints = endpointList
    
  }
  handleAddEmailID() {

    this.emailids.push({
      type: "emailid",
      detail: {
        "emailid": "",
        "tags":[]
      } 
    })
    
    
    this.make()
    
  }

  handleDeleteOfEmail(event:any,i:number) {
    this.emailids.splice(i, 1);
    this.make()
  }
  handleAddGovtID() {
    this.person.govtids.push({
      idname: "",
      idnumber: "",
      files:[],
      "tags":[]
    })
    
    //this.person.govtids = this.govtids 
  }

  handleDeleteOfGovtID(event:any,i:number) {
    this.person.govtids.splice(i, 1);
  }

  accountTypeChange(event:any) {

    console.log('CP DROPDOWN CHANGE',event.value)

  }


  atleast() {

    console.log('FRESH PERSON',JSON.stringify(this.person))
    
    //return

    let nameThere:boolean = false
    let telephoneThere:boolean = false
    let emailThere:boolean = false

    for (let index = 0; index < this.person.names.length; index++) {
      const element = this.person.names[index];
      let name:string = ''
      //console.log('NAME ELEMENT',element)
      if(this.person.pc === 'person') {
        name = element.fullname.trim()
      }
      if(this.person.pc === 'company') {
        name = element.name.trim()
      }

      console.log('NAME',name)
      if(name !== '') {
        nameThere = true
        break
      }
      
    }

    for (let index = 0; index < this.person.endpoints.length; index++) {
      const element = this.person.endpoints[index];
      let telephone:string = ''
      if(element.type === 'telephone') {
        telephone = element.detail.telephone.trim()
      }
      if(telephone !== '' && element.isvalid === true) {
        telephoneThere = true
        break
      }

    }


    for (let index = 0; index < this.person.endpoints.length; index++) {
      const element = this.person.endpoints[index];
      let emailid:string = ''
      if(element.type === 'emailid') {
        emailid = element.detail.emailid.trim()
      }
      if(emailid !== '' && element.isvalid === true) {
        emailThere = true
        break
      }

    }

    console.log('NAME THERE',nameThere)
    console.log('TELE THERE',telephoneThere)
    console.log('EMAIL THERE',emailThere)


    if(!nameThere) {
      console.log('ERROR IN FORM')
      this.showErrorViaToast('You must enter atleast one name')
      return
    }

    if(nameThere) {
      if(!telephoneThere && !emailThere) {
        console.log('ERROR IN FORM')
        this.showErrorViaToast('You must enter atleast one telephone or and emailid.')
        return
      }
    }

    if (this.person.accounttype === '') {
      console.log('ERROR IN FORM')
      this.showErrorViaToast('You must select an account type.')
      return
    }

    //this.handleCheckPerson()

   
      this.updatePerson()
  
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

  showSuccessViaToast() {
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
  }

  inCheckProgress:boolean = false
  private _chkSub:any

  updatePerson() {

    console.log('PERSON TO BE UPDATED',JSON.stringify(this.person))
    //return;
    
    this.inCheckProgress = true
    
    let ahlService:UpdatePersonService = new UpdatePersonService(this.httpClient)
    this._chkSub = ahlService.updatePerson(this.person).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        this.inCheckProgress = false
        this.showErrorViaToast('A server error occured while updating person. '+e.message)
        return
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.showErrorViaToast(dataError.error)
          this.inCheckProgress = false
          return
        }
        else if(v.hasOwnProperty('success')) {
         
          this.router.navigate(['contacts'])
          // let dataSuccess:XetaSuccess = <XetaSuccess>v;
          // //this.similarPeople = dataSuccess.success
          //this.inCheckProgress = false
          //this.displayEditModal = false
  

          this.loadPeople(0,0)
          return
        }
        else if(v == null) { 
          this.inCheckProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return
        }
        else {
          //alert('An undefined error has occurred.')
          this.inCheckProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return false
        }
      }
    })

  }

  loading:boolean = false
  private _ahlSub:any
  people:any[] = []


  loadPeople(offset:number,moreoffset:number) {
    
    this.loading = true
    
    let ahlService:PeopleFreshService = new PeopleFreshService(this.httpClient)
    let criteria:any = {searchtext:'',screen:'display',offset:offset,searchtype:'party'};
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchPeople(criteria).subscribe({
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
          this.showErrorViaToast(dataError.error)
          return
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          console.log('FRESH PEOPLE',dataSuccess.success)
          this.people = dataSuccess.success
          this.loading = false
          return
        }
        else if(v == null) { 
          this.loading = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return
        }
        else {
          this.loading = false
          this.showErrorViaToast('An undefined error has occurred.')
          return false
        }
      }
    })

  }


}

