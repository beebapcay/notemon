import {Component, OnInit} from '@angular/core';
import {SubscriptionAwareAbstractComponent} from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent extends SubscriptionAwareAbstractComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
