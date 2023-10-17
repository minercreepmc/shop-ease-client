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
import { HttpCustomExceptionHandler } from './core/exception-handlers';
import { AuthService } from '@shared/services';
import { httpInterceptorProviders } from './core/interceptors';
import { ToastrCustomModule } from '@service/toastr';

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
    ToastrCustomModule,
  ],
  providers: [...exceptionHandlers, httpInterceptorProviders, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
