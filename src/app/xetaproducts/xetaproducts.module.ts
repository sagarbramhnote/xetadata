import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XetaproductsRoutingModule } from './xetaproducts-routing.module';
import { XetaproductsComponent } from './xetaproducts.component';


@NgModule({
  declarations: [
    XetaproductsComponent
  ],
  imports: [
    CommonModule,
    XetaproductsRoutingModule
  ]
})
export class XetaproductsModule { }
