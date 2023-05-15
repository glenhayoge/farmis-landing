import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],

})
export class LandingComponent {

  form: FormGroup;
  toastMessage?: string;
  

	constructor(private http: HttpClient, private fb: FormBuilder) {
	  this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
	}

  get email() {
    return this.form.get('email');
  }

  simpleAlert(){
    Swal.fire('Hello world!');
  }
  
	submit() {
    const baseUrl = window.location.origin;
    this.http
      .post(`${baseUrl}/.netlify/functions/signup`, this.form.value)
      .subscribe({
        next: (res: any) => {
          Swal.fire(res.message);
        },
        error: (err) => {
          Swal.fire('ERROR: ' + err.error);
        },
      });
  }
}
