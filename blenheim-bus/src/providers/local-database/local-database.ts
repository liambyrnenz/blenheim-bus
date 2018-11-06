import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Provides all data for the Blenheim bus as of November 2018. Handles the
 * entry of data and access to it. Assume no updates can be made to it.
 * 
 * This provider is locked to the timetable at this point, safely assuming
 * there is one bus that operates on a loop per hour. Due to the unique
 * nature of the Blenheim bus system, extending or modifying this provider
 * to handle other cities or lines may be difficult.
 */
@Injectable()
export class LocalDatabaseProvider {

  // TODO: No Sunday service and no Saturday afternoon (1 and 2)

  // min/max start and end times respectively in 24 hour time
  readonly START_TIME = 9;
  readonly END_TIME = 15;

  // all intervals of the hour that the bus is at a stop
  readonly INTERVALS = [":00", ":01", ":02", ":05", ":06", ":08", ":09",
                        ":10", ":11", ":12", ":13", ":14", ":15", ":16", ":17", ":18",
                        ":20", ":22", ":23", ":25", ":26", ":27", ":29",
                        ":30", ":31", ":32", ":34", ":35", ":37", ":39",
                        ":40", ":41", ":42", ":43", ":44", ":46", ":47", ":48",
                        ":53", ":54", ":55", ":57", ":59"];

  constructor(private storage: Storage) {
    storage.length().then(r => {
      if (r == 0) {
        console.log("Local database is empty, filling...");
        this.addToDatabase();
      } else console.log("Database has " + r + " entries. No changes made.");
    });
  }

  /**
   * Populate the local storage with all times and their corresponding locations.
   * Done by looping through each hour END_TIME - START_TIME times.
   */
  addToDatabase() {
    for (let time = this.START_TIME; time < this.END_TIME; time++) {
      let timeStr = (time + "").length == 1 ? "0" + time : time + "";
      this.storage.set(timeStr + this.INTERVALS[0], "Seymour St at Countdown");
      this.storage.set(timeStr + this.INTERVALS[1], "Seymour Square");
      this.storage.set(timeStr + this.INTERVALS[2], "Clubs of Marlborough");
      this.storage.set(timeStr + this.INTERVALS[3], "Scott St at 117");
      this.storage.set(timeStr + this.INTERVALS[4], "Ida St at 22");
      this.storage.set(timeStr + this.INTERVALS[5], "Alabama Rd at Mitre 10 Mega");
      this.storage.set(timeStr + this.INTERVALS[6], "Alabama Rd at 118");
      this.storage.set(timeStr + this.INTERVALS[7], "Redwoodtown at Countdown");
      this.storage.set(timeStr + this.INTERVALS[8], "Weld St at 153");
      this.storage.set(timeStr + this.INTERVALS[9], "Hospital Rd at 133");
      this.storage.set(timeStr + this.INTERVALS[10], "Hospital Rd at 165");
      this.storage.set(timeStr + this.INTERVALS[11], "Redwood St at 183");
      this.storage.set(timeStr + this.INTERVALS[12], "Wither Rd at 98");
      this.storage.set(timeStr + this.INTERVALS[13], "Wither Rd at 54");
      this.storage.set(timeStr + this.INTERVALS[14], "Wither Rd at 36");
      this.storage.set(timeStr + this.INTERVALS[15], "Wither Rd at 18");
      this.storage.set(timeStr + this.INTERVALS[16], "Hospital Rd at 11");
      this.storage.set(timeStr + this.INTERVALS[17], "Howick Rd at 90");
      this.storage.set(timeStr + this.INTERVALS[18], "Alabama Rd at 65");
      this.storage.set(timeStr + this.INTERVALS[19], "Litchfield Rd at Bethsaida Village");
      this.storage.set(timeStr + this.INTERVALS[20], "Eltham Rd at 36 (Guide Hall)");
      this.storage.set(timeStr + this.INTERVALS[21], "Eltham Rd at 4");
      this.storage.set(timeStr + this.INTERVALS[22], "Seymour St at Countdown");
      this.storage.set(timeStr + this.INTERVALS[23], "Seymour St at Countdown");
      this.storage.set(timeStr + this.INTERVALS[24], "Seymour Square");
      this.storage.set(timeStr + this.INTERVALS[25], "Clubs of Marlborough");
      this.storage.set(timeStr + this.INTERVALS[26], "Nelson St at 39");
      this.storage.set(timeStr + this.INTERVALS[27], "Springlands at Countdown");
      this.storage.set(timeStr + this.INTERVALS[28], "Springlands at PAK'nSAVE");
      this.storage.set(timeStr + this.INTERVALS[29], "Middle Renwick Rd at Ashwood Park");
      this.storage.set(timeStr + this.INTERVALS[30], "Colemans Rd at 35");
      this.storage.set(timeStr + this.INTERVALS[31], "Fulton Street at 44 (The Willows)");
      this.storage.set(timeStr + this.INTERVALS[32], "McLauchlan St at 59");
      this.storage.set(timeStr + this.INTERVALS[33], "Old Renwick Rd at 12");
      this.storage.set(timeStr + this.INTERVALS[34], "Hutcheson St at 44");
      this.storage.set(timeStr + this.INTERVALS[35], "Budge St at 43");
      this.storage.set(timeStr + this.INTERVALS[36], "Budge St at 107");
      this.storage.set(timeStr + this.INTERVALS[37], "Lucas St at 31");
      this.storage.set(timeStr + this.INTERVALS[38], "Freswick St at New World");
      this.storage.set(timeStr + this.INTERVALS[39], "Stuart St at 15");
      this.storage.set(timeStr + this.INTERVALS[40], "Stephenson St at 68");
      this.storage.set(timeStr + this.INTERVALS[41], "Francis St at 16 (Lister Court)");
      this.storage.set(timeStr + this.INTERVALS[42], "Seymour St at Countdown");
    }
    console.log("Database filling complete.");
  }

  /**
   * Determine the next stop the bus will reach. If the time matches exactly one in the
   * database, simply get that stop. Otherwise, figure out the next one it will reach.
   * @param time time in string form HH:mm
   * @param day today (to determine if the bus is running)
   */
  getNextStop(time: string, day: string) {
    this.storage.get(time).then(r => {
      if (r) return r;
      
    });
  }

  /**
   * Determine the route the bus is on now from the given time.
   * @param time time in string form HH:mm
   * @param day today (to determine if the bus is running)
   * @returns formatted route string in array form such that each line can be printed
   * separate
   */
  getRoute(time: string, day: string) {
    if (!this.isInService(time, day)) return ["NOT IN SERVICE"];
    let mm = Number(time.split(":")[1]);
    return mm < 30 ? ["REDWOODTOWN", "WITHERLEA"] : ["SPRINGLANDS", "RIVERSDALE"];
  }

  /**
   * Check if the bus is in service on a particular day and time.
   * Method assumes bus does not run on a Sunday, only runs on Saturday in the morning
   * and between START_TIME and END_TIME any other day. TODO holidays?
   * @param time time in string form HH:mm
   * @param day day in form Monday, Tuesday, etc.
   */
  isInService(time: string, day: string) {
    let hh = Number(time.split(":")[0]);
    if (day === "Sunday") return false;
    if (day === "Saturday" && (hh < this.START_TIME || hh >= 12)) return false;
    return hh >= this.START_TIME && hh < this.END_TIME;
  }

}
