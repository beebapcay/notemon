import {Component, OnInit} from '@angular/core';
import {NotemonTypeEnum} from '../../enum/notemon-type.enum';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  readonly NotemonCardTypeEnum = NotemonTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
