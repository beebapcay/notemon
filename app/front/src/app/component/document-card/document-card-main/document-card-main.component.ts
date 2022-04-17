import {Component, OnInit} from '@angular/core';
import {SizeEnum} from '../../../enum/size.enum';

@Component({
  selector: 'app-document-card-main',
  templateUrl: './document-card-main.component.html',
  styleUrls: ['./document-card-main.component.scss']
})
export class DocumentCardMainComponent implements OnInit {

  readonly SizeEnum = SizeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
