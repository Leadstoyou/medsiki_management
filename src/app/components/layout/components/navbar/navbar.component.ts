import { UserProfileService } from './../../../../services/user-profile.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { IAccount } from '#interfaces/account.interface';
import { TranslocoService } from '@ngneat/transloco';
import { AuthRepository } from '#repositories/auth.repository';
import { AuthService } from '#services/auth.service';
import { MappingNameRoleByRoles } from 'src/app/configs/sidebar.config';
import { environment } from '#environments/environment';
import { USER_ROLE } from '#utils/const';
import { GroupRepository } from '#repositories/group.repository';
import { IGroup } from '#interfaces/group.interface';
import { GroupSettingService } from '#services/group-setting.service';
import { BaseSocketService } from '#services/socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent extends BaseComponent implements OnInit {
  dialogRef: NzModalRef;
  currentUrl: string = this.router.url;
  @Input() user: IAccount;
  roleName: string = '';
  currentLanguage: string = 'en';
  backendUrl = environment.socketUrl;
  userAvatar = 'assets/svg/user-circle.svg';
  listGroups: IGroup[] = [];
  currentGroup = '';
  constructor(
    protected componentService: ComponentService,
    private tranlocoService: TranslocoService,
    private authRepository: AuthRepository,
    private auth: AuthService,
    private userProfileService: UserProfileService,
    private groupRepository: GroupRepository,
    private cdr: ChangeDetectorRef,
    private groupSettingService: GroupSettingService,
    private webSocket: BaseSocketService,
  ) {
    super(componentService);
    this.currentLanguage = tranlocoService.getActiveLang();
    const { semester, groupCode } = this.groupSettingService.currentGroup;
    this.currentGroup = semester && groupCode ? `${semester.semester}_${groupCode}` : '';
  }

  get isSupervisor() {
    return this.user.role === USER_ROLE.SUPERVISOR;
  }

  get suffixGroup() {
    return `${this.groupSettingService.currentGroup?.semester}_${this.groupSettingService.currentGroup?.groupCode}`;
  }

  ngOnInit(): void {
    this.roleName = this.getRoleName();
    this.getUserAvatar();
    this.subscribeUntilDestroy(this.groupSettingService.isChooseGroupObs, () => {
      this.currentGroup = `${this.groupSettingService.currentGroup?.semester.semester}_${this.groupSettingService.currentGroup?.groupCode}`;
      this.cdr.detectChanges();
    });
  }

  loadingGroup() {
    this.subscribeOnce(this.groupRepository.getAllGroupSupervisor({ page: 0 }), {
      onSuccess: (response) => {
        this.listGroups = response.records;
      },
      onComplete: () => {
        this.cdr.detectChanges();
      },
    });
  }

  redirectToSetting() {
    this.redirect('/user/user-profile');
  }

  handleOpenSearchModal() {}

  handleChangeLang(lang: string) {
    this.currentLanguage = lang;
    this.tranlocoService.setActiveLang(lang);
    localStorage.setItem('lang', lang);
  }

  getUserAvatar(): void {
    const avatar = this.userProfileService.currentUser?.avatar?.imageUrl;
    avatar ? (this.userAvatar = `${this.backendUrl}/${avatar}`) : (this.userAvatar = 'assets/svg/user-circle.svg');
  }

  getRoleName(): string {
    return MappingNameRoleByRoles[this.user.role];
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

  selectGroup(group: IGroup) {
    this.groupSettingService.currentGroup = group;
    this.currentGroup = `${group.semester.semester}_${group.groupCode}`;
  }
}
