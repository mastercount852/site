import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChildren,
  QueryList,
  NgZone
} from '@angular/core';

@Component({
  selector: 'app-painel02',
  templateUrl: './painel02.component.html',
  styleUrls: ['./painel02.component.css']
})
export class Painel02Component implements AfterViewInit, OnDestroy {

  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef<HTMLElement>>;
  private io?: IntersectionObserver;

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  private setupObserver(): void {
    this.zone.runOutsideAngular(() => {
      this.io = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.zone.run(() => {
                entry.target.classList.add('is-visible');
                this.io?.unobserve(entry.target);
              });
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -20% 0px',
          threshold: 0
        }
      );

      this.revealEls.forEach(ref => this.io?.observe(ref.nativeElement));
      this.revealEls.changes.subscribe((list: QueryList<ElementRef<HTMLElement>>) => {
        list.forEach(ref => this.io?.observe(ref.nativeElement));
      });
    });
  }
}
