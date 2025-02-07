import { BaseComponent } from '#components/core/base/base.component';
import { environment } from '#environments/environment';
import { FileData, UrlFile } from '#interfaces/common.interface';
import { ComponentService } from '#services/component.service';
import {
  displayDocx,
  displayPdf,
  downloadAndAddFile,
  downloadFileZip,
  isDOCfile,
  isExcelfile,
  isImage,
  isPDFfile,
} from '#utils/helpers';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-select-file-report',
  templateUrl: './select-file-report.component.html',
  styleUrl: './select-file-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFileReportComponent extends BaseComponent implements OnInit {
  url = environment.socketUrl;
  files: FileData[] = [];
  @Input() initialFiles: File[] = [];
  @Input() initialUrls: UrlFile[] = [];
  @Input() isReadOnly: boolean = false;
  @Input() isDownloadable: boolean = false;
  @Input() isSetDetailFile: boolean = true;
  @Output() uploadSuccess = new EventEmitter<File[]>();
  constructor(
    protected componentService: ComponentService,
    private cdr: ChangeDetectorRef,
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.addInitialFiles();
  }
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  downloadZip() {
    downloadFileZip(this.files, 'SEP490');
  }
  addInitialFiles(): void {
    if (this.initialFiles.length) {
      this.renderFiles(this.initialFiles, this.isSetDetailFile);
      return;
    }

    if (this.initialUrls.length) {
      this.handleUrlsInitiated(this.isSetDetailFile);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    if (input.files.length > 5 || this.files.length + input.files.length > 5) {
      alert('Bạn chỉ có thể tải lên tối đa 5 file.');
      return;
    }
    this.renderFiles(Array.from(input.files));
  }
  renderFiles(files: File[], isSetDefaultFile: boolean = true): void {
    const filePromises = Array.from(files).map((file) => {
      const fileData: FileData = { file, name: file.name };

      if (isImage(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          fileData.docxHtml = '';
          fileData.xlsxHtml = '';
          fileData.pdfUrl = '';
          fileData.preview = reader.result as string;
          this.cdr.detectChanges();
        };
        reader.readAsDataURL(file);
      } else if (isPDFfile(file)) {
        return displayPdf(file).then((url) => {
          fileData.pdfUrl = url;
          return fileData;
        });
      } else if (isDOCfile(file)) {
        return displayDocx(file).then((html) => {
          fileData.docxHtml = html;
          return fileData;
        });
      } else if (isExcelfile(file)) {
        fileData.xlsxHtml = 'assets/images/excel-logo.png';
        return fileData;
      }
      return Promise.resolve(fileData);
    });

    Promise.all(filePromises).then((results) => {
      this.files.push(...results);
      isSetDefaultFile ? this.updateUploadData() : null;
      this.cdr.detectChanges();
    });
  }
  async handleUrlsInitiated(isSetDefaultFile: boolean = true): Promise<void> {
    const arr: File[] = [];
    const urlPromise = this.initialUrls.map(async (data) => {
      return await downloadAndAddFile(data.url, data.name);
    });

    const files = await Promise.all(urlPromise);
    arr.push(...files.filter((file): file is File => file !== undefined));

    this.renderFiles(arr, isSetDefaultFile);
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.updateUploadData();
    this.cdr.detectChanges();
  }
  private updateUploadData() {
    const selectedFiles = this.files.map((fileObj) => fileObj.file);
    this.uploadSuccess.emit(selectedFiles);
  }
}
