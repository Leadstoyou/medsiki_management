import { Injectable } from '@angular/core';
import { Repository } from './repository';
import { AppHttpClient } from '#services/app-http-client.service';

@Injectable()
export class GalleryRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }
  createImages(images: Blob[]) {
    const form = new FormData();
    images.forEach((image) => {
      form.append('images', image);
    });
    return this.httpClient.post('/galleries/create', form, { multipart: true });
  }
}
