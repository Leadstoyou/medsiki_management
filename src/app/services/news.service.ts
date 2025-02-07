/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly path = 'news';

  constructor(private db: AngularFireDatabase) {}

  getNews(
    page: number,
    pageSize: number,
  ): Observable<{
    records: News[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
  }> {
    return this.db
      .list<News>(this.path)
      .snapshotChanges()
      .pipe(
        map((changes: any[]) => {
          const newsList: News[] = changes.map(
            (n: any) =>
              ({
                id: n.payload.key,
                ...n.payload.val(),
              }) as News,
          );

          // Tổng số bài viết
          const totalItems = newsList.length;

          // Tính toán các chỉ số phân trang
          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const records = newsList.slice(startIndex, endIndex);

          return {
            records, // Danh sách bài viết trong trang hiện tại
            currentPage: page,
            pageSize,
            totalItems, // Tổng số bài viết
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

  getNewsById(newsId: string): Observable<News> {
    return this.db
      .object<News>(`${this.path}/${newsId}`)
      .valueChanges()
      .pipe(
        map((news: any) => ({ id: newsId, ...news }) as News),
      );
  }

  addNews(news: News): Promise<void> {
    const id = this.db.createPushId();
    return this.db.object(`${this.path}/${id}`).set(news);
  }

  updateNews(newsId: string, news: Partial<News>): Promise<void> {
    return this.db.object(`${this.path}/${newsId}`).update(news);
  }

  deleteNews(newsId: string): Observable<void> {
    const deleteOperation = this.db.object(`${this.path}/${newsId}`).remove();
    return from(deleteOperation); // Chuyển đổi Promise thành Observable
  }
}

export interface News {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  redirectLink: string;
}
