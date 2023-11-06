import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LogInDto } from '@dto';
import { AuthService, ToastrCustomService } from '@shared/services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule],
})
export class LoginFormComponent {
  constructor(
    private authService: AuthService,
    private toast: ToastrCustomService,
    private router: Router,
  ) {}

  @Output() registerClicked = new EventEmitter();
  isLoggedIn = false;
  logInDto = new LogInDto();
  registerClick() {
    this.registerClicked.emit();
  }

  onSubmit(): void {
    if (!this.logInDto.username || !this.logInDto.password) {
      this.toast.error('Vui lòng nhập đẩy đủ thông tin');
      return;
    }

    this.authService.logIn$(this.logInDto).subscribe({
      next: () => {
        this.toast.success('Đăng nhập thành công');
      },
      error: (e) => {
        if (e.status === HttpStatusCode.Unauthorized) {
          this.toast.error('Tên đăng nhập hoặc mật khẩu không chính xác');
        }

        if (e.status === HttpStatusCode.InternalServerError) {
          this.toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau');
        }
      },
      complete: () => {
        this.redirectToShop();
      },
    });
  }

  redirectToShop() {
    this.router.navigate(['/shop']);
  }
}
