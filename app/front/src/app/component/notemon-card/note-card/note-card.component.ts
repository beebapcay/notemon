import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SizeEnum } from '../../../enum/size.enum';
import { NoteModel } from '../../../model/note.model';
import { DocumentService } from '../../../service/document.service';
import { SnackbarService } from '../../../service/snackbar.service';
import { UserService } from '../../../service/user.service';
import { DocumentCardAbstractComponent } from '../document-card.abstract.component';

@Component({
  selector: 'app-note-card-main',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent extends DocumentCardAbstractComponent<NoteModel> implements OnInit, AfterViewInit, OnChanges {

  readonly SizeEnum = SizeEnum;

  constructor(
    userService: UserService,
    snackbarService: SnackbarService,
    documentService: DocumentService
  ) {
    super(userService, snackbarService, documentService);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }
}
