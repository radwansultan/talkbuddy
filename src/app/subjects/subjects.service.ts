import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private successSubject = new Subject<boolean>();
  private errorSubject = new Subject<boolean>();
  private infoSubject = new Subject<boolean>();

  getSuccessSubject(): Subject<boolean> {
    return this.successSubject;
  }

  getErrorSubject(): Subject<any> {
    return this.errorSubject;
  }

  getInfoSubject(): Subject<any> {
    return this.infoSubject;
  }
}
