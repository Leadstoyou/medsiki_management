import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { Observable } from 'rxjs';
import { IResponse } from '#interfaces/index';
import { IAccount } from '#interfaces/account.interface';

@Injectable()
export class UserRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }
  getMe(): Observable<IResponse<IAccount>> {
    return this.httpClient.get('/users/get-me');
  }
  updateUser(id: string,body: IAccount): Observable<IResponse<IAccount>> {
    return this.httpClient.patch(`/users/update/${id}`, body);
  }
}
