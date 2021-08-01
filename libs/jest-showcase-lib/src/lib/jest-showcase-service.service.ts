import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const defaultAge: AgeResult = {
  age: 0,
  count: 0,
  name: 'please put your name here',
};

export interface AgeResult {
  age: number;
  count: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class JestShowcaseLibService {
  public constructor(private http: HttpClient) {}

  public async fetchAge(name: string) {
    const nameResult = await this.getName(name);
    return this.http
      .get<AgeResult>(`https://api.agify.io?name=${nameResult}`)
      .toPromise();
  }

  // A simplified version of the call to focus on testig http requests
  public sendAgeRequest(name: string) {
    return this.http
      .get<AgeResult>(`https://api.agify.io?name=${name}`)
      .pipe(catchError(() => of(defaultAge)));
  }

  private async getName(name: string) {
    return Promise.resolve(name);
  }
  public isAlwaysTruthy() {
    return true;
  }

  public returnTruthyValue() {
    return 'someThruthyValue';
  }

  public returnObject() {
    return { someKey: 'someValue' };
  }
}
