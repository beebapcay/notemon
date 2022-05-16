import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { take } from 'rxjs';
import { CardActionMenuEnum } from '../../enum/card-action-nemu.enum';
import { NotemonTypeEnum } from '../../enum/notemon-type.enum';
import { DocumentModel } from '../../model/document.model';
import { UserDocumentModel } from '../../model/user-document.model';
import { DocumentService } from '../../service/document.service';
import { SnackbarService } from '../../service/snackbar.service';
import { UserService } from '../../service/user.service';

@Component({
  template: ''
})
export abstract class DocumentCardAbstractComponent<T extends DocumentModel> implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {
  readonly NotemonCardTypeEnum = NotemonTypeEnum;
  readonly DEFAULT_NAME = 'New Directory';

  @Input() item: T = null;
  @Input() isCreating: boolean = false;

  name: string = this.DEFAULT_NAME;
  isUpdating: boolean = false;
  ignoreFirstClickOutside: boolean = true;

  @ViewChild('nameInput') nameInput: ElementRef;

  protected constructor(
    protected userService: UserService,
    protected snackbarService: SnackbarService,
    protected documentService: DocumentService
  ) {
  }

  get nameInputElement(): HTMLInputElement {
    return this.nameInput.nativeElement;
  }

  ngOnInit(): void {
    this.name = this.item?.name ?? this.DEFAULT_NAME;
  }

  ngAfterViewInit(): void {
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

  @HostListener('document:click', ['$event'])
  onClickedOutsideNameInput(event: MouseEvent) {
    if (this.ignoreFirstClickOutside) {
      this.ignoreFirstClickOutside = false;
      return;
    }

    if ((this.isCreating || this.isUpdating) && !this.nameInputElement.contains(event.target as Node)) {
      console.log('clicked outside');
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

  onDocumentNameUpdated() {
    if (!this.preProcessAction()) return;

    if (this.item?.name === this.name) return;

    this.name = this.name ?? this.DEFAULT_NAME;
    this.item = {...this.item, name: this.name};

    if (this.item?.id === null) {
      this.userService.createNewDocument(this.item?.author?.id, this.item)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackbarService.openSaveSuccessAnnouncement('Document created successfully');
            this.documentService.change.next();
          },
          error: (error) => this.handleErrorResponse(error)
        });
    } else {
      this.documentService.updateNameDocument(this.userService.user.getValue()?.id, this.item?.id, this.item)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackbarService.openSaveSuccessAnnouncement('Document updated successfully');
            this.documentService.change.next();
          },
          error: (error) => this.handleErrorResponse(error)
        });
    }
  }

  onDocumentStarredUpdate(isStarred: boolean) {
    if (!this.preProcessAction()) return;

    console.log('onDocumentStarredUpdate', isStarred);

    if (this.item?.relationship.isStarred === isStarred) return;

    const relationship: UserDocumentModel = {...this.item?.relationship, isStarred};

    this.documentService.updateStarredDocument(this.userService.user.getValue()?.id, this.item?.id, relationship)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackbarService.openSaveSuccessAnnouncement('Document starred updated successfully');
          this.documentService.change.next();
        },
        error: (error) => this.handleErrorResponse(error)
      });
  }

  onDocumentDelete() {
    if (!this.preProcessAction()) return;

    this.documentService.deleteDocument(this.userService.user.getValue()?.id, this.item?.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackbarService.openWarningAnnouncement('Document deleted successfully');
          this.documentService.change.next();
        },
        error: (error) => this.handleErrorResponse(error)
      });
  }

  handleErrorResponse(error: any) {
    this.snackbarService.openRequestErrorAnnouncement(error);
    this.documentService.change.next();
  }

  preProcessAction(): boolean {
    if (this.item?.author?.id === null || this.userService.user?.getValue().id === null) {
      this.snackbarService.openErrorAnnouncement('Something was wrong or You are not authorized to perform this action');
      return false;
    }
    return true;
  }

  onMenuItemClicked(actionOption: any) {
    actionOption = actionOption as CardActionMenuEnum;

    switch (actionOption) {
      case CardActionMenuEnum.SHARE: {
        console.log('share');
        break;
      }
      case CardActionMenuEnum.GET_LINK: {
        console.log('get_link');
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
        console.log('rename');
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
