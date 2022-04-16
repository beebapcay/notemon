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
import {AuthPageComponent} from './auth-page/auth-page.component';
import {LoginFormComponent} from './auth-page/login-form/login-form.component';
import {SignupFormComponent} from './auth-page/signup-form/signup-form.component';
import {AuthInputComponent} from './auth-page/auth-input/auth-input.component';
import {PipeModule} from '../pipe/pipe.module';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {HashtagComponent} from './hashtag/hashtag.component';
import {DirectoryMainComponent} from './directory/directory-main/directory-main.component';
import {DirectoryVariantComponent} from './directory/directory-variant/directory-variant.component';
import {DocumentMainComponent} from './document/document-main/document-main.component';
import {DocumentVariantComponent} from './document/document-variant/document-variant.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FontAwesomeModule, RouterModule, CKEditorModule, PipeModule],
  declarations: [
    TopNavbarComponent,
    FeaturePageComponent,
    ThemeToggleButtonComponent,
    BottomNavbarComponent,
    ErrorPageComponent,
    NotemonEditorComponent,
    NotePageComponent,
    AuthPageComponent,
    LoginFormComponent,
    SignupFormComponent,
    AuthInputComponent,
    DashboardPageComponent,
    HashtagComponent,
    DirectoryMainComponent,
    DirectoryVariantComponent,
    DocumentMainComponent,
    DocumentVariantComponent
  ],
  exports: [CommonModule, TopNavbarComponent, FeaturePageComponent, BottomNavbarComponent, ErrorPageComponent],
})
export class ComponentModule {
}
