import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Painel04Component } from './painel04.component';

describe('Painel04Component', () => {
  let component: Painel04Component;
  let fixture: ComponentFixture<Painel04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Painel04Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Painel04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
