import {Component, OnInit} from '@angular/core';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

@Component({
  selector: 'app-notemon-editor',
  templateUrl: './notemon-editor.component.html',
  styleUrls: ['./notemon-editor.component.scss']
})
export class NotemonEditorComponent implements OnInit {

  readonly Editor = Editor;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

}
