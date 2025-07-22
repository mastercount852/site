import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChildren,
  QueryList,
  NgZone
} from '@angular/core';

interface Founder {
  name: string;
  img: string;
  alt: string;
}

@Component({
  selector: 'app-painel02',
  templateUrl: './painel02.component.html',
  styleUrls: ['./painel02.component.css']
})
export class Painel02Component implements OnInit, AfterViewInit, OnDestroy {

  /* ---------- Conteúdo ---------- */
  headlinePrimary = 'Technologists';
  headlineRemainder = 'investing in technologists.';
  blurb = `Laude is an early‑stage firm created and run by GPs who have founded, built,
and invested in iconic $B+ software companies. We partner early to ignite momentum,
mobilize a universe of resources, and help deeply technical founders transform their
breakthroughs into paradigm‑creating companies with global impact.`; // texto demo

  foundersTitle = 'Founders & General Partners:';

  // Troque os paths para imagens reais no seu projeto (assets/...).
  // Se quiser testar rápido, pode usar picsum: 'https://picsum.photos/800/600?random=1'
  founders: Founder[] = [
    { name: 'Andy Konwinski', img: 'https://laude.vc/wp-content/uploads/Andy-Konwinski.jpg', alt: 'Founder 1' },
    { name: 'Pete Sonsini', img: 'https://laude.vc/wp-content/uploads/Andy-Konwinski.jpg', alt: 'Founder 2' },
    { name: 'Andrew Krioukov', img: 'https://laude.vc/wp-content/uploads/Andy-Konwinski.jpg', alt: 'Founder 3' }
  ];

  /* ---------- Refs para revelar ---------- */
  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef<HTMLElement>>;

  private io?: IntersectionObserver;

  constructor(private zone: NgZone) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  /* ===========================================================
   * IntersectionObserver
   * =========================================================== */
  private setupObserver(): void {
    // Observa fora da zona p/ performance
    this.zone.runOutsideAngular(() => {
      this.io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Volta p/ zona só para atualizar classe
              this.zone.run(() => {
                entry.target.classList.add('is-visible');
                this.io?.unobserve(entry.target);
              });
            }
          });
        },
        {
          // começa a revelar quando 20% do elemento entrou
          root: null,
          rootMargin: '0px 0px -20% 0px',
          threshold: 0
        }
      );

      // observar elementos já renderizados
      this.revealEls.forEach(ref => this.io?.observe(ref.nativeElement));

      // se a QueryList mudar (ex: dados async), observar novos
      this.revealEls.changes.subscribe((list: QueryList<ElementRef<HTMLElement>>) => {
        list.forEach(ref => this.io?.observe(ref.nativeElement));
      });
    });
  }
}
