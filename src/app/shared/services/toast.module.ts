import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ToastCustomService } from './toast.service';

@NgModule({
  declarations: [],
  imports: [ToastrModule.forRoot()],
  providers: [ToastCustomService],
  exports: [ToastrModule],
})
export class ToastrCustomModule {}
