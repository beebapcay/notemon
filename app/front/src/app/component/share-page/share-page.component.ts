import {Component, OnInit} from '@angular/core';
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
import {finalize, take} from 'rxjs';
import {SnackbarService} from '../../service/snackbar.service';

@Component({
  selector: 'app-share-page',
  templateUrl: './share-page.component.html',
  styleUrls: ['./share-page.component.scss']
})
export class SharePageComponent extends SubscriptionAwareAbstractComponent implements OnInit {

  readonly AssetsSrcConstant = AssetsSrcConstant;

  document: DocumentModel;
  user: UserModel;

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

    this.registerSubscription(
      this.userService.getUserById(userId)
        .pipe(take(1))
        .subscribe({
          next: (user: UserModel) => {
            this.user = user;

            const shareCode = this.route.snapshot.params['shareCode'];
            this.registerSubscription(
              this.documentService.getDocumentByShareCode(shareCode)
                .pipe(take(1))
                .subscribe({
                  next: (document: DocumentModel) => {
                    this.document = document;
                    this.performAddPartnerToDocument();
                  },
                  error: (error) => this.snackbarService.openRequestErrorAnnouncement(error),
                })
            );
          },
          error: (error) => {
            this.snackbarService.openErrorAnnouncement('You are not logged in. Please login to continue.');

            this.navigate(() => this.router.navigate([`/${AppRouteConstant.LOGIN}`]).then());
          }
        })
    )
  }


  performAddPartnerToDocument() {
    const relationship = UserDocumentModel.create();
    relationship['document'] = this.document;
    relationship['user'] = this.user;

    this.registerSubscription(
      this.documentService.addPartnerToDocument(this.document.id, relationship)
        .pipe(take(1), finalize(() => this.loadingService.hideLoadingSpinner()))
        .subscribe({
          next: () => {
            this.snackbarService.openSaveSuccessAnnouncement('You have successfully shared this document.');

            this.navigate(() => this.router.navigate([`/${AppRouteConstant.DASHBOARD}/${this.document.id}`]).then());
          },
          error: (error) => {
            this.snackbarService.openErrorAnnouncement('Error while sharing document or user already has access to this document.');

            this.navigate(() => this.router.navigate([`/${AppRouteConstant.DASHBOARD}`]).then());
          }
        })
    )
  }

  navigate(action: () => void) {
    setTimeout(() => {
      action();
    }, 5000);
  }
}
