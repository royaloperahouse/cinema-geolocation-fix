import fs from "fs";
import { Venue } from "./types";
import { DateTime } from "luxon";

export const update = async (venuesList: Venue[], result: Promise<Venue[]>) => {
  const allVenues = [...venuesList];
  const updatedVenues = await result;

  if (!updatedVenues.length) {
    console.log("No venues were updated.");
    return;
  }

  // console.log("Edited venues to include:", updatedVenues);

  // For each venue result.. replace updated entry back into data array.
  updatedVenues.forEach((updated) => {
    // Index of entry in main data file
    const idx = allVenues.findIndex((entry: Venue) => entry.id === updated.id);
    allVenues.splice(idx, 1, updated);
  });

  const newData = JSON.stringify(allVenues, null, 2);
  fs.writeFileSync(
    `./output/data/parsed_${DateTime.now().toFormat("yyMMdd_HHmm-ss")}.json`,
    newData
  );

  const toProcess = allVenues.reduce((prev, cur) => {
    if (
      !cur.coordsAttempted &&
      (cur.longitude === 0 ||
        cur.longitude === "NULL" ||
        cur.latitude === 0 ||
        cur.latitude === "NULL")
    ) {
      return prev + 1;
    }
    return prev;
  }, 0);

  const processed = allVenues.reduce((prev, cur) => {
    if (cur.coordsAttempted) return prev + 1;
    return prev;
  }, 0);

  // Log progress
  const percent = processed / (processed + toProcess);
  console.log(`--- Progress Report ---
- ${processed} entries have been processed.
- There are ${toProcess} entries still to process.
- ${Math.round(percent * 100)}% complete.`);
};
