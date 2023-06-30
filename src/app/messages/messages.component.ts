import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/demo/api/user';
import { ChatService } from './service/chat.service';
import { EventBusServiceService } from '../global/event-bus-service.service';
import { EventData } from '../global/event-data';





@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy{

  //subscription: Subscription;

  activeUser!: User;

  hideSidebar:boolean = true;
  hideChatBox:boolean = false;

  
  
  constructor(private chatService: ChatService, private eventService:EventBusServiceService) { 
      //this.subscription = this.chatService.activeUser$.subscribe(data => this.activeUser = data);
  }

  ngOnInit(): void {
    this.eventService.on('MessageClicked',(data:any) => {
      console.log('IN MESSAGES')
      this.hideSidebar = true;
      this.hideChatBox = false;
      
    })
  }

  ngOnDestroy() {
      //this.subscription.unsubscribe();
  }

  toggleChat(): void {
    this.hideSidebar = false;
    this.hideChatBox = true;
    
  }

}
