import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop-nav-item',
  templateUrl: './shop-nav-item.component.html',
  styleUrls: ['./shop-nav-item.component.scss'],
})
export class ShopNavItemComponent {
  @Input() shopNavItem!: string;
}
