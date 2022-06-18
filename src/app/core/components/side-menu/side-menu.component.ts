import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';

import { DrawerComponent, DrawerMode, DrawerSelectEvent } from '@progress/kendo-angular-layout';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Update Drawer selected state when router path is changed
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.items = this.items.map(item => {
        item.selected = item.path == (event as NavigationEnd).urlAfterRedirects;
        return item;
      });
    });

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

  public onSelect(event: DrawerSelectEvent) {
    this.router.navigate([event.item.path]);
  }
}
