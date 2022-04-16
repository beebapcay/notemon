import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthBgImgPipe} from './auth-bg-img.pipe';
import {HashtagPipe} from './hashtag.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthBgImgPipe, HashtagPipe],
  exports: [CommonModule, AuthBgImgPipe, HashtagPipe],
})
export class PipeModule {
}
