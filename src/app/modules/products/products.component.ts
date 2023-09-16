import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
  effect,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import {
  CartModel,
  CartService,
  ProductModel,
  ProductService,
  ToastrCustomModule,
  ToastCustomService,
  CategoryService,
} from '@shared/services';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Observable, map, Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [
    './products.component.scss',
    '../../../../node_modules/keen-slider/keen-slider.min.css',
  ],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    FontAwesomeModule,
    HttpClientModule,
    ToastrCustomModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [ProductService, CategoryService],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly toastService: ToastCustomService,
    private readonly categoryService: CategoryService,
  ) {
    effect(() => {
      this.products$ = this.productService
        .getProducts$({
          category_id: this.currentCategoryId(),
        })
        .pipe(map((response) => response.products));
    });
  }
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  products$: Observable<ProductModel[]>;
  cart: CartModel;
  cartSubscription: Subscription;
  categories: Category[] = [];
  currentCategoryId = signal('');

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe({
      next: (response) => {
        this.cart = response;
      },
    });

    this.categoryService
      .getCategories$()
      .pipe(
        map((response) => {
          return response.categories.map((category) => ({
            value: category.id,
            viewValue: category.name,
          }));
        }),
      )
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
      });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  fetchNewProductsByCategory(categoryId: string) {
    this.currentCategoryId.set(categoryId);
  }

  addToCart(productId: string) {
    if (this.cart) {
      this.cartService.addToCart$(this.cart, productId).subscribe({
        next: (response) => {
          console.log(response);
          this.toastService.success('Added to cart');
        },
        error: (error) => {
          console.log(error);
          throw error;
        },
        complete: () => {
          window.location.reload();
        },
      });
    } else {
      this.toastService.error('Please login first');
    }
  }

  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;
  slider: KeenSliderInstance;

  ngAfterViewInit() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
        breakpoints: {
          '(min-width: 0px)': {
            slides: {
              perView: 1,
              spacing: 50,
            },
          },
          '(min-width: 768px)': {
            slides: {
              perView: 2,
              spacing: 50,
            },
          },
          '(min-width: 1024px)': {
            slides: {
              perView: 3,
              spacing: 0,
            },
          },
        },
      },
      [
        (slider) => {
          let timeout: any;
          let mouseOver = false;
          function clearNextTimeout() {
            clearTimeout(timeout);
          }
          function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;
            timeout = setTimeout(() => {
              slider.next();
            }, 2000);
          }
          slider.on('created', () => {
            slider.container.addEventListener('mouseover', () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener('mouseout', () => {
              mouseOver = false;
              nextTimeout();
            });
            nextTimeout();
          });
          slider.on('dragStarted', clearNextTimeout);
          slider.on('animationEnded', nextTimeout);
          slider.on('updated', nextTimeout);
        },
      ],
    );
  }
}
