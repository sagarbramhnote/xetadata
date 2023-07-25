import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
  {path: 'sales', data: {breadcrumb: 'Sales'},component:SalesComponent},
  {path: 'purchase', data: {breadcrumb: 'Purchase'},component:PurchaseComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
