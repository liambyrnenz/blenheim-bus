import { Component } from '@angular/core';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';

import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private database: LocalDatabaseProvider) {}

  getTime() {
    return moment().format("HH:MM");
  }

  getStop(): string[] {
    return "Seymour St at Countdown".split(" at ");
  }

}
