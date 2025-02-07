/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly path = 'products';

  constructor(private db: AngularFireDatabase) {}

  getProducts(
    page: number,
    pageSize: number,
  ): Observable<{
    records: Product[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
  }> {
    return this.db
      .list<Product>(this.path)
      .snapshotChanges()
      .pipe(
        map((changes: any[]) => {
          const products: Product[] = changes.map(
            (p: any) =>
              ({
                id: p.payload.key,
                ...p.payload.val(),
              }) as Product,
          );

          // Tổng số sản phẩm
          const totalItems = products.length;

          // Tính toán các chỉ số phân trang
          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const records = products.slice(startIndex, endIndex);

          return {
            records, // Danh sách sản phẩm trong trang hiện tại
            currentPage: page,
            pageSize,
            totalItems, // Tổng số sản phẩm
          };
        }),
        catchError(() => {
          return of({
            records: [],
            currentPage: page,
            pageSize,
            totalItems: 0,
          });
        }),
      );
  }

  getProductById(productId: string): Observable<Product> {
    return this.db
      .object<Product>(`${this.path}/${productId}`)
      .valueChanges()
      .pipe(
        map((product: any) => ({ id: productId, ...product }) as Product),
      );
  }

  addProduct(product: Product): Promise<void> {
    const id = this.db.createPushId();
    return this.db.object(`${this.path}/${id}`).set(product);
  }

  updateProduct(productId: string, product: Partial<Product>): Promise<void> {
    return this.db.object(`${this.path}/${productId}`).update(product);
  }

  deleteProduct(productId: string): Promise<void> {
    return this.db.object(`${this.path}/${productId}`).remove();
  }
}

export interface Product {
  id?: string;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  discountPrice?: number;
  options: 'Cá nhân' | 'Hộ gia đình';
}
