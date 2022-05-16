import {Pipe, PipeTransform} from '@angular/core';
import {AppRouteConstant} from '../common/app-route.constant';
import {AssetsSrcConstant} from '../common/assets-src.constant';

@Pipe({
  name: 'authBgImg'
})
export class AuthBgImgPipe implements PipeTransform {
  transform(page: string, ...args: any[]): any {
    switch (page) {
      case AppRouteConstant.LOGIN:
        return AssetsSrcConstant.LOGIN_BG_IMG;
      case AppRouteConstant.SIGNUP:
        return AssetsSrcConstant.SIGNUP_BG_IMG;
    }
  }
}
