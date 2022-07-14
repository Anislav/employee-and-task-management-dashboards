import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { DataResult, process, State } from "@progress/kendo-data-query";
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { DataStateChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { CreateFormGroup, CreateFormGroupArgs } from '@progress/kendo-angular-treelist';

import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';


@Component({
  selector: 'etmd-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  // View Encapsulation must be disabled in order to style the exported content
  encapsulation: ViewEncapsulation.None
})
export class EmployeesComponent {

  public treeFormGroup!: FormGroup;
  public deleteEmployeeConfirmation$: Subject<boolean> = new Subject<boolean>();
  public employeeToDelete: Employee | null = null;

  public state: State = {
    skip: 0,
    take: 5,

    filter: {
      logic: 'and',
      filters: []
    }
  };
  public drigData: DataResult = process([], this.state);

  public gridSelection: Number[] = []
  public selectableSettings: SelectableSettings = {
    drag: true,
    mode: 'multiple'
  }

  public selectedEmployees: Employee[] = []
  private draggedEmployee?: Employee;

  constructor(
    public employeeService: EmployeeService,
  ) {
    this.createTreeFormGroup = this.createTreeFormGroup.bind(this);
    this.treeDeleteConfirmation = this.treeDeleteConfirmation.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
  }

  public createTreeFormGroup({ isNew, dataItem }: CreateFormGroupArgs): FormGroup {
    const item = isNew ? {} : dataItem;

    this.treeFormGroup = new FormGroup({
        'name': new FormControl(item.name, Validators.required),
        'title': new FormControl(item.title),
        'phone': new FormControl(item.phone),
        'hireDate': new FormControl(item.hireDate, Validators.required)
      });

    return this.treeFormGroup;
  }

  public confirmDeletion(shouldRemove: boolean): void {
    this.deleteEmployeeConfirmation$.next(shouldRemove);

    this.employeeToDelete = null;
  }

  public treeDeleteConfirmation(dataItem: Employee): Subject<boolean> {
    this.employeeToDelete = dataItem;

    return this.deleteEmployeeConfirmation$;
  }

  public onDataStateChanged(state: DataStateChangeEvent): void {
    this.state = state;
    this.drigData = process(this.selectedEmployees, this.state);
  }

  public exportToExcel(): ExcelExportData {
    let employeesToExport = this.selectedEmployees;

    if (this.gridSelection.length) {
      employeesToExport = employeesToExport.filter((employee) => this.gridSelection.includes(employee.id));
    }

    return { data: employeesToExport };
  }

  public onEmployeeDragStarted(row: HTMLTableRowElement) {
    const employeeId = Number(row.cells[0].textContent!.trim());
    this.draggedEmployee = this.employeeService.findEmployee(employeeId);
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
