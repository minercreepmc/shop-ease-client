import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryComponent, GalleryItem } from '@daelmaak/ngx-gallery';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss'],
  standalone: true,
  imports: [GalleryComponent],
})
export class ProductGalleryComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  @Input() image_urls: string[];
  id: string;
  images: GalleryItem[] = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.images = this.image_urls.map((url) => ({ src: url, thumbSrc: url }));
  }
}
