import { Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastCustomService {
  constructor(private readonly toastr: ToastrService, private zone: NgZone) {}

  error(exception: string) {
    this.zone.run(() => {
      this.toastr.error(exception);
    });
  }

  success(message: string) {
    this.zone.run(() => {
      this.toastr.success(message);
    });
  }
}
