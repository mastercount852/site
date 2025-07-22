import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Painel02Component } from './painel02.component';

describe('Painel02Component', () => {
  let component: Painel02Component;
  let fixture: ComponentFixture<Painel02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Painel02Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Painel02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
