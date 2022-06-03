import { FormGroup } from '@angular/forms';
import { SubscriptionAwareAbstractComponent } from './subscription-aware.abstract.component';

export abstract class FormAbstractComponent extends SubscriptionAwareAbstractComponent {

  showErrors = false;

  showMessage = false;
  errorMessage: string = null;
  successMessage: string = null;

  formGroup: FormGroup = new FormGroup({});

  buildForm(): FormGroup {
    return this.formGroup;
  }

  hasError(control: string, error: string): boolean {
    return this.formGroup.controls[control].hasError(error);
  }

  shouldShowErrors(control: string): boolean {
    return this.formGroup.controls[control].touched && this.showErrors && this.formGroup.controls[control].invalid;
  }

  requiredErrorCondition(control: string): boolean {
    return this.hasError(control, 'required') && this.shouldShowErrors(control);
  }

  onSubmit() {
    this.showErrors = true;
    this.showMessage = true;

    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      this.showErrorMessage('Form is invalid. Please check your input');
      return;
    }
  }

  forceShowError() {
    this.showErrors = true;
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
}

