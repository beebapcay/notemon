import { Component, Input, OnInit } from '@angular/core';
import { SizeEnum } from '../../../enum/size.enum';
import {SubscriptionAwareAbstractComponent} from '../../subscription-aware.abstract.component';
import {LoadingService} from '../../../service/loading.service';

@Component({
  selector: 'app-loading-progress-spinner',
  templateUrl: './loading-progress-spinner.component.html',
  styleUrls: ['./loading-progress-spinner.component.scss']
})
export class LoadingProgressSpinnerComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  @Input() size: SizeEnum = SizeEnum.MEDIUM;

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
