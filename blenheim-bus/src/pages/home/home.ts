import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
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

  constructor(private alert: AlertController, private database: LocalDatabaseProvider) {
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
    let ns = this.database.getNextStop(this.time);
    ns.stop.then(r => {
      this.currentStop = r.split(" at ");
      let next = moment(ns.time, "HH:mm");
      let diff = next.diff(moment(this.time, "HH:mm"), "minutes");
      this.timeAway = diff == 0 ? "Due" : diff + "";
    });
  }

  showStopSelect() {
    let al = this.alert.create();
    al.setTitle("Select a stop");

    // al.addInput({
    //   type: 'radio',
    //   label: 'Blue',
    //   value: 'blue',
    //   checked: true
    // });

    al.addButton('Cancel');
    al.addButton({
      text: 'Select',
      handler: data => {
        // this.testRadioResult = data;
      }
    });

    al.present();
  }

  showAboutAlert() {
    this.alert.create({
      title: "About",
      subTitle: "This app was created by Liam Byrne." +
        "<br/><br/>" +
        "<a href='https://liambyrne.nz'>liambyrne.nz</a><br/>" +
        "@liambyrnenz",
      buttons: ['Back']
    }).present();
  }

}
