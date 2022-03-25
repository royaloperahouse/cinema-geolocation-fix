import fs from "fs";
import { parseSQL } from "./parseSQL";

const INPUT_DIR = "./data_dump_input/";
const OUTPUT_DIR = "./output/parsed.json";

const sqlDumpFile = fs.readdirSync(INPUT_DIR)[0];
const parsedVenues = parseSQL(sqlDumpFile);
const data = JSON.stringify(parsedVenues, null, 2);
fs.writeFileSync(OUTPUT_DIR, data);

if (parsedVenues?.length) {
  console.log(`Successfully written ${parsedVenues.length} venues to ${OUTPUT_DIR}.`);
} else {
  console.log("Something went wrong.");
}
