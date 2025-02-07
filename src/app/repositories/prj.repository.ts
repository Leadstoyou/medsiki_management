import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { BaseQueryRequest, BaseResponseRecords } from '#interfaces/api.interface';
import { map, Observable } from 'rxjs';
import { ICreateSprint, ISprint, ITask } from '#interfaces/prj.interface';
import { TASK_STATUS } from '#utils/const';
import { IResponse } from '#interfaces/index';

@Injectable()
export class ProjectTrackingRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  getAllSprint(params: BaseQueryRequest) {
    return this.httpClient
      .get<BaseResponseRecords<ISprint>>('/prj/get-all-sprint', params)
      .pipe(map((res) => res.data));
  }

  createSprint(data: ICreateSprint, groupId: string) {
    return this.httpClient.post<ISprint>(`/prj/create-sprint/${groupId}`, data);
  }

  updateSprint(sprintId: string, data: ICreateSprint) {
    return this.httpClient.patch<ISprint>(`/prj/update-sprint/${sprintId}`, data);
  }

  changeTaskStatus(taskId: string, status: TASK_STATUS) {
    return this.httpClient.put<ISprint>(`/prj/change-task-status/${taskId}`, { status });
  }

  getTaskDetail(taskId: string): Observable<IResponse<ITask>> {
    return this.httpClient.get<ITask>(`/prj/get-task/${taskId}`);
  }

  updateTask(taskId: string, data: Partial<ITask>) {
    return this.httpClient.patch<ITask>(`/prj/update-task/${taskId}`, data);
  }

  getSprintById(sprintId: string) {
    return this.httpClient.get<ISprint>(`/prj/get-sprint/${sprintId}`);
  }
}
