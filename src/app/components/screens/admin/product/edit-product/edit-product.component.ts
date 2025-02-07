import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ProductService } from '#services/product.service';
import { CloudinaryService } from '#services/cloudinary.service';
import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent extends BaseComponent implements OnInit {
  productForm: FormGroup;
  readonly modal = inject(NzModalRef);
  readonly props = inject(NZ_MODAL_DATA); // Dữ liệu modal sẽ chứa sản phẩm cần chỉnh sửa
  thumbnailBase64: string | null = null; // Lưu chuỗi Base64 của ảnh
  thumbnailFile: File | null = null; // Lưu file ảnh được chọn
  productId: string | null = null; // ID của sản phẩm cần chỉnh sửa

  constructor(
    protected componentService: ComponentService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    private cloudinaryService: CloudinaryService,
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

  ngOnInit(): void {
    const productData = this.props.data; 
    this.productId = productData.id;

    this.productForm.patchValue({
      title: productData.title,
      description: productData.description,
      individualPrice: productData.individualPrice,
      familyPrice: productData.familyPrice,
      individualDiscountPrice: productData.individualDiscountPrice,
      familyDiscountPrice: productData.familyDiscountPrice,
    });

    // Đặt ảnh Base64 nếu có
    this.thumbnailBase64 = productData.thumbnail;
  }

  onThumbnailSelected(event: Event): void {
    event.stopPropagation();
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
    if (this.productForm.valid) {
      const product = this.productForm.value;

      // Cập nhật chuỗi Base64 của ảnh
      const productData = { ...product, thumbnail: this.thumbnailBase64 };

      // Gửi yêu cầu cập nhật sản phẩm
      if (this.productId) {
        await this.productService.updateProduct(this.productId, productData);

        alert('Sản phẩm đã được cập nhật!');
        this.productForm.reset(); // Reset form
        this.thumbnailBase64 = null; // Reset Base64
        this.thumbnailFile = null;
        this.modal.close();
      }
    } else if (!this.thumbnailBase64) {
      alert('Vui lòng chọn một ảnh thumbnail!');
    }
  }
}
