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
import { OpeningBalanceComponent } from './opening-balance/opening-balance.component';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { DialogModule } from 'primeng/dialog';
import { UpdateItemComponent } from './item/update-item/update-item.component';
import { ItemViewComponent } from './item/item-view/item-view.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ItemLevelCreateComponent } from './item-levels/item-level-create/item-level-create.component';




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
         OpeningBalanceComponent,
         ItemCreateComponent,
         UpdateItemComponent,
         ItemViewComponent,
         ItemLevelCreateComponent
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
    ConfirmDialogModule
  ]
})
export class EntityModule { }
