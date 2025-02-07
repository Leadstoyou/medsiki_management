import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { IResponse } from '#interfaces/index';
import { Observable } from 'rxjs';
import { IRules } from '#interfaces/rules.interface';

@Injectable()
export class RulesRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  create(payload: { percentNotFinish: string; numberSprint: string; numberFlag: string; groupId: string }) {
    return this.httpClient.post('/rules', payload);
  }

  get(groupId: string): Observable<IResponse<IRules>> {
    return this.httpClient.get(`/rules?groupId=${groupId}`);
  }
}
