import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';

interface LogoItem {
  label: string;
  img?: string;
  alt?: string;
}

@Component({
  selector: 'app-painel04',
  templateUrl: './painel04.component.html',
  styleUrls: ['./painel04.component.css']
})
export class Painel04Component implements OnInit, AfterViewInit, OnDestroy {
  /* ---------- Texto ---------- */
  headingPre = 'From';
  headingAccent = 'lab';
  headingPost = 'to Laude';
  copy = `We’re proud first followers of visionary computer scientists building paradigm-creating companies. Our investments span deeply technical infrastructure and applications, often rooted in research.`;

  /* ---------- Logos base ---------- */
  private baseRow1: LogoItem[] = [
    { label: 'Arcade', img: 'assets/img/logos/arcade.svg', alt: 'Arcade' },
    { label: 'LMArena', img: 'assets/img/logos/lmarena.svg', alt: 'LMArena' },
    { label: 'TabsData', img: 'assets/img/logos/tabsdata.svg', alt: 'TabsData' },
    { label: 'Foundry', img: 'assets/img/logos/foundry.svg', alt: 'Foundry' },
    { label: 'Prompt', img: 'assets/img/logos/prompt.svg', alt: 'Prompt' },
    { label: 'SigIQ.ai', img: 'assets/img/logos/sigiq.svg', alt: 'SigIQ.ai' },
    { label: 'Arcadia', img: 'assets/img/logos/arcadia.svg', alt: 'Arcadia' }
  ];
  private baseRow2: LogoItem[] = [
    { label: 'Normal', img: 'assets/img/logos/normal.svg', alt: 'Normal' },
    { label: 'Linea', img: 'assets/img/logos/linea.svg', alt: 'Linea' },
    { label: 'Perplexity', img: 'assets/img/logos/perplexity.svg', alt: 'Perplexity' },
    { label: 'Clairvoyant', img: 'assets/img/logos/clairvoyant.svg', alt: 'Clairvoyant' },
    { label: 'Eventual', img: 'assets/img/logos/eventual.svg', alt: 'Eventual' },
    { label: 'Narada', img: 'assets/img/logos/narada.svg', alt: 'Narada' }
  ];

  /** duplicados para montagem inicial (2×) */
  row1Loop: LogoItem[] = [];
  row2Loop: LogoItem[] = [];

  @ViewChild('row1Track', { static: true }) private row1Track!: ElementRef<HTMLUListElement>;
  @ViewChild('row2Track', { static: true }) private row2Track!: ElementRef<HTMLUListElement>;

  private timer1: any;
  private timer2: any;

  ngOnInit(): void {
    this.row1Loop = [...this.baseRow1, ...this.baseRow1];
    this.row2Loop = [...this.baseRow2, ...this.baseRow2];
  }

  ngAfterViewInit(): void {
    // esquerda→direita: left=false (move +delta)
    this.setupCarousel(this.row1Track.nativeElement, 2000, 1000, 'left');
    // direita→esquerda: left=true (move -delta)
    this.setupCarousel(this.row2Track.nativeElement, 2000, 1000, 'right');
  }

  ngOnDestroy(): void {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  }

  trackByIdx(idx: number, _item: LogoItem): number { return idx; }

  /**
   * Monta o carrossel rotativo
   * @param trackEl <ul> com os <li>
   * @param interval tempo entre slides (ms)
   * @param duration duração da transição (ms)
   * @param direction 'left' ou 'right'
   */
  private setupCarousel(
    trackEl: HTMLUListElement,
    interval: number,
    duration: number,
    direction: 'left' | 'right'
  ) {
    const getDelta = () => {
      const items = Array.from(trackEl.children) as HTMLElement[];
      if (items.length < 2) return 0;
      const a = items[0].getBoundingClientRect().left;
      const b = items[1].getBoundingClientRect().left;
      return Math.round(b - a);
    };

    const slide = () => {
      const delta = getDelta();
      if (!delta) return;

      if (direction === 'left') {
        // 1) injeto imediatamente clone do first ao fim
        const first = trackEl.children[0];
        const clone = first.cloneNode(true);
        trackEl.appendChild(clone);
        // 2) animar de 0 → -delta
        trackEl.style.transition = `transform ${duration}ms ease`;
        trackEl.style.transform = `translateX(${-delta}px)`;

      } else {
        // 1) clone do last ao início
        const last = trackEl.children[trackEl.children.length - 1];
        const clone = last.cloneNode(true);
        trackEl.insertBefore(clone, trackEl.children[0]);
        // 2) posição inicial à esquerda (-delta) sem transição
        trackEl.style.transition = 'none';
        trackEl.style.transform = `translateX(${-delta}px)`;
        // força reflow antes de animar
        trackEl.getBoundingClientRect();
        trackEl.style.transition = `transform ${duration}ms ease`;
        trackEl.style.transform = `translateX(0)`;
      }

      // 3) ao fim, remover o original e resetar transform
      const cleanup = () => {
        trackEl.removeEventListener('transitionend', cleanup);
        trackEl.style.transition = 'none';
        trackEl.style.transform = 'none';
        if (direction === 'left') {
          // remove o original first
          trackEl.removeChild(trackEl.children[0]);
        } else {
          // remove o original last
          trackEl.removeChild(trackEl.children[trackEl.children.length - 1]);
        }
      };
      trackEl.addEventListener('transitionend', cleanup);
    };

    // incia auto‑slide
    const id = setInterval(slide, interval);
    if (direction === 'left') this.timer1 = id;
    else this.timer2 = id;

    // pausa/resume no hover
    const parent = trackEl.parentElement!;
    parent.addEventListener('mouseenter', () => clearInterval(
      direction === 'left' ? this.timer1 : this.timer2
    ));
    parent.addEventListener('mouseleave', () => {
      const fresh = setInterval(slide, interval);
      if (direction === 'left') this.timer1 = fresh;
      else this.timer2 = fresh;
    });
  }
}
