import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeEnum } from '../enum/theme.enum';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme: BehaviorSubject<ThemeEnum> = new BehaviorSubject(null);

  constructor() { }


}
