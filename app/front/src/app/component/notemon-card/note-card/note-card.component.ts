import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SizeEnum } from '../../../enum/size.enum';
import { NoteModel } from '../../../model/note.model';
import { DocumentCardAbstractComponent } from '../document-card.abstract.component';

@Component({
  selector: 'app-note-card-main',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent extends DocumentCardAbstractComponent<NoteModel> implements OnInit, AfterViewInit, OnChanges {

  readonly SizeEnum = SizeEnum;

  constructor() {
    super();
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
