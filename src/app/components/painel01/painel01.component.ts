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
  heroLines: string[] = [
    'Backing visionary technical',
    'founders to turn breakthroughs',
    'into breakout companies.'
  ];
  heroVisible: boolean[] = [false, false, false];

  /* ---------- ESFERAS ---------- */
  stage = 0;              // 0=nenhuma, 1=1ª, 2=1ª+2ª, 3=todas
  private lastStage = -1; // para evitar CD desnecessária
  private progress = 0;   // 0..1

  /* Bloqueio */
  private isLocked = false;
  private lockMode: 'forward' | 'reverse' | null = null;
  private lockScrollTop = 0;

  /* Estado anterior de rolagem -> detectar direção */
  private lastScrollY = 0;

  /* Guardar estilos do body para restaurar */
  private bodyPrevOverflow = '';
  private bodyPrevPosition = '';
  private bodyPrevTop = '';
  private bodyPrevWidth = '';

  /* Sensibilidade do scrub */
  private readonly PIXELS_PER_FULL_PROGRESS = 1600;

  /* Touch suporte */
  private touchStartY: number | null = null;

  constructor(private zone: NgZone) { }  // <--- injeta NgZone

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

  /* ---------- HERO ENTRADA ---------- */
  private startHeroIntro(): void {
    this.heroLines.forEach((_, i) => {
      setTimeout(() => { this.heroVisible[i] = true; }, 200 + i * 250);
    });
  }

  /* ---------- ESCUTA SCROLL GLOBAL (detecta entrada, respeita direção) ---------- */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isLocked) return;

    const heroEl = this.heroSection.nativeElement;
    const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
    const scrollyEl = this.scrollyRoot.nativeElement;
    const scrollyTop = scrollyEl.offsetTop;

    const prev = this.lastScrollY;
    const y = window.scrollY;
    const goingDown = y > prev;
    const goingUp = y < prev;
    this.lastScrollY = y;

    // Entrando nas esferas descendo (a partir do hero)
    if (goingDown && y >= heroBottom && this.stage < 3) {
      this.alignAndLockForward(scrollyTop);
      return;
    }

    // Entrando nas esferas subindo (vindo do conteúdo de baixo)
    if (goingUp && y <= scrollyTop && this.stage > 0) {
      this.alignAndLockReverse(scrollyTop);
      return;
    }
  }

  private alignAndLockForward(scrollyTop: number): void {
    window.scrollTo({ top: scrollyTop, behavior: 'auto' });
    this.beginLock('forward');
  }

  private alignAndLockReverse(scrollyTop: number): void {
    window.scrollTo({ top: scrollyTop, behavior: 'auto' });
    this.beginLock('reverse');
  }

  /* ---------- INÍCIO DO BLOQUEIO ---------- */
  private beginLock(mode: 'forward' | 'reverse'): void {
    this.lockScroll(mode);
    this.progress = mode === 'forward' ? 0 : 1;
    this.updateStageFromProgress();
    this.addLockEventHandlers();
  }

  /* ---------- EVENTOS DURANTE BLOQUEIO ---------- */
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

  /* Wheel */
  private onWheelLocked = (ev: WheelEvent) => {
    ev.preventDefault();
    this.scrub(ev.deltaY);
  };

  /* Touch */
  private onTouchStartLocked = (ev: TouchEvent) => {
    if (ev.touches.length === 1) {
      this.touchStartY = ev.touches[0].clientY;
    }
  };
  private onTouchMoveLocked = (ev: TouchEvent) => {
    if (ev.touches.length === 1 && this.touchStartY !== null) {
      const currentY = ev.touches[0].clientY;
      const deltaY = this.touchStartY - currentY;
      if (Math.abs(deltaY) > 0) {
        ev.preventDefault();
        this.scrub(deltaY);
        this.touchStartY = currentY;
      }
    }
  };

  /* Teclado */
  private onKeyDownLocked = (ev: KeyboardEvent) => {
    const code = ev.code;
    let delta = 0;
    switch (code) {
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

  /* ---------- SCRUB ---------- */
  private scrub(deltaY: number): void {
    const span = this.PIXELS_PER_FULL_PROGRESS;
    this.progress += deltaY / span;
    this.progress = Math.max(0, Math.min(1, this.progress));
    this.updateStageFromProgress();

    if (this.progress >= 1) {
      this.finishLockForward();
    } else if (this.progress <= 0) {
      this.finishLockReverse();
    }
  }

  private updateStageFromProgress(): void {
    const p = this.progress;
    let s = 0;
    if (p > 2 / 3) s = 3;
    else if (p > 1 / 3) s = 2;
    else if (p > 0) s = 1;

    if (s !== this.lastStage) {
      this.lastStage = s;
      // garantir detecção de mudança
      this.zone.run(() => {
        this.stage = s;
      });
    }
  }

  /* ---------- FIM DO BLOQUEIO ---------- */
  private finishLockForward(): void {
    this.removeLockEventHandlers();
    this.progress = 1;
    // garante stage final dentro da zona
    this.zone.run(() => { this.stage = 3; });
    this.unlockScroll(this.lockScrollTop); // permanece nas esferas
  }

  private finishLockReverse(): void {
    this.removeLockEventHandlers();
    // garante stage 0 dentro da zona
    this.zone.run(() => { this.stage = 0; });
    this.unlockScroll(this.lockScrollTop); // libera pra subir
  }

  /* ---------- LOCK / UNLOCK BODY ---------- */
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
    this.lastScrollY = targetY; // sincroniza direção futura
  }
}
