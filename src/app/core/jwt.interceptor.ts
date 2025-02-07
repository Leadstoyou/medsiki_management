import { HttpInterceptorFn } from '@angular/common/http';
import { getCookie } from '#utils/cookie.helper';
import { environment } from '../../environments/environment';
import { STRING } from '#utils/const';
import { LoadingService } from '#services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const token = getCookie(STRING.ACCESS_TOKEN);

  let newReq = req;
  if (token && req.url.startsWith(environment.apiUrl)) {
    newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  loadingService.setLoading(true);

  return next(newReq).pipe(
    finalize(() => {
      loadingService.setLoading(false);
    }),
  );
};
