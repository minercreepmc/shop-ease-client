import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogInDto } from '@dto';
import { AuthService, ToastrCustomService } from '@shared/services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toast: ToastrCustomService,
  ) {}

  @Output() registerClicked = new EventEmitter();
  isLoggedIn = false;
  logInDto = new LogInDto();
  registerClick() {
    this.registerClicked.emit();
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$().subscribe({
      next: (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      },
    });
  }

  onSubmit(): void {
    this.authService.logIn$(this.logInDto).subscribe({
      next: () => {
        this.toast.success('Login success');
      },
      error: (e) => {
        e.error.message.forEach((m: any) => {
          this.toast.error(m.error);
        });
        console.log(e);
      },
      complete: () => {
        this.reloadPage();
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
