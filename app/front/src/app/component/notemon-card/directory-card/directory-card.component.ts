import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DirectoryModel } from '../../../model/directory.model';
import { DocumentCardAbstractComponent } from '../document-card.abstract.component';

@Component({
  selector: 'app-directory-card-main',
  templateUrl: './directory-card.component.html',
  styleUrls: ['./directory-card.component.scss']
})
export class DirectoryCardComponent extends DocumentCardAbstractComponent<DirectoryModel> implements OnInit, OnChanges, AfterViewInit {
  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}









