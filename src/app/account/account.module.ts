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
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { SalesreturnviewComponent } from './sales-return/salesreturnview/salesreturnview.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransferregisterComponent } from './transfer/transferregister/transferregister.component';
import { CalendarModule } from 'primeng/calendar';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { JournalvouchercreateComponent } from './journal-voucher/journalvouchercreate/journalvouchercreate.component';
import { NewJournalVoucherComponent } from './new-journal-voucher/new-journal-voucher.component';
import { CreateVoucherComponent } from './create-voucher/create-voucher.component';
import { PurchaseReturnsComponent } from './purchase-returns/purchase-returns.component';
import { PurchaseReturnViewComponent } from './purchase-returns/purchase-return-view/purchase-return-view.component';
import { SalesCreateComponent } from './sales/sales-create/sales-create.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConsumptionComponent } from './consumption/consumption.component';
import { CreateConsumptionComponent } from './consumption/create-consumption/create-consumption.component';
import { ViewConsumptionComponent } from './consumption/view-consumption/view-consumption.component';
import { EditConsumptionComponent } from './consumption/edit-consumption/edit-consumption.component';


@NgModule({
  declarations: [
    SalesComponent,
    PurchaseComponent,
    SalesReturnComponent,
    SalesreturnviewComponent,
    TransferComponent,
    TransferregisterComponent,
    JournalVoucherComponent,
    JournalvouchercreateComponent,
    NewJournalVoucherComponent,
    CreateVoucherComponent,
    PurchaseReturnsComponent,
    PurchaseReturnViewComponent,
    SalesCreateComponent,
    ConsumptionComponent,
    CreateConsumptionComponent,
    ViewConsumptionComponent,
    EditConsumptionComponent,

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
    CheckboxModule,
    CalendarModule,
    CheckboxModule,
    InputSwitchModule
  ]
})
export class AccountModule { }
