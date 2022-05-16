import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hashtag'
})
export class HashtagPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return `#${value.trim().replace(/\s+/g, '')}`;
  }
}
