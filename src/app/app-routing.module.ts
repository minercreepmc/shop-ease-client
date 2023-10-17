import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';
import { ProductWithImagesRO } from '@ro';
import { CategoriesResolver } from '@shared/resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      products: ProductWithImagesRO,
      categories: CategoriesResolver,
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
