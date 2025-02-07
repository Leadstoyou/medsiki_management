import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class BaseDataSource<T> extends DataSource<T> {
  protected pageSize = 10;
  protected cachedData: T[] = [];
  protected dataStream = new BehaviorSubject<T[]>(this.cachedData);
  protected complete$ = new Subject<void>();
  protected disconnect$ = new Subject<void>();
  protected fetchedPages = new Set<number>();

  constructor() {
    super();
  }
  completed(): Observable<void> {
    return this.complete$.asObservable();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    this.setup(collectionViewer);
    return this.dataStream.asObservable();
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  protected setup(collectionViewer: CollectionViewer): void {
    this.fetchPage(1);

    collectionViewer.viewChange.pipe(takeUntil(this.complete$), takeUntil(this.disconnect$)).subscribe((range) => {
      if (this.cachedData.length >= 50) {
        this.complete$.next();
        this.complete$.complete();
      } else {
        const endPage = this.getPageForIndex(range.end);
        this.fetchPage(endPage + 1);
      }
    });
  }

  protected getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  protected abstract fetchPage(page: number): void;

  protected abstract isComplete(): boolean;
}
