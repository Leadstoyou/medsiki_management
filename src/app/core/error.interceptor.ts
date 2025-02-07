import { AuthRepository } from '#repositories/auth.repository';
import { AuthService } from '#services/auth.service';
import { DialogService } from '#services/dialog.service';
import { UnauthenticatedException } from '#services/http-error-handler.service';
import { STRING } from '#utils/const';
import { getCookie, replaceCookie } from '#utils/cookie.helper';
import { jwtIsValid } from '#utils/jwt.helper';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private authRepository: AuthRepository,
    private dialogService: DialogService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isShowErrorToast = request.headers.get('showerrortoast');
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          return this.checkAuth().pipe(
            switchMap(() => {
              const token = getCookie(STRING.ACCESS_TOKEN);
              if (!token) {
                return throwError(() => new Error('Session expired'));
              }
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next.handle(request);
            }),
          );
        }

        err.error = { ...err.error, isShowErrorToast };
        return throwError(() => err);
      }),
    );
  }

  private checkAuth(): Observable<null> {
    const accessToken = getCookie(STRING.ACCESS_TOKEN);
    if (jwtIsValid(accessToken || '')) return of(null);

    const refreshToken = getCookie(STRING.REFRESH_TOKEN);
    if (!refreshToken) return this.logoutWithError('Session is expired');

    return this.authRepository.renewToken().pipe(
      switchMap((res) =>
        res.data
          ? (replaceCookie(STRING.ACCESS_TOKEN, res.data), of(null))
          : this.logoutWithError('Session is expired'),
      ),
      catchError(() => this.logoutWithError('Session is expired')),
    );
  }

  private logoutWithError(message: string): Observable<null> {
    this.dialogService.closeAll();
    this.authenticationService.endSession();
    requestAnimationFrame(() => this.dialogService.error(message));
    return throwError(() => new UnauthenticatedException());
  }
}
