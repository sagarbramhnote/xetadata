import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { NewJournalVoucherComponent } from './new-journal-voucher/new-journal-voucher.component';
import { CreateVoucherComponent } from './create-voucher/create-voucher.component';

const routes: Routes = [
  {path: 'sales', data: {breadcrumb: 'Sales'},component:SalesComponent},
  {path: 'purchase', data: {breadcrumb: 'Purchase'},component:PurchaseComponent},
  {path: 'new-journal-voucher', data: {breadcrumb: 'journalVoucher'},component:NewJournalVoucherComponent},
  {path: 'createVoucher', data: {breadcrumb: 'newVoucher'},component:CreateVoucherComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
