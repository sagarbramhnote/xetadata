import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { PurchaseInvoiceAgeingListComponent } from './purchase-invoice-ageing-list/purchase-invoice-ageing-list.component';



const routes: Routes = [

  {path: 'stockRegister',data: {breadcrumb: 'Stock Register'},component:StockRegisterComponent},
  {path: 'purchaseInvoice',data: {breadcrumb: 'Purchase Invoice'},component:PurchaseInvoiceAgeingListComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
