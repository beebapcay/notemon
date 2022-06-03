import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NotemonTypeEnum } from '../../../enum/notemon-type.enum';
import { DocumentModel } from '../../../model/document.model';
import { DocumentService } from '../../../service/document.service';
import { LoadingService } from '../../../service/loading.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { UserService } from '../../../service/user.service';
import { DocumentCardAbstractComponent } from '../document-card.abstract.component';

@Component({
  selector: 'app-notemon-card-variant',
  templateUrl: './notemon-card-variant.component.html',
  styleUrls: ['./notemon-card-variant.component.scss']
})
export class NotemonCardVariantComponent extends DocumentCardAbstractComponent<DocumentModel> {
  @ViewChild('nameInput') override nameInput: ElementRef;

  constructor(
    userService: UserService,
    snackbarService: SnackbarService,
    documentService: DocumentService,
    clipboardService: Clipboard,
    loadingService: LoadingService) {
    super(userService, snackbarService, documentService, clipboardService, loadingService);
  }

  public getType(): NotemonTypeEnum {
    return this.item?.isDirectory ? NotemonTypeEnum.DIRECTORY : NotemonTypeEnum.NOTE;
  }
}
