import { TagListService } from 'src/app/services/tag-list.service';
import { HttpClient } from '@angular/common/http';
import { XetaSuccess } from 'src/app/global/xeta-success';
import { Xetaerror } from 'src/app/global/xetaerror';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-personal-name',
  templateUrl: './personal-name.component.html',
  styleUrls: ['./personal-name.component.css']
})
export class PersonalNameComponent implements OnInit {

  @Input() personalName:any;

  @Output() deleteEvent = new EventEmitter<any>()

  @Input() mode:string = ''


  whetherDisabled:boolean = false

  selectedTags:any[] = []
  filteredTags:any[] = new Array

  _eSub:any

  constructor(private httpClient:HttpClient) { }
  
  ngOnInit(): void {
    if (this.mode === 'edit') {
      this.whetherDisabled = true;
    }
    else if(this.mode ==='') {
      this.whetherDisabled = false;
    } 
    this.selectedTags = this.personalName.tags
  }

  handleDelete() {
    this.deleteEvent.emit(this.personalName)
  }

  handleChange(event:any) {

    let fn = this.personalName.firstname.trim()
    let mn = this.personalName.middlename.trim()
    let ln = this.personalName.lastname.trim()

    this.personalName.firstname = fn
    this.personalName.middlename = mn
    this.personalName.lastname = ln
    // let fln = fn + ' ' + mn + ' ' + ln
    // this.personalName.fullname = fln.trim()

    this.personalName.tags = this.selectedTags
    this.personalName.fullname = [fn, mn, ln].filter(Boolean).join(" ");

  }


  filterTags(event:any) {
    console.log('IN FILTER TAGS',event)
    // let criteria:Search = <Search>{searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'party-name-contains'};
    let criteria:any = {searchtext:event.query,screen:'tokenfield',offset:0,searchtype:'begins'};
    console.log('CRITERIA',criteria)
    
    let pService:TagListService = new TagListService(this.httpClient)
    this._eSub = pService.fetchTags(criteria).subscribe({
      complete: () => {
        console.info('complete')
      },
      error: (e) => {
        console.log('ERROR',e)
        alert('A server error occured. '+e.message)
        return;
      },
      next: (v) => {
        console.log('NEXT',v);
        if (v.hasOwnProperty('error')) {
          let dataError:Xetaerror = <Xetaerror>v; 
          alert(dataError.error);
          return;
        }
        else if(v.hasOwnProperty('success')) {
          let dataSuccess:XetaSuccess = <XetaSuccess>v;
          this.filteredTags = dataSuccess.success;
          console.log('FILTERED TAGS',dataSuccess.success)
          return;
        }
        else if(v == null) {
          alert('A null object has been returned. An undefined error has occurred.')
          return;
        }
        else {
          alert('An undefined error has occurred.')
          return
        }
      }
    })
  }
}
