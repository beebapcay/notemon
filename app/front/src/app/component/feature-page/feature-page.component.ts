import {Component, OnInit} from '@angular/core';
import { AppRouteConstant } from '../../common/app-route.constant';
import {AssetsSrcConstant} from '../../common/assets-src.constant';

@Component({
  selector: 'app-feature-page',
  templateUrl: './feature-page.component.html',
  styleUrls: ['./feature-page.component.scss']
})
export class FeaturePageComponent implements OnInit {
  readonly AssetsSrcConstant = AssetsSrcConstant;
  readonly AppRouteConstant = AppRouteConstant;

  constructor() {
  }

  ngOnInit(): void {
  }

}
