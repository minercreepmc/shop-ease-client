import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductModel, ProductService } from '@shared/services';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [
    './products.component.scss',
    '../../../../node_modules/keen-slider/keen-slider.min.css',
  ],
  standalone: true,
  imports: [NgFor, AsyncPipe, FontAwesomeModule, HttpClientModule],
  providers: [ProductService],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  products$: Observable<ProductModel[]>;
  constructor(private readonly productService: ProductService) {}
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  ngOnInit() {
    this.products$ = this.productService
      .getProducts$({
        category_id: 'fbee020c-5e57-4073-886a-08105028678c',
      })
      .pipe(map((response) => response.products));
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
              spacing: 20,
            },
          },
          '(min-width: 768px)': {
            slides: {
              perView: 2,
              spacing: 20,
            },
          },
          '(min-width: 1024px)': {
            slides: {
              perView: 3,
              spacing: 20,
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

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
