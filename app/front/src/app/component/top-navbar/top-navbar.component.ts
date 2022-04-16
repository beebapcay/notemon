import {Component, OnInit} from '@angular/core';
import {AppRouteConstant} from '../../common/app-route.constant';
import {AssetsSrcConstant} from '../../common/assets-src.constant';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  readonly AppRouteConstant = AppRouteConstant;
  readonly AssetsSrcConstant = AssetsSrcConstant;

  constructor() {
  }

  ngOnInit(): void {
  }
}
