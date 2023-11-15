import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],

})
export class LandingComponent {

  isSmallNavbar = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isSmallNavbar = scrollY > 50; // Change the value to adjust when the navbar should shrink
  }

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
          Swal.fire('Email Sent Successfully!',
          res.message);
          this.form.reset();
        },
        error: (err) => {
          Swal.fire('ERROR: ' + err.error);
        },
      });
  }
}
