import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-white-form-field',
  templateUrl: './white-form-field.component.html',
  styleUrls: ['./white-form-field.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule],
})
export class WhiteFormFieldComponent {
  @Input() label: string;
}
