import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislacaoComponent } from './legislacao.component';

describe('LegislacaoComponent', () => {
  let component: LegislacaoComponent;
  let fixture: ComponentFixture<LegislacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegislacaoComponent]
    });
    fixture = TestBed.createComponent(LegislacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
