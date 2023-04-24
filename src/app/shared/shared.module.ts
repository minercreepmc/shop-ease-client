import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './libraries/material/material.module';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PrimaryButtonComponent,
    // ... other components, directives, and pipes
  ],
  imports: [
    CommonModule,
    MaterialModule,
    // ... other modules
  ],
  exports: [
    HeaderComponent,
    PrimaryButtonComponent,
    // ... other components, directives, and pipes
  ],
})
export class SharedModule {}
