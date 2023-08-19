import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastCustomService, ToastrCustomModule } from '@shared/services';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, ToastrCustomModule],
  providers: [AuthService],
})
export class RegisterFormComponent {
  risSuccessful = false;
  isRegisterFaileded = false;
  registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly toast: ToastCustomService
  ) {
    this.registerForm = this.formBuilder.group({
      username: '',
      password: '',
      confirmPassword: '',
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
      error: (err) => {
        this.isRegisterFaileded = true;
      },
    });
  }
}
