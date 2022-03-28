import { getCoords } from "./getCoords";
import { Venue } from "./types";

export const updateCoords = async (venuesArr: Venue[]): Promise<Venue[]> => {
  return await Promise.all(
    venuesArr.map(async (venue) => {
      const result = await getCoords(venue.address.trim());
      console.log("result:", result);

      if (result.longitude === 404) {
        console.log("Replacement coords not found.");

        return new Promise<Venue>((resolve, reject) => {
          resolve({ ...venue, coordsAttempted: true });
        });
      } else {
        return {
          ...venue,
          longitude: result.longitude,
          latitude: result.latitude,
          coordsAttempted: true,
        };
      }
    })
  );
};
