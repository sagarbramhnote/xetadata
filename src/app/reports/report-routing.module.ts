import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { StockRegisterViewComponent } from './stock-register/stock-register-view/stock-register-view.component';



const routes: Routes = [

  {path: 'stockRegister',data: {breadcrumb: 'Stock Register'},component:StockRegisterComponent},
  {path: 'stockRegisterView',data: {breadcrumb: 'Stock Register'},component:StockRegisterViewComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
