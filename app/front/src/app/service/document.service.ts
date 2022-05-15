import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  static readonly AUTH_URL = environment.backend.baseUrl + '/documents';

  constructor() {
  }
}
