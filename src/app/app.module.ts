import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ShopModule } from './modules/shop/shop.module';

library.add(faFacebookF, faTwitter, faPhone, faSearch);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    SharedModule,
    FontAwesomeModule,
    ShopModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
