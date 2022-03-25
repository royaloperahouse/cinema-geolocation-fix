# Cinema Geolocation Fix
A script for parsing SQL data for cinemas and updating their Longitude and Latitude coordinate.

## Setup
- `npm install`
- Get API key from: https://positionstack.com/ and paste into .env file.

## Use
- Step 1: Drop `*.sql` data dump file into `data_dump_input` folder and run `npm run parse-dump` to parse relevant data into json file.
  - Output should be saved in `output` folder as a .json document.
- Step 2: Run next script... TO DO.