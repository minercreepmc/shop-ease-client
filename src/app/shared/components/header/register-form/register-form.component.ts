import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpCustomException } from '@api/http';
import { UserDomainExceptionCodes } from '@api/http/v1/exceptions/product.domain-exception-code';
import { ToastCustomService, ToastrCustomModule } from '@shared/services';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, ToastrCustomModule],
})
export class RegisterFormComponent {
  risSuccessful = false;
  isRegisterFaileded = false;
  registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toast: ToastCustomService,
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: [''],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const isMatch = this.isPasswordMatch();

    if (!isMatch) {
      this.toast.error('Password not match');
      return;
    }

    this.register();
  }

  isPasswordMatch() {
    return (
      this.registerForm.value.password ===
      this.registerForm.value.confirmPassword
    );
  }

  register() {
    this.authService.register$(this.registerForm.value).subscribe({
      next: (response) => {
        this.toast.success('Register success');
        this.risSuccessful = true;
        this.registerForm.reset();
      },
      error: (err: HttpCustomException) => {
        err.message.forEach((m) => {
          if (m.code === UserDomainExceptionCodes.PasswordDoesNotValid) {
            this.toast.error('Password not valid');
          } else if (m.code === UserDomainExceptionCodes.UsernameDoesNotValid) {
            this.toast.error('Username not valid');
          } else if (m.code === UserDomainExceptionCodes.FullNameDoesNotValid) {
            this.toast.error('Full name not valid');
          } else if (
            m.code === UserDomainExceptionCodes.UsernameAlreadyExists
          ) {
            this.toast.error('Username already exists');
          }
        });
      },
    });
  }
}
