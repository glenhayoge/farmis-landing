import { Component, HostListener, OnInit } from '@angular/core';
import { Carousel, Dropdown, initTE, Collapse } from 'tw-elements';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
})
export class TopNavComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
    initTE({ Carousel, Dropdown, Collapse});
  }

}
