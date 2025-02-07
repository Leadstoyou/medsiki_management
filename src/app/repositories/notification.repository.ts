import { BaseQueryRequest, BaseResponseRecords } from '#interfaces/api.interface';
import { AppHttpClient } from '#services/app-http-client.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Repository } from './repository';
import { INotificationResponse } from '#interfaces/notification.interface';

@Injectable()
export class NotificationRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  getAll(params: BaseQueryRequest) {
    return this.httpClient
      .get<BaseResponseRecords<INotificationResponse>>('/notifications/get-all', params)
      .pipe(map((res) => res.data));
  }

  markRead(ids: string[]) {
    return this.httpClient.put('/notifications/mark-read', { ids }).pipe(map((res) => res.data));
  }
}
