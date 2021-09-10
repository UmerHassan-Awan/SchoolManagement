import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  //BaseUrl:string = "http://localhost:8831/SchoolMS_Service.svc/";
  BaseUrl:string = "http://localhost:15918/api/";
  constructor(private http: HttpClient) { }

  HttpGet(URL:string)
  {
    return this.http.get(this.BaseUrl + URL);
  }

  HttpPost(URL:string, data:any)
  {
    let headers = new HttpHeaders({
      'content-type':'application/json'
    });
    
    let options = { headers : headers };
    
    return this.http.post(this.BaseUrl + URL, data, options);
  }

  convertJsonDate(jsonDate)
  {
    var convetedDate = new Date(parseInt(jsonDate.substr(6)));
    var day=(convetedDate.getDate().toString()).slice(-2);
    var month=(((convetedDate.getMonth()+1).toString())).slice(-2);
    var newDate=(month)+"/"+(day)+"/"+convetedDate.getFullYear();
    return newDate;
  }

  convertToJSONDate(strDate) {
    var dt = new Date(strDate);
    var newDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()));
    return '/Date(' + newDate.getTime() + ')/';
  }
}
