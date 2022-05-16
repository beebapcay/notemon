import { Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SnackbarComponent implements OnInit, OnDestroy {
  @Input() closeButtonLabel = 'Close';

  duration: number;
  displayDuration: number;
  message: string = 'Notemon Application';
  time: number = 0;
  interval;

  constructor(private snackbarRef: MatSnackBarRef<SnackbarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit(): void {

    if (this.data?.duration) {
      this.duration = this.data.duration;
      this.displayDuration = this.duration / 1000 - this.time;
      this.startTimer();
    }

    if (this.data?.closeButtonLabel) {
      this.closeButtonLabel = this.data.closeButtonLabel;
    }

    if (this.data?.message) {
      this.message = this.data.message;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.displayDuration = this.duration / 1000 - this.time++;
    }, 1000);
  }

  onClose() {
    this.snackbarRef.dismiss();
    if (this.data?.onClose) {
      this.data.onClose();
    }
  }

  getClass() {
    return `snackbar-${this.data.status}`;
  }
}
