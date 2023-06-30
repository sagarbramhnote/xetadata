import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ConfirmationService,MessageService, SelectItem } from 'primeng/api';

import { Xetaerror } from '../../global/xetaerror';
import { XetaSuccess } from '../../global/xeta-success';
import { XetaPeopleListService } from 'src/app/services/xeta-people-list.service';
import { Table } from 'primeng/table';
import { RecipientListService } from 'src/app/services/recipient-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SaveRecipientsService } from 'src/app/services/save-recipients.service';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class RecipientsComponent implements OnInit{

  loading:boolean = false
  _ahlSub:any

  people:any[] = []

  @ViewChild('filter') filter!: ElementRef;

  showForm:boolean = false
  showSubForm:boolean = false

  

  recipients!: any[];

  selectedRecipients:any[] = [];

  subLoading:boolean = false

  urlAddressForm:any

  inProgress:boolean = false

  _siSub:any

  constructor(private http:HttpClient,private messageService:MessageService) {}
  
  ngOnInit(): void {

    this.loadPeople(0,0)
    this.urlAddressForm = new FormGroup({
      appurl: new FormControl('', [Validators.required]),
      database: new FormControl('', [Validators.required]),
      schema: new FormControl('',[Validators.required])
    });

  }

  loadPeople(offset:number,moreoffset:number) {
    
    this.loading = true
    
    let ahlService:XetaPeopleListService = new XetaPeopleListService(this.http)
    let criteria:any = {};
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchXetaPeople(criteria).subscribe({
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
  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  handleNew(e:any) {
    this.urlAddressForm.reset()
  }

  

  addXetaPeople() {

    if (this.selectedRecipients.length === 0) {
      this.showErrorViaToast('You must select one or more recipients')
      return
    }

    let xp = {
      address:this.urlAddressForm.value,
      xps:this.selectedRecipients
    }
    
    console.log('SELECTED XETAPEOPLE',JSON.stringify(xp))
    
    this.saveRecipients(xp)

  }


  loadRecipients(address:any) {
    
    this.subLoading = true
    let ahlService:RecipientListService = new RecipientListService(this.http)
    let criteria:any = address;
    console.log('CRITERIA',criteria)
    this._ahlSub = ahlService.fetchRecipients(criteria).subscribe({
      complete:() => {console.info('complete')},
      error:(e) => {
        this.loading = false
        return
      },
      next:(v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          this.subLoading = false
          this.showErrorViaToast(dataError.error)
          return
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          console.log('FRESH PEOPLE',dataSuccess.success)
          this.recipients = dataSuccess.success
          this.subLoading = false
          return
        }
        else if(v == null) { 
          this.subLoading = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return
        }
        else {
          this.subLoading = false
          this.showErrorViaToast('An undefined error has occurred.')
          return false
        }
      }
    })

  }


  saveRecipients(xp:any){

    this.inProgress = true
    
    let sah:SaveRecipientsService = new SaveRecipientsService(this.http)
    this._siSub = sah.saveRecipients(xp).subscribe({
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
          this.showErrorViaToast(dataError.error)
          this.inProgress = false
          return;
        }
        else if(v.hasOwnProperty('success')) {
          this.inProgress = false
          this.selectedRecipients = []
          this.loadPeople(0,0)
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



  getRecipients(): void {
    // Verify if the endpoint input has errors or is not touched or is invalid

    console.log('GET RECI')

    this.urlAddressForm.controls['appurl'].touched = true
    this.urlAddressForm.controls['database'].touched = true
    this.urlAddressForm.controls['schema'].touched = true
    

    if (this.urlAddressForm.controls['appurl'].errors || this.urlAddressForm.controls['appurl'].invalid) {
      const input = document.getElementById('appurl');
      if (input) {
        input.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }
    
    
    if (this.urlAddressForm.controls['database'].errors || this.urlAddressForm.controls['database'].invalid) {
      const input = document.getElementById('database');
      if (input) {
        input.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }

    if (this.urlAddressForm.controls['schema'].errors ||  this.urlAddressForm.controls['schema'].invalid) {
      const input = document.getElementById('schema');
      if (input) {
        input.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }

    

    //console.log(this.loginForm.invalid)
    

    if (this.urlAddressForm.invalid) {
      return;
    }

    let address = this.urlAddressForm.value;
    address["searchtext"] = ""
    address["offset"] = 0
    address["screen"] = "display"
    address["searchtype"] = "employee-accounthead"

    console.log('URL ADDRESS',address)

    this.loadRecipients(address)

    // Rest of the save form code

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


}
