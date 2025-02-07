import { CourseService } from '#services/course.service';
import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseComponent extends BaseComponent implements OnInit {
  courseForm!: FormGroup;
  readonly modal = inject(NzModalRef);
  readonly props = inject(NZ_MODAL_DATA);
  // Options for course type
  courseTypes = [
    { label: 'Thường Gặp', value: 0 },
    { label: 'Bệnh nền', value: 1 },
    { label: 'Phân Biệt', value: 2 },
    { label: 'Bệnh Nhi', value: 3 },
  ];

  // Thumbnail Base64 and Preview
  thumbnailPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService,
    private courseService: CourseService,
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      discountPrice: [null],
      star: [null, [Validators.min(1), Validators.max(5)]],
      type: [null, Validators.required],
      thumbnail: [null, Validators.required], // Add thumbnail control
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.componentService.toast.error('You can only upload JPG/PNG file!');
      return false;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.componentService.toast.error('Image must smaller than 2MB!');
      return false;
    }
    return true;
  };

  handleThumbnailChange(info: NzUploadChangeParam): void {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result as string;
        this.courseForm.get('thumbnail')?.setValue(this.thumbnailPreview); // Save Base64 to form
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log('🚀 Submitting Course Data:', this.courseForm.value);
      this.courseService
        .addCourse(this.courseForm.value)
        .then(() => {
          this.modal.close();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
}
