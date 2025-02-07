import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { ISemester } from '#interfaces/semester.interface';
import { BaseQueryRequest, BaseResponseRecords } from '#interfaces/api.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '#interfaces/index';

@Injectable()
export class SemesterRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  create(data: ISemester) {
    return this.httpClient.post('/semesters/create', data);
  }

  getAll(params: BaseQueryRequest) {
    return this.httpClient
      .get<BaseResponseRecords<ISemester>>('/semesters/get-all', params)
      .pipe(map((res) => res.data));
  }

  getOne(id: string): Observable<IResponse<ISemester>> {
    return this.httpClient.get(`/semesters/${id}`);
  }

  update(id: string, data: ISemester) {
    return this.httpClient.put(`/semesters/update/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`/semesters/delete/${id}`);
  }
}
