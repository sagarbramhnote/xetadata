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
import { EntityRoutingModule} from './entity-routing.module';
import { ItemComponent } from './item/item.component';
import { PartyAccountComponent } from './party-account/party-account.component';
import { OthersAccountComponent } from './others-account/others-account.component';
import { UOMsComponent } from './uoms/uoms.component';
import { WriteChequeComponent } from './write-cheque/write-cheque.component';
import { RecieveChequeComponent } from './recieve-cheque/recieve-cheque.component';
import { TagsComponent } from './tags/tags.component';
import { ItemLevelsComponent } from './item-levels/item-levels.component';
import { StockLocationsComponent } from './stock-locations/stock-locations.component';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { DialogModule } from 'primeng/dialog';
import { UpdateItemComponent } from './item/update-item/update-item.component';
import { ItemViewComponent } from './item/item-view/item-view.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagCreateComponent } from './tags/tag-create/tag-create.component';


import { ItemLevelCreateComponent } from './item-levels/item-level-create/item-level-create.component';

import { CreateOtherAccountComponent } from './others-account/create-other-account/create-other-account.component';
import { UpdateOtherAccountComponent } from './others-account/update-other-account/update-other-account.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CreatePartyAccountComponent } from './party-account/create-party-account/create-party-account.component';
import { AccessPartyAccountComponent } from './party-account/access-party-account/access-party-account.component';

import { CalendarModule } from 'primeng/calendar';

import { UomsCreateComponent } from './uoms/uoms-create/uoms-create.component';
import { StockLocationsCreateComponent } from './stock-locations/stock-locations-create/stock-locations-create.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalNameProfileComponent } from './profile/personal-name-profile/personal-name-profile.component';
import { CompanyNameProfileComponent } from './profile/company-name-profile/company-name-profile.component';
import { TelephoneProfileComponent } from './profile/telephone-profile/telephone-profile.component';
import { EmailIDProfileComponent } from './profile/email-id-profile/email-id-profile.component';
import { PostalAddressProfileComponent } from './profile/postal-address-profile/postal-address-profile.component';
import { GovtIDProfileComponent } from './profile/govt-id-profile/govt-id-profile.component';
import { OpeningBalanceComponent } from './opening-balance/opening-balance.component';
import { WrittenchequecreateComponent } from './write-cheque/writtenchequecreate/writtenchequecreate.component';
import { RecievechequecreateComponent } from './recieve-cheque/recievechequecreate/recievechequecreate.component';






@NgModule({
  declarations: [

  
    ItemComponent,
         PartyAccountComponent,
         OthersAccountComponent,
         UOMsComponent,
         WriteChequeComponent,
         RecieveChequeComponent,
         TagsComponent,
         ItemLevelsComponent,
         StockLocationsComponent,
         ItemCreateComponent,
         UpdateItemComponent,
         ItemViewComponent,
         TagCreateComponent,
         ItemLevelCreateComponent,
         CreateOtherAccountComponent,
         UpdateOtherAccountComponent,
         CreatePartyAccountComponent,
         AccessPartyAccountComponent,
         UomsCreateComponent,
         StockLocationsCreateComponent,
         OpeningBalanceComponent,
         ProfileComponent,
         PersonalNameProfileComponent,
         CompanyNameProfileComponent,
         TelephoneProfileComponent,
         EmailIDProfileComponent,
         PostalAddressProfileComponent,
         GovtIDProfileComponent,
         WrittenchequecreateComponent,
         RecievechequecreateComponent



  ],
  imports: [
    CommonModule,
    EntityRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class EntityModule { }
