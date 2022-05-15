import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AppRouteConstant } from '../../common/app-route.constant';
import { NotemonTypeEnum } from '../../enum/notemon-type.enum';
import { SizeEnum } from '../../enum/size.enum';
import { DirectoryModel } from '../../model/directory.model';
import { DocumentModel } from '../../model/document.model';
import { NoteModel } from '../../model/note.model';
import { UserModel } from '../../model/user.model';
import { SnackbarService } from '../../service/snackbar.service';
import { UserService } from '../../service/user.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent extends SubscriptionAwareAbstractComponent implements OnInit {

  readonly NotemonCardTypeEnum = NotemonTypeEnum;
  readonly NotemonTypeEnum = NotemonTypeEnum;
  readonly SizeEnum = SizeEnum;

  user: UserModel = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private snackbarService: SnackbarService) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.userService.user.subscribe(user => {
        this.user = user;
      })
    )
  }

  onNewDocumentClicked(type: NotemonTypeEnum) {
    if (this.user === null) {
      this.snackbarService.openErrorAnnouncement('You must be logged in to create a new document.');
      this.router.navigate(['/', AppRouteConstant.LOGIN]).then();
      return;
    }

    let document: DocumentModel = null;
    if (type === NotemonTypeEnum.DIRECTORY) {
      document = DirectoryModel.create();
    } else if (type === NotemonTypeEnum.NOTE) {
      document = NoteModel.create();
    } else {
      this.snackbarService.openErrorAnnouncement('Something was wrong. Unknown document type');
      return;
    }

    document.author = new UserModel();
    document.author.id = this.userService.user.getValue().id;

    this.userService.createNewDocument(this.user.id, document)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackbarService.openSaveSuccessAnnouncement('Document created successfully');
        },
        error: (error) => this.snackbarService.openErrorAnnouncement(error)
      });
  }

}
