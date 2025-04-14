import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchErrorComponent } from './search-error.component';

describe('SearchErrorComponent', () => {
  let component: SearchErrorComponent;
  let fixture: ComponentFixture<SearchErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
