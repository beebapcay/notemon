import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MaterialModule} from '../material.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

import {TopNavbarMainComponent} from "./top-navbar/top-navbar-main/top-navbar-main.component";
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
import {CardActionBarComponent} from './notemon-card/card-action-bar/card-action-bar.component';
import {NotemonCardVariantComponent} from './notemon-card/notemon-card-variant/notemon-card-variant.component';
import {DirectoryCardComponent} from './notemon-card/directory-card/directory-card.component';
import {DocumentCardComponent} from './notemon-card/document-card/document-card.component';
import {NewNotemonButtonComponent} from './new-notemon-button/new-notemon-button.component';
import {NotemonCardEmptyComponent} from './notemon-card/notemon-card-empty/notemon-card-empty.component';
import {TopNavbarEditorComponent} from './top-navbar/top-navbar-editor/top-navbar-editor.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FontAwesomeModule, RouterModule, CKEditorModule, PipeModule],
  declarations: [
    TopNavbarMainComponent,
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
    CardActionBarComponent,
    DirectoryCardComponent,
    DocumentCardComponent,
    NotemonCardVariantComponent,
    NewNotemonButtonComponent,
    NotemonCardEmptyComponent,
    TopNavbarEditorComponent,
  ],
  exports: [CommonModule, TopNavbarMainComponent, FeaturePageComponent, BottomNavbarComponent, ErrorPageComponent],
})
export class ComponentModule {
}
