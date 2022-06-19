import { AfterViewInit, Directive, EventEmitter, NgZone, OnDestroy, Output, Renderer2 } from '@angular/core';

import { fromEvent, Subject, take, takeUntil } from 'rxjs';

import { GridComponent } from '@progress/kendo-angular-grid';

@Directive({
  selector: '[etmdGridDroppable]'
})
export class GridDroppableDirective implements AfterViewInit, OnDestroy {

  @Output('dropAt') dropEmitter = new EventEmitter<HTMLTableRowElement>();

  private dropAfterRow?: HTMLTableRowElement;
  private destroyEventListeners$ = new Subject<boolean>();

  constructor(
    private grid: GridComponent,
    private zone: NgZone,
    private renderer: Renderer2
  ) { }

  public ngAfterViewInit(): void {
    this.setDroppableRows();
  }

  public ngOnDestroy() {
    this.destroyEventListeners$.next(true);
    this.destroyEventListeners$.complete();
  }

  private setDroppableRows() {
    const gridRows: Array<HTMLTableRowElement> = Array.from(
      this.grid.wrapper.nativeElement.querySelectorAll('kendo-grid tr')
    );

    // Do not trigger change detection
    this.zone.runOutsideAngular(() => {
      this.addDragOverListeners(gridRows);
      this.addDragLeaveListeners(gridRows);
    });

    this.addDropListeners(gridRows);
  }

  private addDragOverListeners(gridRows: Array<HTMLTableRowElement>): void {
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

  private addDragLeaveListeners(gridRows: Array<HTMLTableRowElement>): void {
    this.addDragListener(gridRows, 'dragleave', (event: DragEvent) => this.removeDropHint());
  }

  private addDropListeners(gridRows: Array<HTMLTableRowElement>): void {
    this.addDragListener(gridRows, 'drop', (event: DragEvent) => {
      if (this.dropAfterRow) {
        this.dropEmitter.emit(this.dropAfterRow);

        this.removeDropHint();

        this.zone.onStable.pipe(take(1)).subscribe(() => {
          this.setDroppableRows()
        });
      }
    });
  }

  private addDragListener(rows: Array<HTMLTableRowElement>, eventName: string, callback: (event: DragEvent) => void) {
    const dragEvent$ = fromEvent<DragEvent>(rows, eventName);

    dragEvent$
      .pipe(takeUntil(this.destroyEventListeners$))
      .subscribe((event: DragEvent) => callback(event));
  }

  private removeDropHint() {
    if (this.dropAfterRow) {
      const cells = this.dropAfterRow.querySelectorAll('td, th');
      cells.forEach(cell => {
        this.renderer.removeClass(cell, 'underlined');

        this.dropAfterRow = undefined;
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
