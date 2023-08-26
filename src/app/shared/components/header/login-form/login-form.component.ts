import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@shared/services';
import { StorageService } from '@shared/services/storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [StorageService],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly storageService: StorageService
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;

  @Output() registerClicked = new EventEmitter();
  registerClick() {
    console.log('hey');
    this.registerClicked.emit();
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.authService.logIn$(this.loginForm.value).subscribe({
      next: (response) => {
        this.storageService.saveUser(response);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: (err) => {
        this.isLoginFailed = true;
        throw err;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
