import {Component, OnInit} from '@angular/core';
import {IOptionSidebarItem} from './option-sidebar-item/option-sidebar-item.component';

@Component({
  selector: 'app-option-sidebar',
  templateUrl: './option-sidebar.component.html',
  styleUrls: ['./option-sidebar.component.scss']
})
export class OptionSidebarComponent implements OnInit {

  optionItems: IOptionSidebarItem[] = [
    {
      icon: 'featured_play_list',
      label: 'Outline',
      extraClass: 'outline',
    }, {
      icon: 'style',
      label: 'Goal',
      extraClass: 'goal',
    }, {
      icon: 'my_location',
      label: 'Mode',
      extraClass: 'mode',
    }];

  constructor() {
  }

  ngOnInit(): void {
  }

}
