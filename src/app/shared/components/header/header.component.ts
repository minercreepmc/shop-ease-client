import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faSearch,
  faShoppingBasket,
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '@shared/services';
import { LoginFormComponent } from './login-form/login-form.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgClass,
    SearchFormComponent,
    ShoppingCartComponent,
    LoginFormComponent,
  ],
})
export class HeaderComponent {
  faBars = faBars;
  faShoppingBasket = faShoppingBasket;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;

  isSearchActive = false;
  isCartActive = false;
  isLoginActive = false;
  isMenuActive = false;
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    this.isLoginActive = false;
    this.isCartActive = false;
  }
  toggleCart() {
    this.isCartActive = !this.isCartActive;
    this.isSearchActive = false;
    this.isLoginActive = false;
  }
  toggleLogin() {
    this.isLoginActive = !this.isLoginActive;
    this.isCartActive = false;
    this.isSearchActive = false;
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isMenuActive = false;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
  }
}
