import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouteConstant } from '../../common/app-route.constant';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home-page',
  template: '',
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate([AppRouteConstant.DASHBOARD]).then();
        } else {
          this.router.navigate([AppRouteConstant.FEATURE]).then();
        }
      }
    )
  }
}
