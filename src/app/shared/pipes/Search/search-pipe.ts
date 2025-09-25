import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../Core/models/product.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(arr: any[], foundWord: string): any {
    return arr.filter((item) =>
      item.title.toLowerCase().includes(foundWord.toLowerCase())
    );
  }
}
