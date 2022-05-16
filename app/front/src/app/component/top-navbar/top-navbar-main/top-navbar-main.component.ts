import {Component, Input, OnInit} from '@angular/core';
import {AppRouteConstant} from '../../../common/app-route.constant';
import {AssetsSrcConstant} from '../../../common/assets-src.constant';

@Component({
  selector: 'app-top-navbar-main',
  templateUrl: './top-navbar-main.component.html',
  styleUrls: ['./top-navbar-main.component.scss']
})
export class TopNavbarMainComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;

  readonly AppRouteConstant = AppRouteConstant;
  readonly AssetsSrcConstant = AssetsSrcConstant;

  constructor() {
  }

  ngOnInit(): void {
  }
}
