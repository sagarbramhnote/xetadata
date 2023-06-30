import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { GlobalConstants } from '../global/global-constants';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Xetaerror } from '../global/xetaerror';
import { XetaSuccess } from '../global/xeta-success';
import { Login } from '../global/login';
import {ConfirmationService,MessageService} from 'primeng/api';
import { EventBusServiceService } from '../global/event-bus-service.service';
import { EventData } from '../global/event-data';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class LoginComponent implements OnInit {

  GlobalConstants = GlobalConstants;

  constructor(private router:Router,private loginService:LoginService,private confirmationService:ConfirmationService, private messageService: MessageService,private eventService:EventBusServiceService) {}
  
  loginForm: any;
  
  inProgress:boolean = false

  loginObject:any;

  ngOnInit() {

    console.log('LOGIN DATA',localStorage.getItem('logindata'))

    let ldjson:any = localStorage.getItem('logindata')

    if(ldjson){
      console.log('YES')
    }
    else {
      console.log('NO')
      ldjson = JSON.stringify({
        'endpoint':'',
        'password':'',
        'schema':'',
        'database':'',
        'appurl':''
      })
      
    }

    let ld = JSON.parse(ldjson)

    this.loginForm = new FormGroup({
      endpoint: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(3)]),
      schema: new FormControl('',[Validators.required]),
      database: new FormControl('',[Validators.required]),
      appurl: new FormControl('',[Validators.required]),
      rememberMe: new FormControl(false)
    });

    console.log(this.loginForm.get('endpoint'));

    this.loginForm.get('endpoint').setValue(ld.endpoint);
    this.loginForm.get('password').setValue(ld.password);
    this.loginForm.get('schema').setValue(ld.schema);
    this.loginForm.get('database').setValue(ld.database);
    this.loginForm.get('appurl').setValue(ld.appurl);
    
  }


  

  login(): void {
    // Verify if the endpoint input has errors or is not touched or is invalid

    this.loginForm.controls['endpoint'].touched = true
    this.loginForm.controls['password'].touched = true
    this.loginForm.controls['schema'].touched = true
    this.loginForm.controls['database'].touched = true
    this.loginForm.controls['appurl'].touched = true

    if (this.loginForm.controls['endpoint'].errors || this.loginForm.controls['endpoint'].invalid) {
      const endpointInput = document.getElementById('endpoint');
      if (endpointInput) {
        endpointInput.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }
    
    
    if (this.loginForm.controls['password'].errors || !this.loginForm.controls['password'].touched || this.loginForm.controls['password'].invalid) {
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        passwordInput.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }

    if (this.loginForm.controls['schema'].errors || !this.loginForm.controls['schema'].touched || this.loginForm.controls['schema'].invalid) {
      const schemaInput = document.getElementById('schema');
      if (schemaInput) {
        schemaInput.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }

    if (this.loginForm.controls['database'].errors || !this.loginForm.controls['database'].touched || this.loginForm.controls['database'].invalid) {
      const dbInput = document.getElementById('database');
      if (dbInput) {
        dbInput.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }

    if (this.loginForm.controls['appurl'].errors || !this.loginForm.controls['appurl'].touched || this.loginForm.controls['appurl'].invalid) {
      const dbInput = document.getElementById('appurl');
      if (dbInput) {
        dbInput.classList.add('ng-dirty', 'ng-invalid');
      }
      //return
    }

    //console.log(this.loginForm.invalid)
    

    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value)

    localStorage.setItem('logindata',JSON.stringify(this.loginForm.value))

    let lo = this.loginForm.value;
    lo["location"] = "17.4121456, 78.34493719999999"

    

    this.inProgress = true

    this.loginService.login(lo).subscribe({
      complete: () => {console.info('complete')},
      error: (e) => {
        console.log('ERROR',e) 
        this.inProgress = false
        this.showErrorViaToast('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v;
          this.inProgress = false 
          this.showErrorViaToast(dataError.error)
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.loginObject = <Login>dataSuccess.success;
          const dbInput = document.getElementById('appurl') as HTMLInputElement;
          this.loginObject.appurl = dbInput.value
          GlobalConstants.loginObject = this.loginObject;
          GlobalConstants.loginStatus = true
          this.inProgress = false

          let lo:any = JSON.parse(JSON.stringify(this.loginObject))

          //console.log('LO JSON',JSON.stringify(lo))

          this.eventService.emit(new EventData('LogInEvent',lo))

          if(lo.digitalkey.initialscreen === 'DashboardComponent') {
            this.router.navigate(['/dashboard'])
          }
          else if (lo.digitalkey.initialscreen === 'StockRegisterComponent') {
            
          }
          else {
            
            this.router.navigate(['/dashboard'])
          }
          return;
        }
        else if(v == null) {
          this.inProgress = false
          this.showErrorViaToast('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          this.inProgress = false
          this.showErrorViaToast('An undefined error has occurred.')
          return
        }
      }
    })

    //GlobalConstants.loginStatus = true
  
    // Rest of the login function code
    // ...



  }


  confirm(msg:string) {
    this.confirmationService.confirm({
        key: 'confirm1',
        message: msg
    });
  }

  showInfoViaToast() {
    this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }

  showWarnViaToast() {
      this.messageService.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
  }

  showErrorViaToast(detMsg:string) {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: detMsg });
  }

  showSuccessViaToast() {
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
  }

}
