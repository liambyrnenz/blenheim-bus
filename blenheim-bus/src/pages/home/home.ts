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

  time: string = this.getTime();
  timeAway: string = "Due";
  currentStop: string[] = [];

  constructor(private database: LocalDatabaseProvider) {
    this.doUpdates();
    
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

  getDay() {
    return moment().format("dddd");
  }

  getStop() {
    return this.database.getNextStop(this.time).split(" at ");
  }

  getTime() {
    return moment().format("HH:mm");
  }

  /* ====================================================================== */

  doUpdates() {
    this.currentStop = this.getStop();
  }

}
