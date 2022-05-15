import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotemonTypeEnum } from '../../enum/notemon-type.enum';
import { SizeEnum } from '../../enum/size.enum';
import { PersistenceService } from '../../service/persistence.service';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  readonly NotemonCardTypeEnum = NotemonTypeEnum;
  readonly SizeEnum = SizeEnum;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private persistenceService: PersistenceService) {
  }

  ngOnInit(): void {
  }

  onNewDocumentClicked(type: NotemonTypeEnum) {

  }

}
