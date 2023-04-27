import { Component, Output, EventEmitter } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  websiteName = 'ShopEase';
  faBars = faBars;

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}
