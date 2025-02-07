import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { BaseQueryRequest, BaseResponseApi, BaseResponseRecords } from '#interfaces/api.interface';
import { IRequest } from '#interfaces/prj.interface';
import { map, Observable } from 'rxjs';
import { REQUEST_ACTION, REQUEST_STATUS, REQUEST_TYPE } from '#utils/const';

@Injectable()
export class RequestRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  getAll(params: BaseQueryRequest) {
    return this.httpClient.get<BaseResponseRecords<IRequest>>('/request/get-all', params).pipe(map((res) => res.data));
  }

  changeStatus(id: string, status: REQUEST_STATUS, rejectReason?: string) {
    return this.httpClient.patch(`/request/change-status/${id}`, { status, rejectReason });
  }

  create(data: {
    groupId: string;
    type: REQUEST_TYPE;
    action: REQUEST_ACTION;
    sprint?: string;
    origin?: string;
    newContent?: string;
  }) {
    return this.httpClient.post('/request/create', data);
  }

  getById(id: string): Observable<BaseResponseApi<IRequest>> {
    return this.httpClient.get<IRequest>(`/request/get-by-id/${id}`);
  }
}
