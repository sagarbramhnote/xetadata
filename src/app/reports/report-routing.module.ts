import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { SalesInvoiceAgeingComponent } from './sales-invoice-ageing/sales-invoice-ageing.component';

import { TrailingFinalAccountsComponent } from './trailing-final-accounts/trailing-final-accounts.component';

import { StockRegisterViewComponent } from './stock-register/stock-register-view/stock-register-view.component';




const routes: Routes = [

  {path: 'stockRegister',data: {breadcrumb: 'Stock Register'},component:StockRegisterComponent},
  {path: 'salesinvoiceageing',data: {breadcrumb: 'Sales Invoice Ageing-List'},component:SalesInvoiceAgeingComponent},



  {path: 'trailingFinalAccount',data: {breadcrumb: 'Fianal Account'},component:TrailingFinalAccountsComponent},

  {path: 'stockRegisterView',data: {breadcrumb: 'Stock Register'},component:StockRegisterViewComponent},





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
