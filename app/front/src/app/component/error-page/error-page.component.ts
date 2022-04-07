import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppRouteConstant} from '../../common/app-route.constant';
import {ActivatedRoute} from '@angular/router';
import {ErrorModel} from '../../model/error.model';
import {Subscription} from 'rxjs';
import {AssetsSrcConstant} from '../../common/assets-src.constant';
import {ErrorCodeEnum} from '../../enum/error-code.enum';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  @Input('error') errorInput: ErrorModel | null = null;

  public error: ErrorModel | null = null;

  readonly AppRouteConstant = AppRouteConstant;
  readonly AssetsSrcConstant = AssetsSrcConstant;
  readonly ErrorCodeEnum = ErrorCodeEnum;

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute) {
    this.subscriptions.push(
      this.route.data.subscribe(data => {
        this.error = data as ErrorModel;
      }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
