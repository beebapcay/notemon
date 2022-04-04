import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MaterialModule} from '../material.module';

import {TopNavbarComponent} from "./top-navbar/top-navbar.component";
import {FeaturePageComponent} from "./feature-page/feature-page.component";
import {ThemeToggleButtonComponent} from './theme-toggle-button/theme-toggle-button.component';
import {BottomNavbarComponent} from './bottom-navbar/bottom-navbar.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FontAwesomeModule, RouterModule],
  declarations: [TopNavbarComponent, FeaturePageComponent, ThemeToggleButtonComponent, BottomNavbarComponent],
  exports: [CommonModule, TopNavbarComponent, FeaturePageComponent, BottomNavbarComponent],
})
export class ComponentModule {
}
