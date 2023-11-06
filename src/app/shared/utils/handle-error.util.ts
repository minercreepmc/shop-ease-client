import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ToastrCustomService } from '@service';

export function handleError(e: HttpErrorResponse, toast: ToastrCustomService) {
  if (e.status === HttpStatusCode.Unauthorized) {
    toast.error('Đăng nhập để thực hiện hành động');
  }

  if (e.status === HttpStatusCode.Forbidden) {
    toast.error('Bạn không có quyền làm điều này');
  }

  e.error.message.forEach((m: any) => {
    toast.error(m.error);
  });
  console.log(e);
}
