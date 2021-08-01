import {
  AgeResult,
  JestShowcaseLibService,
  defaultAge,
} from './jest-showcase-service.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HttpErrorResponse } from '@angular/common/http';

const mockAgeResult: AgeResult = {
  age: 28,
  count: 21,
  name: 'meelad',
};

const errorResponse: HttpErrorResponse = new HttpErrorResponse({
  error: { errorCode: 'Not Found', statusCode: 404 },
  statusText: 'Not Found',
  status: 404,
});

describe('SharedServiceService', () => {
  let httpTestingController: HttpTestingController;
  let service: JestShowcaseLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(JestShowcaseLibService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  describe('fetchAge', () => {
    // https://stackoverflow.com/questions/62007915/testing-async-http-based-function-with-jasmine-and-await-expected-one-matching
    it('should return age data on success', fakeAsync(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      service.fetchAge('meelad').then((ageResult: AgeResult) => {
        expect(ageResult).toEqual(mockAgeResult);
      });

      // tick() steps through the next round of pending asynchronous activity
      // this will also step through 'setTimeout' and 'setInterval' code
      // you may have in your service, as well as Observable code
      tick();
      const req = httpTestingController.expectOne(
        'https://api.agify.io?name=meelad'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockAgeResult);
    }));

    // Alternative notation
    // https://jestjs.io/docs/expect#resolves
    it('should return age data on success', fakeAsync(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchAgeResult = service.fetchAge('meelad');
      tick();
      const req = httpTestingController.expectOne(
        'https://api.agify.io?name=meelad'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockAgeResult);
      await expect(fetchAgeResult).resolves.toBe(mockAgeResult);
    }));
  });

  describe('sendAgeRequest', () => {
    it('should return age data on success', () => {
      service.sendAgeRequest('meelad').subscribe((ageResult: AgeResult) => {
        expect(ageResult).toEqual(mockAgeResult);
      });
      const req = httpTestingController.expectOne(
        'https://api.agify.io?name=meelad'
      );
      /* Feel free to be more specific about your request       
    req.request.body
    req.request.params
    req.request.headers
    req.request.responseType
    req.request.url
    req.request.urlWithParams
    req.request.withCredentials
    req.request.reportProgress */

      expect(req.request.method).toEqual('GET');
      req.flush(mockAgeResult);
    });

    it('should return default age data on failure', () => {
      service.sendAgeRequest('meelad').subscribe((ageResult: AgeResult) => {
        expect(ageResult).toEqual(defaultAge);
      });
      const req = httpTestingController.expectOne(
        'https://api.agify.io?name=meelad'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(errorResponse);
    });
  });

  describe('isAlwaysTruthy', () => {
    // Have the same properties - relevant for objects
    it('should equal true', () => {
      expect(service.isAlwaysTruthy()).toEqual(true);
    });

    // received === expected
    it('should be true', () => {
      expect(service.isAlwaysTruthy()).toBe(true);
    });

    it('should be truthy', () => {
      // when !!received is true
      expect(service.isAlwaysTruthy()).toBeTruthy();
    });
  });

  describe('returnTruthyValue', () => {
    it('should equal someThruthyValue', () => {
      expect(service.returnTruthyValue()).toEqual('someThruthyValue');
    });

    it('should be someThruthyValue', () => {
      expect(service.returnTruthyValue()).toBe('someThruthyValue');
    });

    it('should be truthy', () => {
      expect(service.returnTruthyValue()).toBeTruthy();
    });
  });

  describe('returnObject', () => {
    const mockedObject = { someKey: 'someValue' };
    const mockedObjectWithUndefinedProps = {
      someKey: 'someValue',
      someUndefinedKey: undefined,
    };
    it('should equal true', () => {
      expect(service.returnObject()).toEqual(mockedObject);
      // Well this should not work!
      expect(service.returnObject()).toEqual(mockedObjectWithUndefinedProps);
      // Use toStrictEqual instead:
      // https://jestjs.io/docs/expect#tostrictequalvalue
      expect(service.returnObject()).not.toStrictEqual(
        mockedObjectWithUndefinedProps
      );
    });

    it('should be true', () => {
      expect(service.returnObject()).not.toBe(mockedObject);
    });
  });
});
