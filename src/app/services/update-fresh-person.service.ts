import { GlobalConstants } from '../global/global-constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UpdateFreshPersonService {

  constructor(private http:HttpClient) { }

  updatePerson(sale:any) {
    
    let loginObject = GlobalConstants.loginObject
    
    let headers  = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8').append('authorization','Basic ' + btoa(loginObject.accountid+":"+loginObject.endpoint+":"+loginObject.token+":"+loginObject.schema+":"+loginObject.database));
    
    let postdata = JSON.stringify(sale)

    let params = new HttpParams();
    params = params.append('postdata',postdata);
   
    let ROOT_URL = 'https://'+loginObject.appurl+'/unifund/AuthFreshPerson';

    return this.http.post(ROOT_URL,postdata,{headers:headers}) 


  }

  
} 
