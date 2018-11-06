import { Component } from '@angular/core';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';

import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private database: LocalDatabaseProvider) {
    setInterval(() => this.getTime(), 10000);
  }

  getDay() {
    return moment().format("dddd");
  }

  getTime() {
    return moment().format("HH:mm");
  }

  getStop(): string[] {
    return "Seymour St at Countdown".split(" at ");
  }

}
