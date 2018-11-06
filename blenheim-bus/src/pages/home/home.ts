import { Component } from '@angular/core';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';

import moment from 'moment';

/**
 * The sole page for the app.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timeAway: string = "Due";

  constructor(private database: LocalDatabaseProvider) {
    setInterval(() => this.getTime(), 10000);
  }

  get currentStop() {
    return this.database.getNextStop(this.getTime()).split(" at ");
  }

  get currentRoute() {
    return this.database.getRoute(this.getTime(), this.getDay());
  }

  get isInService() {
    return this.database.isInService(this.getTime(), this.getDay());
  }

  getDay() {
    return moment().format("dddd");
  }

  getTime() {
    return moment().format("HH:mm");
  }

}
