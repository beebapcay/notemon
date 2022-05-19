import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { AppRouteConstant } from '../../../common/app-route.constant';
import { AssetsSrcConstant } from '../../../common/assets-src.constant';
import { DocumentModel } from '../../../model/document.model';
import { UserModel } from '../../../model/user.model';
import { DocumentService } from '../../../service/document.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { UserService } from '../../../service/user.service';
import { SubscriptionAwareAbstractComponent } from '../../subscription-aware.abstract.component';

@Component({
  selector: 'app-top-navbar-editor',
  templateUrl: './top-navbar-editor.component.html',
  styleUrls: ['./top-navbar-editor.component.scss']
})
export class TopNavbarEditorComponent extends SubscriptionAwareAbstractComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() item: DocumentModel;

  @Output() updatedDocumentEmitted = new EventEmitter<DocumentModel>();

  user: UserModel;

  readonly AppRouteConstant = AppRouteConstant;
  readonly AssetsSrcConstant = AssetsSrcConstant;

  constructor(private snackbarService: SnackbarService,
              private clipboardService: Clipboard,
              private userService: UserService,
              private documentService: DocumentService) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.userService.user.subscribe(user => this.user = user)
    );
  }

  onShareClicked() {
    const origin = window.location.origin;
    this.clipboardService.copy(`${origin}/share/${this.item?.shareCode}`);

    this.snackbarService.openSuccessAnnouncement('Link for sharing was copied to clipboard.');
  }

  onToggleStarred() {
    if (!this.preProcessAction()) return;

    const relationship = this.item?.relationship;
    relationship.isStarred = !relationship.isStarred;

    this.registerSubscription(
      this.documentService.updateStarredDocument(this.user?.id, this.item?.id, relationship)
        .pipe(take(1))
        .subscribe({
          next: (document) => {
            this.snackbarService.openSaveSuccessAnnouncement(`Document <strong>${this.item?.name}</strong> was ${relationship?.isStarred ? 'added to' : 'removed from'} Starred successfully.`);
            this.updatedDocumentEmitted.emit(document);
          },
          error: (error) => this.handleErrorResponse(error)
        })
    );
  }

  onChangeName(changeEvent: any) {
    const newName = changeEvent?.target?.value;

    if (!this.preProcessAction()) return;

    if (newName === this.item?.name) return;

    this.item.name = newName ?? this.item?.name;

    this.registerSubscription(
      this.documentService.updateNameDocument(this.user?.id, this.item?.id, this.item)
        .pipe(take(1))
        .subscribe({
          next: (document) => {
            this.snackbarService.openSaveSuccessAnnouncement(`Document <strong>${this.item?.name}</strong> was renamed to <strong>${document?.name}</strong> successfully.`);
            this.updatedDocumentEmitted.emit(document);
          },
          error: (error) => this.handleErrorResponse(error)
        })
    );

  }

  preProcessAction(): boolean {
    if (this.item?.author?.id === null || this.user === null) {
      this.snackbarService.openErrorAnnouncement('Something was wrong or You are not authorized to perform this action');
      return false;
    }
    return true;
  }

  handleErrorResponse(error: any) {
    this.snackbarService.openRequestErrorAnnouncement(error);
  }

}
