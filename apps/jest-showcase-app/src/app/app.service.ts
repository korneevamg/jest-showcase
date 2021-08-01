import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public getPrice(someValue: number) {
    return someValue;
  }
}
