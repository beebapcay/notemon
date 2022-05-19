import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { take } from 'rxjs';
import { NoteModel } from '../../model/note.model';
import { UserModel } from '../../model/user.model';
import { DocumentService } from '../../service/document.service';
import { SnackbarService } from '../../service/snackbar.service';
import { UserService } from '../../service/user.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';

interface ICdkEditorConfig {
  editorData: string;
}

@Component({
  selector: 'app-notemon-editor',
  templateUrl: './notemon-editor.component.html',
  styleUrls: ['./notemon-editor.component.scss']
})
export class NotemonEditorComponent extends SubscriptionAwareAbstractComponent implements OnInit, OnChanges {
  @Input() note: NoteModel = NoteModel.create() as NoteModel;

  @ViewChild('editor') editorComponent: CKEditorComponent;

  user: UserModel;

  isInitializingCompleted: boolean = false;
  loveNumber: number = 0;

  readonly Editor = Editor;

  constructor(private documentService: DocumentService,
              private userService: UserService,
              private snackbarService: SnackbarService) {
    super();
    this.note = NoteModel.create() as NoteModel;
  }


  ngOnInit(): void {
    this.registerSubscription(
      this.userService.user.subscribe(user => {
          this.user = user;
        }
      ));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['note'].previousValue?.content && changes['note'].currentValue?.content && !this.isInitializingCompleted) {
      this.isInitializingCompleted = true;
      this.editorComponent.editorInstance.setData(this.note.content);
    }
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
            next: () => console.log(`Successfully updated. Love MY DUYEN x${this.loveNumber++}`),
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
