import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudName = 'dotknkcep'; 
  private uploadPreset = 'Medsiki';

  constructor() {}

  uploadVideo(file: File): Promise<string> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/video/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => data.secure_url) // Lấy link video
      .catch((error) => {
        console.error('Upload failed:', error);
        throw error;
      });
  }
}
