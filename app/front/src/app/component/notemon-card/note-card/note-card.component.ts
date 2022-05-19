import { Clipboard } from '@angular/cdk/clipboard';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {SizeEnum} from '../../../enum/size.enum';
import {NoteModel} from '../../../model/note.model';
import {DocumentService} from '../../../service/document.service';
import {SnackbarService} from '../../../service/snackbar.service';
import {UserService} from '../../../service/user.service';
import {DocumentCardAbstractComponent} from '../document-card.abstract.component';
import {AppRouteConstant} from '../../../common/app-route.constant';

@Component({
  selector: 'app-note-card-main',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent extends DocumentCardAbstractComponent<NoteModel> {
  @ViewChild('nameInput') override nameInput: ElementRef;

  readonly SizeEnum = SizeEnum;
  readonly AppRouteConstant = AppRouteConstant;

  constructor(
    userService: UserService,
    snackbarService: SnackbarService,
    documentService: DocumentService,
    clipboardService: Clipboard
  ) {
    super(userService, snackbarService, documentService, clipboardService);
  }
}
