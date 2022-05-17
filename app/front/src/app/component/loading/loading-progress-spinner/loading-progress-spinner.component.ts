import {Component, OnInit} from '@angular/core';
import {SubscriptionAwareAbstractComponent} from '../../subscription-aware.abstract.component';
import {LoadingService} from '../../../service/loading.service';

@Component({
  selector: 'app-loading-progress-spinner',
  templateUrl: './loading-progress-spinner.component.html',
  styleUrls: ['./loading-progress-spinner.component.scss']
})
export class LoadingProgressSpinnerComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.loadingService.loadingSpinner.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );
  }

}
