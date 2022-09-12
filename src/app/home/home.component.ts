import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token:any;
  userData: any;
  email: any;
  name: any;
  //role: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    
    //console.log(this.token);
    console.log(this.userData);
    this.email = this.userData.email;
    this.name = this.userData.name;
    //this.role = this.userData.role;
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
