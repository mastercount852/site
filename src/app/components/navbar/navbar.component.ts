import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;

  constructor() { }

  ngOnInit(): void { }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToElement(id: string): void {
    const el = document.getElementById(id);
    if (!el) { return; }

    (window as any).skipEsferas = true;
    (window as any).anchorTarget = el.offsetTop;
    el.scrollIntoView({ behavior: 'smooth' });
    this.isMenuOpen = false; // fecha menu após clicar
  }
}
