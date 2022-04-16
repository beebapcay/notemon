import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MaterialModule} from '../material.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

import {TopNavbarComponent} from "./top-navbar/top-navbar.component";
import {FeaturePageComponent} from "./feature-page/feature-page.component";
import {ThemeToggleButtonComponent} from './theme-toggle-button/theme-toggle-button.component';
import {BottomNavbarComponent} from './bottom-navbar/bottom-navbar.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {NotemonEditorComponent} from './notemon-editor/notemon-editor.component';
import {NotePageComponent} from './note-page/note-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthPageComponent} from './auth-page/auth-page.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FontAwesomeModule, RouterModule, CKEditorModule],
  declarations: [TopNavbarComponent, FeaturePageComponent, ThemeToggleButtonComponent, BottomNavbarComponent, ErrorPageComponent, NotemonEditorComponent, NotePageComponent, LoginPageComponent, AuthPageComponent],
  exports: [CommonModule, TopNavbarComponent, FeaturePageComponent, BottomNavbarComponent, ErrorPageComponent],
})
export class ComponentModule {
}
