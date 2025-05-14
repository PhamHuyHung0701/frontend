import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCategotyComponent } from './search-categoty.component';

describe('SearchCategotyComponent', () => {
  let component: SearchCategotyComponent;
  let fixture: ComponentFixture<SearchCategotyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCategotyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchCategotyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
