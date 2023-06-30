import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/demo/api/message';
import { User } from 'src/app/demo/api/user';
import { ChatService } from '../../service/chat.service';

import { EventBusServiceService } from '../../../global/event-bus-service.service';
import { EventData } from '../../../global/event-data';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html'
})
export class UserCardComponent implements OnInit {

    //@Input() user!: User;

    @Input() user!: any;


    lastMessage!: Message;

    constructor(private chatService: ChatService,private eventService:EventBusServiceService) { }

    ngOnInit(): void {
        
        console.log('USER',this.user) 
    }

    changeView(user: any) {
        //this.chatService.changeActiveChat(user);
        console.log('USER',user)
        this.eventService.emit(new EventData('MessageClicked',user))
    }
}
