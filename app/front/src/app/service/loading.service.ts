import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingBar: BehaviorSubject<boolean> = new BehaviorSubject(null);
  loadingSpinner: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor() {
  }

  showLoadingBar() {
    this.loadingBar.next(true);
  }

  hideLoadingBar() {
    this.loadingBar.next(false);
  }

  showLoadingSpinner() {
    this.loadingSpinner.next(true);
  }

  hideLoadingSpinner() {
    this.loadingSpinner.next(false);
  }
}
