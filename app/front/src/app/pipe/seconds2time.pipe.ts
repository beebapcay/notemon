import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'seconds2Time'
})
export class Seconds2timePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const seconds = value ?? 0;
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds - h * 3600) / 60);
    let s = seconds - h * 3600 - m * 60;

    console.log(h, m, s);

    return `${this.format(h, 'hour')} ${this.format(m, 'minute')} ${this.format(s, 'second')}`;
  }

  format(value: number, type: string): string {
    return value.toString().padStart(1, '0') + ' ' + this.plural(value, type);
  }

  plural(value: number, type: string): string {
    return value < 2 ? type : type + 's';
  }
}

