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
import { DocumentService } from '../../service/document.service';
import { SnackbarService } from '../../service/snackbar.service';
import { UserService } from '../../service/user.service';
import { ArrayUtil } from '../../utils/array.util';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent extends SubscriptionAwareAbstractComponent implements OnInit {

  user: UserModel = null;

  starred: DocumentModel[] = [];
  directories: DirectoryModel[] = [];
  notes: NoteModel[] = [];

  isUpdateDocument: boolean = false;
  isCreatingDocument: boolean = false;

  readonly NotemonCardTypeEnum = NotemonTypeEnum;
  readonly NotemonTypeEnum = NotemonTypeEnum;
  readonly SizeEnum = SizeEnum;
  readonly ArrayUtil = ArrayUtil;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private documentService: DocumentService,
              private snackbarService: SnackbarService) {
    super();
  }

  ngOnInit(): void {
    SnackbarService.DEFAULT_CONFIG.verticalPosition = 'bottom';

    this.registerSubscription(
      this.userService.user.subscribe(user => {
        this.user = user;
        if (this.user !== null) this.fetchDocuments();
      })
    )

    this.registerSubscription(
      this.documentService.change.subscribe(() => {
        if (this.user === null) return;
        this.fetchDocuments();
      })
    );
  }

  fetchDocuments() {
    if (this.user === null) return;
    this.registerSubscription(
      this.userService.getAllDocuments(this.user?.id, null, null)
        .pipe(take(1))
        .subscribe({
          next: (documents) => {
            if (documents === null || documents.length === 0) return;

            documents = documents.sort(
              (a, b) => new Date(a?.lastModifiedAt).getTime() - new Date(b?.lastModifiedAt).getTime()
            );

            this.starred = documents
              .filter(document => document?.relationship?.isStarred);

            this.directories = documents
              .filter(document => document?.isDirectory)
              .map(document => document as DirectoryModel);

            this.notes = documents
              .filter(document => !document?.isDirectory)
              .map(document => document as NoteModel);
          },
          error: error => this.snackbarService.openRequestErrorAnnouncement(error)
        })
    );
  }

  onNewDocumentClicked(type: NotemonTypeEnum) {
    if (this.user === null) {
      this.snackbarService.openErrorAnnouncement('You must be logged in to create a new document.');
      this.router.navigate(['/', AppRouteConstant.LOGIN]).then();
      return;
    }

    this.isCreatingDocument = true;
    let document: DocumentModel = null;
    if (type === NotemonTypeEnum.DIRECTORY) {
      document = DirectoryModel.create();
      this.directories = [document as DirectoryModel, ...this.directories];
    } else if (type === NotemonTypeEnum.NOTE) {
      document = NoteModel.create();
      this.notes = [document as NoteModel, ...this.notes];
    } else {
      this.snackbarService.openErrorAnnouncement('Something was wrong. Unknown document type');
      return;
    }

    document.author = this.userService.user.getValue();
  }

  onDocumentNameUpdated(name: string, document: DocumentModel) {
    if (this.isCreatingDocument) {
      this.isCreatingDocument = false;
      document.name = name;
      this.userService.createNewDocument(this.user.id, document)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackbarService.openSaveSuccessAnnouncement('Document created successfully');
            this.documentService.change.next();
          },
          error: (error) => this.snackbarService.openErrorAnnouncement(error)
        });
    }
  }


}
