/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  getData(path: string): Observable<any[]> {
    return this.db.list(path).snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          const data = c.payload.val() as any; // Chuyển đổi payload.val() thành kiểu dữ liệu MyData
          return {
            id: c.payload.key, // Lấy `id` từ key của Firebase
            ...data, // Gộp dữ liệu vào
          };
        })
      )
    );
  }
  addData(path: string, data: any): Promise<void> {
    const id = this.db.createPushId();
    return this.db.object(`${path}/${id}`).set(data);
  }

  deleteData(path: string, id: string): Promise<void> {
    return this.db.object(`${path}/${id}`).remove();
  }
  login(email: string, password: string): Observable<any> {
    return this.getData('users').pipe(
      map((users: any[]) => {
        const user = users.find(
          (user: any) => user.email === email && user.password === password && user.role === 'admin',
        );
        if (user) {
          return user;
        }
        throw new Error('Invalid email or password');
      }),
      catchError((err) => {
        return new Observable((observer) => observer.error(err));
      }),
    );
  }
  getTableData(
    tableName: string,
    page: number,
    pageSize: number,
  ): Observable<{ records: any[]; currentPage: number; pageSize: number; totalItems: number }> {
    return this.getData(tableName).pipe(
      map((data: any[]) => {
        console.log('🚀 ~ FirebaseService ~ map ~ data:', data);
        const totalItems = data.length; 
        const startIndex = (page - 1) * pageSize; 
        const endIndex = startIndex + pageSize; 
        const records = data.slice(startIndex, endIndex); 
        return {
          records,
          currentPage: page,
          pageSize,
          totalItems,
        };
      }),
      catchError((err) => {
        return of({
          records: [],
          currentPage: page,
          pageSize,
          totalItems: 0,
        });
      }),
    );
  }
}
