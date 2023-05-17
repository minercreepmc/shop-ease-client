import { Component, Input } from '@angular/core';
import { SaleItem } from '@modules/shop/services/sales';

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.scss'],
})
export class SaleItemComponent {
  @Input() saleItem!: SaleItem;
}
