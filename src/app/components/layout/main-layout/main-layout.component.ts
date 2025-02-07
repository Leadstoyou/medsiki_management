import { ComponentService } from '#services/component.service';
import { BaseComponent } from '#components/core/base/base.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { UserProfileService } from '#services/user-profile.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouterEvent } from '@angular/router';
import { IMenu } from '#interfaces/menu.interface';
import { LOGO, MappingLinkByRoles, MappingRedirectAfterLoginByRoles, USER_ROLE } from '#utils/const';
import { IAccount } from '#interfaces/account.interface';
import { SharedService } from '#services/shared.service';
import { MappingMenuByRoles } from 'src/app/configs/sidebar.config';
import { AuthRepository } from '#repositories/auth.repository';
import { AuthService } from '#services/auth.service';
import { GroupSettingService } from '#services/group-setting.service';
import { BaseSocketService } from '#services/socket.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent extends BaseComponent implements OnInit {
  menuItems: IMenu[];
  isFirstTimeLogin: boolean;
  hideSidebar: boolean = false;
  isCollapsed: boolean = false;
  logo = LOGO;
  user: IAccount;

  constructor(
    protected componentService: ComponentService,
    private userProfileService: UserProfileService,
    private sharedService: SharedService,
    private authRepository: AuthRepository,
    private auth: AuthService,
    private groupSettingService: GroupSettingService,
    private cdr: ChangeDetectorRef,
    private webSocket: BaseSocketService,
  ) {
    super(componentService);
    this.user = this.userProfileService.currentUser;
  }

  get selectedGroup() {
    return this.groupSettingService.currentGroup;
  }

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      this.navigationInterceptor(e as RouterEvent);
    });
    this.menuItems = this.getMenuItemsByRole();
    if (this.user.role === USER_ROLE.SUPERVISOR && !this.selectedGroup.groupCode) {
      this.menuItems = [this.menuItems[0]];
    }
    this.onResize();
    this.subscribeUntilDestroy(this.groupSettingService.isChooseGroupObs, () => {
      if (this.user.role === USER_ROLE.SUPERVISOR && this.selectedGroup.groupCode) {
        this.menuItems = this.getMenuItemsByRole();
        this.menuItems[0] = {
          label: `${this.selectedGroup.groupCode}`,
          icon: 'group-user',
          routerLink: `/supervisor/my-groups/detail/${this.selectedGroup._id}`,
          isBold: true,
        };
        this.menuItems = [...this.menuItems];
        this.cdr.detectChanges();
      }
    });
  }

  private getMenuItemsByRole(): IMenu[] {
    return MappingMenuByRoles[0];
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.innerWidth <= 768 ? this.sharedService.setIsCollapsed(true) : this.sharedService.setIsCollapsed(false);
  }

  trackBy(index: number): number {
    return index;
  }

  redirectLinkLogo() {
    const link = MappingLinkByRoles[this.user.role] + MappingRedirectAfterLoginByRoles[this.user.role];
    this.redirect(link);
  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loadingService.setLoading(true);
    }
    if (event instanceof NavigationEnd) {
      this.loadingService.setLoading(false);
    }
    if (event instanceof NavigationCancel) {
      this.loadingService.setLoading(false);
    }
    if (event instanceof NavigationError) {
      this.loadingService.setLoading(false);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sharedService.setIsCollapsed(this.isCollapsed);
  }

  async logout() {
    this.subscribeOnce(this.authRepository.logout(), {
      onSuccess: () => {
        this.componentService.toast.success('toast.logoutSuccessful');
      },
      onComplete: () => {
        this.auth.endSession();
        this.webSocket.disconnect();
      },
    });
  }
}
