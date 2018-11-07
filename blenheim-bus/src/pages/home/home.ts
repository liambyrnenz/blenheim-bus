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

  time: string = this.getTime();  // keep track of current time for updating
  timeAway: string = "Due";       // time from next stop
  currentStop: string[] = [];     // current stop (array for multiple lines)

  constructor(private database: LocalDatabaseProvider) {
    // call updates instantly
    this.doUpdates();

    // every second, check the time
    // if a minute has passed, call updates
    setInterval(() => {
      let t = this.getTime();
      if (this.time != t) {
        this.time = t;
        this.doUpdates();
      }
    }, 1000);
  }

  /* =========================== TEMPLATE GETTERS ========================= */

  get currentRoute() {
    return this.database.getRoute(this.time, this.getDay());
  }

  get isInService() {
    return this.database.isInService(this.time, this.getDay());
  }

  /* ========================== INTERNAL GETTERS ========================== */
  // TODO move to time provider?

  getDay() {
    return moment().format("dddd");
  }

  getTime() {
    return moment().format("HH:mm");
  }

  /**
   * Take a time string in the form HH:mm and return a more convenient form
   * like ha (i.e. 09:00 to 9am.)
   * @param time time in string form HH:mm
   */
  getConvertedTime(time: string) {
    return moment(time, "HH:mm").format("ha");
  }

  /* ====================================================================== */

  doUpdates() {
    if (!this.isInService) return;
    this.database.getNextStop(this.time).then(r => {
      this.currentStop = r.split(" at ");
    });
  }

}
