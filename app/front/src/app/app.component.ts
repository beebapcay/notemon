import {Component, OnDestroy, OnInit} from '@angular/core';

import {TranslateService} from "@ngx-translate/core";

import {AppRouteConstant} from './common/app-route.constant';
import {NotSupportedErrorModel} from './model/error.model';

import defaultLanguage from '../assets/i18n/en.json';
import {NavigationEnd, Router} from '@angular/router';
import {filter, Subscription} from 'rxjs';
import {UrlMatcherUtil} from './utils/url-matcher.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public hideNavBar: boolean = false;

  readonly AppRouteConstant = AppRouteConstant;
  readonly NotSupportedErrorModel = NotSupportedErrorModel;

  private subscription: Subscription[] = [];

  constructor(private translateService: TranslateService, private router: Router) {
    this.translateService.setTranslation('en', defaultLanguage);
    translateService.setDefaultLang('en');

    this.subscription.push(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(event => {
          const url = (event as NavigationEnd).url;
          this.hideNavBar = !UrlMatcherUtil.match(url, AppRouteConstant.FULL_PAGE_ROUTE_PATTERN_LIST);
        })
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
