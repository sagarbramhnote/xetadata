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

const routes: Routes = [
  {path: 'sales', data: {breadcrumb: 'Sales'},component:SalesComponent},
  {path: 'purchase', data: {breadcrumb: 'Purchase'},component:PurchaseComponent},
  {path: 'sales-return', data: {breadcrumb: 'List'},component:SalesReturnComponent},
  {path: 'salesreturnview', data: {breadcrumb: 'view'},component:SalesreturnviewComponent},
  {path: 'transfer', data: {breadcrumb: 'List'},component:TransferComponent},
  {path: 'transferregister', data: {breadcrumb: 'Create'},component:TransferregisterComponent},
  {path: 'journal-voucher', data: {breadcrumb: 'List'},component: JournalVoucherComponent},
  {path: 'journalvouchercreate', data: {breadcrumb: 'Create'},component:JournalvouchercreateComponent},
  
  

  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
