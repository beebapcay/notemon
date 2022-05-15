import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NotemonTypeEnum } from '../../enum/notemon-type.enum';
import { DocumentModel } from '../../model/document.model';

@Component({
  template: ''
})
export abstract class DocumentCardAbstractComponent<T extends DocumentModel> implements OnInit, AfterViewInit, OnChanges {
  @Input() item: T = null;
  @Input() isUpdating: boolean = false;

  @Output() nameChangedEmitted = new EventEmitter<string>();

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
      this.nameChangedEmitted.emit(this.name ?? this.DEFAULT_NAME);
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnterPressedNameInput(event: KeyboardEvent) {
    if (this.isUpdating && event.target === this.nameInputElement) {
      this.isUpdating = false;
      this.nameInputElement.blur();
      this.nameChangedEmitted.emit(this.name ?? this.DEFAULT_NAME);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePressedNameInput(event: KeyboardEvent) {
    if (this.isUpdating && event.target === this.nameInputElement) {
      this.isUpdating = false;
      this.nameInputElement.blur();
      this.nameChangedEmitted.emit(this.item?.name ?? this.DEFAULT_NAME);
    }
  }


}
