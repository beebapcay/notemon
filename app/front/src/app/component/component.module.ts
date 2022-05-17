import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MaterialModule} from '../material.module';
import {PipeModule} from '../pipe/pipe.module';
import {ServiceModule} from '../service/service.module';
import {AuthInputComponent} from './auth-page/auth-input/auth-input.component';
import {AuthPageComponent} from './auth-page/auth-page.component';
import {LoginFormComponent} from './auth-page/login-form/login-form.component';
import {SignupFormComponent} from './auth-page/signup-form/signup-form.component';
import {BottomNavbarComponent} from './bottom-navbar/bottom-navbar.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {FeaturePageComponent} from './feature-page/feature-page.component';
import {FormFieldComponent} from './form-field/form-field.component';
import {HashtagComponent} from './hashtag/hashtag.component';
import {HomePageComponent} from './home-page/home-page.component';
import {NewNotemonButtonComponent} from './new-notemon-button/new-notemon-button.component';
import {NotePageComponent} from './note-page/note-page.component';
import {CardActionBarComponent} from './notemon-card/card-action-bar/card-action-bar.component';
import {DirectoryCardComponent} from './notemon-card/directory-card/directory-card.component';
import {NoteCardComponent} from './notemon-card/note-card/note-card.component';
import {NotemonCardEmptyComponent} from './notemon-card/notemon-card-empty/notemon-card-empty.component';
import {NotemonCardVariantComponent} from './notemon-card/notemon-card-variant/notemon-card-variant.component';
import {NotemonEditorComponent} from './notemon-editor/notemon-editor.component';
import {SnackbarComponent} from './snackbar/snackbar.component';
import {ThemeToggleButtonComponent} from './theme-toggle-button/theme-toggle-button.component';
import {TopNavbarEditorComponent} from './top-navbar/top-navbar-editor/top-navbar-editor.component';

import {TopNavbarMainComponent} from './top-navbar/top-navbar-main/top-navbar-main.component';
import {ManageDashboardBaseComponent} from './manage-dashboard-base/manage-dashboard-base.component';
import {LoadingProgressBarComponent} from './loading/loading-progress-bar/loading-progress-bar.component';
import {LoadingProgressSpinnerComponent} from './loading/loading-progress-spinner/loading-progress-spinner.component';
import {SharePageComponent} from './share-page/share-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CKEditorModule,
    PipeModule,
    ServiceModule
  ],
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
    NoteCardComponent,
    NotemonCardVariantComponent,
    NewNotemonButtonComponent,
    NotemonCardEmptyComponent,
    TopNavbarEditorComponent,
    SnackbarComponent,
    FormFieldComponent,
    HomePageComponent,
    ManageDashboardBaseComponent,
    LoadingProgressBarComponent,
    LoadingProgressSpinnerComponent,
    SharePageComponent,
  ],
  exports: [
    CommonModule,
    TopNavbarMainComponent,
    FeaturePageComponent,
    BottomNavbarComponent,
    ErrorPageComponent,
    LoadingProgressBarComponent,
    LoadingProgressSpinnerComponent],
})
export class ComponentModule {
}
