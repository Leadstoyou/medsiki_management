import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { BaseResponseApi } from '#interfaces/api.interface';
import { IGrade } from '#interfaces/grade.interface';

@Injectable()
export class GradeRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }
  getByStudentId(studentId: string, reportId: string) {
    return this.httpClient.get(`/grade/${studentId}/${reportId}`);
  }

  getByReportId(reportId: string) {
    return this.httpClient.get<BaseResponseApi<IGrade[]>>(`/grade/report/${reportId}`);
  }
  getFullGradeByReportId(reportId: string) {
    return this.httpClient.get<BaseResponseApi<IGrade[]>>(`/grade/full/report/${reportId}`);
  }
  getFullGradeByStudent() {
    return this.httpClient.get<BaseResponseApi<IGrade[]>>('/grade/full/student');
  }
  getFullGradeByGroup(groupId : string) {
    return this.httpClient.get<IGrade[]>(`/grade/full/group/${groupId}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createGrade(body: any) {
    return this.httpClient.post('/grade', body);
  }
  export(groupId: string) {
    return this.httpClient.get<IGrade[]>('/grade/export/' + groupId);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateGradeComment(gradeId: string, body: any) {
    return this.httpClient.patch(`/grade/comment/${gradeId}`, body);
  }
}
