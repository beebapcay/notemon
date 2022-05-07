import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {AppRouteConstant} from './common/app-route.constant';
import {AuthPageComponent} from './component/auth-page/auth-page.component';
import {FeaturePageComponent} from './component/feature-page/feature-page.component';
import {ErrorPageComponent} from './component/error-page/error-page.component';
import {PageNotFoundErrorModel} from './model/error.model';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: AppRouteConstant.LOGIN, component: AuthPageComponent},
      {path: AppRouteConstant.SIGNUP, component: AuthPageComponent},
      {path: AppRouteConstant.FEATURE, component: FeaturePageComponent},
      {path: AppRouteConstant.OTHER, component: ErrorPageComponent, data: PageNotFoundErrorModel.create()}
    ])
  ],
  exports: [CommonModule, RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {
}