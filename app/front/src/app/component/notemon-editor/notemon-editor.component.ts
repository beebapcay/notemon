import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { finalize, take } from 'rxjs';
import { IKeyValue } from '../../common/common.interface';
import { SizeEnum } from '../../enum/size.enum';
import { NoteModel } from '../../model/note.model';
import { UserModel } from '../../model/user.model';
import { DocumentService } from '../../service/document.service';
import { LoadingService } from '../../service/loading.service';
import { SnackbarService } from '../../service/snackbar.service';
import { UserService } from '../../service/user.service';
import { SubscriptionAwareAbstractComponent } from '../subscription-aware.abstract.component';


@Component({
  selector: 'app-notemon-editor',
  templateUrl: './notemon-editor.component.html',
  styleUrls: ['./notemon-editor.component.scss']
})
export class NotemonEditorComponent extends SubscriptionAwareAbstractComponent implements OnInit, OnDestroy {
  @Input() note: NoteModel = NoteModel.create() as NoteModel;

  user: UserModel;

  sectionTimeInterval: number;

  editorConfig: IKeyValue;

  readonly Editor = Editor;
  readonly SizeEnum = SizeEnum;

  constructor(private documentService: DocumentService,
              private userService: UserService,
              private snackbarService: SnackbarService,
              private loadingService: LoadingService) {
    super();

    this.configureEditor();
  }

  configureEditor() {
    this.editorConfig = {
      autosave: {
        waitingTime: 1000,
        save: editor => this.saveContent(editor.getData())
      },
      wordCount: {
        onUpdate: stats => {
          this.note.summary.words = stats.words;
          this.note.summary.characters = stats.characters;
        }
      }
    }
  }


  ngOnInit(): void {
    this.registerSubscription(
      this.userService.user.subscribe(user => {
          this.user = user;
        }
      ));

    this.sectionTimeInterval = setInterval(() => {
      this.note.summary.sectionTime++;
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

  saveContent(content: string) {
    if (!this.preProcessAction()) return;

    this.note.content = content;

    this.loadingService.showLoadingSpinner();

    this.registerSubscription(
      this.documentService.updateContentDocument(this.user?.id, this.note?.id, this.note)
        .pipe(take(1), finalize(() => this.loadingService.hideLoadingSpinner()))
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
