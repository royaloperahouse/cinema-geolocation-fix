import fs from "fs";
import { update } from "./update";
import { updateCoords } from "./updateCoords";

const NUMBER_TO_PROCESS = 20;

// Get latest data file
const latest = fs.readdirSync("./output/data").slice(-1)[0];
const data = fs.readFileSync(`./output/data/${latest}`, "utf8");
const venues = JSON.parse(data);
let count = NUMBER_TO_PROCESS;
const batch = [];

for (let i = 0; i < venues.length; i++) {
  if (count === 0) break;
  if (
    !venues[i].coordsAttempted &&
    (venues[i].longitude === 0 ||
      venues[i].latitude === 0 ||
      venues[i].longitude === "NULL" ||
      venues[i].latitude === "NULL")
  ) {
    batch.push(venues[i]);
    count--;
  }
}

if (batch) {
  const result = updateCoords(batch);
  if (result) {
    update(venues, result);
  }
}
