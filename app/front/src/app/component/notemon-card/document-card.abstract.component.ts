import { Clipboard } from '@angular/cdk/clipboard';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { finalize, take } from 'rxjs';
import { CardActionMenuEnum } from '../../enum/card-action-nemu.enum';
import { NotemonTypeEnum } from '../../enum/notemon-type.enum';
import { DocumentModel } from '../../model/document.model';
import { UserDocumentModel } from '../../model/user-document.model';
import { UserModel } from '../../model/user.model';
import { DocumentService } from '../../service/document.service';
import { LoadingService } from '../../service/loading.service';
import { SnackbarService } from '../../service/snackbar.service';
import { UserService } from '../../service/user.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

@Component({
  template: ''
})
export abstract class DocumentCardAbstractComponent<T extends DocumentModel>
  extends SubscriptionAwareAbstractComponent
  implements OnInit, OnChanges, AfterViewChecked {

  readonly NotemonCardTypeEnum = NotemonTypeEnum;
  readonly DEFAULT_NAME = 'New Directory';

  @Input() item: T = null;
  @Input() isCreating: boolean = false;

  user: UserModel;
  name: string = this.DEFAULT_NAME;
  isUpdating: boolean = false;
  ignoreFirstClickOutside: boolean = true;

  @ViewChild('nameInput') nameInput: ElementRef;

  protected constructor(
    protected userService: UserService,
    protected snackbarService: SnackbarService,
    protected documentService: DocumentService,
    protected clipboardService: Clipboard,
    protected loadingService: LoadingService
  ) {
    super();
  }

  get nameInputElement(): HTMLInputElement {
    return this.nameInput.nativeElement;
  }

  ngOnInit(): void {
    this.name = this.item?.name ?? this.DEFAULT_NAME;

    this.registerSubscription(
      this.userService.user.subscribe(user => {
        this.user = user;
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isCreating']?.currentValue === true && changes['isCreating']?.previousValue === false) {
      this.name = this.item?.name ?? this.DEFAULT_NAME;
      this.nameInputElement.focus();
    }

    if (changes['item']?.currentValue?.name !== changes['item']?.previousValue?.name) {
      this.name = this.item?.name ?? this.DEFAULT_NAME;
    }
  }

  ngAfterViewChecked(): void {
    if ((this.isCreating || this.isUpdating) && this.nameInputElement) {
      this.nameInputElement.focus();
    }
  }

  commitNameUpdate() {
    this.isCreating = false;
    this.isUpdating = false;
    this.nameInputElement.blur();
    this.onDocumentNameUpdated();
  }

  onDocumentNameUpdated() {
    if (!this.preProcessAction()) return;

    if (this.item?.name === this.name && this.item?.id !== null) return;

    if (!this.name && this.item?.name) {
      this.name = this.item?.name;
      return;
    }

    const initName = this.item?.name;
    this.name = this.name ?? this.DEFAULT_NAME;
    this.item = {...this.item, name: this.name};

    this.loadingService.showLoadingBar();

    if (this.item?.id === null) {
      this.item.author = this.user;
      this.registerSubscription(
        this.userService.createNewDocument(this.user?.id, this.item)
          .pipe(take(1), finalize(() => this.loadingService.hideLoadingBar()))
          .subscribe({
            next: (document) => {
              this.snackbarService.openSaveSuccessAnnouncement(`Document <strong>${this.item?.name}</strong> was created successfully.`);

              this.addNewDocumentToServiceSource(document);
            },
            error: (error) => this.handleErrorResponse(error)
          })
      );
    } else {
      this.registerSubscription(
        this.documentService.updateNameDocument(this.user?.id, this.item?.id, this.item)
          .pipe(take(1), finalize(() => this.loadingService.hideLoadingBar()))
          .subscribe({
            next: (document) => {
              this.snackbarService.openSaveSuccessAnnouncement(`Document <strong>${initName}</strong> was renamed to <strong>${this.item?.name}</strong> successfully.`);

              this.replaceExistingDocumentInServiceSource(document);
            },
            error: (error) => this.handleErrorResponse(error)
          })
      )
    }
  }

  onDocumentStarredUpdate(isStarred: boolean) {
    if (!this.preProcessAction()) return;

    if (this.item?.relationship.isStarred === isStarred) return;

    const relationship: UserDocumentModel = {...this.item?.relationship, isStarred};

    this.loadingService.showLoadingBar();

    this.registerSubscription(
      this.documentService.updateStarredDocument(this.user?.id, this.item?.id, relationship)
        .pipe(take(1), finalize(() => this.loadingService.hideLoadingBar()))
        .subscribe({
          next: (document) => {
            this.snackbarService.openSaveSuccessAnnouncement(`Document <strong>${this.item?.name}</strong> was ${isStarred ? 'added to' : 'removed from'} Starred successfully.`);

            this.replaceExistingDocumentInServiceSource(document);
          },
          error: (error) => this.handleErrorResponse(error)
        })
    );
  }

  onDocumentDelete() {
    if (!this.preProcessAction()) return;

    this.loadingService.showLoadingBar();

    this.registerSubscription(
      this.documentService.deleteDocument(this.user?.id, this.item?.id)
        .pipe(take(1), finalize(() => this.loadingService.hideLoadingBar()))
        .subscribe({
          next: () => {
            this.snackbarService.openWarningAnnouncement(`Document <strong>${this.item?.name}</strong> was deleted successfully.`);

            this.deleteExistingDocumentInServiceSource(this.item);
          },
          error: (error) => this.handleErrorResponse(error)
        })
    )
  }

  handleErrorResponse(error: any) {
    this.snackbarService.openRequestErrorAnnouncement(error);
    this.documentService.change.next();
  }

  preProcessAction(): boolean {
    if (this.item?.author?.id === null || this.user === null) {
      this.snackbarService.openErrorAnnouncement('Something was wrong or You are not authorized to perform this action');
      return false;
    }
    return true;
  }

  @HostListener('document:click', ['$event'])
  onClickedOutsideNameInput(event: MouseEvent) {
    if (this.ignoreFirstClickOutside) {
      this.ignoreFirstClickOutside = false;
      return;
    }

    if ((this.isCreating || this.isUpdating) && !this.nameInputElement.contains(event.target as Node)) {
      this.commitNameUpdate();
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterPressedNameInput(event: KeyboardEvent) {
    if ((this.isCreating || this.isUpdating) && event.target === this.nameInputElement) {
      this.commitNameUpdate();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePressedNameInput(event: KeyboardEvent) {
    if ((this.isCreating || this.isUpdating) && event.target === this.nameInputElement) {
      this.commitNameUpdate();
    }
  }

  addNewDocumentToServiceSource(document: DocumentModel) {
    const sourceDocuments: DocumentModel[] = this.documentService.source.getValue();
    this.documentService.source.next([document, ...sourceDocuments]);
  }

  replaceExistingDocumentInServiceSource(document: DocumentModel) {
    const sourceDocuments: DocumentModel[] = this.documentService.source.getValue();
    const index: number = sourceDocuments.findIndex(item => item.id === document.id);
    if (index !== -1) {
      sourceDocuments[index] = document;
      this.documentService.source.next(sourceDocuments);
    }
  }

  deleteExistingDocumentInServiceSource(document: DocumentModel) {
    const sourceDocuments: DocumentModel[] = this.documentService.source.getValue();
    const index: number = sourceDocuments.findIndex(item => item.id === document.id);
    if (index !== -1) {
      sourceDocuments.splice(index, 1);
      this.documentService.source.next(sourceDocuments);
    }
  }

  onMenuItemClicked(actionOption: any) {
    switch (actionOption as CardActionMenuEnum) {
      case CardActionMenuEnum.SHARE: {
        const origin = window.location.origin;
        this.clipboardService.copy(`${origin}/share/${this.item?.shareCode}`);

        this.snackbarService.openSuccessAnnouncement('Link for sharing was copied to clipboard.');
        break;
      }
      case CardActionMenuEnum.GET_LINK: {
        const origin = window.location.origin;
        this.clipboardService.copy(`${origin}/dashboard/${this.item?.id}`);

        this.snackbarService.openSuccessAnnouncement('Link of document address was copied to clipboard.');
        break;
      }
      case CardActionMenuEnum.ADD_TO_STARRED: {
        this.onDocumentStarredUpdate(true);
        break;
      }
      case CardActionMenuEnum.REMOVE_FROM_STARRED: {
        this.onDocumentStarredUpdate(false);
        break;
      }
      case CardActionMenuEnum.RENAME: {
        this.isUpdating = true;
        this.ignoreFirstClickOutside = true;
        break;
      }
      case CardActionMenuEnum.VIEW_DETAIL: {
        console.log('view detail');
        break;
      }
      case CardActionMenuEnum.DOWNLOAD: {
        console.log('download');
        break;
      }
      case CardActionMenuEnum.REMOVE: {
        this.onDocumentDelete();
        break;
      }
      default: {
        this.snackbarService.openErrorAnnouncement('Unknown action option');
      }
    }
  }
}
