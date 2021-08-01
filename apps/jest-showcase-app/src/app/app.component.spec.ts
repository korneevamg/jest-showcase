import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  JestShowcaseLibModule,
  JestShowcaseLibService,
} from '@jest-showcase/jest-showcase-lib';
import { MockComponents, MockProvider } from 'ng-mocks';

import { AgeComponent } from './age/age.component';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { PriceComponent } from './price/price.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockedJestShowcaseLibService: JestShowcaseLibService;
  beforeEach(async () => {
    jest.resetAllMocks();
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, JestShowcaseLibModule],
      providers: [MockProvider(JestShowcaseLibService)],
      declarations: [
        AppComponent,
        MockComponents(PriceComponent, AgeComponent),
      ],
    }).compileComponents();
    mockedJestShowcaseLibService = TestBed.inject(JestShowcaseLibService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  // Put 'x' before 'it' or 'test' or 'describe' to ignore the test or the test suit
  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add .skip() to ignore the test
  // https://stackoverflow.com/questions/48125230/skip-one-test-in-test-file-jest
  test.skip('should create', () => {
    expect(component).toBeTruthy();
  });

  // Should you use 'it' or 'test'? It's about the readability!
  // https://stackoverflow.com/questions/45778192/what-is-the-difference-between-it-and-test-in-jest/56072272#56072272
  it('should navigato to Jest website', () => {
    /* This solution is no longer valid. It will give you "The operand of a 'delete' operator must be optional."
    delete window.location;
    window.location = {
      href: '',
    }; */
    // eslint-disable-next-line no-global-assign
    window = Object.create(window);
    const url = 'http://dummy.com';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    component.goSomewhereElse();
    expect(window.location.href).toEqual('https://jestjs.io');
    // Source: https://stackoverflow.com/questions/54021037/how-to-mock-window-location-href-with-jest-vuejs
  });

  describe('checkOverride', () => {
    it('should be overwritten', () => {
      jest
        .spyOn(mockedJestShowcaseLibService, 'isAlwaysTruthy')
        .mockImplementation(() => false);
      expect(component.checkOverride()).toEqual(false);
    });

    it('should be not overwritten', () => {
      jest
        .spyOn(mockedJestShowcaseLibService, 'isAlwaysTruthy')
        .mockReturnValue(false);
      expect(component.checkOverride()).toEqual(false);
    });
  });

  describe('increasePrice', () => {
    test('should be not overwritten', () => {
      const increasePriceSpy = jest.spyOn(component, 'increasePrice');
      const button =
        fixture.debugElement.nativeElement.querySelectorAll('button')[1];
      button.click();
      expect(increasePriceSpy).toHaveBeenCalled();
    });
  });
});
