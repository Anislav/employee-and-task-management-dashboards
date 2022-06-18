import { AfterViewInit, Component, NgZone, Renderer2 } from '@angular/core';

import { fromEvent, Subject, take, takeUntil } from 'rxjs';

import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'etmd-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements AfterViewInit {

  public selectedEmployees: Employee[] = [];

  private draggedEmployee: Employee | null = null;
  private dropAfterRow: HTMLTableRowElement | null = null;
  private destroy$ = new Subject<boolean>();

  constructor(
    public employeeService: EmployeeService,
    private zone: NgZone,
    private renderer: Renderer2,
  ) { }

  public ngAfterViewInit(): void {
    this.setupDragAndDrop();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onTreeToggle(): void {
    this.setupDragAndDrop();
  }

  public onEmployeeDrop(event: DragEvent) {
    if (this.draggedEmployee) {
      const dropIndex = this.getDropIndex();
      this.selectedEmployees.splice(dropIndex, 0, this.draggedEmployee);
      this.draggedEmployee = null;

      this.removeDropHint();
      this.setupDragAndDrop();
    }
  }

  private getDropIndex() {
    const index = this.dropAfterRow?.getAttribute('data-kendo-grid-item-index');
    if (index) {
      return Number(index) + 1;
    }

    return 0;
  }

  private setupDragAndDrop() {
    this.zone.onStable.pipe(take(1)).subscribe(() => {
      this.destroy$.next(true);
      this.setupDragZone();
      this.setupDropZone();
    });
  }

  private setupDragZone(): void {
    const treeRows: Array<HTMLTableRowElement> = Array.from(
      document.querySelectorAll('kendo-treelist-list tr:not(.k-grid-norecords)')
    );

    if (!treeRows) {
      return;
    }

    treeRows.forEach((item: HTMLElement) => {
      this.renderer.setAttribute(item, 'draggable', 'true');
    });

    // Do not trigger change detection
    this.zone.runOutsideAngular(() => {
      this.addTreeDragListeners(treeRows);
    });
  }

  private addTreeDragListeners(treeRows: Array<HTMLTableRowElement>): void {
    this.addDragListener(treeRows, 'dragstart', (event: DragEvent) => {
      const treeItem = <HTMLTableRowElement> event.target;
      this.draggedEmployee = this.findEmployee(treeItem);

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'link';
      }
    });
  }

  private addDragListener(rows: Array<HTMLTableRowElement>, eventName: string, callback: (event: DragEvent) => void) {
    const dragEvent$ = fromEvent<DragEvent>(rows, eventName);

    dragEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: DragEvent) => callback(event));
  }

  private findEmployee(treeItem: HTMLTableRowElement) {
    const itemIndex = treeItem.getAttribute('data-treelist-view-index');
    if (itemIndex) {
      const employeeIndex = Number.parseInt(itemIndex);
      const employee = this.employeeService.employees[employeeIndex];

      return employee;
    }

    return null;
  }

  private setupDropZone() {
    const gridRows: Array<HTMLTableRowElement> = Array.from(
      document.querySelectorAll('kendo-grid tr')
    );

    // Do not trigger change detection
    this.zone.runOutsideAngular(() => {
      this.addTableDragOverListeners(gridRows);
      this.addTableDragLeaveListeners(gridRows);
    });
  }

  private addTableDragOverListeners(gridRows: Array<HTMLTableRowElement>): void {
    this.addDragListener(gridRows, 'dragover', (event: DragEvent) => {
      // Marks the element as a drop target
      event.preventDefault();

      const targetElement = <HTMLTableCellElement> event.target;
      if (this.dropAfterRow && this.dropAfterRow == targetElement.parentElement) {
        return;
      }

      this.removeDropHint();
      this.dropAfterRow = <HTMLTableRowElement> targetElement.parentElement;
      this.addDropHint();
    });
  }

  private addTableDragLeaveListeners(gridRows: Array<HTMLTableRowElement>): void {
    this.addDragListener(gridRows, 'dragleave', (event: DragEvent) => this.removeDropHint());
  }

  private removeDropHint() {
    if (this.dropAfterRow) {
      const cells = this.dropAfterRow.querySelectorAll('td, th');
      cells.forEach(cell => {
        this.renderer.removeClass(cell, 'underlined');

        this.dropAfterRow = null;
      });
    }
  }

  private addDropHint() {
    if (this.dropAfterRow) {
      const cells = this.dropAfterRow.querySelectorAll('td, th');
      cells.forEach(cell => {
        this.renderer.addClass(cell, 'underlined');
      });
    }
  }

}
