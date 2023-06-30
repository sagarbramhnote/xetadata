import { Component,OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

import { GlobalConstants } from '../global/global-constants';
import { Router } from '@angular/router';
import { EventBusServiceService } from '../global/event-bus-service.service';
import { EventData } from '../global/event-data';

@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent implements OnInit{

    GlobalConstants = GlobalConstants;
    username:string = ''

    constructor(public layoutService: LayoutService,private router:Router, private eventService:EventBusServiceService) { }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    handleLogin(e:any) {
        if (!GlobalConstants.loginStatus) {
            this.router.navigate(['/login'])
            this.visible = false
            return
        }
        else if(GlobalConstants.loginStatus) {
            GlobalConstants.loginStatus = false
            this.router.navigate(['/xetaproducts'])
            this.visible = false
            this.eventService.emit(new EventData('LogOutEvent','out'))
            return
        }
    }

    ngOnInit(): void {
        this.eventService.on('LogInEvent',(data:any) => {
            console.log('LoginData',data)
            this.username = data.accounthead
        })


        this.eventService.on('LogOutEvent',(data:any) => {
            this.username = ''
        })
    }

}