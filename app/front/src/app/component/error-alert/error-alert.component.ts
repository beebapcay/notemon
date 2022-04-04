import {Component, Input, OnInit} from '@angular/core';
import {ErrorCodeEnum} from '../../enum/error-code.enum';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent implements OnInit {
  @Input() error: ErrorCodeEnum | null = null;

  readonly ErrorCodeEnum = ErrorCodeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
