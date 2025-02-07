import { Subscription, firstValueFrom } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ComponentService } from '#services/component.service';
import { SOCKET_SCREEN } from '#utils/const';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { IDialogOption } from '#interfaces/index';
import { promiseHelper } from '#utils/promise.helper';
import { WebsocketService } from '#services/socket-gateway.service';
import { DialogService } from '#services/dialog.service';

@Component({
  selector: 'app-progress-wait',
  templateUrl: './progress-wait.component.html',
  styleUrls: ['./progress-wait.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressWaitComponent implements OnInit, OnDestroy {
  readonly nzModalData: IDialogOption = inject(NZ_MODAL_DATA);
  nzPercent = 0;
  eventName = this.nzModalData.eventName;
  subscription: Subscription;

  constructor(
    private cs: ComponentService,
    private cdr: ChangeDetectorRef,
    private dialog: NzModalRef,
    private socket: WebsocketService,
    private modal: DialogService,
  ) {
    this.subscription = this.socket
      .getMessage<number>(SOCKET_SCREEN.PROGRESS_WAITING)
      .subscribe({
        next: async ({ payload: percent }) => {
          this.nzPercent = percent;
          this.cdr.markForCheck();
          if (this.nzPercent === 100) {
            await promiseHelper.delay(1000);
            this.onHidden();
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    if (!this.nzModalData.onProcessWait) return;
    firstValueFrom(this.nzModalData.onProcessWait)
      .then(async () => {
        this.nzPercent = 100;
        this.cdr.markForCheck();
        await promiseHelper.delay(1000);
        this.dialog.close();
      })
      .catch(() => {
        this.dialog.close();
      });
    this.cs.loading.setLoading(false);
  }

  onHidden() {
    this.dialog.close();
  }
}
