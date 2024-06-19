import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoVoucherSobreComponent } from './eco-voucher-sobre.component';

describe('EcoVoucherSobreComponent', () => {
  let component: EcoVoucherSobreComponent;
  let fixture: ComponentFixture<EcoVoucherSobreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcoVoucherSobreComponent]
    });
    fixture = TestBed.createComponent(EcoVoucherSobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
