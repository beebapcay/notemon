import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { TranslateService } from "@ngx-translate/core";
import { filter, take } from 'rxjs';

import defaultLanguage from '../assets/i18n/en.json';

import { AppRouteConstant } from './common/app-route.constant';
import { SubscriptionAwareAbstractComponent } from './component/subscription-aware.abstract.component';
import { NotSupportedErrorModel } from './model/error.model';
import { AuthService } from './service/auth.service';
import { PersistenceService } from './service/persistence.service';
import { UserService } from './service/user.service';
import { UrlMatcherUtil } from './utils/url-matcher.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends SubscriptionAwareAbstractComponent implements OnInit {

  readonly AppRouteConstant = AppRouteConstant;
  readonly NotSupportedErrorModel = NotSupportedErrorModel;

  isFull: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private translateService: TranslateService,
              private router: Router,
              private persistenceService: PersistenceService,
              private userService: UserService,
              private authService: AuthService) {
    super();

    this.translateService.setTranslation('en', defaultLanguage);
    translateService.setDefaultLang('en');

    this.registerSubscription(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(event => {
          const url = (event as NavigationEnd).url;
          this.isFull = UrlMatcherUtil.match(url, AppRouteConstant.FULL_PAGE_ROUTE_PATTERN_LIST);
        })
    )

    this.registerSubscription(
      this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    );
  }

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    const userId = this.persistenceService.get('id');
    const jwtToken = this.persistenceService.get('token');

    if (!userId && !jwtToken) {
      this.authService.isLoggedIn.next(false);
    }

    this.registerSubscription(
      this.userService.getUserById(userId)
        .pipe(take(1))
        .subscribe({
            next: user => {
              this.authService.isLoggedIn.next(true);
              this.userService.user.next(user);
            },
            error: () => {
              this.authService.isLoggedIn.next(false);
              this.userService.user.next(null);
            }
          }
        )
    );
  }
}
