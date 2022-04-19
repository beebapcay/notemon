import {Pipe, PipeTransform} from '@angular/core';
import {NotemonTypeEnum} from '../enum/notemon-type.enum';
import {AssetsSrcConstant} from '../common/assets-src.constant';

@Pipe({
  name: 'notemonCardImg'
})

export class NotemonCardImgPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case NotemonTypeEnum.DOCUMENT:
        return AssetsSrcConstant.DOCUMENT;
      case NotemonTypeEnum.DIRECTORY:
        return AssetsSrcConstant.DIRECTORY;
      default:
        return AssetsSrcConstant.LOGO;
    }
  }
}
