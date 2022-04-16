import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PersistenceService} from './persistence.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [PersistenceService],
  exports: [CommonModule],
})
export class ServiceModule {
}
