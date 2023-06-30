import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { ToastModule } from 'primeng/toast';

import { DropdownModule } from 'primeng/dropdown';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';




@NgModule({
  declarations: [
    ProductsComponent

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableModule,
    ProgressSpinnerModule,
    ToastModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    RadioButtonModule,
    InputTextModule,
    ToggleButtonModule,
    DropdownModule
  ]
})
export class ProductsModule { }
