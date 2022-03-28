# Cinema Geolocation Fix
A script for parsing SQL data for cinemas and updating their Longitude and Latitude coordinate.

## Setup
- `npm install`
- Get API key from: https://positionstack.com/ and paste into .env file.

## Use

- Step 1: Drop `*.sql` data dump file into `data_dump_input` folder.
- Run `npm run parse-dump` to parse relevant data into json file.
  - Output should be saved in `output/data` folder as a .json document.
- Step 2: Run `npm run process-data` to incrementally update venue entries.
  - A new json file will be created in `output/data`.
- Continue step until all data has been processed.