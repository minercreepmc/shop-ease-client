import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductRO } from '@ro';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
})
export class ProductCardComponent {
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  @Input() product: ProductRO;

  @Output() addedToCart = new EventEmitter();
  onAddToCart(productId: string) {
    this.addedToCart.emit(productId);
  }
}
