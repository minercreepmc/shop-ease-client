import { ErrorHandler, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { HeaderComponent } from '@shared/components/header/header.component';
import { HomeComponent } from './modules/home/home.component';
import { FeaturesComponent } from './modules/features/features.component';
import { ProductsComponent } from './modules/products/products.component';
import { CategoriesComponent } from './modules/categories/categories.component';
import { HttpCustomExceptionHandler } from './core/exception-handlers';
import { StorageService, ToastrCustomModule } from '@shared/services';
import { httpInterceptorProviders } from './core/interceptors';
import { OrdersComponent } from './modules/orders/orders.component';

library.add(faFacebookF, faTwitter, faPhone, faSearch);

const exceptionHandlers: Provider[] = [
  {
    provide: ErrorHandler,
    useClass: HttpCustomExceptionHandler,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderComponent,
    HomeComponent,
    FeaturesComponent,
    ProductsComponent,
    CategoriesComponent,
    ToastrCustomModule,
    OrdersComponent,
  ],
  providers: [...exceptionHandlers, httpInterceptorProviders, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
