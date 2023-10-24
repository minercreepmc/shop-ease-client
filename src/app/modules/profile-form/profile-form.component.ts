import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateUserDto } from '@dto';
import { ProfileRO } from '@ro';
import { ToastrCustomService, UserService } from '@service';
import { ButtonComponent, InputComponent } from '@shared/components';
import { handleError } from '@shared/utils';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  standalone: true,
  imports: [InputComponent, ButtonComponent],
})
export class ProfileFormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toast: ToastrCustomService,
  ) {}
  profile: ProfileRO;
  updateProfileDto = new UpdateUserDto();

  onFullNameChange(event: any) {
    return (this.updateProfileDto.fullName = event.target.value);
  }

  onPhoneChange(event: any) {
    return (this.updateProfileDto.phone = event.target.value);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.profile = data.profile;
    });
  }
  updateProfile() {
    console.log(this.updateProfileDto);
    this.userService.updateProfile$(this.updateProfileDto).subscribe({
      next: () => {
        this.toast.success('Update successful');
      },
      error: (e) => {
        handleError(e, this.toast);
      },
    });
  }
}
