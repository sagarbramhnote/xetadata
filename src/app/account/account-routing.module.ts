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
import { NewJournalVoucherComponent } from './new-journal-voucher/new-journal-voucher.component';
import { CreateVoucherComponent } from './create-voucher/create-voucher.component';
import { PurchaseReturnsComponent } from './purchase-returns/purchase-returns.component';
import { PurchaseReturnViewComponent } from './purchase-returns/purchase-return-view/purchase-return-view.component';
import { SalesCreateComponent } from './sales/sales-create/sales-create.component';

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

  {path: 'new-journal-voucher', data: {breadcrumb: 'journalVoucher'},component:NewJournalVoucherComponent},
  {path: 'createVoucher', data: {breadcrumb: 'newVoucher'},component:CreateVoucherComponent},
  {path: 'purchasereturn', data: {breadcrumb: 'List'},component:PurchaseReturnsComponent},
  {path: 'purchaseReturnView', data: {breadcrumb: 'View'},component:PurchaseReturnViewComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
