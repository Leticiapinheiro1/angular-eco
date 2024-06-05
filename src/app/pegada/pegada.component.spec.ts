import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegadaComponent } from './pegada.component';

describe('PegadaComponent', () => {
  let component: PegadaComponent;
  let fixture: ComponentFixture<PegadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PegadaComponent]
    });
    fixture = TestBed.createComponent(PegadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
