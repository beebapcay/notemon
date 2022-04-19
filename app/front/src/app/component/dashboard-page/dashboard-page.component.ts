import {Component, OnInit} from '@angular/core';
import {NotemonTypeEnum} from '../../enum/notemon-type.enum';
import {SizeEnum} from '../../enum/size.enum';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  readonly NotemonCardTypeEnum = NotemonTypeEnum;
  readonly SizeEnum = SizeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
