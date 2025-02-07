import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';
import { Observable, map } from 'rxjs';
import { FileType } from '#utils/const';
import { HttpResponse } from '@angular/common/http';
import { onDownload } from '#utils/helpers';
import { IFile, IResponse } from '#interfaces/index';

@Injectable()
export class FileRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  downloadTemplate(fileType: FileType): Observable<HttpResponse<Blob>> {
    return this.httpClient.exportRecord(`/files/export-template/${fileType}`).pipe(
      map((e) => {
        onDownload(e);
        return e;
      }),
    );
  }

  upload(files: Blob[]): Observable<IResponse<IFile[]>> {
    const form = new FormData();
    files.forEach((file) => {
      form.append('files', file);
    });
    return this.httpClient.post('/files/upload', form, { multipart: true });
  }

  downloadFile(id: string): Observable<HttpResponse<Blob>> {
    return this.httpClient.exportRecord(`/files/download/${id}`).pipe(
      map((e) => {
        onDownload(e);
        return e;
      }),
    );
  }
}
