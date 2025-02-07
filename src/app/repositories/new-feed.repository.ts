import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { IResponse } from '#interfaces/index';
import { INewFeed } from '#interfaces/new-feed.interface';
import { map, Observable } from 'rxjs';
import { BaseQueryRequest, BaseResponseRecords } from '#interfaces/api.interface';

@Injectable()
export class NewFeedRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  create(data: { title: string; groupId?: string; link: string[] }) {
    return this.httpClient.post('/newsfeed/create', data);
  }

  createSp(data: { title: string; groupId?: string; link: string[] }, groupId: string) {
    return this.httpClient.post(`/newsfeed-sp/create/${groupId}`, data);
  }

  getAll(params: BaseQueryRequest) {
    return this.httpClient
      .get<BaseResponseRecords<INewFeed>>('/newsfeed/get-all', params)
      .pipe(map((res) => res.data));
  }

  getAllSp(params: BaseQueryRequest) {
    return this.httpClient
      .get<BaseResponseRecords<INewFeed>>('/newsfeed-sp/get-all', params)
      .pipe(map((res) => res.data));
  }

  comment(id: string, content: string) {
    return this.httpClient.post(`/newsfeed/comment/${id}`, { content });
  }

  pin(id: string, isPin: boolean) {
    return this.httpClient.post(`/newsfeed/pin/${id}`, { isPin });
  }

  updateComment(id: string, content: string, commentId: string) {
    return this.httpClient.put(`/newsfeed/comment/${id}/${commentId}`, { content });
  }

  deleteComment(id: string, commentId: string) {
    return this.httpClient.delete(`/newsfeed/comment/${id}/${commentId}`);
  }

  update(id: string, data: { title: string; link: string[] }) {
    return this.httpClient.put(`/newsfeed/update/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete(`/newsfeed/delete/${id}`);
  }

  getOne(id: string): Observable<IResponse<INewFeed>> {
    return this.httpClient.get(`/newsfeed/get-one/${id}`);
  }
}
