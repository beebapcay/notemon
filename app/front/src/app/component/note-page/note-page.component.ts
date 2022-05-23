import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, take} from 'rxjs';
import {NotemonTypeEnum} from '../../enum/notemon-type.enum';
import {SizeEnum} from '../../enum/size.enum';
import {DocumentSummaryModel} from '../../model/document-summary.model';
import {DocumentModel} from '../../model/document.model';
import {NoteModel} from '../../model/note.model';
import {UserModel} from '../../model/user.model';
import {AuthService} from '../../service/auth.service';
import {DocumentService} from '../../service/document.service';
import {LoadingService} from '../../service/loading.service';
import {SnackbarService} from '../../service/snackbar.service';
import {UserService} from '../../service/user.service';
import {ArrayUtil} from '../../utils/array.util';
import {SubscriptionAwareAbstractComponent} from '../subscription-aware.abstract.component';
import {AppRouteConstant} from '../../common/app-route.constant';

@Component({
  selector: 'app-notemon-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent extends SubscriptionAwareAbstractComponent implements OnInit, OnChanges {

  noteId: string;

  isQuickNotePage: boolean = true;

  user: UserModel = null;
  note: NoteModel = NoteModel.create() as NoteModel;

  loading: boolean = true;

  isLoggedIn: boolean = false;

  readonly NotemonCardTypeEnum = NotemonTypeEnum;
  readonly NotemonTypeEnum = NotemonTypeEnum;
  readonly SizeEnum = SizeEnum;
  readonly ArrayUtil = ArrayUtil;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private documentService: DocumentService,
              private snackbarService: SnackbarService,
              private loadingService: LoadingService,
              private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.authService.isLoggedIn.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      })
    )

    this.registerSubscription(
      this.route.params.subscribe(params => {
        this.noteId = params['noteId'];
        if (this.noteId) {
          this.isQuickNotePage = false;
          this.fetchDocuments();
        } else {
          this.isQuickNotePage = true;
        }
      })
    );

    this.registerSubscription(
      this.userService.user.subscribe(user => {
        this.user = user;
        if (this.user !== null && !this.isQuickNotePage) this.fetchDocuments();
      })
    );

    this.registerSubscription(
      this.loadingService.loadingSpinner.subscribe(loading => {
        this.loading = loading;
      })
    );
  }

  ngOnChanges(): void {

  }

  fetchDocuments() {
    if (this.isQuickNotePage) return;

    this.loadingService.showLoadingSpinner();
    this.loadingService.showLoadingBar();

    if (this.user === null) return;

    this.registerSubscription(
      this.userService.getDocumentById(this.user?.id, this.noteId)
        .pipe(take(1), finalize(() => {
          this.loadingService.hideLoadingBar();
          this.loadingService.hideLoadingSpinner();
        }))
        .subscribe({
          next: (documents) => {
            this.note = documents as NoteModel;
            this.note['summary'] = DocumentSummaryModel.create();
          },
          error: error => {
            this.snackbarService.openRequestErrorAnnouncement(error);
            this.router.navigate([`/${AppRouteConstant.PAGE_NOT_FOUND}`], {replaceUrl: true}).then();
          }
        })
    );
  }

  toggleStarred() {
    if (!this.preProcessAction()) return;

    const relationship = this.note?.relationship;
    relationship.isStarred = !relationship.isStarred;

    this.registerSubscription(
      this.documentService.updateStarredDocument(this.user?.id, this.note?.id, relationship)
        .pipe(take(1))
        .subscribe({
          next: (document) => {
            this.snackbarService.openSaveSuccessAnnouncement(`Document <strong>${this.note?.name}</strong> was ${relationship?.isStarred ? 'added to' : 'removed from'} Starred successfully.`);
            this.note.relationship = relationship;
          },
          error: (error) => this.handleErrorResponse(error)
        })
    );
  }

  preProcessAction(): boolean {
    if (this.isQuickNotePage) return false;

    if (this.note?.author?.id === null || this.user === null) {
      this.snackbarService.openErrorAnnouncement('Something was wrong or You are not authorized to perform this action');
      return false;
    }
    return true;
  }

  handleErrorResponse(error: any) {
    this.snackbarService.openRequestErrorAnnouncement(error);
  }

  updateFromTopNav(updatedDocument: DocumentModel) {
    this.note.relationship = updatedDocument?.relationship ?? this.note.relationship;
    this.note.name = updatedDocument?.name ?? this.note.name;
  }
}

