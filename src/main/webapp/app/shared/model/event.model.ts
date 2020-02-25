import { Moment } from 'moment';

export interface IEvent {
  id?: number;
  name?: string;
  startsAt?: Moment;
  duration?: number;
}

export class Event implements IEvent {
  constructor(public id?: number, public name?: string, public startsAt?: Moment, public duration?: number) {}
}
