import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Painel01Component } from './painel01.component';

describe('Painel01Component', () => {
  let component: Painel01Component;
  let fixture: ComponentFixture<Painel01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Painel01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Painel01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
