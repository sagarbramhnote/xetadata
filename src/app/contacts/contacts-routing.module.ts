import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactsUpdateComponent } from './contacts-update/contacts-update.component';
import { ContactsCreateComponent } from './contacts-create/contacts-create.component';

const routes: Routes = [
  {path: '', component:ContactsComponent},
  {path: 'create', data:{breadcrumb:'Create'},component:ContactsCreateComponent},
  {path: 'edit', data:{breadcrumb:'Edit'},component:ContactsUpdateComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
