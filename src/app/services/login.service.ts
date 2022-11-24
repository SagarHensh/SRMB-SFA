import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import app_config from '../app.config';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_ROOT = app_config.crmApiUrl + 'api/';

  constructor(private http: HttpClient) { }

  
  signIn(data:any) {
      return this.http.post(this.API_ROOT + 'v1/user/login', JSON.stringify(data), httpOptions);
  }
  signInV2(data:any) {
      return this.http.post(this.API_ROOT + 'v2/user/login', JSON.stringify(data), httpOptions);
  }
}
