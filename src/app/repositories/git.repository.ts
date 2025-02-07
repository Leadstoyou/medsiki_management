import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';

@Injectable()
export class GitRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }
  getByGroupId(groupId: string) {
    return this.httpClient.get('/git/' + groupId);
  }
}
