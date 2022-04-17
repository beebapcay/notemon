import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SizeEnum} from '../../enum/size.enum';
import {HashtagColorEnum} from '../../enum/hashtag-color.enum';
import _ from 'lodash';

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.scss']
})
export class HashtagComponent implements OnInit {
  @Input() hashtag: string = '';
  @Input() size: SizeEnum = SizeEnum.MEDIUM;
  @Input() color: HashtagColorEnum = HashtagColorEnum.BLUE;
  @Input() animated: boolean = false;

  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  readonly SizeEnum = SizeEnum;
  readonly HashtagColorEnum = HashtagColorEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  getRandomColor(): HashtagColorEnum {
    const hashtagColorKeys = Object.keys(HashtagColorEnum);
    const randomIdx = _.random(0, hashtagColorKeys.length - 1);
    return HashtagColorEnum[hashtagColorKeys[randomIdx]];
  }

  getClass(): string {
    return `hashtag-container ${this.size.toLocaleLowerCase()} ${this.getRandomColor().toLocaleLowerCase()} ${this.animated ? 'animated' : ''}`;
  }
}
