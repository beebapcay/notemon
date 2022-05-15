import {
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
import { NotemonTypeEnum } from '../../enum/notemon-type.enum';
import { DocumentModel } from '../../model/document.model';
import { DocumentService } from '../../service/document.service';
import { SnackbarService } from '../../service/snackbar.service';
import { UserService } from '../../service/user.service';

@Component({
  template: ''
})
export abstract class DocumentCardAbstractComponent<T extends DocumentModel> implements OnInit, AfterViewInit, OnChanges {
  @Input() item: T = null;
  @Input() isUpdating: boolean = false;

  protected constructor(
    protected userService: UserService,
    protected snackbarService: SnackbarService,
    protected documentService: DocumentService
  ) {
  }

  readonly DEFAULT_NAME = 'New Directory';

  name: string = this.DEFAULT_NAME;
  ignoreFirstClickOutside: boolean = true;

  @ViewChild('nameInput') nameInput: ElementRef;

  readonly NotemonCardTypeEnum = NotemonTypeEnum;

  get nameInputElement(): HTMLInputElement {
    return this.nameInput.nativeElement;
  }

  ngOnInit(): void {
    this.name = this.item?.name ?? this.DEFAULT_NAME;
  }

  ngAfterViewInit(): void {
    if (this.isUpdating) {
      this.nameInputElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isUpdating']?.currentValue === true && changes['isUpdating']?.previousValue === false) {
      this.name = this.item?.name ?? this.DEFAULT_NAME;
      this.nameInputElement.focus();
    }

    if (changes['item']?.currentValue?.name !== changes['item']?.previousValue?.name) {
      this.name = this.item?.name ?? this.DEFAULT_NAME;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickedOutsideNameInput(event: MouseEvent) {
    if (this.ignoreFirstClickOutside) {
      this.ignoreFirstClickOutside = false;
      return;
    }

    if (this.isUpdating && !this.nameInputElement.contains(event.target as Node)) {
      console.log('clicked outside');
      this.isUpdating = false;
      this.nameInputElement.blur();
      this.onDocumentNameUpdated();
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterPressedNameInput(event: KeyboardEvent) {
    if (this.isUpdating && event.target === this.nameInputElement) {
      this.isUpdating = false;
      this.nameInputElement.blur();
      this.onDocumentNameUpdated();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePressedNameInput(event: KeyboardEvent) {
    if (this.isUpdating && event.target === this.nameInputElement) {
      this.isUpdating = false;
      this.nameInputElement.blur();
      this.onDocumentNameUpdated();
    }
  }

  onDocumentNameUpdated() {
    if (!this.preProcessAction()) return;

    if (this.item?.id === null) {
      this.name = this.name ?? this.DEFAULT_NAME;
      const document: DocumentModel = {...this.item, name: this.name};

      this.userService.createNewDocument(document?.author?.id, document)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackbarService.openSaveSuccessAnnouncement('Document created successfully');
            this.documentService.change.next();
          },
          error: (error) => this.snackbarService.openRequestErrorAnnouncement(error)
        });
    }
  }

  preProcessAction(): boolean {
    if (this.item?.author?.id === null) {
      this.snackbarService.openErrorAnnouncement('You are not authorized to perform this action');
      return false;
    }
    return true;
  }
}
