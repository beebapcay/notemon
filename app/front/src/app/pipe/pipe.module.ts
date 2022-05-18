import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthBgImgPipe} from './auth-bg-img.pipe';
import {HashtagPipe} from './hashtag.pipe';
import {NotemonCardImgPipe} from './notemon-card-img.pipe';
import { DurationFromNowPipe } from './duration-from-now.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthBgImgPipe, HashtagPipe, NotemonCardImgPipe, DurationFromNowPipe],
  exports: [CommonModule, AuthBgImgPipe, HashtagPipe, NotemonCardImgPipe, DurationFromNowPipe],
})
export class PipeModule {
}
