import { CloudinaryService } from '#services/cloudinary.service';
import { BaseComponent } from '#components/core/base/base.component';
import { UserRepository } from '#repositories/user.repository';
import { ComponentService } from '#services/component.service';
import { FirebaseService } from '#services/firebase.service';
import { ProductService } from '#services/product.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent extends BaseComponent implements OnInit {
  productForm: FormGroup;
  readonly modal = inject(NzModalRef);
  readonly props = inject(NZ_MODAL_DATA);
  thumbnailBase64: string | null = null; // Lưu chuỗi Base64 của ảnh
  thumbnailFile: File | null = null; // Lưu file ảnh được chọn

  constructor(
    protected componentService: ComponentService,
    private fb: FormBuilder,
    private userRepository: UserRepository,
    private cdr: ChangeDetectorRef,
    private firebaseService: FirebaseService,
    private cloudinaryService: CloudinaryService,
    private productService: ProductService,
  ) {
    super(componentService);
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      individualPrice: [0, [Validators.required, Validators.min(0)]],
      familyPrice: [0, [Validators.required, Validators.min(0)]],
      individualDiscountPrice: [0, [Validators.min(0)]],
      familyDiscountPrice: [0, [Validators.min(0)]],
    });
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
    if (this.productForm.valid && this.thumbnailBase64) {
      const product = this.productForm.value;

      // Gửi dữ liệu sản phẩm kèm chuỗi Base64 của ảnh
      const productData = { ...product, thumbnail: this.thumbnailBase64 };

      await this.productService.addProduct(productData);

      alert('Sản phẩm được thêm thành công!');
      this.productForm.reset(); // Reset form
      this.thumbnailBase64 = null; // Reset Base64
      this.thumbnailFile = null;
      this.modal.close();
    } else if (!this.thumbnailBase64) {
      alert('Vui lòng chọn một ảnh thumbnail!');
    }
  }
}
