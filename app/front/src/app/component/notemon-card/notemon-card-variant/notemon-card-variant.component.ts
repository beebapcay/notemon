import {Component, Input, OnInit} from '@angular/core';
import {NotemonTypeEnum} from '../../../enum/notemon-type.enum';

@Component({
  selector: 'app-notemon-card-variant',
  templateUrl: './notemon-card-variant.component.html',
  styleUrls: ['./notemon-card-variant.component.scss']
})
export class NotemonCardVariantComponent implements OnInit {
  @Input() type: NotemonTypeEnum = NotemonTypeEnum.DOCUMENT;

  readonly NotemonCardTypeEnum = NotemonTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
