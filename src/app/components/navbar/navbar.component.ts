import { Component, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  currentLang!: string;
  public dropdownOpen = false;

  
  constructor(private scrollSrv: ScrollService, private translate: TranslateService) {
    this.translate.addLangs(this.languages.map(lang => lang.code));

    const savedLang = localStorage.getItem('language');
    if (savedLang && this.languages.some(lang => lang.code === savedLang)) {
      this.currentLang = savedLang;
    } else {
      this.currentLang = 'en'; // inglês como padrão
    }

    this.translate.setDefaultLang('en'); // sempre define inglês como padrão
    this.translate.use(this.currentLang);
  }

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

  languages = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'pt', name: 'Português', flag: 'https://flagcdn.com/w40/br.png' },
    { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'de', name: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' }
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  switchLanguage(language: string) {
    if (this.languages.some(lang => lang.code === language)) {
      this.translate.use(language);
      localStorage.setItem('language', language);
      this.currentLang = language;
      this.dropdownOpen = false;
    }
  }

  getFlag(langCode: string): string {
    const lang = this.languages.find(l => l.code === langCode);
    return lang ? lang.flag : '';
  }

  getLanguageName(langCode: string): string {
    const lang = this.languages.find(l => l.code === langCode);
    return lang ? lang.name : '';
  }
}
