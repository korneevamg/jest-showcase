import { Component } from '@angular/core';
import { JestShowcaseLibService } from '@jest-showcase/jest-showcase-lib';

/**
 * @description AppComponent is an autonomous component for mocks showcase.
 * Please note that the implementation does not follow best practices, it merely provides structure for the test.
 */
@Component({
  selector: 'jest-showcase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public price = 5;
  public constructor(private jestShowcaseLibService: JestShowcaseLibService) {}
  public goSomewhereElse() {
    window.location.href = 'https://jestjs.io';
  }

  public increasePrice() {
    this.price++;
  }
}
