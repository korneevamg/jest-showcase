import * as increasePricePureFunction from './../utils';

import { Component, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { AppService } from './../app.service';
import { EuroPipe } from './../euro.pipe';
import { MockPipe } from 'ng-mocks';
import { PriceComponent } from './price.component';

@Component({
  selector: `jest-showcase-test-parent-component`,
  template: `<jest-showcase-price></jest-showcase-price>`,
})
class TestParentComponent {
  @ViewChild(PriceComponent)
  public testPriceComponent!: PriceComponent;
}

describe('AppComponent', () => {
  let testParentComponent: TestParentComponent;
  let testParentFixture: ComponentFixture<TestParentComponent>;
  let component: PriceComponent;
  let fixture: ComponentFixture<PriceComponent>;
  let mockedEuroPipe: EuroPipe;
  let appServiceStub: Partial<AppService>;
  beforeEach(async () => {
    appServiceStub = {
      getPrice: jest
        .fn()
        .mockImplementation((isPriceAvailable: true, value: number) =>
          Promise.resolve(value)
        ),
    };
    await TestBed.configureTestingModule({
      providers: [{ provide: AppService, useValue: appServiceStub }, EuroPipe],
      declarations: [TestParentComponent, PriceComponent, MockPipe(EuroPipe)],
    }).compileComponents();
    mockedEuroPipe = TestBed.inject(EuroPipe);
    fixture = TestBed.createComponent(PriceComponent);
    component = fixture.componentInstance;
    testParentFixture = TestBed.createComponent(TestParentComponent);
    testParentComponent = testParentFixture.componentInstance;
    testParentFixture.detectChanges();
  });

  // https://betterprogramming.pub/testing-angular-components-with-input-3bd6c07cfaf6
  it('should set priceTag', fakeAsync(() => {
    type EuroPipeFirstOverload = (
      value: number | string,
      digitsInfo?: string
    ) => string | null;
    (mockedEuroPipe.transform as EuroPipeFirstOverload) = jest
      .fn()
      .mockImplementation((x: number | string) => `${x} €`);
    testParentComponent.testPriceComponent.price = 5;
    testParentComponent.testPriceComponent.ngOnChanges();
    tick();
    testParentFixture.detectChanges();
    expect(testParentComponent.testPriceComponent.priceTag).toBe('10 €');
    expect(
      testParentFixture.nativeElement.querySelector('p:nth-child(2)')
        .textContent
    ).toBe('10 €');
  }));

  it('should mock the right overload', fakeAsync(() => {
    // Just mocking the return value would not work
    //jest.spyOn(mockedEuroPipe, 'transform').mockReturnValue('20,00\xA0€');
    // For more details check: https://medium.com/javascript-in-plain-english/mocking-ts-method-overloads-with-jest-e9c3d3f1ce0c
    type EuroPipeFirstOverload = (
      value: number | string,
      digitsInfo?: string
    ) => string | null;
    (mockedEuroPipe.transform as EuroPipeFirstOverload) = jest
      .fn()
      .mockReturnValue('20,00\xA0€');
    component.getPriceTag();
    tick();
    expect(component.priceTag).toEqual('20,00\xA0€');
  }));

  describe('getHigherPrice', () => {
    it('should call increasePrice', () => {
      const increasePriceSpy = jest.spyOn(
        increasePricePureFunction,
        'increasePrice'
      );
      component.getHigherPrice(5);
      expect(increasePriceSpy).toHaveBeenCalledWith(5, 2);
    });
  });
});
