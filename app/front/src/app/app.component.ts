import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {NotSupportedErrorModel} from './model/error.model';
import {BreakPointResponsiveConstant} from './common/break-point-responsive.constant';

import defaultLanguage from '../assets/i18n/en.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  readonly NotSupportedErrorModel = NotSupportedErrorModel;
  readonly BreakPointResponsiveConstant = BreakPointResponsiveConstant;

  constructor(private translateService: TranslateService) {
    this.translateService.setTranslation('en', defaultLanguage);
    translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
  }
}
