import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './libraries/material/material.module';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HeaderComponent,
    PrimaryButtonComponent,
    FooterComponent,
    // ... other components, directives, and pipes
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    // ... other modules
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PrimaryButtonComponent,
    FontAwesomeModule,
    // ... other components, directives, and pipes
  ],
})
export class SharedModule {}
