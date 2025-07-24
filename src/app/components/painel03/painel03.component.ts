import {
  Component,
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
export class Painel03Component implements AfterViewInit, OnDestroy {

  /** flags de visibilidade/anim */
  lineVisible: boolean[] = [false, false, false, false, false];

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

  ngAfterViewInit(): void {
    this.initObserver();
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.clearTimers();
  }

  private initObserver(): void {
    this.zone.runOutsideAngular(() => {
      this.io = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.target === this.rootEl.nativeElement) {
              if (entry.isIntersecting) {
                this.zone.run(() => this.playIntro());
              } else {
                this.zone.run(() => this.resetIntro());
              }
            }
          }
        },
        {
          root: null,
          rootMargin: '0px 0px -20% 0px',
          threshold: 0
        }
      );
      this.io.observe(this.rootEl.nativeElement);
    });
  }

  private playIntro(): void {
    this.resetIntro(false);
    for (let i = 0; i < this.lineVisible.length; i++) {
      const id = window.setTimeout(() => {
        this.lineVisible[i] = true;
      }, this.INTRO_DELAY + i * this.LINE_STAGGER);
      this.timers.push(id);
    }
  }

  private resetIntro(clearTimers: boolean = true): void {
    if (clearTimers) this.clearTimers();
    this.lineVisible.fill(false);
  }

  private clearTimers(): void {
    this.timers.forEach(id => clearTimeout(id));
    this.timers = [];
  }

}
