import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreakPointResponsiveConstant} from './common/break-point-responsive.constant';
import {IResponsiveConfig, ResponsiveModule} from 'ngx-responsive';

const config: IResponsiveConfig = {
  breakPoints: {
    xs: {max: BreakPointResponsiveConstant.SM},
    sm: {min: BreakPointResponsiveConstant.SM, max: BreakPointResponsiveConstant.MD},
    md: {min: BreakPointResponsiveConstant.MD, max: BreakPointResponsiveConstant.LG},
    lg: {min: BreakPointResponsiveConstant.LG, max: BreakPointResponsiveConstant.XL},
    xl: {min: BreakPointResponsiveConstant.XL},
  },
  debounceTime: 100,
};

@NgModule({
  declarations: [],
  imports: [CommonModule, ResponsiveModule.forRoot(config)],
  exports: [CommonModule, ResponsiveModule],
})
export class ViewResponsiveModule {
}
