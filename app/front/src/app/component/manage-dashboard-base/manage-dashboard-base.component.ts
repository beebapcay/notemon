import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, take} from 'rxjs';
import {AppRouteConstant} from '../../common/app-route.constant';
import {NotemonTypeEnum} from '../../enum/notemon-type.enum';
import {SizeEnum} from '../../enum/size.enum';
import {DirectoryModel} from '../../model/directory.model';
import {DocumentModel} from '../../model/document.model';
import {NoteModel} from '../../model/note.model';
import {UserModel} from '../../model/user.model';
import {DocumentService} from '../../service/document.service';
import {SnackbarService} from '../../service/snackbar.service';
import {UserService} from '../../service/user.service';
import {ArrayUtil} from '../../utils/array.util';
import {SubscriptionAwareAbstractComponent} from '../subscription-aware.abstract.component';
import {LoadingService} from '../../service/loading.service';

@Component({
  selector: 'app-manage-dashboard-base',
  templateUrl: './manage-dashboard-base.component.html',
  styleUrls: ['./manage-dashboard-base.component.scss']
})
export class ManageDashboardBaseComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  insideParent: string;

  user: UserModel = null;

  starreds: DocumentModel[] = [];
  directories: DirectoryModel[] = [];
  notes: NoteModel[] = [];

  loading: boolean = true;

  readonly NotemonCardTypeEnum = NotemonTypeEnum;
  readonly NotemonTypeEnum = NotemonTypeEnum;
  readonly SizeEnum = SizeEnum;
  readonly ArrayUtil = ArrayUtil;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private documentService: DocumentService,
              private snackbarService: SnackbarService,
              private loadingService: LoadingService) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.route.params.subscribe(params => {
        this.insideParent = params['directoryId'];
        this.fetchDocuments();
      })
    );

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

    this.registerSubscription(
      this.documentService.source.subscribe(() => {
        this.sourceDataFilter();
      })
    )

    this.registerSubscription(
      this.loadingService.loadingSpinner.subscribe(loading => {
        this.loading = loading;
      })
    );
  }

  fetchDocuments() {
    this.loadingService.showLoadingSpinner();
    this.loadingService.showLoadingBar();
    if (this.user === null) return;
    this.registerSubscription(
      this.userService.getAllDocuments(this.user?.id, this.insideParent, null)
        .pipe(take(1), finalize(() => {
          this.loadingService.hideLoadingBar();
          this.loadingService.hideLoadingSpinner();
        }))
        .subscribe({
          next: (documents) => {
            this.documentService.source.next(documents ?? []);
          },
          error: error => this.snackbarService.openRequestErrorAnnouncement(error)
        })
    );

  }


  sourceDataFilter() {
    let documents: DocumentModel[] = this.documentService.source.getValue();

    documents = documents
      .sort((a, b) => (new Date(a?.createdAt)).getTime() - (new Date(b?.createdAt)).getTime())
      .reverse();

    this.starreds = documents
      .filter(document => document?.relationship?.isStarred);

    this.directories = documents
      .filter(document => document?.isDirectory)
      .map(document => document as DirectoryModel);

    this.notes = documents
      .filter(document => !document?.isDirectory)
      .map(document => document as NoteModel);
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
      this.directories = [document as DirectoryModel, ...this.directories];
    } else if (type === NotemonTypeEnum.NOTE) {
      document = NoteModel.create();
      this.notes = [document as NoteModel, ...this.notes];
    } else {
      this.snackbarService.openErrorAnnouncement('Something was wrong. Unknown document type');
      return;
    }

    document.author = this.user;
    document.parent = this.insideParent;
  }

}
