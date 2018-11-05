import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalDatabaseProvider } from '../../providers/local-database/local-database';

import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private database: LocalDatabaseProvider) {

  }

  getTime() {
    return moment().format("HH:MM");
  }

}
