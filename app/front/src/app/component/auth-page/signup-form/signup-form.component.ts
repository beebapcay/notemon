import {Component, OnInit} from '@angular/core';
import {FormAbstractComponent} from '../../form.abstract.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent extends FormAbstractComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
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
}
