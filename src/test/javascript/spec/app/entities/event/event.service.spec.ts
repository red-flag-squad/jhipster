import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EventService } from 'app/entities/event/event.service';
import { IEvent, Event } from 'app/shared/model/event.model';

describe('Service Tests', () => {
  describe('Event Service', () => {
    let injector: TestBed;
    let service: EventService;
    let httpMock: HttpTestingController;
    let elemDefault: IEvent;
    let expectedResult: IEvent | IEvent[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EventService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Event(0, 'AAAAAAA', currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startsAt: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Event', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startsAt: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startsAt: currentDate
          },
          returnedFromService
        );

        service.create(new Event()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Event', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            startsAt: currentDate.format(DATE_FORMAT),
            duration: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startsAt: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Event', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            startsAt: currentDate.format(DATE_FORMAT),
            duration: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startsAt: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Event', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
