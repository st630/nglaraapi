import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  registeruser(data: any) {
    return this.httpClient.post(environment.apiUrl+'/api/register', data);
  }

  login(data: any) {
     return this.httpClient.post(environment.apiUrl+'/api/login', data);
  }

  profile(data: any) {
    return this.httpClient.post(environment.apiUrl+'/api/profile', data);
  }

  // adminregister(data: any) {
  //   return this.httpClient.post(environment.apiUrl+'/api/admin/register', data)
  // }

  // adminlogin(data: any) {
  //   return this.httpClient.post(environment.apiUrl+'/api/admin/login', data);
  // }

}

