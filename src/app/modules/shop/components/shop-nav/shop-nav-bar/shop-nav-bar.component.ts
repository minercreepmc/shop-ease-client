import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-nav-bar',
  templateUrl: './shop-nav-bar.component.html',
  styleUrls: ['./shop-nav-bar.component.scss'],
})
export class ShopNavBarComponent {
  navigations = ['All Categories', 'Hot Offers', 'Gift Boxes', 'Help'];
}
