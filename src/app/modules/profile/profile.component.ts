import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { AddressFormComponent } from '@modules/address-form/address-form.component';
import { OrderListComponent } from '@modules/order-list/order-list.component';
import { ProfileFormComponent } from '@modules/profile-form/profile-form.component';
import { AuthService, ToastrCustomService } from '@service';
import { ButtonComponent } from '@shared/components';
import { handleError } from '@shared/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    ProfileFormComponent,
    AddressFormComponent,
    ButtonComponent,
    RouterModule,
    OrderListComponent,
  ],
})
export class ProfileComponent {
  constructor(
    private authService: AuthService,
    private toast: ToastrCustomService,
    private router: Router,
  ) {}
  logOut() {
    this.authService.logOut$().subscribe({
      next: () => {
        this.toast.success('Đăng xuất thành công');
      },
      error: (e) => {
        handleError(e, this.toast);
      },
      complete: () => {
        this.router.navigate(['/home']);
      },
    });
  }
}
