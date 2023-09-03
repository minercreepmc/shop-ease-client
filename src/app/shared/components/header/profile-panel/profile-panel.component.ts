import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faEdit,
  faX,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import {
  AuthService,
  StorageService,
  ToastCustomService,
  ToastrCustomModule,
  UpdateProfileHttpRequest,
  UserModel,
} from '@shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastrCustomModule,
    RouterLink,
  ],
})
export class ProfilePanelComponent implements OnInit {
  user$: Observable<UserModel>;
  isEditable = false;
  faEdit = faEdit;
  faCheck = faCheck;
  faX = faX;
  faReceipt = faReceipt;

  userForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    private readonly formBuilder: FormBuilder,
    private readonly toast: ToastCustomService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullName: new FormControl({ value: '', disabled: true }),
      address: new FormControl({ value: '', disabled: true }),
    });
    this.user$ = this.authService.getProfile$();
    this.user$.subscribe({
      next: (user) => {
        this.userForm.patchValue({
          fullName: user.full_name,
          address: user.address,
        });
        this.userForm.get('fullName')?.disable();
        this.userForm.get('address')?.disable();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  logOut() {
    this.authService.logOut$().subscribe({
      next: () => {
        this.storageService.clean();
        window.location.reload();
      },
    });
  }

  onEditClick() {
    this.isEditable = true;
    this.userForm.enable();
  }

  onCancelClick() {
    this.isEditable = false;
    this.userForm.disable();
  }

  onCheckClick() {
    const dto: UpdateProfileHttpRequest = {
      address: this.userForm.value.address,
      fullName: this.userForm.value.fullName,
    };

    this.authService.updateProfile$(dto).subscribe({
      next: () => {
        this.isEditable = false;
        this.userForm.disable();
      },
      complete: () => {
        this.toast.success('Profile updated');
      },
    });
  }

  onOrderClick() {
    console.log('order');
  }
}
