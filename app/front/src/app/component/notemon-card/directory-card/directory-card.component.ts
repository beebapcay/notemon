import {Component, OnInit} from '@angular/core';
import {NotemonTypeEnum} from '../../../enum/notemon-type.enum';

@Component({
  selector: 'app-directory-card-main',
  templateUrl: './directory-card.component.html',
  styleUrls: ['./directory-card.component.scss']
})
export class DirectoryCardComponent implements OnInit {
  readonly NotemonCardTypeEnum = NotemonTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
