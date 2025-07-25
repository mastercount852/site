// scroll.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private _anchorScroll$ = new BehaviorSubject<boolean>(false);
  anchorScroll$ = this._anchorScroll$.asObservable();

  signalAnchorScroll() {
    this._anchorScroll$.next(true);
  }

  clear() {
    this._anchorScroll$.next(false);
  }
}
