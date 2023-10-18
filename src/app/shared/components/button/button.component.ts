import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [],
})
export class ButtonComponent {
  @Output() buttonClicked = new EventEmitter();
  onButtonClick() {
    this.buttonClicked.emit();
  }
}
