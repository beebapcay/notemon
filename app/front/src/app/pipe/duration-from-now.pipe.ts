import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'durationFromNow'
})
export class DurationFromNowPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return moment(value).fromNow();
  }

}
