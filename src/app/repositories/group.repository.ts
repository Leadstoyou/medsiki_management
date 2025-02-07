import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { BaseQueryRequest, BaseResponseApi, BaseResponseRecords } from '#interfaces/api.interface';
import { map, Observable } from 'rxjs';
import { IResponse } from '#interfaces/index';
import { IGroup, IMyGroupRes } from '#interfaces/group.interface';
import { ISupervisor } from '#interfaces/supervisor.interface';

@Injectable()
export class GroupRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(data: any) {
    return this.httpClient.post('/group-manager/create', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateManager(groupId: string, data: any) {
    return this.httpClient.put(`/group-manager/update/${groupId}`, data);
  }

  getAll(params: BaseQueryRequest) {
    return this.httpClient.get<BaseResponseRecords<IGroup>>('/group-manager', params).pipe(map((res) => res.data));
  }

  importGroup(files: Blob[]): Observable<IResponse<unknown>> {
    const form = new FormData();
    files.forEach((file) => form.append('file', file));
    return this.httpClient.post('/group-manager/import-group', form, { multipart: true });
  }

  delete(id: string) {
    return this.httpClient.delete(`/group-manager/delete/${id}`);
  }

  getAllGroupSupervisor(params: BaseQueryRequest) {
    return this.httpClient.get<BaseResponseRecords<IGroup>>('/group-supervisor', params).pipe(map((res) => res.data));
  }

  getAllGroupSupervisorInSemester(params: BaseQueryRequest) {
    return this.httpClient
      .get<BaseResponseRecords<IGroup>>('/group-supervisor/in-semester', params)
      .pipe(map((res) => res.data));
  }

  getMyGroupStudent() {
    return this.httpClient.get<IMyGroupRes>('/group/get-my-group');
  }
  getGroupInfo() {
    return this.httpClient.get<IGroup>('/group/get-group-info');
  }

  update(groupId: string, data: { topic: string }) {
    return this.httpClient.patch(`/group/update/${groupId}`, data);
  }

  getOneManager(groupId: string): Observable<BaseResponseApi<IGroup>> {
    return this.httpClient.get(`/group-manager/get-one/${groupId}`);
  }

  getAllSemester() {
    return this.httpClient
      .get<BaseResponseRecords<string>>('/group-supervisor/all-semesters')
      .pipe(map((res) => res.data));
  }
  createGitConfig(body: { apiKey: string; projectUrl: string }) {
    return this.httpClient.post<BaseResponseRecords<boolean>>('/group/git-config', body);
  }
  deleteGitConfig(id: string) {
    return this.httpClient.delete<BaseResponseRecords<boolean>>('/group/git-config/' + id);
  }
  getGitConfig(id: string) {
    return this.httpClient.get('/group-supervisor/git-config/' + id);
  }

  getAllSupervisor(params: BaseQueryRequest) {
    return this.httpClient.get<BaseResponseRecords<ISupervisor>>('/supervisor', params).pipe(map((res) => res.data));
  }

  getOne(id: string) {
    return this.httpClient.get<IGroup>('/group-supervisor/get-one/' + id);
  }

  changeGroupStatus(id: string) {
    return this.httpClient.patch('/group-supervisor/change-status/' + id);
  }

  getGroupMember(id: string) {
    return this.httpClient.get<IMyGroupRes>('/group/get-group-member/' + id);
  }
}
