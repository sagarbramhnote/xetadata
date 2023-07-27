import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './login/login.component';
import { authenticationGuard } from './services/authguard';
import { RecipientsComponent } from './messages/recipients/recipients.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent},
            { path: 'xetaproducts', loadChildren: () => import('./xetaproducts/xetaproducts.module').then(m => m.XetaproductsModule)},
            { path: '', redirectTo: '/xetaproducts', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[authenticationGuard()]},
            { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule), canActivate:[authenticationGuard()]},
            { path: 'messages', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule), canActivate:[authenticationGuard()]},
            { path: 'recipients',component: RecipientsComponent, canActivate:[authenticationGuard()]},
            { path: 'products', data: { breadcrumb: 'Products' },loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canActivate:[authenticationGuard()]},
            { path: 'entity',data: { breadcrumb: 'Entity' }, loadChildren: () => import('./entity/entity.module').then(m => m.EntityModule), canActivate:[authenticationGuard()]},


        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
