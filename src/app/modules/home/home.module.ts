import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeatureComponent } from './components/feature/feature.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [HeroComponent, HomePageComponent, FeatureComponent, ContentComponent],
  imports: [CommonModule, SharedModule],
})
export class HomeModule {}
