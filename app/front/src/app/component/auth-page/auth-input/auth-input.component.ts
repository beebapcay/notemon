import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss']
})
export class AuthInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;

  @Output() valueChangeEmitted = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onValueChange(value: string) {
    this.valueChangeEmitted.emit(value);
  }
}
