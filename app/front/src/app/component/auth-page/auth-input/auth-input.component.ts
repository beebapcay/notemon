import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';

@Component({
  selector: 'auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss'],
})
export class AuthInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() control: string = '';
  @Input() required: boolean = false;
  @Input() formGroup: FormGroup;

  @Output() valueChangeEmitted = new EventEmitter<string>();

  constructor(private parentContainer: ControlContainer) {
  }

  ngOnInit(): void {
  }

  onValueChange(value: string) {
    this.valueChangeEmitted.emit(value);
  }
}
