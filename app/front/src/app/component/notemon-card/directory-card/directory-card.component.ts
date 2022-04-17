import {Component, OnInit} from '@angular/core';
import {NotemonCardTypeEnum} from '../../../enum/notemon-card-type.enum';

@Component({
  selector: 'app-directory-card-main',
  templateUrl: './directory-card.component.html',
  styleUrls: ['./directory-card.component.scss']
})
export class DirectoryCardComponent implements OnInit {
  readonly NotemonCardTypeEnum = NotemonCardTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
