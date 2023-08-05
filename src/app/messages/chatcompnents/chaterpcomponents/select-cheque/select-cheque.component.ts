import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter,Input,Output,ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { ChequesOfPersonService } from 'src/app/services/cheques-of-person.service';
// import { EventBusServiceService } from '../../../global/event-bus-service.service';
// import { EventData } from '../../../global/event-data';
import { GlobalConstants } from 'src/app/global/global-constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';

@Component({
  selector: 'app-select-cheque',
  templateUrl: './select-cheque.component.html',
  styleUrls: ['./select-cheque.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService,MessageService] 
})
export class SelectChequeComponent {
  @Input() displayReceiveChequeModal: boolean = false;
  @Input() selectedPerson: number = -1; // Adjust the type based on your data structure
  @Input() recVoucherList: any[] = [];
  @Input() selectedRecChequeIndex:any
  //@Output() cpChange: EventEmitter<any> = new EventEmitter<any>();
  // @Output() handleReplaceReceiveCheque: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() onHideDialog: EventEmitter<void> = new EventEmitter<void>();

  newSelectedCP: any; // Adjust the type based on your data structure

  selectedChequesOfPerson:any[] = []

  inProgress:boolean = false

  _chSub:any

  
  constructor(private httpClient:HttpClient, private changeDetectorRef: ChangeDetectorRef, private http:HttpClient,private messageService: MessageService) {
    // if(this.selectedPerson !== -1) {
    //   this.loadChequesOfPersonReceive(this.selectedPerson)
    // }
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check if the 'selectedPerson' input has changed
    console.log('CHANGES',changes['selectedPerson'])
    console.log('SEL PER',this.selectedPerson)
    
    if (changes['selectedPerson']) {
      // If it has changed and it's not the first change, call the loadChequesOfPersonReceive method
      console.log('IN CHANGE')
      this.loadChequesOfPersonReceive(this.selectedPerson);
    }


  }

  showReceiveChequeListDialog() {
    // Implement this method if needed
  }
  
  


  loadChequesOfPersonReceive(personid:any) {

    this.inProgress = true

    console.log('IN CHEQUES OF PERSON')
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    
    let criteria:any = {
      person: personid,
      offset: 0,
      draweeis: "anybank"
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
          this.displayReceiveChequeModal = true;
          
          //this.changeDetectorRef.detectChanges()
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


  cpChange(e:any) {
    console.log('CH TBR', e);
    console.log('CH INDEX',this.selectedRecChequeIndex)
    this.recVoucherList[this.selectedRecChequeIndex].object = e.value;
    this.recVoucherList[this.selectedRecChequeIndex].userinputrate = e.value.amount
    console.log('RECS', this.recVoucherList);
  }

  // replaceReceiveCheque(e: any) {
  //   this.displayReceiveChequeModal = false;
  // }

  // Method to close the dialog
  closeDialog() {
    console.log('DIALOG CLOSED')
    //this.displayReceiveChequeModal = false
    this.onCloseDialog.emit();
  }

  hideDialog() {
    console.log('HIDE IN COMPO')
    //this.displayReceiveChequeModal = false
    this.onHideDialog.emit();
  }

  


}
