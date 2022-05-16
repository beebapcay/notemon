import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardActionMenuEnum } from '../../../enum/card-action-nemu.enum';
import { NotemonTypeEnum } from '../../../enum/notemon-type.enum';
import { DocumentModel } from '../../../model/document.model';

@Component({
  selector: 'card-action-bar',
  templateUrl: './card-action-bar.component.html',
  styleUrls: ['./card-action-bar.component.scss']
})
export class CardActionBarComponent implements OnInit {
  @Input() item: DocumentModel = null;
  @Input() type: NotemonTypeEnum = NotemonTypeEnum.DEFAULT;

  @Output() menuActionEmitted = new EventEmitter<CardActionMenuEnum>(null);

  readonly CardActionMenuEnum = CardActionMenuEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  getClass(): string {
    return `card-action-bar-container ${this.type.toLocaleLowerCase()}`;
  }

}
