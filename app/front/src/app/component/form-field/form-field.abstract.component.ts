import { Component } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
import { IKeyValue } from '../../common/common.interface';
import { CommonRegex } from '../../common/common.regex';
import { StringUtil } from '../../utils/string.util';
import { FormFieldErrorMessageConstant } from './error-message.constant';

@Component({
  templateUrl: ''
})
export abstract class FormFieldAbstractComponent {
  errorArgs: IKeyValue = {};

  controlName: FormControlName;

  protected constructor() {
  }

  get isRequired(): boolean {
    const validators = this.controlName?.control?.validator;
    if (validators) {
      const validationResult = validators(new FormControl());
      return <boolean>(validationResult && validationResult['required'] === true);
    }
    return false;
  }

  get invalid(): boolean {
    return this.controlName?.control?.invalid && (this.touched || this.dirty);
  }

  get touched(): boolean {
    return this.controlName?.control?.touched;
  }

  get dirty(): boolean {
    return this.controlName?.control?.dirty;
  }

  get errorMessage(): string[] {
    const validationErrors = this.controlName?.control?.errors;

    if (!validationErrors) {
      return [];
    }

    return Object.keys(validationErrors)
      .map(error => {
        let errorMessage = `form.error.${error}`;

        this.errorArgs[errorMessage] = {};

        switch (error) {
          case 'pattern': {
            const keyCode = 'form.error.unexpectedCharacters';
            this.errorArgs[keyCode] = {
              characters: this.getPatternErrorCharacters(CommonRegex[this.controlName.name ?? ''])
            }
            errorMessage = FormFieldErrorMessageConstant.UNEXPECTED_CHARACTERS
              .replace('{{characters}}', this.errorArgs[keyCode].characters);
            break;
          }
          case 'min':
          case 'max': {
            const num = validationErrors[error][error];
            errorMessage = FormFieldErrorMessageConstant[error.toUpperCase()]
              .replace(`{{${error}}}`, num);
            break;
          }
          case 'maxlength':
          case 'minlength': {
            const num = validationErrors[error]['requiredLength'];
            errorMessage = FormFieldErrorMessageConstant[error.toUpperCase()]
              .replace(`{{${error}}}`, num);
            break;
          }
          default:
            errorMessage = FormFieldErrorMessageConstant[error.toUpperCase()];
        }
        return errorMessage;
      })
  }

  private getPatternErrorCharacters(regex: RegExp): string {
    return StringUtil.getUnexpectedCharacterFromString(this.controlName?.control?.value, regex).join(', ');
  }
}

