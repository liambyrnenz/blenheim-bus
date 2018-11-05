import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalDatabaseProvider {

  // TODO: No Sunday service and no Saturday afternoon (1 and 2)

  readonly START_TIME = 9;
  readonly END_TIME = 15;

  constructor(private storage: Storage) {
    storage.length().then(r => {
      if (r == 0) {
        console.log("Local database is empty, filling...");
        this.addToDatabase();
      } else console.log("Database has " + r + " entries. No changes made.");
    });
  }

  addToDatabase() {
    for (let time = this.START_TIME; time < this.END_TIME; time++) {
      let timeStr = (time + "").length == 1 ? "0" + time : time + "";
      this.storage.set(timeStr + ":00", "Seymour St at Countdown");
      this.storage.set(timeStr + ":01", "Seymour Square");
      this.storage.set(timeStr + ":02", "Clubs of Marlborough");
      this.storage.set(timeStr + ":05", "Scott St at 117");
      this.storage.set(timeStr + ":06", "Ida St at 22");
      this.storage.set(timeStr + ":08", "Alabama Rd at Mitre 10 Mega");
      this.storage.set(timeStr + ":09", "Alabama Rd at 118");
      this.storage.set(timeStr + ":10", "Redwoodtown at Countdown");
      this.storage.set(timeStr + ":11", "Weld St at 153");
      this.storage.set(timeStr + ":12", "Hospital Rd at 133");
      this.storage.set(timeStr + ":13", "Hospital Rd at 165");
      this.storage.set(timeStr + ":14", "Redwood St at 183");
      this.storage.set(timeStr + ":15", "Wither Rd at 98");
      this.storage.set(timeStr + ":16", "Wither Rd at 54");
      this.storage.set(timeStr + ":17", "Wither Rd at 36");
      this.storage.set(timeStr + ":18", "Wither Rd at 18");
      this.storage.set(timeStr + ":20", "Hospital Rd at 11");
      this.storage.set(timeStr + ":22", "Howick Rd at 90");
      this.storage.set(timeStr + ":23", "Alabama Rd at 65");
      this.storage.set(timeStr + ":25", "Litchfield Rd at Bethsaida Village");
      this.storage.set(timeStr + ":26", "Eltham Rd at 36 (Guide Hall)");
      this.storage.set(timeStr + ":27", "Eltham Rd at 4");
      this.storage.set(timeStr + ":29", "Seymour St at Countdown");
      this.storage.set(timeStr + ":30", "Seymour St at Countdown");
      this.storage.set(timeStr + ":31", "Seymour Square");
      this.storage.set(timeStr + ":32", "Clubs of Marlborough");
      this.storage.set(timeStr + ":34", "Nelson St at 39");
      this.storage.set(timeStr + ":35", "Springlands at Countdown");
      this.storage.set(timeStr + ":37", "Springlands at PAK'nSAVE");
      this.storage.set(timeStr + ":39", "Middle Renwick Rd at Ashwood Park");
      this.storage.set(timeStr + ":40", "Colemans Rd at 35");
      this.storage.set(timeStr + ":41", "Fulton Street at 44 (The Willows)");
      this.storage.set(timeStr + ":42", "McLauchlan St at 59");
      this.storage.set(timeStr + ":43", "Old Renwick Rd at 12");
      this.storage.set(timeStr + ":44", "Hutcheson St at 44");
      this.storage.set(timeStr + ":46", "Budge St at 43");
      this.storage.set(timeStr + ":47", "Budge St at 107");
      this.storage.set(timeStr + ":48", "Lucas St at 31");
      this.storage.set(timeStr + ":53", "Freswick St at New World");
      this.storage.set(timeStr + ":54", "Stuart St at 15");
      this.storage.set(timeStr + ":55", "Stephenson St at 68");
      this.storage.set(timeStr + ":57", "Francis St at 16 (Lister Court)");
      this.storage.set(timeStr + ":59", "Seymour St at Countdown");
    }
    console.log("Database filling complete.");
  }

}
