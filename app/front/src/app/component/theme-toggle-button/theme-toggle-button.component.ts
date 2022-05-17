import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ThemeEnum} from '../../enum/theme.enum';

import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'theme-toggle-button',
  templateUrl: './theme-toggle-button.component.html',
  styleUrls: ['./theme-toggle-button.component.scss']
})
export class ThemeToggleButtonComponent implements OnInit {
  @Input() theme: ThemeEnum = ThemeEnum.LIGHT;
  @Output() themeChangeEmitter = new EventEmitter<ThemeEnum>();

  isDarkTheme = false;

  readonly faSun = faSun;
  readonly faMoon = faMoon;

  constructor(private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.isDarkTheme = this.theme === ThemeEnum.DARK;
  }

  onThemeChange() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeChangeEmitter.emit(this.isDarkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT);
    this.snackbarService.openWarningAnnouncement('Now, we don\'t support dark theme, sorry.');

    if (this.isDarkTheme) {
      setTimeout(() => {
        this.isDarkTheme = false;
      }, 1000);
    }
  }
}
