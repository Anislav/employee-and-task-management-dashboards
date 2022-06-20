import { Component, Input } from '@angular/core';

import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { BaseFilterCellComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'etmd-date-range-filter-cell',
  templateUrl: './date-range-filter-cell.component.html',
  styleUrls: ['./date-range-filter-cell.component.scss']
})
export class DateRangeFilterCellComponent extends BaseFilterCellComponent {

  @Input() field!: string;
  @Input() override filter!: CompositeFilterDescriptor;

  public get startDate(): Date {
    return this.findDateByOperator("gte");
  }

  public get endDate(): Date {
    return this.findDateByOperator("lte");
  }

  private findDateByOperator(operator: string): Date {
    const filter = this.filter.filters.filter(
      x => (x as FilterDescriptor).field === this.field &&
      (x as FilterDescriptor).operator === operator
    )[0];

    return filter ? (filter as FilterDescriptor).value : null;
  }

  public get hasFilter(): boolean {
    return this.filtersByField(this.field).length > 0;
  }

  public clearFilter(): void {
    this.filterService.filter(this.removeFilter(this.field));
  }

  public filterRange(startDate: Date, endDate: Date): void {
    this.filter = this.removeFilter(this.field);
    const root = this.filter || {
      logic: "and",
      filters: [],
    };

    const dateFilters = this.createDateFilters(startDate, endDate);
    if (dateFilters.length) {
      root.filters.push(...dateFilters);
    }

    this.filterService.filter(root);
  }

  private createDateFilters(startDate: Date, endDate: Date): Array<FilterDescriptor> {
    const filters = [];

    if (startDate) {
      filters.push({
        field: this.field,
        operator: "gte",
        value: startDate,
      });
    }

    if (endDate) {
      filters.push({
        field: this.field,
        operator: "lte",
        value: endDate,
      });
    }

    return filters;
  }

}
