import { CourseService } from '#services/course.service';
import { BaseComponent } from '#components/core/base/base.component';
import { Video } from '#interfaces/course.interface';
import { CloudinaryService } from '#services/cloudinary.service';
import { ComponentService } from '#services/component.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrl: './course-manage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseManageComponent extends BaseComponent implements OnInit {
  readonly modal = inject(NzModalRef);
  readonly props = inject(NZ_MODAL_DATA);
  @ViewChild('videoFileInput') videoFileInput: ElementRef<HTMLInputElement>;
  constructor(
    private cloudinaryService: CloudinaryService,
    private componentService: ComponentService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private courseService: CourseService,
  ) {
    super(componentService);
  }

  get data() {
    return this.props.data;
  }

  videos: Video[] = [];
  currentVideo: Video = { title: '', url: '', isPreview: false, index: 0 };
  selectedFile: File | null = null;
  isUploading = false;
  editMode = false; // Thêm flag editMode để xác định trạng thái chỉnh sửa

  ngOnInit(): void {
    this.videos = [
      ...Object.keys(this.data.videos).map((key) => {
        return { ...this.data.videos[key], id: key };
      }),
    ];
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  // Thêm video
  async addVideo() {
    if (!this.selectedFile) {
      alert('Vui lòng chọn file video');
      return;
    }

    this.isUploading = true;

    try {
      const videoUrl = await this.cloudinaryService.uploadVideo(this.selectedFile);
      this.currentVideo.url = videoUrl;
      this.currentVideo.index = this.videos.length > 0 ? this.videos[this.videos.length - 1].index + 1 : 0;

      await this.courseService.addVideoToCourse(this.data.id, this.currentVideo);
      this.videos.push({ ...this.currentVideo });

      this.resetForm();
      alert('Thêm video thành công!');
      this.cdr.detectChanges();
    } catch (error) {
      alert('Upload video thất bại');
    } finally {
      this.isUploading = false;
    }
  }

  // Hàm xử lý chỉnh sửa video
  editVideo(index: number) {
    this.componentService.toast.error('developing');
    // this.currentVideo = { ...this.videos[index] };
    // this.editMode = true;
  }

  // Hàm xử lý submit chỉnh sửa video
  async editVideoSubmit() {
    this.isUploading = true;
    try {
      if (this.selectedFile) {
        const videoUrl = await this.cloudinaryService.uploadVideo(this.selectedFile);
        this.currentVideo.url = videoUrl; // Cập nhật URL nếu có thay đổi file
      }
      const { id, ...updateData } = this.currentVideo;
      if (this.currentVideo.id) {
        await this.courseService.updateVideoInCourse(this.data.id, this.currentVideo.id, updateData);
        const index = this.videos.findIndex((v) => v.id === this.currentVideo.id);
        this.videos[index] = this.currentVideo;
        this.resetForm();
        alert('Cập nhật video thành công!');
      }
    } catch (error) {
      alert('Cập nhật video thất bại');
    } finally {
      this.isUploading = false;
    }
  }

  // Hàm reset form
  private resetForm() {
    this.currentVideo = { title: '', url: '', isPreview: false, index: 0 };
    this.selectedFile = null; // Đặt lại giá trị của selectedFile
    if (this.videoFileInput) {
      this.videoFileInput.nativeElement.value = ''; // Reset giá trị của input file
    }
    this.editMode = false;
    this.cdr.detectChanges();
  }
  openVideoModal(url: string) {
    this.modalService.create({
      nzTitle: 'Video Preview',
      nzContent: `
        <div style='position: relative;  height: 0; overflow: hidden; max-height: 600px;'>
          <video style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" controls>
            <source src="${url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        `,
      nzWidth: '80%',
      nzStyle: { height: 'auto' },
    });
  }
  deleteVideo(index: number) {
    if (confirm('Bạn có chắc chắn muốn xóa video này?')) {
      if (this.videos[index].id) {
        this.courseService.deleteVideoFromCourse(this.data.id, this.videos[index].id);
        this.videos.splice(index, 1);
      }
    }
  }
}
