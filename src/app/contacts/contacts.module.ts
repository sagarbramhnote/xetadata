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

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ToastModule } from 'primeng/toast';
import { PersonalNameComponent } from './personcomponents/personal-name/personal-name.component';
import { CompanyNameComponent } from './personcomponents/company-name/company-name.component';
import { PostalAddressComponent } from './personcomponents/postal-address/postal-address.component';
import { TelephoneComponent } from './personcomponents/telephone/telephone.component';
import { EmailIDComponent } from './personcomponents/email-id/email-id.component';
import { GovtIDComponent } from './personcomponents/govt-id/govt-id.component';
import { DropdownModule } from 'primeng/dropdown';
import { ContactsUpdateComponent } from './contacts-update/contacts-update.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContactsCreateComponent } from './contacts-create/contacts-create.component';




@NgModule({
  declarations: [
    ContactsComponent,
    ContactsCreateComponent,
    ContactsUpdateComponent,
    PersonalNameComponent,
    CompanyNameComponent,
    PostalAddressComponent,
    TelephoneComponent,
    EmailIDComponent,
    GovtIDComponent,
   
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
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
    ConfirmDialogModule,

  ]
})
export class ContactsModule { }
