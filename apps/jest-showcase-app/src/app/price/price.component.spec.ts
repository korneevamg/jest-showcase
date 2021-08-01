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

/**
 * To test input properties you can wrap the compoent under test by a test parent
 * https://betterprogramming.pub/testing-angular-components-with-input-3bd6c07cfaf6
 */
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
  /**
   * You can use Partial to mock just the relevant part of AppService
   * Be careful with this method though - you are halve-mocking the stuff
   * Use MockProvider(AppService) and spyOn instead
   */
  let appServiceStub: Partial<AppService>;
  beforeEach(async () => {
    appServiceStub = {
      getPrice: jest.fn().mockImplementation((value: number) => value),
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
  it('should set priceTag', () => {
    type EuroPipeFirstOverload = (
      value: number | string,
      digitsInfo?: string
    ) => string | null;
    (mockedEuroPipe.transform as EuroPipeFirstOverload) = jest
      .fn()
      .mockImplementation((x: number | string) => `${x} €`);
    testParentComponent.testPriceComponent.price = 5;
    /**
     * If you are doing stuff in ngOnChanges, you will have to call it manually
     * since ngOnChanges is not called automatically in tests during programmatic input changes.
     * https://infinum.com/handbook/books/frontend/angular/angular-guidelines-and-best-practices/testing#testing-component-inputs */
    testParentComponent.testPriceComponent.ngOnChanges();
    testParentFixture.detectChanges();
    expect(testParentComponent.testPriceComponent.priceTag).toBe('10 €');
    /**
     * You can use nth-child(2) if you have more than one p-tag in your template
     * Alternativelly, you can use querySelectorAll - cf. app.component.spec.ts
     */
    expect(
      testParentFixture.debugElement.nativeElement.querySelector(
        'p:nth-child(2)'
      ).textContent
    ).toBe('10 €');
  });

  it('should mock the right overload', fakeAsync(() => {
    /**
     * Just mocking the return value of the overloaded method would not work, you have to cast it first
     * jest.spyOn(mockedEuroPipe, 'transform').mockReturnValue('20,00\xA0€');
     * For more details check: https://medium.com/javascript-in-plain-english/mocking-ts-method-overloads-with-jest-e9c3d3f1ce0c
     */
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

  /**
   * The full power of unit tests for input testing can be leveraged by test.each since Jest ist really fast
   */
  describe('getPriceOpinion', () => {
    test.each`
      price | expected
      ${-1} | ${'perfect'}
      ${0}  | ${'perfect'}
      ${1}  | ${'ok'}
      ${7}  | ${'ok'}
      ${8}  | ${'too high'}
      ${9}  | ${'too high'}
    `('returns $expected when price is $price', ({ price, expected }) => {
      component.price = price;
      expect(component.getPriceOpinion()).toBe(expected);
    });
  });
});
