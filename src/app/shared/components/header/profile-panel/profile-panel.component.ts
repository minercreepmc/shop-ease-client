import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService, StorageService, UserModel } from '@shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe],
  providers: [AuthService],
})
export class ProfilePanelComponent implements OnInit {
  user$: Observable<UserModel>;
  constructor(
    private readonly authService: AuthService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getProfile();
  }

  logOut() {
    this.authService.logOut().subscribe({
      next: () => {
        this.storageService.clean();
        window.location.reload();
      },
    });
  }
}
