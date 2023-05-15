import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastContainerDirective } from 'ngx-toastr';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [ToastrService, ToastContainerDirective],
})
export class LandingComponent {

	form: FormGroup;

	constructor(private http: HttpClient, private fb: FormBuilder,private toastr: ToastrService) {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}

  submit() {
    const baseUrl = window.location.origin;
    this.http
      .post(`${baseUrl}/.netlify/functions/signup`, this.form.value)
      .subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'Success');
        },
        error: (err) => {
          this.toastr.error('ERROR: ' + err.error, 'Error');
        },
      });
  }
  // submit() {
	// 	const baseUrl = window.location.origin;
	// 	this.http.post(`${baseUrl}/.netlify/functions/signup`, this.form.value).subscribe({
	// 		next: (res: any) => {
	// 			this.toastr.success(res.message);
	// 		},
	// 		error: (err) => {
	// 			this.toastr.error('ERROR: ' + err.error);
	// 		},
	// 	});
	// }
	// submit() {
  //   const baseUrl = window.location.origin;
  //   this.http
  //     .post(`${baseUrl}/.netlify/functions/signup`, this.form.value)
  //     .subscribe({
  //       next: (res: any) => {
  //         alert(res.message);
  //       },
  //       error: (err) => {
  //         alert('ERROR: ' + err.error);
  //       },
  //     });
  // }
}
