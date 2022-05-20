import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {take} from 'rxjs';
import {NoteModel} from '../../model/note.model';
import {UserModel} from '../../model/user.model';
import {DocumentService} from '../../service/document.service';
import {SnackbarService} from '../../service/snackbar.service';
import {UserService} from '../../service/user.service';
import {SubscriptionAwareAbstractComponent} from '../subscription-aware.abstract.component';


@Component({
  selector: 'app-notemon-editor',
  templateUrl: './notemon-editor.component.html',
  styleUrls: ['./notemon-editor.component.scss']
})
export class NotemonEditorComponent extends SubscriptionAwareAbstractComponent implements OnInit, OnDestroy {
  @Input() note: NoteModel = NoteModel.create() as NoteModel;

  user: UserModel;

  sectionTimeInterval: number;

  readonly Editor = Editor;

  constructor(private documentService: DocumentService,
              private userService: UserService,
              private snackbarService: SnackbarService) {
    super();
  }


  ngOnInit(): void {
    this.registerSubscription(
      this.userService.user.subscribe(user => {
          this.user = user;
        }
      ));

    this.sectionTimeInterval = setInterval(() => {
      this.note.summary.sectionTime++;
      console.log(this.note.summary.sectionTime);
    }, 1000);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    clearInterval(this.sectionTimeInterval);
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  updateContent({editor}: ChangeEvent) {
    const data = editor.getData();

    if (!this.preProcessAction()) return;

    this.note.content = data;

    this.registerSubscription(
      this.documentService.updateContentDocument(this.user?.id, this.note?.id, this.note)
        .pipe(take(1))
        .subscribe({
            error: error => this.handleErrorResponse(error)
          }
        ));

  }

  handleErrorResponse(error: any) {
    this.snackbarService.openRequestErrorAnnouncement(error);
  }

  preProcessAction(): boolean {
    if (this.note?.author?.id === null || this.user === null) {
      this.snackbarService.openErrorAnnouncement('Something was wrong or You are not authorized to perform this action');
      return false;
    }
    return true;
  }
}
