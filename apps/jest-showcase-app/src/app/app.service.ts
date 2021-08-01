import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public async getPrice(isPriceAvailable: boolean): Promise<void>;
  public async getPrice(
    isTimeout: boolean,
    someValue: number
  ): Promise<number | null>;
  public async getPrice(
    isPriceAvailable: boolean,
    someValue?: string | number
  ) {
    return someValue && isPriceAvailable
      ? Promise.resolve(someValue || null)
      : Promise.resolve();
  }
}
