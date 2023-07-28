import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { TrailingFinalAccountsComponent } from './trailing-final-accounts/trailing-final-accounts.component';



const routes: Routes = [

  {path: 'stockRegister',data: {breadcrumb: 'Stock Register'},component:StockRegisterComponent},
  {path: 'trailingFinalAccount',data: {breadcrumb: 'Fianal Account'},component:TrailingFinalAccountsComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
