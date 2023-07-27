import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { NewJournalVoucherComponent } from './new-journal-voucher/new-journal-voucher.component';
import { CreateVoucherComponent } from './create-voucher/create-voucher.component';
import { ReplaceZeroWithEmptyPipe } from '../pipes/replace-zero-with-empty-for-cs.pipe.spec';
import { ReplaceZeroWithEmptyForCSPipe } from '../pipes/replace-zero-with-empty-for-cs.pipe';


@NgModule({
  declarations: [
    SalesComponent,
    PurchaseComponent,
    NewJournalVoucherComponent,
    CreateVoucherComponent,
    ReplaceZeroWithEmptyPipe,
    ReplaceZeroWithEmptyForCSPipe

  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    TableModule,
    ProgressSpinnerModule,
    ToastModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    RadioButtonModule,
    InputTextModule,
    ToggleButtonModule,
    DropdownModule,
		RippleModule,
		ProgressBarModule,
    DialogModule,
    ConfirmDialogModule,
    CheckboxModule,CalendarModule
  ]
})
export class AccountModule { }
