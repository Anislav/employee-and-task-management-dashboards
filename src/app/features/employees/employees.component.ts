import { Component } from '@angular/core';

import { DataResult, process, State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'etmd-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  public state: State = {
    skip: 0,
    take: 5,

    filter: {
      logic: 'and',
      filters: []
    }
  };
  public drigData: DataResult = process([], this.state);

  public selectedEmployees: Employee[] = []
  private draggedEmployee?: Employee;

  constructor(
    public employeeService: EmployeeService,
  ) { }

  public onDataStateChanged(state: DataStateChangeEvent): void {
    this.state = state;
    this.drigData = process(this.selectedEmployees, this.state);
  }

  public onEmployeeDragStarted(row: HTMLTableRowElement) {
    const employeeId = Number(row.cells[0].textContent!.trim());
    this.draggedEmployee = this.employeeService.employees.find((item) => item.id === employeeId);
  }

  public onEmployeeDragEnded(row: HTMLTableRowElement) {
    this.draggedEmployee = undefined;
  }

  public onEmployeeDroppedAt(row: HTMLTableRowElement) {
    if (this.draggedEmployee) {
      const dropIndex = this.getDropIndex(row);
      this.selectedEmployees.splice(dropIndex, 0, this.draggedEmployee);

      this.drigData = process(this.selectedEmployees, this.state);
    }
  }

  private getDropIndex(row: HTMLTableRowElement) {
    const index = row.getAttribute('data-kendo-grid-item-index');
    if (index) {
      return Number(index) + 1;
    }

    return 0;
  }


}
