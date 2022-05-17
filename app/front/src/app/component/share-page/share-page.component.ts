import {Component, OnInit} from '@angular/core';
import { ErrorCodeEnum } from '../../enum/error-code.enum';
import { SizeEnum } from '../../enum/size.enum';
import {SubscriptionAwareAbstractComponent} from '../subscription-aware.abstract.component';
import {AppRouteConstant} from '../../common/app-route.constant';
import {AssetsSrcConstant} from '../../common/assets-src.constant';
import {LoadingService} from '../../service/loading.service';
import {DocumentService} from '../../service/document.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentModel} from '../../model/document.model';
import {UserDocumentModel} from '../../model/user-document.model';
import {UserService} from '../../service/user.service';
import {PersistenceService} from '../../service/persistence.service';
import {UserModel} from '../../model/user.model';
import { catchError, finalize, Observable, switchMap, take, of, throwError, concatMap } from 'rxjs';
import {SnackbarService} from '../../service/snackbar.service';

enum ErrorCode {
  ERROR_REQUEST_USER= 'error_request_user',
  ERROR_REQUEST_DOCUMENT = 'error_request_document',
  ERROR_REQUEST_SHARE = 'error_request_share',
}

interface ErrorEmitter {
  errorCode: ErrorCode;
  error: any;
}

@Component({
  selector: 'app-share-page',
  templateUrl: './share-page.component.html',
  styleUrls: ['./share-page.component.scss']
})
export class SharePageComponent extends SubscriptionAwareAbstractComponent implements OnInit {

  readonly AssetsSrcConstant = AssetsSrcConstant;
  readonly SizeEnum = SizeEnum;

  document: DocumentModel;
  user: UserModel;

  error: any;

  constructor(private loadingService: LoadingService,
              private router: Router,
              private route: ActivatedRoute,
              private documentService: DocumentService,
              private userService: UserService,
              private persistenceService: PersistenceService,
              private snackbarService: SnackbarService) {
    super();
  }

  ngOnInit(): void {
    this.loadingService.showLoadingSpinner();

    const userId = this.persistenceService.get('id');
    const jwtToken = this.persistenceService.get('token');
    if (!userId || !jwtToken) {
      this.snackbarService.openErrorAnnouncement('You are not logged in. Please login to continue.');
      this.navigate(() => this.router.navigate([`/${AppRouteConstant.LOGIN}`]).then());
      return;
    }

    const shareCode = this.route.snapshot.params['shareCode'];

    this.userService.getUserById(userId)
      .pipe(
        take(1),
        concatMap(user => {
          this.user = user as UserModel;
          return this.documentService.getDocumentByShareCode(shareCode)
            .pipe(
              take(1),
              catchError(error => throwError(() => this.emitError(ErrorCode.ERROR_REQUEST_DOCUMENT, error)))
            );
        }),
        concatMap(document => {
          this.document = document as DocumentModel;

          const relationship = UserDocumentModel.create();
          relationship['document'] = this.document;
          relationship['user'] = this.user;

          return this.documentService.addPartnerToDocument(this.document.id, relationship)
            .pipe(
              take(1),
              catchError(error => throwError(() => this.emitError(ErrorCode.ERROR_REQUEST_SHARE, error)))
            );
        })
      )
      .subscribe({
          next: () => {
            this.snackbarService.openSuccessAnnouncement('You have successfully shared this document.');
            this.navigate(() => this.router.navigate([`/${AppRouteConstant.DASHBOARD}/${this.document.id}`]).then());
          },
          error: error => {
            error = this.parseJsonError(error.message);
            switch (error.errorCode) {
              case ErrorCode.ERROR_REQUEST_USER:
                this.snackbarService.openErrorAnnouncement('You are not logged in. Please login to continue.');
                this.navigate(() => this.router.navigate([`/${AppRouteConstant.LOGIN}`]).then());
                break;
              case ErrorCode.ERROR_REQUEST_DOCUMENT:
                this.snackbarService.openRequestErrorAnnouncement(error);
                break;
              case ErrorCode.ERROR_REQUEST_SHARE:
                this.snackbarService.openErrorAnnouncement('Error while sharing document or user already has access to this document.');
                break;
            }
          }
        }
      );
  }

  navigate(action: () => void) {
    setTimeout(() => {
      action();
    }, 5000);
  }

  emitError(errorCode: ErrorCode, error: any) {
    return new Error(this.toJsonError(errorCode, error));
  }

  toJsonError(errorCode: ErrorCode, error: any): string {
    return JSON.stringify({
      errorCode: errorCode,
      error: error
    });
  }

  parseJsonError(error: string): ErrorEmitter {
    console.log(error);
    return JSON.parse(error);
  }
}


