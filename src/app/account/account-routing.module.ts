import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SalesreturnviewComponent } from './sales-return/salesreturnview/salesreturnview.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransferregisterComponent } from './transfer/transferregister/transferregister.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { JournalvouchercreateComponent } from './journal-voucher/journalvouchercreate/journalvouchercreate.component';

import { PurchaseReturnsComponent } from './purchase-returns/purchase-returns.component';
import { PurchaseReturnViewComponent } from './purchase-returns/purchase-return-view/purchase-return-view.component';
import { SalesCreateComponent } from './sales/sales-create/sales-create.component';
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
import { PurchaseCreateComponent } from './purchase/purchase-create/purchase-create.component';
import { PurchaseViewComponent } from './purchase/purchase-view/purchase-view.component';
import { PurchasePurchaseReturnComponent } from './purchase/purchase-purchase-return/purchase-purchase-return.component';
import { ReciptsComponent } from './recipts/recipts.component';
import { ReciptsNewComponent } from './recipts/recipts-new/recipts-new.component';
import { ReciptsRegisterComponent } from './recipts/recipts-register/recipts-register.component';


const routes: Routes = [
  {path: 'sales', data: {breadcrumb: 'Sales'},component:SalesComponent},
  {path: 'salesCreate', data: {breadcrumb: 'Create Sales'},component:SalesCreateComponent},
  {path: 'purchase', data: {breadcrumb: 'Purchase'},component:PurchaseComponent},
  {path: 'sales-return', data: {breadcrumb: 'List'},component:SalesReturnComponent},
  {path: 'salesreturnview', data: {breadcrumb: 'view'},component:SalesreturnviewComponent},
  {path: 'transfer', data: {breadcrumb: 'List'},component:TransferComponent},
  {path: 'transferregister', data: {breadcrumb: 'Create'},component:TransferregisterComponent},
  {path: 'journal-voucher', data: {breadcrumb: 'List'},component: JournalVoucherComponent},
  {path: 'journalvouchercreate', data: {breadcrumb: 'Create'},component:JournalvouchercreateComponent},
  {path: 'purchasereturn', data: {breadcrumb: 'List'},component:PurchaseReturnsComponent},
  {path: 'purchaseReturnView', data: {breadcrumb: 'View'},component:PurchaseReturnViewComponent},
  {path: 'newJournalVoucher', data: {breadcrumb: 'Journal Voucher'},component:NewJournalVoucherComponent},
  {path: 'createVoucher', data: {breadcrumb: 'Create Voucher'},component:CreateVoucherComponent},
  {path: 'production', data: {breadcrumb: 'List'},component:ProductionComponent},
  {path: 'productionview', data: {breadcrumb: 'View'},component:ProductionViewComponent},
  {path: 'productioncreate', data: {breadcrumb: 'Create'},component:ProductionCreateComponent},
  {path: 'back-reconciliation', data: {breadcrumb: 'List'},component:BankReconciliationComponent },
  {path: 'bank-reconciliation-view',data: {breadcrumb: 'View'},component:ViwBankReconciliationComponent},
  {path: 'salesView', data: {breadcrumb: 'View Sales'},component:ViewSalesComponent},
  {path: 'salesSendInvoice', data: {breadcrumb: 'Send Invoice Sales'},component:SendInvoiceSalesComponent},
  {path: 'salesOptions', data: {breadcrumb: 'Options Sales'},component:OptionSalesComponent},
  {path: 'salesReturns', data: {breadcrumb: 'Sale Return Invoice'},component:ReturnSalessComponent},
  {path: 'consumption', data: {breadcrumb: 'List'},component:ConsumptionComponent},
  
  {path: 'create-consumption', data: {breadcrumb: 'Create Consumption'},component:CreateConsumptionComponent},

  {path: 'view-consumption', data: {breadcrumb: 'View Consumption'},component:ViewConsumptionComponent},
  

  {path: 'purchaseCreate', data: {breadcrumb: 'Create Purchase'},component:PurchaseCreateComponent},
  {path: 'purchaseView', data: {breadcrumb: 'View Purchase'},component:PurchaseViewComponent},
  {path: 'purchaseReturnn', data: {breadcrumb: 'Return Purchase'},component:PurchasePurchaseReturnComponent},
  {path: 'recipts', data: {breadcrumb: 'List'},component:ReciptsComponent},
  {path: 'new-recipts', data: {breadcrumb: 'New'},component:ReciptsNewComponent},
  {path: 'register-recipts', data: {breadcrumb: 'New'},component:ReciptsRegisterComponent},
  {path: 'purchaseReturnn', data: {breadcrumb: 'Return Purchase'},component:PurchasePurchaseReturnComponent}




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
