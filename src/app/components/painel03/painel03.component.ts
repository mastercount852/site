import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core';

@Component({
  selector: 'app-painel03',
  templateUrl: './painel03.component.html',
  styleUrls: ['./painel03.component.css']
})
export class Painel03Component implements OnInit, AfterViewInit, OnDestroy {

  /* Texto dividido em 6 linhas (ajuste como quiser) */
  lines: string[] = [
    'Laude Ventures is',
    'funded by future-focused',
    'institutional investors,',
    'iconic technical founders,',
    'and 51 of the world’s leading computer scientists.'
  ];

  /** flags de visibilidade/anim */
  lineVisible: boolean[] = [false, false, false, false, false, false];

  /** atraso base entre linhas (ms) */
  private readonly LINE_STAGGER = 250;

  /** tempo antes da 1ª linha (ms) */
  private readonly INTRO_DELAY = 300;

  /** guarda timeouts p/ cancelar ao sair */
  private timers: number[] = [];

  /** IntersectionObserver */
  private io?: IntersectionObserver;

  /** root da seção p/ observar entrada/saída */
  @ViewChild('root', { static: true }) rootEl!: ElementRef<HTMLElement>;

  constructor(private zone: NgZone) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initObserver();
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.clearTimers();
  }

  /* -------------------------------------------------------
   * IO: quando seção entra no viewport -> (re)anima
   * quando sai -> reseta (para poder reanimar depois)
   * ----------------------------------------------------- */
  private initObserver(): void {
    this.zone.runOutsideAngular(() => {
      this.io = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.target === this.rootEl.nativeElement) {
              if (entry.isIntersecting) {
                this.zone.run(() => this.playIntro());
              } else {
                this.zone.run(() => this.resetIntro());
              }
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -20% 0px', // inicia quando 80% entrou
          threshold: 0
        }
      );
      this.io.observe(this.rootEl.nativeElement);
    });
  }

  /* dispara sequência */
  private playIntro(): void {
    this.resetIntro(false); // mantém timers limpos mas não desconecta IO
    this.lines.forEach((_, i) => {
      const id = window.setTimeout(() => {
        this.lineVisible[i] = true;
      }, this.INTRO_DELAY + i * this.LINE_STAGGER);
      this.timers.push(id);
    });
  }

  /* reseta flags; se withTimers=true (default) limpa timeouts */
  private resetIntro(clearTimers: boolean = true): void {
    if (clearTimers) this.clearTimers();
    for (let i = 0; i < this.lineVisible.length; i++) {
      this.lineVisible[i] = false;
    }
  }

  private clearTimers(): void {
    this.timers.forEach(id => clearTimeout(id));
    this.timers = [];
  }
}
