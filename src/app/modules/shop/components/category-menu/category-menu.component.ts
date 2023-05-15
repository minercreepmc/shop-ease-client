import { Component } from '@angular/core';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
})
export class CategoryMenuComponent {
  categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
}
