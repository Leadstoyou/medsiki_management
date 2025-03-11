import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

export interface Payment {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address: any;
  phone: string;
  title: string;
  orderAt: string;
  product: {
    id: string;
    title: string;
    quantity: number;
    totalPrice: number;
    totalProductPrice: number;
  };
  discountVoucher: number;
  itemDiscount: number;
  status: string;
  user: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly paymentsPath = 'carts';

  constructor(private db: AngularFireDatabase) {}

  getAllPayments(): Observable<Payment[]> {
    return this.db
      .list<Payment>(this.paymentsPath)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((change) => ({
            id: change.payload.key ?? '',
            ...(change.payload.val() as Payment),
          })),
        ),
      );
  }

  //   // 📌 2️⃣ Lấy đơn hàng theo ID người dùng
  //   getPaymentsByUserId(userId: string): Observable<Payment[]> {
  //     return this.db.list<Payment>(this.paymentsPath, (ref) =>
  //       ref.orderByChild('user').equalTo(userId)
  //     ).snapshotChanges().pipe(
  //       map((changes) =>
  //         changes.map((change) => ({
  //           id: change.payload.key,
  //           ...change.payload.val() as Payment
  //         }))
  //       )
  //     );
  //   }

  //   // 📌 3️⃣ Tạo đơn hàng mới
  //   createPayment(payment: Payment): void {
  //     this.db.list(this.paymentsPath).push(payment);
  //   }

  //   // 📌 4️⃣ Cập nhật trạng thái đơn hàng
  updatePaymentStatus(orderId: string, status: string): void {
    this.db.object(`${this.paymentsPath}/${orderId}`).update({ status });
  }

  //   // 📌 5️⃣ Xóa đơn hàng
  //   deletePayment(orderId: string): void {
  //     this.db.object(`${this.paymentsPath}/${orderId}`).remove();
  //   }
}
