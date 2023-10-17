import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateMemberDto } from '@dto';
import { ToastrCustomService, UserService } from '@service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class RegisterFormComponent {
  createMemberDto = new CreateMemberDto();

  constructor(
    private userService: UserService,
    private toast: ToastrCustomService,
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
        this.toast.success('Register success');
      },
      error: (error: HttpErrorResponse) => {
        error.error.message.forEach((m: any) => {
          if (m.property === 'password') {
            this.toast.error('Password not valid');
          }

          if (m.property === 'username') {
            this.toast.error('Username not valid');
          }
        });
      },
    });
  }
}
