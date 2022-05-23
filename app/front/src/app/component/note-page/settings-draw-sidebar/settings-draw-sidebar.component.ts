import {Component, OnInit} from '@angular/core';
import {WritingModeEnum} from '../../../enum/writing-mode.enum';

@Component({
  selector: 'app-settings-draw-sidebar',
  templateUrl: './settings-draw-sidebar.component.html',
  styleUrls: ['./settings-draw-sidebar.component.scss']
})
export class SettingsDrawSidebarComponent implements OnInit {

  readonly WritingModeEnum = WritingModeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

}
