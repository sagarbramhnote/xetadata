import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XetaproductsComponent } from './xetaproducts.component';

const routes: Routes = [
  {path: '',component:XetaproductsComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XetaproductsRoutingModule { }
