import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ShopMenuComponent } from './components/shop-menu/shop-menu.component';
import { CategoryMenuComponent } from './components/category-menu';
import { SharedModule } from '@shared/shared.module';
import { CategoryComponent } from './components/category/category.component';
import { ShopHeroComponent } from './components/shop-hero/shop-hero.component';
import { SalesComponent } from './components/sales/sales.component';

@NgModule({
  declarations: [ShopPageComponent, ShopMenuComponent, CategoryMenuComponent, CategoryComponent, ShopHeroComponent, SalesComponent],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
