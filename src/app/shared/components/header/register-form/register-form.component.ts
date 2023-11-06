import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CreateMemberDto } from '@dto';
import { AuthService, ToastrCustomService, UserService } from '@service';
import { handleError } from '@shared/utils';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule],
})
export class RegisterFormComponent {
  createMemberDto = new CreateMemberDto();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toast: ToastrCustomService,
    private router: Router,
  ) {}

  onSubmit() {
    const isMatch = this.isPasswordMatch();

    if (!isMatch) {
      this.toast.error('Password not match');
      return;
    }

    this.register(this.createMemberDto);
  }

  isPasswordMatch() {
    return (
      this.createMemberDto.password === this.createMemberDto.confirmPassword
    );
  }

  register(dto: CreateMemberDto) {
    this.userService.createMember$(dto).subscribe({
      next: () => {
        this.toast.success('Đăng ký thành công');
      },
      error: (e: HttpErrorResponse) => {
        handleError(e, this.toast);
      },
      complete: () => {
        this.logIn();
      },
    });
  }

  logIn() {
    this.authService.logIn$(this.createMemberDto).subscribe({
      next: () => {
        this.toast.success('Đăng nhập thành công');
      },
      error: (e: HttpErrorResponse) => {
        handleError(e, this.toast);
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
