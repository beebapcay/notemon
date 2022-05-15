import { Component, OnInit } from '@angular/core';
import { NotemonTypeEnum } from '../../../enum/notemon-type.enum';
import { SizeEnum } from '../../../enum/size.enum';

@Component({
  selector: 'app-note-card-main',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  readonly NotemonCardTypeEnum = NotemonTypeEnum;

  readonly SizeEnum = SizeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
