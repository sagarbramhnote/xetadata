import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/demo/api/user';
import { ChatService } from '../../service/chat.service';
import { GlobalConstants } from 'src/app/global/global-constants';

import { ConfirmationService,MessageService, SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Xetaerror } from '../../../global/xetaerror';
import { XetaSuccess } from '../../../global/xeta-success';
import { LatestReceiversService } from 'src/app/services/latest-receivers.service';
import { EventBusServiceService } from 'src/app/global/event-bus-service.service';
import { EventData } from 'src/app/global/event-data';

@Component({
    selector: 'app-chat-sidebar',
    templateUrl: './chat-sidebar.component.html',
    providers: [ConfirmationService,MessageService]
})
export class ChatSidebarComponent implements OnInit {

    searchValue: string = '';

    // users: User[] = [];

    // filteredUsers: User[] = [];

    users: any[] = [];
    filteredUsers:any[] = []

    GlobalConstants:any = GlobalConstants

    _ahlSub:any

    display: boolean = false;

    constructor(private chatService: ChatService,private messageService: MessageService,private http:HttpClient,private eventService:EventBusServiceService) { }

    ngOnInit(): void {
        console.log('HELLO')
        console.log('GLOBAL',this.GlobalConstants.loginObject)
        this.loadRecipients(GlobalConstants.loginObject)
    }

    filter() {
        let filtered: User[] = [];
        for (let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            if (user.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) == 0) {
                filtered.push(user)
            }
        }

        this.filteredUsers = [...filtered];
    }

    refreshData() {
      this.loadRecipients(GlobalConstants.loginObject)
    }


    loadRecipients(address:any) {
        
        let ahlService:LatestReceiversService = new LatestReceiversService(this.http)
        let criteria:any = {
            'lo':this.GlobalConstants.loginObject,
            'offset':0 
        };
        console.log('CRITERIA',criteria)
        this._ahlSub = ahlService.fetchLatestRecipients(criteria).subscribe({
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
              console.log('FRESH PEOPLE',dataSuccess.success)
              this.users = dataSuccess.success.recipients
              this.filteredUsers = dataSuccess.success.recipients
              this.GlobalConstants.loginObject['xetamainperson'] = dataSuccess.success.xetamainperson
              //console.log('FINAL LO', this.GlobalConstants.loginObject)
              
              if(this.users.length > 0) {
                this.eventService.emit(new EventData('MessageClicked',this.users[0]))
              }
              
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
