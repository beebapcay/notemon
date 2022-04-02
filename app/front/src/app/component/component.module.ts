import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {TopNavbarComponent} from "./top-navbar/top-navbar.component";
import {FeaturePageComponent} from "./feature-page/feature-page.component";
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [TopNavbarComponent, FeaturePageComponent],
  exports: [CommonModule, TopNavbarComponent, FeaturePageComponent],
})
export class ComponentModule {
}
