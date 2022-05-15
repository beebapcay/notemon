import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NotemonTypeEnum } from '../../../enum/notemon-type.enum';
import { DocumentModel } from '../../../model/document.model';
import { DocumentService } from '../../../service/document.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { UserService } from '../../../service/user.service';
import { DocumentCardAbstractComponent } from '../document-card.abstract.component';

@Component({
  selector: 'app-notemon-card-variant',
  templateUrl: './notemon-card-variant.component.html',
  styleUrls: ['./notemon-card-variant.component.scss']
})
export class NotemonCardVariantComponent extends DocumentCardAbstractComponent<DocumentModel> implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  @ViewChild('nameInput') override nameInput: ElementRef;

  constructor(
    userService: UserService,
    snackbarService: SnackbarService,
    documentService: DocumentService) {
    super(userService, snackbarService, documentService);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  override onMenuItemClicked(actionOption: any) {
    super.onMenuItemClicked(actionOption);
  }

  override ngAfterViewChecked() {
    super.ngAfterViewChecked();
  }

  public getType(): NotemonTypeEnum {
    return this.item?.isDirectory ? NotemonTypeEnum.DIRECTORY : NotemonTypeEnum.NOTE;
  }
}
