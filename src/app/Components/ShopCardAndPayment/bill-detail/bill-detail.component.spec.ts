import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailComponent } from './bill-detail.component';

describe('BillDetailComponent', () => {
  let component: BillDetailComponent;
  let fixture: ComponentFixture<BillDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
