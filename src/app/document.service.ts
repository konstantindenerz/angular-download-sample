import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DocumentService {
  async get() {
    return fetch('/assets/sample.pdf');
  }
}
