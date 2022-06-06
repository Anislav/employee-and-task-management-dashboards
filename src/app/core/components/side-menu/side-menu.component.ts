import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { DrawerComponent, DrawerMode } from '@progress/kendo-angular-layout';

import { NavigationItem } from '../../models/navigation-item.model';

@Component({
  selector: 'etmd-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public expanded = true;
  public mode: DrawerMode = 'push';
  public mini = true;
  public autoCollapse = false;

  public items: Array<NavigationItem> = [
    {
      text: 'Employees',
      icon: 'k-i-user',
      path: '/employees',
    },
    {
      text: 'Tasks',
      icon: 'k-i-calendar',
      path: '/tasks',
    },
    {
      text: 'Organization',
      icon: 'k-i-ungroup',
      path: '/organization',
    }
  ];

  @ViewChild(DrawerComponent) private drawer!: DrawerComponent;

  public ngOnInit(): void {
    this.setDrawerConfig();

    if (this.mode == 'overlay') {
      this.expanded = false;
    }
  }

  @HostListener('window:resize')
  private onWindowResize() {
    this.setDrawerConfig();
  }

  private setDrawerConfig() {
    if (window.innerWidth <= 770) {
      this.mode = 'overlay';
      this.mini = false;
      this.autoCollapse = true;
    } else {
        this.mode = 'push';
        this.mini = true;
        this.autoCollapse = false;
    }
  }

  public toggle() {
    this.drawer.toggle();
  }
}
