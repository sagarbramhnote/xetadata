import { GlobalConstants } from '../global/global-constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'; 


@Injectable({
  providedIn: 'root'
})
export class SaveItemLevelService {

  constructor(private http:HttpClient) { } 

  saveItemLevel(item:any) { 
    
    let loginObject = GlobalConstants.loginObject
    
    let headers  = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8').append('authorization','Basic ' + btoa(loginObject.accountid+":"+loginObject.endpoint+":"+loginObject.token+":"+loginObject.schema+":"+loginObject.database));
    
    let postdata = JSON.stringify(item)

    let params = new HttpParams();
    params = params.append('postdata',postdata); 
   
    let ROOT_URL = 'https://'+loginObject.appurl+'/unifund/AuthItemLevel';

    return this.http.put(ROOT_URL,postdata,{headers:headers})


  }

}
