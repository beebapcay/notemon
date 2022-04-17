import {Component, OnInit} from '@angular/core';
import {SizeEnum} from '../../../enum/size.enum';
import {NotemonCardTypeEnum} from '../../../enum/notemon-card-type.enum';

@Component({
  selector: 'app-document-card-main',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent implements OnInit {
  readonly NotemonCardTypeEnum = NotemonCardTypeEnum;

  readonly SizeEnum = SizeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
