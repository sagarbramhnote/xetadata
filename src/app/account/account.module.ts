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
import { PurchaseReturnsComponent } from './purchase-returns/purchase-returns.component';
import { PurchaseReturnViewComponent } from './purchase-returns/purchase-return-view/purchase-return-view.component';
import { SalesCreateComponent } from './sales/sales-create/sales-create.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NewJournalVoucherComponent } from './new-journal-voucher/new-journal-voucher.component';
import { CreateVoucherComponent } from './new-journal-voucher/create-voucher/create-voucher.component';
import { ProductionComponent } from './production/production.component';
import { ProductionViewComponent } from './production/production-view/production-view.component';
import { ProductionCreateComponent } from './production/production-create/production-create.component';
import { BankReconciliationComponent } from './bank-reconciliation/bank-reconciliation.component';
import { ViwBankReconciliationComponent } from './bank-reconciliation/viw-bank-reconciliation/viw-bank-reconciliation.component';
import { ViewSalesComponent } from './sales/view-sales/view-sales.component';
import { SendInvoiceSalesComponent } from './sales/send-invoice-sales/send-invoice-sales.component';
import { OptionSalesComponent } from './sales/option-sales/option-sales.component';
import { ReturnSalessComponent } from './sales/return-saless/return-saless.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { CreateConsumptionComponent } from './consumption/create-consumption/create-consumption.component';
import { ViewConsumptionComponent } from './consumption/view-consumption/view-consumption.component';
import { EditConsumptionComponent } from './consumption/edit-consumption/edit-consumption.component';
import { PurchaseCreateComponent } from './purchase/purchase-create/purchase-create.component';
import { PurchaseViewComponent } from './purchase/purchase-view/purchase-view.component';
import { PurchasePurchaseReturnComponent } from './purchase/purchase-purchase-return/purchase-purchase-return.component';
import { TooltipModule } from 'primeng/tooltip';



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
    PurchaseReturnsComponent,
    PurchaseReturnViewComponent,
    SalesCreateComponent,
    NewJournalVoucherComponent,
    CreateVoucherComponent,
    ProductionComponent,
    ProductionViewComponent,
    ProductionCreateComponent,
    BankReconciliationComponent,
    ViwBankReconciliationComponent,
    ViewSalesComponent,
    SendInvoiceSalesComponent,
    OptionSalesComponent,
    ReturnSalessComponent,
    ConsumptionComponent,
    CreateConsumptionComponent,
    ViewConsumptionComponent,
    EditConsumptionComponent,
    PurchaseCreateComponent,
    PurchaseViewComponent,
    PurchasePurchaseReturnComponent


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
    InputSwitchModule,
    TooltipModule,

  ]
})
export class AccountModule { }
