import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faSearch,
  faShoppingBasket,
  faShoppingCart,
  faUser,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@shared/services';
import { LoginFormComponent } from './login-form/login-form.component';
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
    NgIf,
    AsyncPipe,
    RouterLink,
  ],
  providers: [],
})
export class HeaderComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}
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

  isLoggedIn = false;

  ngOnInit(): void {
    this.isMenuActive = false;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
    this.isRegisterActive = false;

    this.authService.isLoggedIn$().subscribe({
      next: (response) => {
        this.isLoggedIn = response;
      },
    });
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    this.isLoginActive = false;
    this.isCartActive = false;
    this.isMenuActive = false;
    this.isRegisterActive = false;
  }
  toggleCart() {
    this.isCartActive = !this.isCartActive;
    this.isSearchActive = false;
    this.isLoginActive = false;
    this.isMenuActive = false;
    this.isRegisterActive = false;
  }
  toggleLogin() {
    this.isLoginActive = !this.isLoginActive;
    this.isCartActive = false;
    this.isSearchActive = false;
    this.isMenuActive = false;
    this.isRegisterActive = false;
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
    this.isRegisterActive = false;
  }

  toggleRegister() {
    this.isRegisterActive = !this.isRegisterActive;
    this.isMenuActive = false;
    this.isSearchActive = false;
    this.isCartActive = false;
    this.isLoginActive = false;
  }

  toggleProfile() {
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
  }
}
