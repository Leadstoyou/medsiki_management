import { Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { IGroup, IGroupLocal } from '#interfaces/group.interface';
import { LocalStorageKey, STRING } from '#utils/const';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { getCookie } from '#utils/cookie.helper';

@Injectable({
  providedIn: 'root',
})
export class GroupSettingService {
  private isChooseGroup$ = new Subject<void>();

  constructor(private storageService: StorageService) {}

  get isSupervisor() {
    const token = getCookie(STRING.ACCESS_TOKEN)!;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = jwt_decode(token);
    if (!payload?.supervisorId) return false;
    return payload.supervisorId === this.currentGroup.supervisor._id;
  }

  get isCoSupervisor() {
    const token = getCookie(STRING.ACCESS_TOKEN)!;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = jwt_decode(token);
    if (!payload?.supervisorId || !this.currentGroup.coSupervisor) return false;
    return payload.coSupervisorId === this.currentGroup.coSupervisor._id;
  }

  get isChooseGroupObs() {
    return this.isChooseGroup$.asObservable();
  }

  get currentGroup(): IGroupLocal {
    try {
      let data = JSON.parse(this.storageService.get(LocalStorageKey.currentGroup) || '{}');
      if (!Object.keys(data).length) data = JSON.parse(localStorage.get('opxs__current_group') || '{}');
      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return JSON.parse('{}');
    }
  }

  set currentGroup(group: IGroup | null) {
    if (group) {
      this.storageService.set(LocalStorageKey.currentGroup, JSON.stringify(group));
      this.isChooseGroup$.next();
    } else {
      this.storageService.unset(LocalStorageKey.currentGroup);
    }
  }

  onChooseGroup() {
    this.isChooseGroup$.next();
  }
}
