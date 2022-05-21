import {Component, Input, OnInit} from '@angular/core';

export interface IOptionSidebarItem {
  icon: string;
  label: string;
  color?: string;
  extraClass?: string;
}

@Component({
  selector: 'app-option-sidebar-item',
  templateUrl: './option-sidebar-item.component.html',
  styleUrls: ['./option-sidebar-item.component.scss']
})
export class OptionSidebarItemComponent implements OnInit {
  @Input() item: IOptionSidebarItem;

  constructor() {
  }

  ngOnInit(): void {
  }

}
