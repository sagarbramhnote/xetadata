import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Message } from 'src/app/demo/api/message';
import { User } from 'src/app/demo/api/user';
import { ChatService } from '../../service/chat.service';
import { EventBusServiceService } from '../../../global/event-bus-service.service';
import { EventData } from '../../../global/event-data';
import { GlobalConstants } from 'src/app/global/global-constants';

import { ConfirmationService,MessageService, SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Xetaerror } from '../../../global/xetaerror';
import { XetaSuccess } from '../../../global/xeta-success';
import { MessageListService } from 'src/app/services/message-list.service';
import { SendMessageService } from 'src/app/services/send-message.service';

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

    items: any[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
    ];
    
    strucattachs:any[] = []
    files:any[] = []

    constructor( private changeDetectorRef: ChangeDetectorRef, private chatService: ChatService, private eventService:EventBusServiceService,private http:HttpClient,private messageService: MessageService) {
        
    }

    setMessage() {
        // if (this.user) {
        //     let filteredMessages = this.user.messages.filter(m => m.ownerId !== this.defaultUserId);
        //     this.message = filteredMessages[filteredMessages.length - 1];
        // }
    }

    ngOnInit(): void {
        //this.setMessage();
        this.xetaperson = {
            'name':''
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
                this.loadMessageList(lo, this.xetaperson, 0);
            } 
        })
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

        }
          
    }

    onEmojiSelect(emoji: string) {
        this.textContent += emoji;
    }

    parseDate(timestamp: number) {
        return new Date(timestamp).toTimeString().split(':').slice(0, 2).join(':');
    }

    trackByFn(index: number, item: any): number {
        return item.xetamail; // Use the 'id' property as the unique identifier
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
