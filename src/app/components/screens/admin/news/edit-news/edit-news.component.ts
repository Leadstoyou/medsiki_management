import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NewsService } from '#services/news.service'; // Giả sử có service News

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss', '../create-news/create-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditNewsComponent implements OnInit {
  newsForm: FormGroup;
  readonly modal = inject(NzModalRef);
  readonly props = inject(NZ_MODAL_DATA);
  thumbnailBase64: string | null = null; // Lưu chuỗi Base64 của ảnh
  thumbnailFile: File | null = null; // Lưu file ảnh được chọn

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private newsService: NewsService,
  ) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      redirectLink: ['', [Validators.required, Validators.pattern(/^https?:\/\/.*$/)]], // Kiểm tra liên kết hợp lệ
    });
    this.newsForm.patchValue({ ...this.props.data });
    this.thumbnailBase64 = this.props.data.thumbnail;
  }

  ngOnInit(): void {}

  onThumbnailSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Kiểm tra file có phải là ảnh không
      if (file.type.startsWith('image/')) {
        this.thumbnailFile = file;

        // Chuyển ảnh thành Base64
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumbnailBase64 = e.target?.result as string; // Lưu chuỗi Base64
          this.cdr.markForCheck();
        };
        reader.readAsDataURL(file);
      } else {
        alert('Vui lòng chọn một file ảnh!');
        input.value = ''; // Reset input
      }
    }
  }

  async onSubmit() {
    if (this.newsForm.valid) {
      const news = this.newsForm.value;

      // Gửi dữ liệu tin tức kèm chuỗi Base64 của ảnh
      const newsData = { ...news, thumbnail: this.thumbnailBase64 };

      await this.newsService.addNews(newsData); // Gọi service thêm tin tức

      alert('Tin tức được thêm thành công!');
      this.newsForm.reset(); // Reset form
      this.thumbnailBase64 = null; // Reset Base64
      this.thumbnailFile = null;
      this.modal.close();
    } else if (!this.thumbnailBase64) {
      alert('Vui lòng chọn một ảnh thumbnail!');
    }
  }
}
