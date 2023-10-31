import { DecimalPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { numberFormat } from '@constant';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductRO } from '@ro';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, NgIf, DecimalPipe],
})
export class ProductCardComponent {
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  numberFormat = numberFormat;

  @Input() product: ProductRO;
  @Output() addedToCart = new EventEmitter();
  onAddToCart(event: Event, productId: string) {
    event.stopPropagation();
    this.addedToCart.emit(productId);
  }
}
