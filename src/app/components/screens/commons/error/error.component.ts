import { BaseComponent } from '#components/core/base/base.component';
import { IAccount } from '#interfaces/account.interface';
import { ComponentService } from '#services/component.service';
import { UserProfileService } from '#services/user-profile.service';
import { LOGO } from '#utils/const';
import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent extends BaseComponent implements OnInit {
  logo = LOGO;
  user: IAccount;
  url = '';

  constructor(
    protected componentService: ComponentService,
    private userProfileService: UserProfileService,
    private location: Location,
  ) {
    super(componentService);
  }
  ngOnInit(): void {
    this.user = this.userProfileService.currentUser;
  }

  redirecToHome() {
    this.location.back();
  }
}
