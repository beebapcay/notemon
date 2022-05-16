import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SizeEnum} from '../../enum/size.enum';
import {HashtagColorEnum} from '../../enum/hashtag-color.enum';

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

  getColor(): HashtagColorEnum {
    const getCodeIndex = (value: string, length: number) => {
      return value
        .toLocaleLowerCase()
        .split('')
        .reduce((acc, curr) => {
          return acc + curr.charCodeAt(0);
        }, 0) % length;
    };
    const hashtagColorKeys = Object.keys(HashtagColorEnum);

    return HashtagColorEnum[hashtagColorKeys[getCodeIndex(this.hashtag, hashtagColorKeys.length)]];
  }

  getClass(): string {
    return `hashtag-container ${this.size.toLocaleLowerCase()} ${this.getColor().toLocaleLowerCase()} ${this.animated ? 'animated' : ''}`;
  }
}
