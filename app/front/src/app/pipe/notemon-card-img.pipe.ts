import {Pipe, PipeTransform} from '@angular/core';
import {NotemonCardTypeEnum} from '../enum/notemon-card-type.enum';
import {AssetsSrcConstant} from '../common/assets-src.constant';

@Pipe({
  name: 'notemonCardImg'
})

export class NotemonCardImgPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case NotemonCardTypeEnum.DOCUMENT:
        return AssetsSrcConstant.DOCUMENT;
      case NotemonCardTypeEnum.DIRECTORY:
        return AssetsSrcConstant.DIRECTORY;
      default:
        return AssetsSrcConstant.LOGO;
    }
  }
}
