import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { UserCardComponent } from './chatcompnents/user-card/user-card.component';
import { ChatBoxComponent } from './chatcompnents/chat-box/chat-box.component';
import { ChatService } from './service/chat.service';
import { ChatSidebarComponent } from './chatcompnents/chat-sidebar/chat-sidebar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';



@NgModule({
  declarations: [
    MessagesComponent,
    RecipientsComponent,
    ChatSidebarComponent,
    UserCardComponent,
    ChatBoxComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ToggleButtonModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    OverlayPanelModule
  ],
  providers: [
      ChatService
  ]
})
export class MessagesModule { }
