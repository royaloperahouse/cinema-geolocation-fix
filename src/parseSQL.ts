import fs from "fs";
import { Venue } from "./types";

export const parseSQL = (filename: string): Venue[] | undefined => {
  try {
    const data = fs.readFileSync(`./data_dump_input/${filename}`, "utf8");
    const venueLine = data
      .split("\n")
      .find((line) => line.startsWith("INSERT INTO `screening_venues`"));

    const venues = venueLine?.split("),(");

    // Get rid of beginning and end. To add back later when recomposed.
    if (venues?.length) {
      venues[0] = venues[0].split("(")[1];
      venues[venues.length - 1] = venues[venues.length - 1].split(")")[0];
    }

    // deconstruct venues
    const venueObjs = venues?.map((text) => {
      return {
        id: text.split(",")[0].replace(/\"/g, ""),
        slug: text.split(",")[1].slice(1, -1),
        name: text.split(",")[2].slice(1, -1),
        address: text.split(",").slice(3, -4).join().slice(1, -1),
        website: text.split(",").slice(-4, -3).join().slice(1, -1),
        longitude: handleCoordType(text.split(",").slice(-3, -2).join()),
        latitude: handleCoordType(text.split(",").slice(-2, -1).join()),
        dateModified: text.split(",").slice(-1).join().slice(1, -1),
        coordsCorrected: false,
      };
    });

    return venueObjs;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const handleCoordType = (val: string): string | number => {
  return val !== "NULL" ? Number(val) : val
}