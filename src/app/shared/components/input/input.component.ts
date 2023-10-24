import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, FormsModule],
})
export class InputComponent {
  @Input() placeholder: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() label: string;
  @Input() id: string;
  @Input() disabled = false;

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
