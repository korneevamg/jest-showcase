import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { CurrencyPipe } from '@angular/common';

@Injectable()
@Pipe({
  name: 'toEuro',
})
export class EuroPipe extends CurrencyPipe implements PipeTransform {
  public transform(value: number | string, digitsInfo?: string): string | null;
  public transform(value: null | undefined, digitsInfo?: string): null;
  public transform(
    value: number | string | null | undefined,
    digitsInfo?: string
  ) {
    return super.transform(value, 'EUR', 'symbol', digitsInfo);
  }
}

export const createEuroPipe = (locale: string) => new EuroPipe(locale);
