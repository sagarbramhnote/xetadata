import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalConstants } from '../global/global-constants';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceOpenListService {

  constructor(private http:HttpClient) { }

  fetchOpenProductServiceList(criteria:any) {
    
    let loginObject = GlobalConstants.loginObject 
    
    let headers  = new HttpHeaders();
    headers = headers.append('Content-Type','application/json; charset=utf-8').append('authorization','Basic ' + btoa(":::"+criteria.schema+":"+criteria.database));
        
    let postdata = JSON.stringify(criteria)
    console.log('POSTDATA',postdata)

    let params = new HttpParams();
    params = params.append('postdata',postdata);
   
    let ROOT_URL = 'https://'+criteria.appurl+'/unifund/AuthOpenProductAndServiceList';

    return this.http.get(ROOT_URL,{headers:headers,params:params})

  } 

}
