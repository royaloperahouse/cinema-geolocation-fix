import fs from 'fs';
import { getLatestArr } from "./getLatestArr";
import { DateTime } from "luxon";

const venues = getLatestArr();
console.log(venues);

const string = 
    "INSERT INTO `screening_venues` VALUES " + 
    venues
        .map((v) => `(${v.id},'${v.slug}','${v.name}','${v.address}','${v.website}',${v.longitude},${v.latitude},'${v.dateModified}')`)
        .join(",")
    + ";"

console.log("string:", string);


  fs.writeFileSync(
    `./output/sql_string/sql-string_${DateTime.now().toFormat("yyMMdd_HHmm-ss")}.txt`,
    string
  );

  /*
  NEXT
    - Just removed spaces in string. Try again.



  */