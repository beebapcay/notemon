import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AssetsSrcConstant} from '../../common/assets-src.constant';
import {AppRouteConstant} from '../../common/app-route.constant';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionAwareAbstractComponent} from '../subscription-aware.abstract.component';
import {Title} from '@angular/platform-browser';
import _ from 'lodash';
import {FormGroup} from '@angular/forms';
import {LoginFormComponent} from './login-form/login-form.component';
import {SignupFormComponent} from './signup-form/signup-form.component';

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
              private titleService: Title) {
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
    this.showErrors = true;

    this.authForm.markAllAsTouched();

    const data = this.authForm.value;
    console.log(data);
  }

  onForgotPasswordButtonClicked() {
    console.log('Forgot password button clicked: ' + this.page);
  }

  get isLoginPage() {
    return this.page === AppRouteConstant.LOGIN.toLocaleLowerCase();
  }

  get isSignupPage() {
    return this.page === AppRouteConstant.SIGNUP.toLocaleLowerCase();
  }
}
