import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  static readonly AUTH_URL = environment.backend.baseUrl + '/documents';

  change: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  constructor() {
  }
}
