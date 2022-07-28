import { Injectable } from '@angular/core';
import app_config from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrmService {

  constructor(private http: HttpClient) { }
  public apiurl: string = app_config.crmApiUrl;
  public options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getToken()}` }) };

  getToken() {
    // var token = sessionStorage.getItem('token');
    // return token;
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjEiLCJ1c2VyVHlwZUlkIjoiMSIsInJlcXRpbWUiOjE2NTMzMTI2MzM4MDZ9LCJpYXQiOjE2NTMzMTI2MzN9.MjXLcad-PzFFd9_-KnI0xrSdjOKBsakP9Hyw0dpxZJo";
  }
}
