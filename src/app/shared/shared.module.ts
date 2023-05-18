import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OutlineButtonComponent } from './components/outline-button/outline-button.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PrimaryButtonComponent,
    FooterComponent,
    OutlineButtonComponent,
    SearchBarComponent,
    SecondaryButtonComponent,
    // ... other components, directives, and pipes
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    // ... other modules
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PrimaryButtonComponent,
    OutlineButtonComponent,
    FontAwesomeModule,
    SearchBarComponent,
    SecondaryButtonComponent,
    // ... other components, directives, and pipes
  ],
})
export class SharedModule {}
