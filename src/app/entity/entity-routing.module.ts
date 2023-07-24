import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
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
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { UpdateItemComponent } from './item/update-item/update-item.component';
import { ItemViewComponent } from './item/item-view/item-view.component';
import { ItemLevelCreateComponent } from './item-levels/item-level-create/item-level-create.component';

const routes: Routes = [
  {path: 'profile',component:ProfileComponent},
  { path: 'item', data: {breadcrumb: 'List'},component:ItemComponent},
  {path: 'itemCreate',data: {breadcrumb: 'Create'},component:ItemCreateComponent},
  {path: 'itemUpdate',data: {breadcrumb: 'Edit'},component:UpdateItemComponent},
  {path: 'itemView',data: {breadcrumb: 'View'},component:ItemViewComponent},
  {path: 'partyAccount',component:PartyAccountComponent},
  {path: 'othersAccount',component:OthersAccountComponent},
  {path: 'UOMs',component:UOMsComponent},
  {path: 'writeCheque',component:WriteChequeComponent},
  {path: 'recieveCheque',component:RecieveChequeComponent},
  {path: 'tags',component:TagsComponent},
  {path: 'itemLevels',data: {breadcrumb: 'List'},component:ItemLevelsComponent},
  {path: 'itemLevelCeate',data: {breadcrumb: 'Create'},component:ItemLevelCreateComponent},
  {path: 'stockLocations',component:StockLocationsComponent},
  {path: 'openingBalance',component:OpeningBalanceComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
