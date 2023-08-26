import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
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
} from '@shared/services';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Observable, map, Subscription } from 'rxjs';

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
    AsyncPipe,
    FontAwesomeModule,
    HttpClientModule,
    ToastrCustomModule,
  ],
  providers: [ProductService],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly toastService: ToastCustomService
  ) {}
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  products$: Observable<ProductModel[]>;
  cart: CartModel;
  cartSubscription: Subscription;

  ngOnInit() {
    this.products$ = this.productService
      .getProducts$({
        category_id: 'd7c31870-9ac6-455a-a5d7-f41e60956c34',
      })
      .pipe(map((response) => response.products));

    this.cartSubscription = this.cartService.cart$.subscribe({
      next: (response) => {
        this.cart = response;
      },
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  addToCart(product: ProductModel) {
    if (this.cart) {
      this.cartService.addToCart$(this.cart, product).subscribe({
        next: (response) => {
          this.toastService.success('Added to cart');
          window.location.reload();
        },
        error: (error) => {
          throw error;
        },
      });
    } else {
      this.toastService.error('Something went wrong');
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
      ]
    );
  }
}
