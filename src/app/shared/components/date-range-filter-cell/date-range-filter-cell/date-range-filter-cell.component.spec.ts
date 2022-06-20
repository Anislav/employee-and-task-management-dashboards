import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeFilterCellComponent } from './date-range-filter-cell.component';

describe('DateRangeFilterCellComponent', () => {
  let component: DateRangeFilterCellComponent;
  let fixture: ComponentFixture<DateRangeFilterCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRangeFilterCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateRangeFilterCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
