import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Painel00Component } from './painel00.component';

describe('Painel00Component', () => {
  let component: Painel00Component;
  let fixture: ComponentFixture<Painel00Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Painel00Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Painel00Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
