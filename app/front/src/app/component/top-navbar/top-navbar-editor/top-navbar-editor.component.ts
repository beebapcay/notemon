import { Clipboard } from '@angular/cdk/clipboard';
import {Component, Input, OnInit} from '@angular/core';
import {AppRouteConstant} from '../../../common/app-route.constant';
import {AssetsSrcConstant} from '../../../common/assets-src.constant';
import {DocumentModel} from '../../../model/document.model';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-top-navbar-editor',
  templateUrl: './top-navbar-editor.component.html',
  styleUrls: ['./top-navbar-editor.component.scss']
})
export class TopNavbarEditorComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() item: DocumentModel;

  readonly AppRouteConstant = AppRouteConstant;
  readonly AssetsSrcConstant = AssetsSrcConstant;

  constructor(private snackbarService: SnackbarService,
              private clipboardService: Clipboard) {
  }

  ngOnInit(): void {
  }

  onShareClicked() {
    const origin = window.location.origin;
    this.clipboardService.copy(`${origin}/share/${this.item?.shareCode}`);

    this.snackbarService.openSuccessAnnouncement('Link for sharing was copied to clipboard.');
  }

}
