import {Component, OnInit} from '@angular/core';
import {AssetsSrcConstant} from '../../common/assets-src.constant';
import {AppRouteConstant} from '../../common/app-route.constant';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionAwareAbstractComponent} from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  readonly AppRouteConstant = AppRouteConstant;
  readonly AssetsSrcConstant = AssetsSrcConstant;

  page: string = AppRouteConstant.LOGIN;
  bgImgSrc: string = AssetsSrcConstant.LOGIN_BG_IMG;

  constructor(private route: ActivatedRoute) {
    super();

    this.registerSubscription(
      this.route.data.subscribe(data => {
        this.page = data['page'];
        this.bgImgSrc = data['page'] === AppRouteConstant.LOGIN
          ? AssetsSrcConstant.LOGIN_BG_IMG
          : AssetsSrcConstant.SIGNUP_BG_IMG;
      })
    )
  }

  ngOnInit(): void {
  }

}
