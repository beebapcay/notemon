import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppRouteConstant} from './common/app-route.constant';
import {AuthPageComponent} from './component/auth-page/auth-page.component';
import {DashboardPageComponent} from './component/dashboard-page/dashboard-page.component';
import {ErrorPageComponent} from './component/error-page/error-page.component';
import {FeaturePageComponent} from './component/feature-page/feature-page.component';
import {HomePageComponent} from './component/home-page/home-page.component';
import {PageNotFoundErrorModel} from './model/error.model';
import {SharePageComponent} from './component/share-page/share-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: AppRouteConstant.HOME, component: HomePageComponent},
      {path: AppRouteConstant.LOGIN, component: AuthPageComponent},
      {path: AppRouteConstant.SIGNUP, component: AuthPageComponent},
      {path: AppRouteConstant.FEATURE, component: FeaturePageComponent},
      {path: AppRouteConstant.DASHBOARD, component: DashboardPageComponent},
      {path: `${AppRouteConstant.DASHBOARD}/:directoryId`, component: DashboardPageComponent},
      {path: `${AppRouteConstant.SHARE}/:shareCode`, component: SharePageComponent},
      {path: AppRouteConstant.OTHER, component: ErrorPageComponent, data: PageNotFoundErrorModel.create()}
    ])
  ],
  exports: [CommonModule, RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {
}
