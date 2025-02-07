import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LINK_LOGIN_GUARD, MappingLinkByRoles, MappingRedirectAfterLoginByRoles, STRING } from '#utils/const';
import { getCookie } from '#utils/cookie.helper';
import { UserProfileService } from '#services/user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class LoginInjection {
  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
  ) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    const token = getCookie(STRING.ACCESS_TOKEN) || '';
    const user = this.userProfileService.currentUser ?? {};
    const isNotAllow = LINK_LOGIN_GUARD.some((link) => url.includes(link));

    if (!url.includes('') || (token && Object.keys(user).length && isNotAllow)) {
      const url = MappingLinkByRoles[user.role] + MappingRedirectAfterLoginByRoles[user.role];
      this.router.navigate([url]);
      return false;
    }

    return true;
  }
}

export const LoginGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
  inject(LoginInjection).canActivate(next, state);
