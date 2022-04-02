import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TopNavbarComponent } from './component/top-navbar/top-navbar.component';
import { HomePageComponent } from './component/home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, TopNavbarComponent, HomePageComponent],
  imports: [BrowserModule, NgbModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
