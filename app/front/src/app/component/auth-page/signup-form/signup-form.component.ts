import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from '../../../service/auth.service';
import { LoadingService } from '../../../service/loading.service';
import { PersistenceService } from '../../../service/persistence.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { UserService } from '../../../service/user.service';
import { FormAbstractComponent } from '../../form.abstract.component';
import { AuthPageComponent } from '../auth-page.component';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent extends FormAbstractComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private persistenceService: PersistenceService,
    private snackbarService: SnackbarService,
    private loadingService: LoadingService,
    private authPage: AuthPageComponent,
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm();
  }

  override buildForm(): FormGroup {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })

    return this.formGroup;
  }

  override onSubmit() {
    super.onSubmit();

    this.loadingService.showLoadingBar();

    const data = this.formGroup.value;

    this.authService
      .signup(data.name, data.email, data.password)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const signupSuccessMessage = 'You have successfully signed up';
          this.snackbarService.openSaveSuccessAnnouncement(signupSuccessMessage);
          this.authPage.showSuccessMessage(signupSuccessMessage);
        },
        error: (error) => {
          this.snackbarService.openRequestErrorAnnouncement(error);
          this.authPage.showErrorMessage(error);
        }
      })
      .add(() => this.loadingService.hideLoadingBar());
  }
}
