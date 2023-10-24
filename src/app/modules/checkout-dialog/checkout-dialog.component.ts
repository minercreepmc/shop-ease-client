import { Component } from '@angular/core';
import { CheckoutFormComponent } from '@modules/checkout-form/checkout-form.component';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.scss'],
  standalone: true,
  imports: [DialogComponent, CheckoutFormComponent],
})
export class CheckoutDialogComponent {}
