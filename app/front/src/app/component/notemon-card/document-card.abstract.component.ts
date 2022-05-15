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

    if (this.item?.id === null) {
      this.name = this.name ?? this.DEFAULT_NAME;
      this.item = {...this.item, name: this.name};

      this.userService.createNewDocument(this.item?.author?.id, this.item)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackbarService.openSaveSuccessAnnouncement('Document created successfully');
            this.documentService.change.next();
          },
          error: (error) => this.snackbarService.openRequestErrorAnnouncement(error)
        });
    } else {
      // rename
    }
  }

  preProcessAction(): boolean {
    if (this.item?.author?.id === null) {
      this.snackbarService.openErrorAnnouncement('You are not authorized to perform this action');
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
        console.log('add to starred');
        break;
      }
      case CardActionMenuEnum.REMOVE_FROM_STARRED: {
        console.log('remove from starred');
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
        console.log('remove');
        break;
      }
      default: {
        this.snackbarService.openErrorAnnouncement('Unknown action option');
      }
    }
  }
}
