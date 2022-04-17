import {Component, Input, OnInit} from '@angular/core';
import {NotemonCardTypeEnum} from '../../../enum/notemon-card-type.enum';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  @Input() type: NotemonCardTypeEnum = NotemonCardTypeEnum.DEFAULT;

  constructor() {
  }

  ngOnInit(): void {
  }

  getClass(): string {
    return `action-bar-container ${this.type.toLocaleLowerCase()}`;
  }

}
