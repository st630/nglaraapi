import { Component, OnInit } from '@angular/core';

import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup, Validator, Validators, FormControl, AbstractControl } from '@angular/forms';

//import { MustMatch } from '../confirmed.validator';
import Validation from '../utils/validation';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  [x: string]: any;

  myform: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;
  data: any;

  //[x: string]: any;
  //myform!: FormGroup;
  //submitted = false;
  //repeatPwd: string = 'none';

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService) {}

  ngOnInit(): void {

    this.myform = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );

    //this.createForm;
  
  //   this.myform = new FormGroup({
  //     'name': new FormControl('', Validators.required),
  //     'email': new FormControl('', [Validators.required, Validators.email]),
  //     'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
  //     'confirmPassword': new FormControl('', Validators.required)
  //   }, {
  //     //validator: this['MustMatch']('password', 'confirmPassword')
  //   }
  //   );
  // }

  //  createForm(){
  //    this.myform = this.formBuilder.group({
  //      name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //      password: ['', [Validators.required, Validators.minLength(6)]],
  //      confirmPassword: ['', Validators.required]
  //    },
  //     {
  //       validator: MustMatch('password', 'confirmPassword')
  //     }
  //   );
  // }

  // get f(){
  //   return this.myform.controls;
  //this.createForm;
    //   this.myform = new FormGroup({
    //     'name': new FormControl('', Validators.required),
    //     'email': new FormControl('', [Validators.required, Validators.email]),
    //     'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    //     'confirmPassword': new FormControl('', Validators.required)
    //   }, {
    //     //validator: this['MustMatch']('password', 'confirmPassword')
    //   }
    //   );
    // }
    //  createForm(){
    //    this.myform = this.formBuilder.group({
    //      name: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //      password: ['', [Validators.required, Validators.minLength(6)]],
    //      confirmPassword: ['', Validators.required]
    //    },
    //     {
    //       validator: MustMatch('password', 'confirmPassword')
    //     }
    //   );
    // }
    // get f(){
    //   return this.myform.controls;
  }

  // simpleAlert(){
  //   Swal.fire('Hello world!');
  // }
  
  // alertWithSuccess(){
  //   Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  // }

  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.myform.invalid) {
      return;
    }

    this.dataService.registeruser(this.myform.value).subscribe(res => {
      this.data = res;
      //console.log(res);
      if(this.data.status === 1) {
        // this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
        //   timeOut: 2000,
        //   progressBar: true
        // });
        Swal.fire('Thank You', JSON.stringify(this.data.message), 'success')
      } else {
        // this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
        //   timeOut: 2000,
        //   progressBar: true
        // });
        Swal.fire('Somethin went wrong', JSON.stringify(this.data.message), 'error')
      }

      this.submitted = false;
      this.myform.get('name')?.reset();
      this.myform.get('email')?.reset();
      this.myform.get('password')?.reset();
      this.myform.get('confirmPassword')?.reset();

    });

    // this.dataService.adminregister(this.myform.value).subscribe(res => {
    //   this.data = res;
    //   //console.log(res);
    //   if(this.data.status === 1) {
    //     // this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
    //     //   timeOut: 2000,
    //     //   progressBar: true
    //     // });
    //     Swal.fire('Thank You', JSON.stringify(this.data.message), 'success')
    //   } else {
    //     // this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
    //     //   timeOut: 2000,
    //     //   progressBar: true
    //     // });
    //     Swal.fire('Somethin went wrong', JSON.stringify(this.data.message), 'error')
    //   }

    //   this.submitted = false;
    //   this.myform.get('name')?.reset();
    //   this.myform.get('email')?.reset();
    //   this.myform.get('password')?.reset();
    //   this.myform.get('confirmPassword')?.reset();

    // });

    //console.log(JSON.stringify(this.myform.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.myform.reset();
  }

  // onSubmit(){
  //   this.submitted = true;
  //   if(this.myform.invalid){
  //     return;
  //   }
  //   if(this['password'].value == this['confirmPassword'].value) {
  //     console.log('submitted');
  //   } else {
  //     this.repeatPwd = 'inline'
  //   }
  //   //console.log(this.myform);
  // }

}
