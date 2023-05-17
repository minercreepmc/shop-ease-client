import { Component, OnInit } from '@angular/core';
import { SaleItem, SalesService } from '@modules/shop/services/sales';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
})
export class SalesListComponent implements OnInit {
  saleItems$!: Observable<SaleItem[]>;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.saleItems$ = this.salesService.getSaleItems();
  }
}
