import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  websiteName = 'ShopEase';

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}
