import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { AppRouteConstant } from '../../common/app-route.constant';
import { AssetsSrcConstant } from '../../common/assets-src.constant';
import { AuthService } from '../../service/auth.service';
import { LoadingService } from '../../service/loading.service';
import { PersistenceService } from '../../service/persistence.service';
import { SnackbarService } from '../../service/snackbar.service';
import { UserService } from '../../service/user.service';
import { FormAbstractComponent } from '../form.abstract.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends FormAbstractComponent implements OnInit, AfterViewInit {
  readonly AppRouteConstant = AppRouteConstant;
  readonly AssetsSrcConstant = AssetsSrcConstant;

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
              private loadingService: LoadingService,
              private socialService: SocialAuthService) {
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
    this.formGroup = this.isLoginPage
      ? this.loginForm.buildForm()
      : this.signupForm.buildForm();
  }

  onEnterKeyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  override onSubmit() {
    super.onSubmit();

    if (this.formGroup.invalid) {
      this.loginForm?.forceShowError();
      this.signupForm?.forceShowError();

      return;
    }

    if (this.isLoginPage) {
      this.loginForm.onSubmit();
    } else if (this.isSignupPage) {
      this.signupForm.onSubmit();
    } else {
      this.snackbarService.openErrorAnnouncement('Something was wrong. Unknown page');
    }
  }

  onGoogleLogin() {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then();
  }

  get isLoginPage() {
    return this.page === AppRouteConstant.LOGIN.toLocaleLowerCase();
  }

  get isSignupPage() {
    return this.page === AppRouteConstant.SIGNUP.toLocaleLowerCase();
  }
}
