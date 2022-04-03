import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemeEnum} from '../../enum/theme.enum';

import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'theme-toggle-button',
  templateUrl: './theme-toggle-button.component.html',
  styleUrls: ['./theme-toggle-button.component.scss']
})
export class ThemeToggleButtonComponent implements OnInit {
  @Input() theme: ThemeEnum = ThemeEnum.LIGHT;
  @Output() themeChangeEmitter = new EventEmitter<ThemeEnum>();

  public isDarkTheme = false;

  readonly faSun = faSun;
  readonly faMoon = faMoon;

  constructor() {
  }

  ngOnInit(): void {
    this.isDarkTheme = this.theme === ThemeEnum.DARK;
  }

  onThemeChange() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeChangeEmitter.emit(this.isDarkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT);
  }
}
