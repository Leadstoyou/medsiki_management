/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseDataSource } from '#components/core/base-data-resource/base-data-resource.component';
import { BaseComponent } from '#components/core/base/base.component';
import { INotificationResponse } from '#interfaces/notification.interface';
import { NotificationRepository } from '#repositories/notification.repository';
import { ComponentService } from '#services/component.service';
import { NOTIFY_ACTION, SOCKET_SCREEN } from '#utils/const';
import { generateNotificationMessage } from '#utils/helpers';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent extends BaseComponent implements OnInit {
  readonly ds = new MyDataSource(this.http);
  readonly trackById = (_: number, item: INotificationResponse) => item._id;

  isDrawerVisible = false;
  unreadCount = 0;
  showBackToTop = false;
  newNotificationsCount = 0;
  live = true;

  #scrollPosition = 0;
  #viewportRef!: CdkVirtualScrollViewport;
  NOTIFY_ACTION = NOTIFY_ACTION;

  @ViewChild(CdkVirtualScrollViewport)
  set viewport(viewport: CdkVirtualScrollViewport) {
    if (!viewport) return;

    this.#viewportRef = viewport;
    this.#setupScrollListener();
  }

  constructor(
    protected readonly componentService: ComponentService,
    private readonly cdr: ChangeDetectorRef,
    private readonly http: NotificationRepository,
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.subscribeUntilDestroy(this.ds.dataStream$, () => {
      this.#updateUnreadCount();
      this.cdr.markForCheck();
    });

    this.#updateUnreadCount();

    this.subscribeUntilDestroy(this.socket.getMessage(SOCKET_SCREEN.NOTIFICATION), ({ payload }) => {
      this.ds.addNotification(payload as INotificationResponse);
      this.#updateUnreadCount();

      if (this.#scrollPosition > 100) {
        this.newNotificationsCount++;
        this.cdr.markForCheck();
      }
    });
  }

  genMessage(template: string, data: any): string {
    const title = data?.metadata?.title ?? '';
    return generateNotificationMessage(template, {
      actorName: data?.actor?.name ?? 'System',
      sprintName: title,
      taskName: title,
      groupCode: data?.group?.groupCode ?? '',
      requestType: data?.metadata?.type ?? '',
      requestAction: data?.metadata?.action ?? '',
      reportName: title,
      newTopic: data?.group?.topic ?? '',
      studentName: data?.metadata?.name ?? data?.metadata?.userId?.name ?? '',
    });
  }

  #setupScrollListener(): void {
    this.subscribeUntilDestroy(this.#viewportRef.elementScrolled(), () => {
      this.#scrollPosition = this.#viewportRef.measureScrollOffset('top');
      this.showBackToTop = this.#scrollPosition > 100;
      this.cdr.markForCheck();
    });
  }

  #resetNewNotificationsCount(): void {
    this.newNotificationsCount = 0;
    this.cdr.markForCheck();
  }

  scrollToTop(): void {
    this.#viewportRef.elementRef.nativeElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.#resetNewNotificationsCount();
  }

  formatUserName(name: string): string {
    return name === this.userInfor.name ? this.translate.translate('notification.you') : name;
  }

  toggleNotificationList(): void {
    this.isDrawerVisible = !this.isDrawerVisible;
  }

  closeNotificationList(): void {
    this.isDrawerVisible = false;
    this.#markAllAsRead();
    this.#resetNewNotificationsCount();
  }

  #markAllAsRead(): void {
    const unreadNotifications = this.ds.cachedNotifications?.filter((n) => !n.read).map((n) => n._id);

    if (!unreadNotifications?.length) return;

    this.http.markRead(unreadNotifications).subscribe(() => {
      this.ds.cachedNotifications.forEach((n) => (n.read = true));
      this.#updateUnreadCount();
      this.newNotificationsCount = 0;
      this.cdr.markForCheck();
    });
  }

  #updateUnreadCount(): void {
    this.unreadCount = this.ds.cachedNotifications?.filter((n) => !n.read).length ?? 0;
    this.cdr.markForCheck();
  }

  generateColor(email: string): string {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.abs(hash % 360);
    return `hsl(${color}, 70%, 60%)`;
  }
}

export class MyDataSource extends BaseDataSource<INotificationResponse> {
  #serverResponseData: INotificationResponse[] = [];

  get cachedNotifications(): INotificationResponse[] {
    return this.cachedData;
  }

  get dataStream$(): Observable<INotificationResponse[]> {
    return this.dataStream;
  }

  constructor(private readonly http: NotificationRepository) {
    super();
  }

  protected fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) return;

    this.fetchedPages.add(page);
    this.#serverResponseData = [];

    this.http.getAll({ page, size: this.pageSize }).subscribe((data) => {
      this.#serverResponseData = data.records;
      this.cachedData = [...this.cachedData];
      this.cachedData.splice(page * this.pageSize, this.pageSize, ...this.#serverResponseData);
      this.dataStream.next(this.cachedData);
    });
  }

  addNotification(notification: INotificationResponse): void {
    this.cachedData.unshift(notification);
    this.dataStream.next(this.cachedData);
  }

  protected isComplete(): boolean {
    return this.#serverResponseData.length === 0;
  }
}
