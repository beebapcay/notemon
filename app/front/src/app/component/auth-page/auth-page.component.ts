import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { take } from 'rxjs';
import { AppRouteConstant } from '../../common/app-route.constant';
import { AssetsSrcConstant } from '../../common/assets-src.constant';
import { AuthService } from '../../service/auth.service';
import { PersistenceService } from '../../service/persistence.service';
import { SnackbarService } from '../../service/snackbar.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends SubscriptionAwareAbstractComponent implements OnInit, AfterViewInit {
  readonly AppRouteConstant = AppRouteConstant;
  readonly AssetsSrcConstant = AssetsSrcConstant;

  showErrors: boolean;
  authForm: FormGroup = new FormGroup({});
  page: string = AppRouteConstant.LOGIN.toLocaleLowerCase();

  @ViewChild(LoginFormComponent) loginForm: LoginFormComponent;
  @ViewChild(SignupFormComponent) signupForm: SignupFormComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private authService: AuthService,
              private snackbarService: SnackbarService,
              private persistenceService: PersistenceService) {
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

  onAuthSubmit() {
    this.snackbarService.openRequestErrorAnnouncement('Hello World');
    return;

    this.showErrors = true;
    this.authForm.markAllAsTouched();

    if (this.authForm.invalid) return;

    const data = this.authForm.value;
    this.authService
        .loginLocal(data.email, data.password)
        .pipe(take(1))
        .subscribe({
          next: (authData) => {
            this.persistenceService.write(authData);
            this.router.navigate([AppRouteConstant.DASHBOARD]).then();
          },
          error: (error) => this.snackbarService.openRequestErrorAnnouncement(error)
        });
  }

  get isLoginPage() {
    return this.page === AppRouteConstant.LOGIN.toLocaleLowerCase();
  }

  get isSignupPage() {
    return this.page === AppRouteConstant.SIGNUP.toLocaleLowerCase();
  }
}
