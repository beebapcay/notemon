import { Pipe, PipeTransform } from '@angular/core';
import { AssetsSrcConstant } from '../common/assets-src.constant';
import { NotemonTypeEnum } from '../enum/notemon-type.enum';

@Pipe({
  name: 'notemonCardImg'
})

export class NotemonCardImgPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case NotemonTypeEnum.NOTE:
        return AssetsSrcConstant.NOTE;
      case NotemonTypeEnum.DIRECTORY:
        return AssetsSrcConstant.DIRECTORY;
      default:
        return AssetsSrcConstant.LOGO;
    }
  }
}
