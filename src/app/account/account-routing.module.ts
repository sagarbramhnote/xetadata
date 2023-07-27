import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseReturnsComponent } from './purchase-returns/purchase-returns.component';
import { PurchaseReturnViewComponent } from './purchase-returns/purchase-return-view/purchase-return-view.component';


const routes: Routes = [
  {path: 'sales', data: {breadcrumb: 'Sales'},component:SalesComponent},
  {path: 'purchase', data: {breadcrumb: 'Purchase'},component:PurchaseComponent},
  {path: 'purchasereturn', data: {breadcrumb: 'List'},component:PurchaseReturnsComponent},
  {path: 'purchaseReturnView', data: {breadcrumb: 'View'},component:PurchaseReturnViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
