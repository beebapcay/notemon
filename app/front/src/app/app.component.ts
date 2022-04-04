import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {ErrorCodeEnum} from './enum/error-code.enum';

import defaultLanguage from '../assets/i18n/en.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  readonly ErrorCodeEnum = ErrorCodeEnum;

  constructor(private translateService: TranslateService) {
    this.translateService.setTranslation('en', defaultLanguage);
    translateService.setDefaultLang('en');
  }
}
