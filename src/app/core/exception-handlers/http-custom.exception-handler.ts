import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpCustomException } from '@api/http';
import { ToastCustomService } from '@shared/services';

@Injectable()
export class HttpCustomExceptionHandler implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(exceptions: any): void {
    const toast = this.injector.get<ToastCustomService>(ToastCustomService);

    if (HttpCustomException.isHttpException(exceptions)) {
      const customExceptions = exceptions as HttpCustomException;
      customExceptions?.message?.forEach?.((m) => {
        console.log(m.message);
        toast.error(m.message);
      });
    }
  }
}
