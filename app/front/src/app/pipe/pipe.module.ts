import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthBgImgPipe } from './auth-bg-img.pipe';
import { DurationFromNowPipe } from './duration-from-now.pipe';
import { HashtagPipe } from './hashtag.pipe';
import { NotemonCardImgPipe } from './notemon-card-img.pipe';
import { PluralSuffixPipe } from './plural-suffix.pipe';
import { Seconds2timePipe } from './seconds2time.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthBgImgPipe, HashtagPipe, NotemonCardImgPipe, DurationFromNowPipe, Seconds2timePipe, PluralSuffixPipe],
  exports: [CommonModule, AuthBgImgPipe, HashtagPipe, NotemonCardImgPipe, DurationFromNowPipe, Seconds2timePipe, PluralSuffixPipe],
})
export class PipeModule {
}
