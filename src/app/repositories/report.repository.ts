import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { BaseQueryRequest, BaseResponseRecords } from '#interfaces/api.interface';
import { map } from 'rxjs';
import { IReport } from '#interfaces/report.interface';

@Injectable()
export class ReportRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }
  getAll(params: BaseQueryRequest) {
    return this.httpClient.get<BaseResponseRecords<IReport>>('/report/get-all', params).pipe(map((res) => res.data));
  }
  create(data: { group: string; title: string; note?: string; deadline: Date; attachFiles?: File[] }) {
    const formData = new FormData();

    if (data.attachFiles && Array.isArray(data.attachFiles)) {
      data.attachFiles.forEach((fileObj) => {
        formData.append('files', fileObj);
      });
    }

    formData.append('group', data.group);
    formData.append('title', data.title);
    formData.append('note', data.note || '');
    formData.append('deadline', data.deadline.toISOString());

    return this.httpClient.post('/report/create', formData);
  }

  update(id: string, data: { title?: string; note?: string; deadline?: Date; attachFiles?: File[] }) {
    const formData = new FormData();

    if (data.attachFiles && Array.isArray(data.attachFiles)) {
      data.attachFiles.forEach((fileObj) => {
        formData.append('files', fileObj);
      });
    }

    data?.title && formData.append('title', data?.title);
    data?.note !== undefined && formData.append('note', data.note);
    data.deadline && formData.append('deadline', data.deadline.toISOString());
    return this.httpClient.patch(`/report/update/${id}`, formData);
  }
  submit(id: string, files: Blob[]) {
    const form = new FormData();
    files.forEach((file) => {
      form.append('files', file);
    });
    return this.httpClient.patch(`/report/submit/${id}`, form, { multipart: true });
  }
  submitDriver(id: string, body: { driverLink: string }) {
    return this.httpClient.patch(`/report/submit-driver/${id}`, body);
  }
  getLogs(id: string) {
    return this.httpClient.get(`/report/log/${id}`);
  }
  getMessages(id: string) {
    return this.httpClient.get(`/report/message/${id}`);
  }
  createMessage(body: { text: string; reportId: string }) {
    return this.httpClient.post('/report/message', body);
  }
  updateMessage(id: string, body: { text: string }) {
    return this.httpClient.patch('/report/message/' + id, body);
  }
  delete(id: string) {
    return this.httpClient.delete(`/report/delete/${id}`);
  }
  cancel(id: string) {
    return this.httpClient.patch(`/report/cancel/${id}`);
  }
  reOpen(id: string) {
    return this.httpClient.patch(`/report/re-open/${id}`);
  }
  updateExtraDate(id: string, extraDate: Date) {
    return this.httpClient.patch(`/report/extra-date/${id}`, { extraDate: extraDate });
  }
  deleteComment(id: string) {
    return this.httpClient.delete(`/report/message/${id}`);
  }
}
