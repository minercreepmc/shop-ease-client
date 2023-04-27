import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PrimaryButtonComponent,
    FooterComponent,
    SecondaryButtonComponent,
    // ... other components, directives, and pipes
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    // ... other modules
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    FontAwesomeModule,
    // ... other components, directives, and pipes
  ],
})
export class SharedModule {}
