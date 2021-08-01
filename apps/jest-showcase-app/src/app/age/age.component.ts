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
    this.age = ageInfo.age;
  }
}
