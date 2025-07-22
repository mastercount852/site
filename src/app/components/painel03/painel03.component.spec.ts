import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Painel03Component } from './painel03.component';

describe('Painel03Component', () => {
  let component: Painel03Component;
  let fixture: ComponentFixture<Painel03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Painel03Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Painel03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
