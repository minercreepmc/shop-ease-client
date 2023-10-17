import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '@modules/product-card/product-card.component';
import { ProductRO } from '@ro';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss'],
  standalone: true,
  imports: [ProductCardComponent, NgFor, RouterLink],
})
export class ShopProductsComponent implements OnInit {
  breakpoint: number;
  @Input() products: ProductRO[] = [];
  ngOnInit() {
    this.breakpoint = window.innerWidth <= 400 ? 1 : 6;
    console.log(this.products);
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 6;
  }
}
