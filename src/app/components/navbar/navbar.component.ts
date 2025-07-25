import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;

  constructor(private scrollSrv: ScrollService) { }

  ngOnInit(): void { }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToElement(id: string): void {
    // sinaliza âncora
    this.scrollSrv.signalAnchorScroll();
    // rolagem suave
    document.getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
