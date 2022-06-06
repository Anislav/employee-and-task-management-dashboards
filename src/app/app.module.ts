import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';

import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DrawerModule } from '@progress/kendo-angular-layout';
import { AppBarModule } from '@progress/kendo-angular-navigation';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppBarModule,
    ButtonModule,
    DrawerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
