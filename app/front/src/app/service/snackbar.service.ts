import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../component/snackbar/snackbar.component';
import { SnackbarStatusEnum } from '../enum/snackbar-status.enum';

export interface ISnackbarConfig extends MatSnackBarConfig {
  message?: string,
  status?: SnackbarStatusEnum,
  closeButtonLabel?: string,
  onClose?: () => void
}

@Injectable({providedIn: 'root'})
export class SnackbarService {
  static DEFAULT_CONFIG: ISnackbarConfig = {
    duration: 5000,
    verticalPosition: 'bottom',
    horizontalPosition: 'right',
    status: SnackbarStatusEnum.info
  }

  constructor(private matSnackbar: MatSnackBar) {
  }

  getConfig(config: ISnackbarConfig): MatSnackBarConfig {
    return {
      duration: config.duration ?? SnackbarService.DEFAULT_CONFIG.duration,
      data: {
        message: config.message,
        duration: config.duration ?? SnackbarService.DEFAULT_CONFIG.duration,
        onClose: config.onClose,
        closeButtonLabel: config.closeButtonLabel ?? 'Close',
        status: config.status ?? SnackbarStatusEnum.info
      },
      panelClass: [...(config.panelClass ?? []), `snackbar-${config.status ?? SnackbarService.DEFAULT_CONFIG.status}`],
      verticalPosition: config.verticalPosition ?? SnackbarService.DEFAULT_CONFIG.verticalPosition,
      horizontalPosition: config.horizontalPosition ?? SnackbarService.DEFAULT_CONFIG.horizontalPosition
    }
  }

  open(config: ISnackbarConfig): void {
    this.matSnackbar.openFromComponent(SnackbarComponent, this.getConfig(config));
  }

  openWarningAnnouncement(message: string): void {
    this.open({message: message ?? 'Warning Announcement', status: SnackbarStatusEnum.warning});
  }

  openSuccessAnnouncement(message: string): void {
    this.open({message: message ?? 'Success Announcement', status: SnackbarStatusEnum.success});
  }

  openSaveSuccessAnnouncement(message: string): void {
    this.open({message: message ?? 'Saved successfully', status: SnackbarStatusEnum.success});
  }

  openInfoAnnouncement(message: string): void {
    this.open({message: message ?? 'Information Announcement', status: SnackbarStatusEnum.info});
  }

  openErrorAnnouncement(message: string): void {
    this.open({message: message ?? 'Error Announcement', status: SnackbarStatusEnum.error});
  }

  openRequestErrorAnnouncement(error: any): void {
    this.open({
      message: error?.error?.error?.message ?? error?.error?.message ?? error?.message ?? error?.statusText ?? error ?? 'Request error',
      status: SnackbarStatusEnum.error
    });
  }
}
