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

      let website = text.split(",").slice(-4, -3).join().slice(1, -1)
      const websiteVal = text.split(",").slice(-4, -3).join();

      let address = text.split(",'")[3].slice(0, -1);
      

      if (websiteVal === "NULL") {
        website = "NULL"
        address = text.split(",").slice(3, -4).join().slice(1, -1);
      }


      return {
        id: text.split(",")[0].replace(/\"/g, ""),
        slug: text.split(",'")[1].slice(0, -1),
        name: text.split(",'")[2].slice(0, -1),
        address,
        website,
        longitude: handleCoordType(text.split(",").slice(-3, -2).join()),
        latitude: handleCoordType(text.split(",").slice(-2, -1).join()),
        dateModified: text.split(",").slice(-1).join().slice(1, -1),
        coordsAttempted: false,
      };
    });

    return venueObjs;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const handleCoordType = (val: string): string | number => {
  return val !== "NULL" ? Number(val) : val;
};

// const handleWebsiteNull = (val: string): 