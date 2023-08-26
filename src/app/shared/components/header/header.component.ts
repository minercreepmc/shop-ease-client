import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faSearch,
  faShoppingBasket,
  faShoppingCart,
  faUser,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CartModel, CartService, StorageService } from '@shared/services';
import { Observable } from 'rxjs';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { RegisterFormComponent } from './register-form/register-form.component';
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
    RegisterFormComponent,
    ProfilePanelComponent,
    NgIf,
    AsyncPipe,
  ],
  providers: [StorageService, CartService],
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly storageService: StorageService,
    private readonly cartService: CartService
  ) {}
  faBars = faBars;
  faShoppingBasket = faShoppingBasket;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faUserCircle = faUserCircle;

  isSearchActive = false;
  isCartActive = false;
  isLoginActive = false;
  isMenuActive = false;
  isRegisterActive = false;
  isProfileActive = false;

  isLoggedIn = false;

  ngOnInit(): void {
    this.isMenuActive = false;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
    this.isRegisterActive = false;
    this.isProfileActive = false;

    const isLoggedIn = this.storageService.isLoggedIn();

    if (isLoggedIn) {
      this.isLoggedIn = true;
    }
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    this.isLoginActive = false;
    this.isCartActive = false;
    this.isMenuActive = false;
    this.isRegisterActive = false;
    this.isProfileActive = false;
  }
  toggleCart() {
    this.isCartActive = !this.isCartActive;
    this.isSearchActive = false;
    this.isLoginActive = false;
    this.isMenuActive = false;
    this.isRegisterActive = false;
    this.isProfileActive = false;
  }
  toggleLogin() {
    this.isLoginActive = !this.isLoginActive;
    this.isCartActive = false;
    this.isSearchActive = false;
    this.isMenuActive = false;
    this.isRegisterActive = false;
    this.isProfileActive = false;
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
    this.isRegisterActive = false;
    this.isProfileActive = false;
  }

  toggleRegister() {
    this.isRegisterActive = !this.isRegisterActive;
    this.isMenuActive = false;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
    this.isProfileActive = false;
  }

  toggleProfile() {
    this.isProfileActive = !this.isProfileActive;
    this.isMenuActive = false;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
    this.isRegisterActive = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isMenuActive = false;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
    this.isRegisterActive = false;
    this.isProfileActive = false;
  }
}
