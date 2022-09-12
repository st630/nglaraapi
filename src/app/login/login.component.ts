import { Component, OnInit } from '@angular/core';

import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup, Validator, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

//import { MustMatch } from '../confirmed.validator';
//import Validation from '../utils/validation';

//import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  submitted = false;
  data: any;
  token: any;

  myform: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {}

  ngOnInit(): void {

    this.myform = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],
      }
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.myform.invalid) {
      return;
    }

    this.dataService.login(this.myform.value).subscribe(res => {
      this.data = res;
      //console.log(res);
      if(this.data.status === 1) {
        this.token = this.data.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/']);
        Swal.fire('Thank You', JSON.stringify(this.data.message), 'success')
      } else if(this.data.status === 0) {
        Swal.fire('Something went wrong', JSON.stringify(this.data.message), 'error')
      }
    });

    // this.dataService.adminlogin(this.myform.value).subscribe(res => {
    //   this.data = res;
    //   //console.log(res);
    //   if(this.data.status === 1) {
    //     this.token = this.data.token;
    //     localStorage.setItem('token', this.token);
    //     this.router.navigate(['/']);
    //     Swal.fire('Thank You', JSON.stringify(this.data.message), 'success')
    //   } else if(this.data.status === 0) {
    //     Swal.fire('Something went wrong', JSON.stringify(this.data.message), 'error')
    //   }
    // });

    //console.log(JSON.stringify(this.myform.value, null, 2));
  }

}
