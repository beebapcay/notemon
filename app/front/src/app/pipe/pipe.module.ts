import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthBgImgPipe} from './auth-bg-img.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AuthBgImgPipe],
  exports: [CommonModule, AuthBgImgPipe],
})
export class PipeModule {
}
