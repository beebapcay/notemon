import {Component, OnInit} from '@angular/core';

import {AppRouteConstant} from '../../common/app-route.constant';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';
import {faYoutube} from '@fortawesome/free-brands-svg-icons/faYoutube';
import {faGithub} from '@fortawesome/free-brands-svg-icons/faGithub';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss']
})
export class BottomNavbarComponent implements OnInit {

  readonly socialIcons = {
    facebook: faFacebook as IconProp,
    instagram: faInstagram as IconProp,
    youtube: faYoutube as IconProp,
    github: faGithub as IconProp
  };

  readonly AppRouteConstant = AppRouteConstant;

  constructor() {
  }

  ngOnInit(): void {
  }

}
