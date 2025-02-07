import { AuthRepository } from '#repositories/auth.repository';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { LOGO, MappingLinkByRoles, MappingRedirectAfterLoginByRoles } from '#utils/const';
import { AuthService } from '#services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { decrypt } from '#utils/helpers';
import { ILoginResponse } from '#interfaces/account.interface';
import { Location } from '@angular/common';
import { FirebaseService } from '#services/firebase.service';
import { StorageService } from '#services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends BaseComponent implements OnInit {
  logo = LOGO;
  email: string = '';
  password: string = '';
  constructor(
    protected componentService: ComponentService,
    private authService: AuthService,
    private authRepository: AuthRepository,
    private route: ActivatedRoute,
    private location: Location,
    private firebaseService: FirebaseService,
    private storageService: StorageService,
  ) {
    super(componentService);
    this.route.queryParams.subscribe((params) => {
      if (params['token']) {
        const token: ILoginResponse = JSON.parse(decrypt(params['token']));
        if (!token.user || !token.accessToken || !token.refreshToken) {
          this.componentService.toast.error('screens.auth.loginFail');
        }
        const user = token.user;
        const url = MappingLinkByRoles[user.role] + MappingRedirectAfterLoginByRoles[user.role];
        this.authService.redirectUrl = url;
        this.authService.startSession(token);
        this.componentService.toast.success('screens.auth.loginSuccess');
      } else if (params['error']) {
        const error = JSON.parse(decrypt(params['error']));
        this.componentService.toast.error(error.message);
        this.clearErrorParam();
      }
    });
  }
  ngOnInit(): void {}

  onBlur(controlName: string) {
    const control = this.getControl(controlName);
    if (control?.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  }

  login() {
    this.firebaseService.login(this.email, this.password).subscribe({
      next: (user) => {
        console.log('🚀 ~ LoginComponent ~ this.firebaseService.login ~ user:', user);
        this.authService.saveUser(user);
        this.redirect('/admin/home');
      },
      error: (err) => {
        this.componentService.toast.error(err.message || 'An error occurred during login.');
      },
    });
  }
  clearErrorParam(): void {
    this.location.replaceState(this.route.snapshot.routeConfig?.path || '', '');
  }
}
