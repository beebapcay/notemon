import { Component, Input, OnInit } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-option-menu-card',
  templateUrl: './option-menu-card.component.html',
  styleUrls: ['./option-menu-card.component.scss']
})
export class OptionMenuCardComponent implements OnInit {
  @Input() matMenu: MatMenu;

  constructor() {
  }

  ngOnInit(): void {
  }

}
