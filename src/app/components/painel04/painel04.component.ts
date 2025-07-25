import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild
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
  /** Base de logos para cada linha */
  private baseRow1: LogoItem[] = [
    { label: '', img: 'https://i.imgur.com/f1WHwn1.png' },
    { label: '', img: 'https://i.imgur.com/GijFFt7.png' },
    { label: '', img: 'https://i.imgur.com/7sXrOLw.png' },
    { label: '', img: 'https://i.imgur.com/I6AXM25.png' },
    { label: '', img: 'https://i.imgur.com/YCoJE06.png' },
    { label: '', img: 'https://i.imgur.com/AsZNgiS.png' },
    { label: '', img: 'https://i.imgur.com/yA8eSd2.png' },
    { label: '', img: 'https://i.imgur.com/5mI7jQc.png' },
    { label: '', img: 'https://i.imgur.com/idnkzog.png' },
    { label: '', img: 'https://i.imgur.com/x7L3sej.png' },
    { label: '', img: 'https://i.imgur.com/qPrfKtd.png' },
    { label: '', img: 'https://i.imgur.com/pyyjeZz.png' },
    { label: '', img: 'https://i.imgur.com/dqJTM0x.png' },
    { label: '', img: 'https://i.imgur.com/f5LiayD.png' },
    { label: '', img: 'https://i.imgur.com/OXThSdD.png' },
    { label: '', img: 'https://i.imgur.com/0IFwv0s.png' },
    { label: '', img: 'https://i.imgur.com/Qk3HMO6.png' },
    { label: '', img: 'https://i.imgur.com/nYPH2mw.png' },
    { label: '', img: 'https://i.imgur.com/E44tubF.png' },
    { label: '', img: 'https://i.imgur.com/6K7K1zT.png' },
    { label: '', img: 'https://i.imgur.com/B3VVFe1.png' },
    { label: '', img: 'https://i.imgur.com/3fKz5ba.png' },
    { label: '', img: 'https://i.imgur.com/3ure53c.png' },
    { label: '', img: 'https://i.imgur.com/NqshOkU.png' },
    { label: '', img: 'https://i.imgur.com/IL43VIM.png' },
    { label: '', img: 'https://i.imgur.com/n2nDfzp.png' },
    { label: '', img: 'https://i.imgur.com/XhJ0PfU.png' },
    { label: '', img: 'https://i.imgur.com/hHBEQ0y.png' },
    { label: '', img: 'https://i.imgur.com/jSnU7r0.png' },
    { label: '', img: 'https://i.imgur.com/gkjC9PL.png' },
    { label: '', img: 'https://i.imgur.com/A0lYoYh.png' },
    { label: '', img: 'https://i.imgur.com/csoNum6.jpeg' },
    { label: '', img: 'https://i.imgur.com/9Or9mSw.png' }
  ];

  private baseRow2: LogoItem[] = [
    { label: '', img: 'https://i.imgur.com/rdp5O1L.png' },
    { label: '', img: 'https://i.imgur.com/fQq5YNb.png' },
    { label: '', img: 'https://i.imgur.com/HM9Axz9.png' },
    { label: '', img: 'https://i.imgur.com/jmMNsPS.png' },
    { label: '', img: 'https://i.imgur.com/m6iqOBf.png' },
    { label: '', img: 'https://i.imgur.com/idnkzog.png' },
    { label: '', img: 'https://i.imgur.com/Y6F4FUa.png' },
    { label: '', img: 'https://i.imgur.com/LVJUE4r.png' },
    { label: '', img: 'https://i.imgur.com/SlTRnYD.png' },
    { label: '', img: 'https://i.imgur.com/VjoNvGQ.png' },
    { label: '', img: 'https://i.imgur.com/AswZ4Ew.png' },
    { label: '', img: 'https://i.imgur.com/Wq7HVze.png' },
    { label: '', img: 'https://i.imgur.com/FAUMTC9.png' },
    { label: '', img: 'https://i.imgur.com/KlQN7nF.png' },
    { label: '', img: 'https://i.imgur.com/wZS7AM1.png' },
    { label: '', img: 'https://i.imgur.com/FXOo5S9.png' },
    { label: '', img: 'https://i.imgur.com/goqXAhT.png' },
    { label: '', img: 'https://i.imgur.com/Ymd2BHr.png' },
    { label: '', img: 'https://i.imgur.com/s2YnUca.png' },
    { label: '', img: 'https://i.imgur.com/6bXPaBp.png' },
    { label: '', img: 'https://i.imgur.com/HfSth9q.png' },
    { label: '', img: 'https://i.imgur.com/1rnyfzf.png' },
    { label: '', img: 'https://i.imgur.com/aLBnJry.png' },
    { label: '', img: 'https://i.imgur.com/PZgr0zO.png' },
    { label: '', img: 'https://i.imgur.com/ZvJk9yF.png' },
    { label: '', img: 'https://i.imgur.com/rcsv6cL.png' },
    { label: '', img: 'https://i.imgur.com/oyEOZlI.png' },
    { label: '', img: 'https://i.imgur.com/c5PmeZ9.png' },
    { label: '', img: 'https://i.imgur.com/guG4nXe.png' },
    { label: '', img: 'https://i.imgur.com/VRuIvDU.png' },
    { label: '', img: 'https://i.imgur.com/9i8g32c.png' },
    { label: '', img: 'https://i.imgur.com/A5rO8RK.jpeg' },
    { label: '', img: 'https://i.imgur.com/1YwXzfp.png' },
    { label: '', img: 'https://i.imgur.com/tqI8QJ2.png' }
  ];

  row1Loop: LogoItem[] = [];
  row2Loop: LogoItem[] = [];

  @ViewChild('row1Track', { static: true }) row1Track!: ElementRef<HTMLUListElement>;
  @ViewChild('row2Track', { static: true }) row2Track!: ElementRef<HTMLUListElement>;

  private running1 = false;
  private running2 = false;

  ngOnInit(): void {
    this.row1Loop = [...this.baseRow1, ...this.baseRow1];
    this.row2Loop = [...this.baseRow2, ...this.baseRow2];
  }

  ngAfterViewInit(): void {
    this.startCarousel(this.row1Track.nativeElement, 2000, 1000, 'left')
      .catch(console.error);
    this.startCarousel(this.row2Track.nativeElement, 2000, 1000, 'right')
      .catch(console.error);
  }

  ngOnDestroy(): void {
    this.running1 = this.running2 = false;
  }

  trackByIdx(idx: number, _item: LogoItem): number {
    return idx;
  }

  /**
   * Loop recursivo que substitui setInterval
   */
  private async startCarousel(
    trackEl: HTMLUListElement,
    intervalMs: number,
    durationMs: number,
    direction: 'left' | 'right'
  ) {
    const runFlag = direction === 'left'
      ? () => this.running1
      : () => this.running2;

    // marca como “rodando”
    if (direction === 'left') this.running1 = true;
    else this.running2 = true;

    const getDelta = () => {
      const items = Array.from(trackEl.children) as HTMLElement[];
      if (items.length < 2) return 0;
      return Math.round(
        items[1].getBoundingClientRect().left -
        items[0].getBoundingClientRect().left
      );
    };

    while (runFlag()) {
      await this.delay(intervalMs);
      if (!runFlag()) break;

      const delta = getDelta();
      if (!delta) continue;

      let cleaned = false;
      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        trackEl.removeEventListener('transitionend', cleanup);
        trackEl.style.transition = 'none';
        trackEl.style.transform = 'none';
        if (direction === 'left') {
          trackEl.removeChild(trackEl.children[0]);
        } else {
          trackEl.removeChild(
            trackEl.children[trackEl.children.length - 1]
          );
        }
      };

      // injeta clone
      if (direction === 'left') {
        const first = trackEl.children[0];
        trackEl.appendChild(first.cloneNode(true));
        trackEl.style.transition = `transform ${durationMs}ms ease`;
        trackEl.style.transform = `translateX(${-delta}px)`;
      } else {
        const last = trackEl.children[trackEl.children.length - 1];
        trackEl.insertBefore(last.cloneNode(true), trackEl.children[0]);
        trackEl.style.transition = 'none';
        trackEl.style.transform = `translateX(${-delta}px)`;
        // força reflow
        trackEl.getBoundingClientRect();
        trackEl.style.transition = `transform ${durationMs}ms ease`;
        trackEl.style.transform = `translateX(0)`;
      }

      // setup cleanup em ambos: evento + timeout-fallback
      trackEl.addEventListener('transitionend', cleanup);
      this.delay(durationMs + 50).then(cleanup);
    }
  }

  /** Promisify do setTimeout */
  private delay(ms: number) {
    return new Promise<void>(res => setTimeout(res, ms));
  }
}