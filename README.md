# Cinema Geolocation Fix
A set of scripts for parsing SQL data for cinemas, updating their Longitude and Latitude coordinates and regenerating a working SQL file.

## Setup
- `npm install`
- Get API key from Google Maps Platform (or alternatively https://positionstack.com/) and paste into .env file.

## Usage

- Drop `*.sql` data dump file into `data_dump_input` folder.
- Run `npm run parse-dump` to parse relevant data into json file.
  - Output should be saved in `output/data` folder as a .json document.
- Run `npm run process-data` to incrementally update venue entries. 
  - A new json file will be created in `output/data`.
  - This needs to be done incrementally as API timeouts if there are too many requests. Number of entries to be processed in a single execution can be configured in `src/processData.ts`, chaning the value assigned to `NUMBER_TO_PROCESS`.
```js
const NUMBER_TO_PROCESS = 20;
```
  
- Repeat previous step until all data has been processed.

- To force script to start again from the top of the list, run: `npm run reset-progress`