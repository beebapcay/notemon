import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComponentModule } from './component/component.module';
import { DirectiveModule } from './directive/directive.module';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { MaterialModule } from './material.module';
import { PipeModule } from './pipe/pipe.module';
import { ServiceModule } from './service/service.module';

import { TranslateLoaderUtil } from "./utils/translate-loader.util";
import { ViewResponsiveModule } from './view-responsive.module';


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
    AppRoutingModule,
    ViewResponsiveModule,
    CKEditorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (TranslateLoaderUtil.createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [{
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('241107669663-g65vc47l5g1ff2f9p2001vhpo87l4npt.apps.googleusercontent.com')
        }],
        onError: (err) => {
          console.log(err);
        }
      } as SocialAuthServiceConfig
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
