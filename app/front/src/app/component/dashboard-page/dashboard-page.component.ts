import {Component, OnInit} from '@angular/core';
import {NotemonCardTypeEnum} from '../../enum/notemon-card-type.enum';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  readonly NotemonCardTypeEnum = NotemonCardTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
