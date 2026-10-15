import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbnFormat',
})
export class IsbnFormatPipe implements PipeTransform {
  transform(isbn: string): string {
    const chiffres = isbn.replace(/[^0-9]/g, '');

    if (chiffres.length === 13) {
      return chiffres.replace(/(\d{3})(\d{1})(\d{2})(\d{6})(\d{1})/, '$1-$2-$3-$4-$5');
    }

    return isbn;
  }
}