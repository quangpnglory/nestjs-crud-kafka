import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class ResponseService {
  private readonly subjectList: Map<string, Subject<unknown>> = new Map();

  add(key: string, subject: Subject<unknown>): void {
    this.subjectList.set(key, subject);
  }

  get(key): Subject<unknown> {
    const subject = this.subjectList.get(key);
    this.subjectList.delete(key);

    return subject;
  }

  getList(): Map<string, Subject<unknown>> {
    return this.subjectList;
  }
}
