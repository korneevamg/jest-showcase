import {
  AgeResult,
  JestShowcaseLibService,
} from '@jest-showcase/jest-showcase-lib';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { AgeComponent } from './age.component';
import { MockProvider } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';

describe('AgeComponent', () => {
  let component: AgeComponent;
  let fixture: ComponentFixture<AgeComponent>;
  let mockedJestShowcaseLibService: JestShowcaseLibService;
  beforeEach(async () => {
    jest.resetAllMocks();
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [MockProvider(JestShowcaseLibService)],
      declarations: [AgeComponent],
    }).compileComponents();
    mockedJestShowcaseLibService = TestBed.inject(JestShowcaseLibService);
    fixture = TestBed.createComponent(AgeComponent);
    component = fixture.componentInstance;
  });

  describe('getAge', () => {
    it('should call extractAgeInformation upon success', fakeAsync(() => {
      const mockAgeResult: AgeResult = {
        age: 28,
        count: 21,
        name: 'meelad',
      };
      jest
        .spyOn(mockedJestShowcaseLibService, 'fetchAge')
        .mockReturnValue(Promise.resolve(mockAgeResult));
      /**
       * Please note that it is not recommended to dig too deep into the implementation details of your subject under test
       * We spy her eon a private method just to show youexpect.objectContaining capabilities of Jest
       *  */
      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(component as any, 'extractAgeInformation');
      component.name = 'meelad';
      component.getAge();
      /**
       * We have to use fakeAsync + tick() here to step through fetchAge() resolving its value.
       * Only after calling tick() we are in the then-closure
       */
      tick();
      /**
       * Sometimes we don't care about the exact properties of our parameter object as long as it satisfies the interface requirements.
       * So we can just test for these particular attributes that we need by using expect.objectContaining
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((component as any).extractAgeInformation).toHaveBeenCalledWith(
        expect.objectContaining({
          age: expect.any(Number),
          name: expect.stringContaining('meelad'),
        })
      );
    }));

    it('should not call fetchAge if the name field is empty', fakeAsync(() => {
      const fetchAgeSpy = jest.spyOn(mockedJestShowcaseLibService, 'fetchAge');
      component.name = '';
      component.getAge();
      /**
       * This is just to demonstrate negativ expactation - the method should not be called
       */
      expect(fetchAgeSpy).not.toHaveBeenCalled();
      expect(component.age).toBeNull();
    }));
  });
});
