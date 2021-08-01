import { Component, Input, OnChanges } from '@angular/core';

import { AppService } from '../app.service';
import { EuroPipe } from '../euro.pipe';
import { increasePrice } from '../utils';

@Component({
  selector: 'jest-showcase-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnChanges {
  @Input() public price = 0;
  public priceTag: string | null = null;
  public constructor(
    private appService: AppService,
    private euroPipe: EuroPipe
  ) {}
  public ngOnChanges(): void {
    this.getPriceTag();
  }

  public getHigherPrice(price: number) {
    return increasePrice(price, 2);
  }

  // ====== Use case 2: Method overload
  public getPriceTag() {
    this.appService.getPrice(true, this.price).then((price) => {
      this.priceTag = this.euroPipe.transform(
        this.getHigherPrice(price || 0) || ''
      );
    });
  }
}
