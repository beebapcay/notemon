import {Component, Input, OnInit} from '@angular/core';
import {NotemonCardTypeEnum} from '../../../enum/notemon-card-type.enum';

@Component({
  selector: 'card-action-bar',
  templateUrl: './card-action-bar.component.html',
  styleUrls: ['./card-action-bar.component.scss']
})
export class CardActionBarComponent implements OnInit {
  @Input() type: NotemonCardTypeEnum = NotemonCardTypeEnum.DEFAULT;

  constructor() {
  }

  ngOnInit(): void {
  }

  getClass(): string {
    return `card-action-bar-container ${this.type.toLocaleLowerCase()}`;
  }

}
