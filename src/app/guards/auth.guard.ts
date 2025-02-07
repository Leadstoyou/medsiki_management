import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { getCookie } from '#utils/cookie.helper';
import { STRING } from '#utils/const';
import { UserProfileService } from '#services/user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInjection {
  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    const validRequest = this.checkLogin(url);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !validRequest && this.router.navigate(['']);

    return validRequest;
  }

  checkLogin(url: string): boolean {
    const token = getCookie(STRING.ACCESS_TOKEN) || '';
    const user = this.userProfileService.currentUser ?? {};
    if (token && Object.keys(user).length) {
      return true;
    }

    this.authService.redirectUrl = url;
    return false;
  }
}

export const AuthGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
  inject(AuthInjection).canActivate(next, state);
