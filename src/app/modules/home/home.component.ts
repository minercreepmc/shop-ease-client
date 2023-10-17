import { Component } from '@angular/core';
import { FeaturesComponent } from '@modules/features/features.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FeaturesComponent],
})
export class HomeComponent {}
