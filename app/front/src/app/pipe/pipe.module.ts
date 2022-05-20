import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthBgImgPipe} from './auth-bg-img.pipe';
import {HashtagPipe} from './hashtag.pipe';
import {NotemonCardImgPipe} from './notemon-card-img.pipe';
import {DurationFromNowPipe} from './duration-from-now.pipe';
import {Seconds2timePipe} from './seconds2time.pipe';
import {ContentSummaryPipe} from './content-summary.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthBgImgPipe, HashtagPipe, NotemonCardImgPipe, DurationFromNowPipe, Seconds2timePipe, ContentSummaryPipe],
  exports: [CommonModule, AuthBgImgPipe, HashtagPipe, NotemonCardImgPipe, DurationFromNowPipe, Seconds2timePipe],
})
export class PipeModule {
}
