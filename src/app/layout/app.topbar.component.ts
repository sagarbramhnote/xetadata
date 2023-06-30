import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GlobalConstants } from '../global/global-constants';
import { EventBusServiceService } from '../global/event-bus-service.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent implements OnInit{

    @ViewChild('menubutton') menuButton!: ElementRef;

    GlobalConstants = GlobalConstants

    entityname:string = ''
    username:string = ''

    constructor(public layoutService: LayoutService,private eventService:EventBusServiceService) { }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showProfileSidebar();
    }
    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    ngOnInit(): void {

        this.eventService.on('LogInEvent',(data:any) => {
            console.log('LoginData',data)
            this.entityname = data.entityname
            this.username = data.accounthead
        })


        this.eventService.on('LogOutEvent',(data:any) => {
            this.entityname = ''
            this.username = ''
        })
        
    }
    
}