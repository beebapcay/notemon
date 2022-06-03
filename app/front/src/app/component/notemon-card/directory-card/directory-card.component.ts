import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppRouteConstant } from '../../../common/app-route.constant';
import { DirectoryModel } from '../../../model/directory.model';
import { DocumentService } from '../../../service/document.service';
import { LoadingService } from '../../../service/loading.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { UserService } from '../../../service/user.service';
import { DocumentCardAbstractComponent } from '../document-card.abstract.component';

@Component({
  selector: 'app-directory-card-main',
  templateUrl: './directory-card.component.html',
  styleUrls: ['./directory-card.component.scss']
})
export class DirectoryCardComponent extends DocumentCardAbstractComponent<DirectoryModel> {
  @ViewChild('nameInput') override nameInput: ElementRef;

  readonly AppRouteConstant = AppRouteConstant;

  constructor(
    userService: UserService,
    snackbarService: SnackbarService,
    documentService: DocumentService,
    clipboardService: Clipboard,
    loadingService: LoadingService) {
    super(userService, snackbarService, documentService, clipboardService, loadingService);
  }
}









