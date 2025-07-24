import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Painel05Component } from './painel05.component';

describe('Painel05Component', () => {
  let component: Painel05Component;
  let fixture: ComponentFixture<Painel05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Painel05Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Painel05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
