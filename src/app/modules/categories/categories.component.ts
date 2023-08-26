import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CategoryModel,
  CategoryService,
  GetCategoriesHttpRequest,
} from '@shared/services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [NgFor],
  providers: [CategoryService],
})
export class CategoriesComponent implements OnInit {
  constructor(private readonly categoryService: CategoryService) {}
  categories: CategoryModel[];

  ngOnInit(): void {
    const query: GetCategoriesHttpRequest = {
      limit: 3,
    };

    this.categoryService.getCategories$(query).subscribe({
      next: (response) => {
        this.categories = response.categories;
      },
    });
  }
}
