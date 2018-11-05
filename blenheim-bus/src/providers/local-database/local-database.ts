import { Injectable } from '@angular/core';

@Injectable()
export class LocalDatabaseProvider {

  readonly START_TIME = 9;
  readonly END_TIME = 15;

  times: object = {};

  constructor() {
    this.addToDatabase();
  }

  addToDatabase() {
    for (let time = this.START_TIME; time < this.END_TIME; time++) {
      console.log(time);
    }
  }

}
