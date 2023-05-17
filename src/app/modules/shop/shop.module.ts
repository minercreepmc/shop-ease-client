import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { SharedModule } from '@shared/shared.module';
import { ShopHeroComponent } from './components/shop-hero/shop-hero.component';
import { SalesSectionComponent } from './components/sales/sales-section';
import { SalesListComponent } from './components/sales/sales-list';
import { SaleItemComponent } from './components/sales/sale-item';
import { ShopNavBarComponent } from './components/shop-nav/shop-nav-bar';
import { ShopNavItemComponent } from './components/shop-nav/shop-nav-item';
import { SaleCountdownComponent } from './components/sales/sale-countdown';

@NgModule({
  declarations: [
    ShopPageComponent,
    ShopHeroComponent,
    SalesListComponent,
    SaleItemComponent,
    ShopNavBarComponent,
    ShopNavItemComponent,
    SalesSectionComponent,
    SaleCountdownComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
