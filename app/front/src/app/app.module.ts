import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {MaterialModule} from './material.module';
import {ComponentModule} from './component/component.module';
import {ServiceModule} from './service/service.module';
import {PipeModule} from './pipe/pipe.module';
import {DirectiveModule} from './directive/directive.module';

import {AppComponent} from './app.component';

import {TranslateLoaderUtil} from "./utils/translate-loader.util";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ComponentModule,
    ServiceModule,
    PipeModule,
    DirectiveModule,
    RouterModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (TranslateLoaderUtil.createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
