import { Component, ContentChild, ElementRef, Input, OnInit } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { FormFieldAbstractComponent } from './form-field.abstract.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent
  extends FormFieldAbstractComponent
  implements OnInit {

  @Input() label: string;
  @Input() required: boolean;
  @Input() showError: boolean;
  @ContentChild(FormControlName) public override controlName: FormControlName;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnInit(): void {
  }
}
