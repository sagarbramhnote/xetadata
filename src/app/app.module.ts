import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReplaceZeroWithEmptyPipe } from './pipes/replace-zero-with-empty-for-cs.pipe.spec';
import { ReplaceZeroWithEmptyForCSPipe } from './pipes/replace-zero-with-empty-for-cs.pipe';



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ReplaceZeroWithEmptyPipe,
        ReplaceZeroWithEmptyForCSPipe

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        ToastModule,
        ProgressSpinnerModule,
        CheckboxModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        InputTextModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
