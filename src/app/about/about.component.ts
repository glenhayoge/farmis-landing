
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Carousel, Dropdown, initTE, Collapse } from 'tw-elements';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

   
  isMobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  } 
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

  ngOnInit() {
    initTE({ Carousel, Dropdown, Collapse });
  }

  get email() {
    return this.form.get('email');
  }

  simpleAlert(){
    Swal.fire('Hello world!');
  }
}
