import {
  AgeResult,
  JestShowcaseLibService,
} from '@jest-showcase/jest-showcase-lib';

import { Component } from '@angular/core';

@Component({
  selector: 'jest-showcase-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss'],
})

/**
 * @description AgeComponent is an autonomous component for mocks showcase.
 * Please note that the implementation does not follow best practices, it merely provides structure for the test.
 */
export class AgeComponent {
  public age: number | null = null;
  public name = '';
  constructor(private jestShowcaseLibService: JestShowcaseLibService) {}
  public getAge() {
    if (this.name) {
      this.jestShowcaseLibService.fetchAge(this.name).then((ageResult) => {
        this.extractAgeInformation(ageResult);
      });
    }
  }

  private extractAgeInformation(ageInfo: AgeResult) {
    // You would probably do more stuff here in a real world scenario
    this.age = ageInfo.age;
  }
}
