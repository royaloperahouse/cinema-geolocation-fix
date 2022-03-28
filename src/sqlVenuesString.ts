import { getLatestArr } from "./getLatestArr";

const venues = getLatestArr();
console.log(venues);

const strings = 
    "INSERT INTO `screening_venues` VALUES " + 
    venues
        .map((v) => `(${v.id}, '${v.slug}', '${v.name}', '${v.address}', '${v.website}', ${v.longitude}, ${v.latitude}, '${v.dateModified}')`)
        .join(",")
    + ";"

console.log("strings:", strings);
