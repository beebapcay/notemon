import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PersistenceService} from './persistence.service';
import {AuthService} from './auth.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [PersistenceService, AuthService],
  exports: [CommonModule],
})
export class ServiceModule {
}
