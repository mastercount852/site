import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  HostListener,
  NgZone
} from '@angular/core';

@Component({
  selector: 'app-painel01',
  templateUrl: './painel01.component.html',
  styleUrls: ['./painel01.component.css']
})
export class Painel01Component implements AfterViewInit, OnDestroy {
  /* ---------- HERO ---------- */
  // Mantemos a lógica de exibição, ainda usando 3 índices
  heroVisible: boolean[] = [false, false, false];

  /* ---------- ESFERAS ---------- */
  stage = 0;              // 0=nenhuma, 1=1ª, 2=1ª+2ª, 3=todas
  private lastStage = -1; // evita mudanças redundantes
  private progress = 0;   // 0..1

  /* Bloqueio de scroll */
  private isLocked = false;
  private lockMode: 'forward' | 'reverse' | null = null;
  private lockScrollTop = 0;

  /* Detecção de direção */
  private lastScrollY = 0;

  /* Estilos prévios do body */
  private bodyPrevOverflow = '';
  private bodyPrevPosition = '';
  private bodyPrevTop = '';
  private bodyPrevWidth = '';

  /* Sensibilidade do scrub */
  private readonly PIXELS_PER_FULL_PROGRESS = 1600;

  /* Touch */
  private touchStartY: number | null = null;

  constructor(private zone: NgZone) { }

  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef<HTMLElement>;
  @ViewChild('scrollyRoot', { static: true }) scrollyRoot!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.startHeroIntro();
    this.lastScrollY = window.scrollY;
  }

  ngOnDestroy(): void {
    this.removeLockEventHandlers();
    if (this.isLocked) this.unlockScroll(window.scrollY);
  }

  /** Animação de entrada do Hero */
  private startHeroIntro(): void {
    [0, 1, 2].forEach(i => {
      setTimeout(() => {
        this.heroVisible[i] = true;
      }, 200 + i * 250);
    });
  }

  /** Escuta global de scroll para as esferas */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isLocked) return;

    const heroEl = this.heroSection.nativeElement;
    const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
    const scrollyTop = this.scrollyRoot.nativeElement.offsetTop;

    const prevY = this.lastScrollY;
    const currY = window.scrollY;
    const goingDown = currY > prevY;
    const goingUp = currY < prevY;
    this.lastScrollY = currY;

    if (goingDown && currY >= heroBottom && this.stage < 3) {
      this.alignAndLockForward(scrollyTop);
      return;
    }
    if (goingUp && currY <= scrollyTop && this.stage > 0) {
      this.alignAndLockReverse(scrollyTop);
      return;
    }
  }

  private alignAndLockForward(top: number) {
    window.scrollTo({ top, behavior: 'auto' });
    this.beginLock('forward');
  }

  private alignAndLockReverse(top: number) {
    window.scrollTo({ top, behavior: 'auto' });
    this.beginLock('reverse');
  }

  private beginLock(mode: 'forward' | 'reverse'): void {
    this.lockScroll(mode);
    this.progress = mode === 'forward' ? 0 : 1;
    this.updateStageFromProgress();
    this.addLockEventHandlers();
  }

  private addLockEventHandlers(): void {
    window.addEventListener('wheel', this.onWheelLocked, { passive: false });
    window.addEventListener('touchstart', this.onTouchStartLocked, { passive: false });
    window.addEventListener('touchmove', this.onTouchMoveLocked, { passive: false });
    window.addEventListener('keydown', this.onKeyDownLocked, { passive: false });
  }
  private removeLockEventHandlers(): void {
    window.removeEventListener('wheel', this.onWheelLocked as any);
    window.removeEventListener('touchstart', this.onTouchStartLocked as any);
    window.removeEventListener('touchmove', this.onTouchMoveLocked as any);
    window.removeEventListener('keydown', this.onKeyDownLocked as any);
  }

  private onWheelLocked = (ev: WheelEvent) => {
    ev.preventDefault();
    this.scrub(ev.deltaY);
  };

  private onTouchStartLocked = (ev: TouchEvent) => {
    if (ev.touches.length === 1) {
      this.touchStartY = ev.touches[0].clientY;
    }
  };
  private onTouchMoveLocked = (ev: TouchEvent) => {
    if (ev.touches.length === 1 && this.touchStartY !== null) {
      const deltaY = this.touchStartY - ev.touches[0].clientY;
      if (Math.abs(deltaY) > 0) {
        ev.preventDefault();
        this.scrub(deltaY);
        this.touchStartY = ev.touches[0].clientY;
      }
    }
  };

  private onKeyDownLocked = (ev: KeyboardEvent) => {
    let delta = 0;
    switch (ev.code) {
      case 'ArrowDown':
      case 'PageDown':
      case 'Space':
        delta = 120;
        break;
      case 'ArrowUp':
      case 'PageUp':
        delta = -120;
        break;
      case 'Home':
        this.progress = 0;
        this.updateStageFromProgress();
        return;
      case 'End':
        this.progress = 1;
        this.updateStageFromProgress();
        return;
      default:
        return;
    }
    ev.preventDefault();
    this.scrub(delta);
  };

  private scrub(deltaY: number): void {
    this.progress = Math.min(1, Math.max(0, this.progress + deltaY / this.PIXELS_PER_FULL_PROGRESS));
    this.updateStageFromProgress();

    if (this.progress >= 1)      this.finishLockForward();
    else if (this.progress <= 0) this.finishLockReverse();
  }

  private updateStageFromProgress(): void {
    const p = this.progress;
    let s = p > 2/3 ? 3 : p > 1/3 ? 2 : p > 0 ? 1 : 0;
    if (s !== this.lastStage) {
      this.lastStage = s;
      this.zone.run(() => this.stage = s);
    }
  }

  private finishLockForward(): void {
    this.removeLockEventHandlers();
    this.zone.run(() => this.stage = 3);
    this.unlockScroll(this.lockScrollTop);
  }

  private finishLockReverse(): void {
    this.removeLockEventHandlers();
    this.zone.run(() => this.stage = 0);
    this.unlockScroll(this.lockScrollTop);
  }

  private lockScroll(mode: 'forward' | 'reverse'): void {
    if (this.isLocked) return;
    this.isLocked = true;
    this.lockMode = mode;
    this.lockScrollTop = window.scrollY;

    const body = document.body;
    this.bodyPrevOverflow = body.style.overflow;
    this.bodyPrevPosition = body.style.position;
    this.bodyPrevTop = body.style.top;
    this.bodyPrevWidth = body.style.width;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${this.lockScrollTop}px`;
    body.style.width = '100%';
  }

  private unlockScroll(targetY: number): void {
    const body = document.body;
    body.style.overflow = this.bodyPrevOverflow;
    body.style.position = this.bodyPrevPosition;
    body.style.top = this.bodyPrevTop;
    body.style.width = this.bodyPrevWidth;

    window.scrollTo({ top: targetY, behavior: 'auto' });
    this.isLocked = false;
    this.lockMode = null;
    this.lastScrollY = targetY;
  }
}
