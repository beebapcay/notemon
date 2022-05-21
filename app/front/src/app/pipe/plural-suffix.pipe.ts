import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralSuffix'
})
export class PluralSuffixPipe implements PipeTransform {

  transform(value: number, type: string, suffix: string, ...args: unknown[]): unknown {
    return value + ' ' + type + (value > 1 ? suffix : '');
  }

}
