import {Component, Input, OnInit} from '@angular/core';
import {NotemonTypeEnum} from '../../../enum/notemon-type.enum';

@Component({
  selector: 'app-notemon-card-empty',
  templateUrl: './notemon-card-empty.component.html',
  styleUrls: ['./notemon-card-empty.component.scss']
})
export class NotemonCardEmptyComponent implements OnInit {
  @Input() type: NotemonTypeEnum = NotemonTypeEnum.STARTED;

  readonly NotemonTypeEnum = NotemonTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
