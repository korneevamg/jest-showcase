import { AppService } from './app.service';
import { Component } from '@angular/core';
import { JestShowcaseLibService } from '@jest-showcase/jest-showcase-lib';

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

  public checkOverride() {
    return this.jestShowcaseLibService.isAlwaysTruthy();
  }

  public increasePrice() {
    this.price++;
  }
}
