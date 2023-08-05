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
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';


import { UserCardComponent } from './chatcompnents/user-card/user-card.component';
import { ChatBoxComponent } from './chatcompnents/chat-box/chat-box.component';
import { ChatService } from './service/chat.service';
import { ChatSidebarComponent } from './chatcompnents/chat-sidebar/chat-sidebar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SelectChequeComponent } from './chatcompnents/chaterpcomponents/select-cheque/select-cheque.component';
import { ReceiveChequeDetailComponent } from './chatcompnents/chaterpcomponents/receive-cheque-detail/receive-cheque-detail.component';
import { ViaPersonReceiptVoucherComponent } from './chatcompnents/chaterpcomponents/via-person-receipt-voucher/via-person-receipt-voucher.component';
import { WrittenChequeDetailComponent } from './chatcompnents/chaterpcomponents/written-cheque-detail/written-cheque-detail.component';





@NgModule({
  declarations: [
    MessagesComponent,
    RecipientsComponent,
    ChatSidebarComponent,
    UserCardComponent,
    ChatBoxComponent,
    SelectChequeComponent,
    ReceiveChequeDetailComponent,
    ViaPersonReceiptVoucherComponent,
    WrittenChequeDetailComponent
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
    OverlayPanelModule,
    DialogModule,
    AutoCompleteModule,
    SplitButtonModule,
    CheckboxModule,
    DropdownModule,
    InputSwitchModule,
    RadioButtonModule,
    CalendarModule
  ],
  providers: [
      ChatService
  ]
})
export class MessagesModule { }
