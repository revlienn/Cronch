import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from './busy-service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService=inject(BusyService);
  console.log('Outgoing request:', req.url);

  busyService.busy();
  return next(req).pipe(finalize(()=>busyService.idle()));

};
