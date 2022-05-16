import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { PersistenceService } from './persistence.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [PersistenceService, AuthService],
  exports: [CommonModule],
})
export class ServiceModule {
}
