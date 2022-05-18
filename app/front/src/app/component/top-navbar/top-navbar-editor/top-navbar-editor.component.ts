import {Component, Input, OnInit} from '@angular/core';
import {AppRouteConstant} from '../../../common/app-route.constant';
import {AssetsSrcConstant} from '../../../common/assets-src.constant';
import {DocumentModel} from '../../../model/document.model';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
