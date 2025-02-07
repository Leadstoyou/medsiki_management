import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { BaseQueryRequest, BaseResponseRecords } from '#interfaces/api.interface';
import { map } from 'rxjs';
import { IStudent } from '#interfaces/student.interface';

@Injectable()
export class StudentRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  getAllByGroup(params: BaseQueryRequest = {}, groupId: string) {
    return this.httpClient
      .get<BaseResponseRecords<IStudent>>(`/student/get-all/${groupId}`, params)
      .pipe(map((res) => res.data));
  }

  getAllMyGroup(params: BaseQueryRequest) {
    return this.httpClient
      .get<BaseResponseRecords<IStudent>>('/student/get-all-my-group', params)
      .pipe(map((res) => res.data));
  }

  changeRole(userId: string) {
    return this.httpClient.post(`/student/change-role/${userId}`);
  }

  getAll(params: BaseQueryRequest = {}) {
    return this.httpClient.get<BaseResponseRecords<IStudent>>('/student/get-all', params).pipe(map((res) => res.data));
  }

  warning(studentId: string, reason: string) {
    return this.httpClient.post(`/student/warning/${studentId}`, { reason });
  }

  activated(studentId: string) {
    return this.httpClient.post(`/student/activated/${studentId}`);
  }
}
