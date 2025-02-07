import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(array: any[], field: string, reverse: boolean = false): any[] {
    if (!array || !field) {
      return array;
    }

    const sortedArray = array.sort((a, b) => {
      const aValue = new Date(a[field]).getTime();
      const bValue = new Date(b[field]).getTime();

      return reverse ? bValue - aValue : aValue - bValue;
    });

    return sortedArray;
  }
}
