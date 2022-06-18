import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DrawerModule } from '@progress/kendo-angular-layout';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { TreeListModule } from '@progress/kendo-angular-treelist';
import { IntlModule } from "@progress/kendo-angular-intl";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { OrganizationComponent } from './features/organization/organization.component';
import { TasksComponent } from './features/tasks/tasks.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    EmployeesComponent,
    OrganizationComponent,
    TasksComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppBarModule,
    ButtonModule,
    DrawerModule,
    IntlModule,
    TreeListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
