import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_ROOT = 'http://3.7.173.54:8290/api/';

  constructor(private http: HttpClient) { }

  
  signIn(data:any) {
      return this.http.post(this.API_ROOT + 'v1/user/login', JSON.stringify(data), httpOptions);
  }
}
