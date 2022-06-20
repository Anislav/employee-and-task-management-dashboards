import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DateInputModule, DateRangeModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from "@progress/kendo-angular-intl";
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { DrawerModule } from '@progress/kendo-angular-layout';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { TreeListModule } from '@progress/kendo-angular-treelist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';
import { TreeListDraggableDirective } from './core/directives/tree-list-draggable/tree-list-draggable.directive';
import { GridDroppableDirective } from './core/directives/grid-droppable/grid-droppable.directive';
import { EmployeesComponent } from './features/employees/employees.component';
import { OrganizationComponent } from './features/organization/organization.component';
import { TasksComponent } from './features/tasks/tasks.component';
import { DateRangeFilterCellComponent } from './shared/components/date-range-filter-cell/date-range-filter-cell/date-range-filter-cell.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    TreeListDraggableDirective,
    GridDroppableDirective,
    EmployeesComponent,
    OrganizationComponent,
    TasksComponent,
    DateRangeFilterCellComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppBarModule,
    ButtonModule,
    DateInputModule,
    DateRangeModule,
    DrawerModule,
    ExcelModule,
    IntlModule,
    TreeListModule,
    GridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
