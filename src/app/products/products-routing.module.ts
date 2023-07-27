import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';

const routes: Routes = [
  {path: '',data: {breadcrumb: 'Product-List'},component:ProductsComponent},
  {path: 'edit',data: {breadcrumb: 'Product-Edit'},component:ProductsEditComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
