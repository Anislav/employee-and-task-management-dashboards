import { AfterViewInit, Directive, EventEmitter, Input, OnDestroy, Output, Renderer2 } from '@angular/core';

import { fromEvent, Subject, switchMap, take, takeUntil } from 'rxjs';

import { TreeListComponent } from '@progress/kendo-angular-treelist';

@Directive({
  selector: '[etmdTreeListDraggable]'
})
export class TreeListDraggableDirective implements AfterViewInit, OnDestroy {

  @Input() dragEffect: 'none' | 'copy' | 'copyLink' | 'copyMove' | 'link' | 'linkMove' | 'move' | 'all' | 'uninitialized' = 'link';

  @Output('dragStart') dragStartedEmitter = new EventEmitter<HTMLTableRowElement>();
  @Output('dragEnd') dragEndedEmitter = new EventEmitter<HTMLTableRowElement>();

  private destroyStateListeners$ = new Subject<boolean>();
  private destroyDragListeners$ = new Subject<boolean>();

  constructor(
    private treeList: TreeListComponent,
    private renderer: Renderer2
  ) { }

  public ngAfterViewInit(): void {
    this.setDraggableRows();
  }

  public ngOnDestroy() {
    this.destroyStateListeners$.next(true);
    this.destroyStateListeners$.complete();

    this.destroyDragListeners$.next(true);
    this.destroyDragListeners$.complete();
  }

  private setDraggableRows(): void {
    this.destroyDragListeners$.next(true);

    const treeRows: Array<HTMLTableRowElement> = Array.from(
      this.treeList.wrapper.nativeElement.querySelectorAll('.k-grid-table tr:not(.k-grid-norecords)')
    );

    if (!treeRows) {
      return;
    }

    treeRows.forEach((item: HTMLElement) => {
      this.renderer.setAttribute(item, 'draggable', 'true');
    });

    this.addDragStartListeners(treeRows);
    this.addDragEndListeners(treeRows);
  }

  private addDragStartListeners(treeRows: Array<HTMLTableRowElement>) {
    this.addDragListener(treeRows, 'dragstart', (event: DragEvent) => {
        const treeRow = <HTMLTableRowElement> event.target;
        this.dragStartedEmitter.emit(treeRow);

        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = this.dragEffect;
        }
    });
  }

  private addDragEndListeners(treeRows: Array<HTMLTableRowElement>) {
    this.addDragListener(treeRows, 'dragend', (event: DragEvent) => {
      const treeRow = <HTMLTableRowElement> event.target;
      this.dragEndedEmitter.emit(treeRow);
    });
  }

  private addDragListener(rows: Array<HTMLTableRowElement>, eventName: string, callback: (event: DragEvent) => void) {
    const dragEvent$ = fromEvent<DragEvent>(rows, eventName);

    dragEvent$
      .pipe(takeUntil(this.destroyDragListeners$))
      .subscribe((event: DragEvent) => callback(event));
  }

}
