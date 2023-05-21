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
import { ReplacePipe } from './pipes/replace.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    PrimaryButtonComponent,
    FooterComponent,
    OutlineButtonComponent,
    SearchBarComponent,
    SecondaryButtonComponent,
    ReplacePipe,
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
  ],
})
export class SharedModule {}
