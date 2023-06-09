import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { SharedModule } from '@shared/shared.module';
import { SalesSectionComponent } from './components/sales/sales-section';
import { SalesListComponent } from './components/sales/sales-list';
import { SaleItemComponent } from './components/sales/sale-item';
import { ShopNavBarComponent } from './components/shop-nav/shop-nav-bar';
import { ShopNavItemComponent } from './components/shop-nav/shop-nav-item';
import { SaleCountdownComponent } from './components/sales/sale-countdown';
import { FeaturedSectionComponent } from './components/shop-featured/featured-section/featured-section.component';
import { RecommendedSectionComponent } from './components/shop-recommended/recommended-section/recommended-section.component';
import { RecommendedProductCardComponent } from './components/shop-recommended/recommended-product-card/recommended-product-card.component';
import { RecommendedProductsListComponent } from './components/shop-recommended/recommended-products-list/recommended-products-list.component';
import { FeaturedBlockComponent } from './components/shop-featured/featured-block/featured-block.component';
import { FeaturedProductComponent } from './components/shop-featured/featured-product/featured-product.component';
<<<<<<< HEAD
import { SupplierRequestComponent } from './components/shop-contact-form/supplier-request/supplier-request.component';
||||||| 3c8e454
=======
import { SupplierRequestComponent } from './components/shop-contact-form/supplier-request/supplier-request.component';
import { ShopCarouselComponent } from './components/shop-carousel/shop-carousel.component';
import { NgModule } from '@angular/core';
import { GalleryModule } from 'ng-gallery';
>>>>>>> develop

@NgModule({
  declarations: [
    ShopPageComponent,
    SalesListComponent,
    SaleItemComponent,
    ShopNavBarComponent,
    ShopNavItemComponent,
    SalesSectionComponent,
    SaleCountdownComponent,
    FeaturedSectionComponent,
    RecommendedSectionComponent,
    RecommendedProductCardComponent,
    RecommendedProductsListComponent,
    FeaturedBlockComponent,
    FeaturedProductComponent,
<<<<<<< HEAD
    SupplierRequestComponent,
||||||| 3c8e454
=======
    SupplierRequestComponent,
    ShopCarouselComponent,
>>>>>>> develop
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule, GalleryModule],
})
export class ShopModule {}
