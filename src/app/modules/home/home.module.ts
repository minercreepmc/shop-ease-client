import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FeatureComponent } from './components/feature/feature.component';

@NgModule({
  declarations: [
    HeroComponent,
    HomePageComponent,
    AboutUsComponent,
    FeatureComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class HomeModule {}
