import dotenv from "dotenv";
import fs from "fs";
import { parseSQL } from "./parseSQL";
import { getCoords } from "./getCoords";
import { Coord, Venue, Summary } from "./types";

// const summary: Summary = {
//   total: 0,
//   successful: [],
//   failed: [],
//   untouched: [],
// };

const data = fs.readFileSync("./output/parsed.json", "utf8");
const venues = JSON.parse(data);

const NUMBER_TO_PROCESS = 2;

// console.log("venues:", venues);

let count = NUMBER_TO_PROCESS;
const batch = [];

for (let i = 0; i < venues.length; i++) {
  if (count === 0) break;
  if (
    !venues[i].coordsCorrected &&
    venues[i].longitude === 0 &&
    venues[i].latitude === 0
  ) {
    batch.push(venues[i]);
    count--;
  }
}

// console.log("batch:", batch);


const updateCoords = async (venuesArr: Venue[]): Promise<Venue[]> => {
//   summary.total = venuesArr.length;
  const newArr = await Promise.all(
    venuesArr.map(async (venue) => {
      if (
        (venue.latitude === 0 && venue.longitude === 0) ||
        venue.latitude === "NULL"
      ) {
        const result = await getCoords(venue.address.trim());
        console.log("result:", result);

        if (result.longitude === 404) {
        //   summary.failed.push(venue.id);
          return new Promise<Venue>((resolve, reject) => {
            resolve(venue);
          });
        } else {
        //   summary.successful.push(venue.id);
          return {
            id: venue.id,
            slug: venue.slug,
            name: venue.name,
            address: venue.address,
            website: venue.website,
            longitude: result.longitude,
            latitude: result.latitude,
            dateModified: venue.dateModified,
            coordsCorrected: true
          };
        }
      }
      // return venue;
    //   summary.untouched.push(venue.id)
      return new Promise<Venue>((resolve, reject) => {
        resolve(venue);
      });
    })
  );

  return newArr;
};

if (batch) {
  const result = updateCoords(batch);
  console.log("result:", result);
  const check = async (result: Promise<Venue[]>) => {
    console.log("check result:", await result);
    // console.log(
    //   "---summary---\n",
    //   `total: ${summary.total}\n`,
    //   `successful: ${summary.successful.length}\n`,
    //   `failed: ${summary.failed.length}\n`,
    //   `untouched: ${summary.untouched.length}\n`
    // );
  };
  if (result) {
    check(result);
  }
}


