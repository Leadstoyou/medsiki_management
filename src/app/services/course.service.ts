/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, Video } from '#interfaces/course.interface';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly path = 'courses';

  constructor(private db: AngularFireDatabase) {}

  getCourses(
    page: number,
    pageSize: number,
  ): Observable<{
    records: Course[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
  }> {
    return this.db
      .list<Course>(this.path)
      .snapshotChanges()
      .pipe(
        map((changes: any[]) => {
          const courses: Course[] = changes.map(
            (c: any) =>
              ({
                id: c.payload.key,
                ...c.payload.val(),
              }) as Course,
          );

          // Tổng số khóa học
          const totalItems = courses.length;

          // Tính toán các chỉ số phân trang
          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const records = courses.slice(startIndex, endIndex);

          return {
            records, // Danh sách khóa học trong trang hiện tại
            currentPage: page,
            pageSize,
            totalItems, // Tổng số khóa học
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

  getCourseById(courseId: string): Observable<Course> {
    return this.db
      .object<Course>(`${this.path}/${courseId}`)
      .valueChanges()
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((course: any) => ({ id: courseId, ...course }) as Course),
      );
  }

  addCourse(course: Course): Promise<void> {
    const id = this.db.createPushId();
    return this.db.object(`${this.path}/${id}`).set(course);
  }

  updateCourse(courseId: string, course: Partial<Course>): Promise<void> {
    return this.db.object(`${this.path}/${courseId}`).update(course);
  }

  deleteCourse(courseId: string): Promise<void> {
    return this.db.object(`${this.path}/${courseId}`).remove();
  }

  async addVideoToCourse(courseId: string, video: Video): Promise<void> {
    await this.db
      .list<Video>(`${this.path}/${courseId}/videos`)
      .push(video);
  }
  async updateVideoInCourse(courseId: string, videoIndex: string, updatedVideo: Video): Promise<void> {
    // Cập nhật video tại vị trí videoIndex trong mảng videos của khóa học
    return await this.db
      .object(`${this.path}/${courseId}/videos/${videoIndex}`)
      .update(updatedVideo); // Cập nhật video tại vị trí đó
  }
  deleteVideoFromCourse(courseId: string, videoId: string): Promise<void> {
    return this.db.object(`${this.path}/${courseId}/videos/${videoId}`).remove();
  }
}
