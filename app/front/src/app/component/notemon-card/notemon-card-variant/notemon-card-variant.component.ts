import {Component, Input, OnInit} from '@angular/core';
import {NotemonCardTypeEnum} from '../../../enum/notemon-card-type.enum';

@Component({
  selector: 'app-notemon-card-variant',
  templateUrl: './notemon-card-variant.component.html',
  styleUrls: ['./notemon-card-variant.component.scss']
})
export class NotemonCardVariantComponent implements OnInit {
  @Input() type: NotemonCardTypeEnum = NotemonCardTypeEnum.DOCUMENT;

  readonly NotemonCardTypeEnum = NotemonCardTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
