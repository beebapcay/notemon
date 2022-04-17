import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotemonTypeEnum} from '../../enum/notemon-type.enum';

@Component({
  selector: 'app-new-notemon-button',
  templateUrl: './new-notemon-button.component.html',
  styleUrls: ['./new-notemon-button.component.scss']
})
export class NewNotemonButtonComponent implements OnInit {
  @Input() type: NotemonTypeEnum = NotemonTypeEnum.DIRECTORY;

  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  readonly NotemonTypeEnum = NotemonTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  getClass() {
    return `new-notemon-button-container ${this.type.toLocaleLowerCase()}`;
  }
}
