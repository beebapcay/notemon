import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppRouteConstant } from '../../../common/app-route.constant';
import { AuthService } from '../../../service/auth.service';
import { LoadingService } from '../../../service/loading.service';
import { PersistenceService } from '../../../service/persistence.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { UserService } from '../../../service/user.service';
import { FormAbstractComponent } from '../../form.abstract.component';
import { AuthPageComponent } from '../auth-page.component';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends FormAbstractComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private persistenceService: PersistenceService,
    private snackbarService: SnackbarService,
    private loadingService: LoadingService,
    private router: Router,
    private authPage: AuthPageComponent
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  override buildForm(): FormGroup {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    }, {updateOn: 'blur'});

    return this.formGroup;
  }

  override onSubmit() {
    super.onSubmit();

    this.loadingService.showLoadingBar();

    const data = this.formGroup.value;

    this.authService
      .loginLocal(data.email, data.password)
      .pipe(take(1))
      .subscribe({
        next: (authData) => {
          this.authPage.showSuccessMessage('You have successfully logged in');
          this.persistenceService.write(authData);
          this.authService.isLoggedIn.next(true);
          this.userService.fetchUser();
          this.router.navigate([AppRouteConstant.DASHBOARD]).then();
        },
        error: (error) => {
          this.snackbarService.openRequestErrorAnnouncement(error);
          this.authService.isLoggedIn.next(false);
          this.authPage.showErrorMessage(error);
        }
      })
      .add(() => this.loadingService.hideLoadingBar());
  }
}
