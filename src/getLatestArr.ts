import fs from "fs";
import { Venue } from "./types";

export const getLatestArr = (): Venue[] => {
  // Get latest data file
  const latest = fs.readdirSync("./output/data").slice(-1)[0];
  const data = fs.readFileSync(`./output/data/${latest}`, "utf8");
  return JSON.parse(data);
};
