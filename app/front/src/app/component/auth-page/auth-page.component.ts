import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import _ from 'lodash';
import {finalize, take} from 'rxjs';
import { AppComponent } from '../../app.component';
import {AppRouteConstant} from '../../common/app-route.constant';
import {AssetsSrcConstant} from '../../common/assets-src.constant';
import {AuthService} from '../../service/auth.service';
import {PersistenceService} from '../../service/persistence.service';
import {SnackbarService} from '../../service/snackbar.service';
import { UserService } from '../../service/user.service';
import {SubscriptionAwareAbstractComponent} from '../subscription-aware.abstract.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {SignupFormComponent} from './signup-form/signup-form.component';
import {LoadingService} from '../../service/loading.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends SubscriptionAwareAbstractComponent implements OnInit, AfterViewInit {
  readonly AppRouteConstant = AppRouteConstant;
  readonly AssetsSrcConstant = AssetsSrcConstant;

  showMessage: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  authForm: FormGroup = new FormGroup({});
  page: string = AppRouteConstant.LOGIN.toLocaleLowerCase();

  @ViewChild(LoginFormComponent) loginForm: LoginFormComponent;
  @ViewChild(SignupFormComponent) signupForm: SignupFormComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private authService: AuthService,
              private snackbarService: SnackbarService,
              private persistenceService: PersistenceService,
              private userService: UserService,
              private loadingService: LoadingService) {
    super();

    this.registerSubscription(
      this.route.url.subscribe(url => {
        this.page = url[0].path.toLocaleLowerCase();
        this.titleService.setTitle(`${AppRouteConstant.APP_NAME} - ${_.startCase(this.page)}`);
      })
    )
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.authForm = this.isLoginPage
      ? this.loginForm.buildForm()
      : this.signupForm.buildForm();
  }

  onEnterKeyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  onAuthSubmit() {
    this.showMessage = true;
    this.authForm.markAllAsTouched();

    if (this.authForm.invalid) {
      this.showErrorMessage('Form is invalid. Please check your input');
      return;
    }

    const data = this.authForm.value;

    if (this.isLoginPage) {
      this.onSubmitLogin(data);
    } else if (this.isSignupPage) {
      this.onSubmitSignup(data);
    } else {
      this.snackbarService.openErrorAnnouncement('Something was wrong. Unknown page');
    }
  }

  onSubmitLogin(data: { email: string, password: string }) {
    this.loadingService.showLoadingBar();
    this.registerSubscription(
      this.authService
        .loginLocal(data.email, data.password)
        .pipe(take(1), finalize(() => this.loadingService.hideLoadingBar()))
        .subscribe({
          next: (authData) => {
            this.persistenceService.write(authData);
            this.authService.isLoggedIn.next(true);
            this.userService.fetchUser();
            this.router.navigate([AppRouteConstant.DASHBOARD]).then();
          },
          error: (error) => {
            this.snackbarService.openRequestErrorAnnouncement(error);
            this.authService.isLoggedIn.next(false);
            this.showErrorMessage(error);
          }
        })
    );
  }

  onSubmitSignup(data: { name: string, email: string, password: string }) {
    this.loadingService.showLoadingBar();
    this.registerSubscription(
      this.authService
        .signup(data.name, data.email, data.password)
        .pipe(take(1), finalize(() => this.loadingService.hideLoadingBar()))
        .subscribe({
          next: (authData) => {
            const signupSuccessMessage = 'You have successfully signed up';
            this.snackbarService.openSaveSuccessAnnouncement(signupSuccessMessage);
            this.showSuccessMessage(signupSuccessMessage);
          },
          error: (error) => {
            this.snackbarService.openRequestErrorAnnouncement(error);
            this.showErrorMessage(error);
          }
        })
    );
  }

  showErrorMessage(error: any) {
    if (this.showMessage) {
      this.successMessage = null;
      this.errorMessage = error?.error?.message ?? error?.message ?? error?.statusText ?? error ?? 'Request error';
    } else {
      this.errorMessage = null;
    }
  }

  showSuccessMessage(message: string) {
    if (this.showMessage) {
      this.errorMessage = null;
      this.successMessage = message;
    } else {
      this.successMessage = null;
    }
  }

  get isLoginPage() {
    return this.page === AppRouteConstant.LOGIN.toLocaleLowerCase();
  }

  get isSignupPage() {
    return this.page === AppRouteConstant.SIGNUP.toLocaleLowerCase();
  }
}
