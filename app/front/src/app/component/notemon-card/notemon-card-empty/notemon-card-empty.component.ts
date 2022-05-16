import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AssetsSrcConstant } from '../../../common/assets-src.constant';
import { NotemonTypeEnum } from '../../../enum/notemon-type.enum';

@Component({
  selector: 'app-notemon-card-empty',
  templateUrl: './notemon-card-empty.component.html',
  styleUrls: ['./notemon-card-empty.component.scss']
})
export class NotemonCardEmptyComponent implements OnInit {
  @Input() type: NotemonTypeEnum = NotemonTypeEnum.NOTE;

  @Output() click: EventEmitter<any> = new EventEmitter();

  readonly NotemonTypeEnum = NotemonTypeEnum;
  readonly AssetsSrcConstant = AssetsSrcConstant;

  constructor() {
  }

  ngOnInit(): void {
  }

}
