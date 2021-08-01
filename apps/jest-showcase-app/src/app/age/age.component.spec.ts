import {
  AgeResult,
  JestShowcaseLibModule,
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
      imports: [RouterTestingModule, JestShowcaseLibModule],
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
      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(component as any, 'extractAgeInformation');
      component.name = 'meelad';
      component.getAge();
      tick();
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
      expect(fetchAgeSpy).not.toHaveBeenCalled();
    }));
  });
});
