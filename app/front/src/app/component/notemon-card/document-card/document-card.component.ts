import {Component, OnInit} from '@angular/core';
import {SizeEnum} from '../../../enum/size.enum';
import {NotemonTypeEnum} from '../../../enum/notemon-type.enum';

@Component({
  selector: 'app-document-card-main',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent implements OnInit {
  readonly NotemonCardTypeEnum = NotemonTypeEnum;

  readonly SizeEnum = SizeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
