import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-carousel',
  templateUrl: './shop-carousel.component.html',
  styleUrls: ['./shop-carousel.component.scss'],
})
export class ShopCarouselComponent implements OnInit, AfterViewInit {
  categories = [
    'Black Coffee',
    'Milk Coffee',
    'Blend Coffee',
    'Cold Brew Coffee',
  ];
  slideIndex = 1;
  activeCategory = this.categories[0];
  slideInterval: any;

  ngOnInit(): void {
    this.setActiveCategory('Black Coffee');
    this.showSlides(this.slideIndex);
  }
  ngAfterViewInit(): void {
    this.setActiveCategory('Black Coffee');
    this.startSlideInterval();
  }

  startSlideInterval(): void {
    this.slideInterval = setInterval(() => {
      this.plusSlides(1);
    }, 5000);
  }

  resetSlideInterval(): void {
    clearInterval(this.slideInterval);
    this.startSlideInterval();
  }

  // Next/previous controls
  plusSlides(n: number): void {
    this.showSlides((this.slideIndex += n));
    this.activeCategory = this.categories[this.slideIndex - 1];
    this.resetSlideInterval();
  }

  // Thumbnail image controls
  currentSlide(n: number): void {
    this.showSlides((this.slideIndex = n));
    this.activeCategory = this.categories[this.slideIndex - 1];
    this.resetSlideInterval();
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.currentSlide(this.categories.indexOf(category) + 1);
    this.resetSlideInterval();
  }

  showSlides(n: number): void {
    let i;
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }
}
