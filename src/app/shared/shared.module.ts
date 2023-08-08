import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OutlineButtonComponent } from './components/outline-button/outline-button.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
@NgModule({
  declarations: [
    PrimaryButtonComponent,
    FooterComponent,
    OutlineButtonComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    // ... other modules
  ],
  exports: [
    FooterComponent,
    PrimaryButtonComponent,
    OutlineButtonComponent,
    FontAwesomeModule,
    SearchBarComponent,
  ],
})
export class SharedModule {}
