import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HeroComponent, HomePageComponent],
  imports: [CommonModule, SharedModule],
})
export class HomeModule {}
