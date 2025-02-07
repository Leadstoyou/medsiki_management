import { UserProfileService } from './user-profile.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getCookie, removeAllCookies, replaceCookie } from '#utils/cookie.helper';
import { ILoginResponse } from '#interfaces/account.interface';
import { STRING } from '#utils/const';
import { GroupSettingService } from './group-setting.service';
import { BaseSocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = !!getCookie(STRING.ACCESS_TOKEN) && !!getCookie(STRING.REFRESH_TOKEN);
  redirectUrl: string;

  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
    private groupSettingService: GroupSettingService,
    private webSocket: BaseSocketService,
  ) {}

  endSession(): void {
    this.isLoggedIn = false;
    this.userProfileService.currentUser = null;
    this.groupSettingService.currentGroup = null;
    removeAllCookies();
    this.router.navigate(['']);
  }

  startSession({ accessToken, refreshToken, user }: ILoginResponse): void {
    replaceCookie(STRING.ACCESS_TOKEN, accessToken);
    replaceCookie(STRING.REFRESH_TOKEN, refreshToken);
    // this.webSocket.setauth();
    this.isLoggedIn = true;
    this.userProfileService.currentUser = user;
    const redirectUrl = this.redirectUrl ? this.router.parseUrl(this.redirectUrl) : '/error404';
    this.router.navigateByUrl(redirectUrl);
  }
  private storageKey = 'user'; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveUser(user: any, useSessionStorage = false): void {
    const storage = useSessionStorage ? sessionStorage : localStorage;
    storage.setItem(this.storageKey, JSON.stringify(user));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUser(): any {
    const user = localStorage.getItem(this.storageKey) || sessionStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

  clearUser(): void {
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.storageKey);
  }

  isLogIn(): boolean {
    return !!this.getUser();
  }
}
