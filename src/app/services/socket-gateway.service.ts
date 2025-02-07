import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseSocketService } from './socket.service';
import { ISocketResponse } from '#interfaces/index';
import { IDummy } from '#interfaces/index';
import { SOCKET_SCREEN, SOCKET_SCREEN_ACTION } from '#utils/const';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: BaseSocketService) {}

  sendMessage(event: SOCKET_SCREEN, action: SOCKET_SCREEN_ACTION, payload?: IDummy) {
    this.socket.emit(event, { action, payload });
  }

  getMessage<T>(event: SOCKET_SCREEN): Observable<ISocketResponse<T>> {
    return this.socket.fromEvent(event).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((response: any) => {
        if (event === SOCKET_SCREEN.PROGRESS_WAITING) {
          const persent = response.payload[this.socket.id];
          return { payload: persent } as ISocketResponse<T>;
        }
        return response as ISocketResponse<T>;
      }),
    );
  }
}
