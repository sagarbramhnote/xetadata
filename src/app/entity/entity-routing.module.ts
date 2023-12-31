import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { PartyAccountComponent } from './party-account/party-account.component';
import { OthersAccountComponent } from './others-account/others-account.component';
import { UOMsComponent } from './uoms/uoms.component';
import { WriteChequeComponent } from './write-cheque/write-cheque.component';
import { RecieveChequeComponent } from './recieve-cheque/recieve-cheque.component';
import { TagsComponent } from './tags/tags.component';
import { ItemLevelsComponent } from './item-levels/item-levels.component';
import { StockLocationsComponent } from './stock-locations/stock-locations.component';
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { UpdateItemComponent } from './item/update-item/update-item.component';
import { ItemViewComponent } from './item/item-view/item-view.component';
import { TagCreateComponent } from './tags/tag-create/tag-create.component';


import { ItemLevelCreateComponent } from './item-levels/item-level-create/item-level-create.component';

import { CreateOtherAccountComponent } from './others-account/create-other-account/create-other-account.component';
import { UpdateOtherAccountComponent } from './others-account/update-other-account/update-other-account.component';
import { AccessPartyAccountComponent } from './party-account/access-party-account/access-party-account.component';
import { UomsCreateComponent } from './uoms/uoms-create/uoms-create.component';
import { StockLocationsCreateComponent } from './stock-locations/stock-locations-create/stock-locations-create.component';
import { ProfileComponent } from './profile/profile.component';
import { WrittenchequecreateComponent } from './write-cheque/writtenchequecreate/writtenchequecreate.component';
import { RecievechequecreateComponent } from './recieve-cheque/recievechequecreate/recievechequecreate.component';
import { OpeningBalancesComponent } from './opening-balances/opening-balances.component';


const routes: Routes = [

  {path: 'profile',data: {breadcrumb: 'Profile'},component:ProfileComponent},

  { path: 'item', data: {breadcrumb: 'List'},component:ItemComponent},
  {path: 'itemCreate',data: {breadcrumb: 'Create'},component:ItemCreateComponent},
  {path: 'itemUpdate',data: {breadcrumb: 'Edit'},component:UpdateItemComponent},
  {path: 'itemView',data: {breadcrumb: 'View'},component:ItemViewComponent},
  {path: 'partyAccount',data: {breadcrumb: 'PartyAccount'},component:PartyAccountComponent},
  {path: 'partyAccountAccess',data: {breadcrumb: 'Access'},component:AccessPartyAccountComponent},
  {path: 'othersAccount',data: {breadcrumb: 'List'},component:OthersAccountComponent},
  {path: 'othersAccountCreate',data: {breadcrumb: 'Create'},component:CreateOtherAccountComponent},
  {path: 'othersAccountUpdate',data: {breadcrumb: 'Edit'},component:UpdateOtherAccountComponent},
  {path: 'UOMs', data: {breadcrumb: 'List'},component:UOMsComponent},
  {path: 'writeCheque',data: {breadcrumb: 'List'},component:WriteChequeComponent},
  {path: 'writtenChequecreate',data: {breadcrumb: 'Create'},component:WrittenchequecreateComponent},
  {path: 'recieveCheque',data: {breadcrumb: 'List'},component:RecieveChequeComponent},
  {path: 'recieveChequeCreate', data: {breadcrumb: 'Create'} ,component:RecievechequecreateComponent},

  {path: 'tags', data: {breadcrumb: 'List'},component:TagsComponent},
  {path: 'tagCreate',data: {breadcrumb: 'Create'},component:TagCreateComponent},
  {path: 'itemLevels',component:ItemLevelsComponent},

  {path: 'tags',component:TagsComponent},
  {path: 'itemLevels',data: {breadcrumb: 'List'},component:ItemLevelsComponent},
  {path: 'itemLevelCeate',data: {breadcrumb: 'Create'},component:ItemLevelCreateComponent},


  {path: 'stockLocations',component:StockLocationsComponent},
  {path: 'openingBalance', data:{breadcrumb:'OpeningBalance'},component:OpeningBalancesComponent},

  {path: 'uomsCreate',data: {breadcrumb: 'Create'},component:UomsCreateComponent},
  {path: 'stockLocations',data: {breadcrumb: 'Stock-Location-List'},component:StockLocationsComponent},
  {path: 'stockLocationsCreate',data: {breadcrumb: 'Stock-Location-Create'},component:StockLocationsCreateComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
