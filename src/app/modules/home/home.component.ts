import { Component } from '@angular/core';
import { CategoriesComponent } from '@modules/categories/categories.component';
import { FeaturesComponent } from '@modules/features/features.component';
import { ProductsComponent } from '@modules/products/products.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FeaturesComponent, ProductsComponent, CategoriesComponent],
})
export class HomeComponent {}
