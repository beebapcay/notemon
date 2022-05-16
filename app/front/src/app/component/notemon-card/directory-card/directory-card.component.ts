import {Component, ElementRef, ViewChild} from '@angular/core';
import {DirectoryModel} from '../../../model/directory.model';
import {DocumentService} from '../../../service/document.service';
import {SnackbarService} from '../../../service/snackbar.service';
import {UserService} from '../../../service/user.service';
import {DocumentCardAbstractComponent} from '../document-card.abstract.component';

@Component({
  selector: 'app-directory-card-main',
  templateUrl: './directory-card.component.html',
  styleUrls: ['./directory-card.component.scss']
})
export class DirectoryCardComponent extends DocumentCardAbstractComponent<DirectoryModel> {
  @ViewChild('nameInput') override nameInput: ElementRef;

  constructor(
    userService: UserService,
    snackbarService: SnackbarService,
    documentService: DocumentService) {
    super(userService, snackbarService, documentService);
  }
}









