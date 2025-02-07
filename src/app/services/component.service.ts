import { DialogService } from './dialog.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { LoadingService } from './loading.service';
import { TranslateService } from './translate.service';
import { ToastService } from './toast.service';
import { WebsocketService } from './socket-gateway.service';
import { Subject, debounceTime } from 'rxjs';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  title = '';
  constructor(
    public router: Router,
    public localStorage: StorageService,
    public dialog: DialogService,
    public toast: ToastService,
    public location: Location,
    public loading: LoadingService,
    public translate: TranslateService,
    public socket: WebsocketService,
    public userProfileService: UserProfileService,
  ) {}

  handleSearchWithDebounce(searchQuery$: Subject<string>, debounceTimeValue: number, onSearch: () => void) {
    searchQuery$.pipe(debounceTime(debounceTimeValue)).subscribe(() => {
      onSearch();
    });
  }
}
