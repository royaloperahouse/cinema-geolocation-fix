import fs from 'fs';
import { DateTime } from "luxon";
import { getLatestArr } from './getLatestArr';
import { Venue } from './types'

console.log("Reset progress");

// Get latest data file
const venues = getLatestArr()
console.log(venues);

// for each venue, set coordsAttempted to false
const listReset = venues.map((venue: Venue) => {
    return {...venue, coordsAttempted: false}
})

const newData = JSON.stringify(listReset, null, 2);
  fs.writeFileSync(
    `./output/data/parsed_${DateTime.now().toFormat("yyMMdd_HHmm-ss")}.json`,
    newData
  );