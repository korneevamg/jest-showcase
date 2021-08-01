import { Component, Input, OnChanges } from '@angular/core';

import { AppService } from '../app.service';
import { EuroPipe } from '../euro.pipe';
import { increasePrice } from '../utils';

/**
 * @description PriceComponent is a child component with input to showcase testing components with input.
 * Please note that the implementation does not follow best practices, it merely provides structure for the test.
 */

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

  public getPriceTag() {
    const priceResult = this.appService.getPrice(this.price);
    // You would probably move this functionality to the pipe ina real world scenario
    this.priceTag = this.euroPipe.transform(
      this.getHigherPrice(priceResult || 0) || ''
    );
  }

  public getPriceOpinion() {
    switch (true) {
      case this.price <= 0:
        return 'perfect';
      case this.price < 8:
        return 'ok';
      case this.price >= 8:
        return 'too high';
      default:
        return 'not clear';
    }
  }
}
