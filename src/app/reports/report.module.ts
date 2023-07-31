import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ReportRoutingModule} from './report-routing.module';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { PurchaseInvoiceAgeingListComponent } from './purchase-invoice-ageing-list/purchase-invoice-ageing-list.component';
import { SalesInvoiceAgeingComponent } from './sales-invoice-ageing/sales-invoice-ageing.component';

import { TrailingFinalAccountsComponent } from './trailing-final-accounts/trailing-final-accounts.component';

import { StockRegisterViewComponent } from './stock-register/stock-register-view/stock-register-view.component';
import { TooltipModule } from 'primeng/tooltip';
import { RecipeCostListComponent } from './recipe-cost-list/recipe-cost-list.component';



import { FialAccountComponent } from './fial-account/fial-account.component';

import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';

import { ResourceTrackerComponent } from './resource-tracker/resource-tracker.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';

import { ItemMovementRegisterComponent } from './item-movement-register/item-movement-register.component';





@NgModule({
  declarations: [

              StockRegisterComponent,
              TrailingFinalAccountsComponent,
             StockRegisterViewComponent,
             RecipeCostListComponent
        
            
            ],
             GeneralLedgerComponent,
             SalesInvoiceAgeingComponent,
             ResourceTrackerComponent,
             StockRegisterViewComponent,
              FialAccountComponent,
              GeneralLedgerComponent,
              SalesInvoiceAgeingComponent,
              ItemMovementRegisterComponent,
              StockRegisterComponent,
              PurchaseInvoiceAgeingListComponent
  ],

  imports: [
    CommonModule,
    ReportRoutingModule,
    TableModule,
    ProgressSpinnerModule,
    ToastModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    RadioButtonModule,
    InputTextModule,
    ToggleButtonModule,
    DropdownModule,
		RippleModule,
		ProgressBarModule,
    DialogModule,
    ConfirmDialogModule,
    CheckboxModule,CalendarModule,
    ReactiveFormsModule,
    TooltipModule,
    FileUploadModule,ToolbarModule
  ]
})
export class ReportModule { }
