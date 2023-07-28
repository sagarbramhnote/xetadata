import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { SalesInvoiceAgeingComponent } from './sales-invoice-ageing/sales-invoice-ageing.component';

import { TrailingFinalAccountsComponent } from './trailing-final-accounts/trailing-final-accounts.component';

import { StockRegisterViewComponent } from './stock-register/stock-register-view/stock-register-view.component';
import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';
import { ItemMovementRegisterComponent } from './item-movement-register/item-movement-register.component';




const routes: Routes = [

  {path: 'stockRegister',data: {breadcrumb: 'Stock Register'},component:StockRegisterComponent},
  {path: 'salesinvoiceageing',data: {breadcrumb: 'Sales Invoice Ageing-List'},component:SalesInvoiceAgeingComponent},
  {path: 'trailingFinalAccount',data: {breadcrumb: 'Fianal Account'},component:TrailingFinalAccountsComponent},
  {path: 'stockRegisterView',data: {breadcrumb: 'Stock Register'},component:StockRegisterViewComponent},
  {path: 'generalLedger',data: {breadcrumb: 'General Ledger'},component:GeneralLedgerComponent},
  {path: 'itemMovementRegister',data: {breadcrumb: 'Item Movement Register'},component:ItemMovementRegisterComponent},





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
