import { NgModule } from '@angular/core';
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

library.add(faFacebookF, faTwitter, faPhone, faSearch);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderComponent,
    HomeComponent,
    FeaturesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
