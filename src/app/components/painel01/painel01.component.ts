import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-painel01',
  templateUrl: './painel01.component.html',
  styleUrls: ['./painel01.component.css']
})
export class Painel01Component implements AfterViewInit, OnDestroy {
  /* HERO */
  heroVisible: boolean[] = [false, false, false];

  /* ESFERAS */
  stage = 0; // 0=nenhuma, 1=1ª, 2=1ª+2ª, 3=todas

  @ViewChild('scrollyRoot', { static: true }) scrollyRoot!: ElementRef<HTMLElement>;

  private timers: any[] = [];
  private observer?: IntersectionObserver;

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    this.startHeroIntro();
    this.setupCirclesObserver();
  }

  ngOnDestroy(): void {
    this.timers.forEach(id => clearTimeout(id));
    this.observer?.disconnect();
  }

  /** Animação de entrada do Hero */
  private startHeroIntro(): void {
    [0, 1, 2].forEach(i => {
      const delay = 200 + i * 250;
      this.timers.push(
        setTimeout(() => this.heroVisible[i] = true, delay)
      );
    });
  }

  /** Observa quando a seção de esferas entra na tela */
  private setupCirclesObserver(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.target === this.scrollyRoot.nativeElement && entry.isIntersecting) {
            // Quando aparecer, inicia animação e deixa de observar
            this.zone.run(() => this.startCirclesIntro());
            this.observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      this.observer.observe(this.scrollyRoot.nativeElement);
    });
  }

  /** Animações automáticas das esferas */
  private startCirclesIntro(): void {
    // 1ª esfera após 0ms
    this.timers.push(setTimeout(() => this.stage = 1, 500));
    // 2ª após 1000ms
    this.timers.push(setTimeout(() => this.stage = 2, 1000));
    // 3ª após 2000ms
    this.timers.push(setTimeout(() => this.stage = 3, 1500));
  }
}
