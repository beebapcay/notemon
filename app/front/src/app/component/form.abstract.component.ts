import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  template: ''
})
export abstract class FormAbstractComponent {
  showErrors: boolean = false;
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

  forceShowError() {
    this.showErrors = true;
  }
}

