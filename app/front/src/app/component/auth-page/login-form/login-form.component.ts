import {Component} from '@angular/core';
import {FormAbstractComponent} from '../../form.abstract.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends FormAbstractComponent {
  constructor(private formBuilder: FormBuilder) {
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
}
