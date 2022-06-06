import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'etmd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output("menuClick") menuClickEmitter = new EventEmitter();

  onMenuButtonClick() {
    this.menuClickEmitter.emit();
  }

}
