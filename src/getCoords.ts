import dotenv from "dotenv";
import axios from "axios";
import { Coord } from "./types";

dotenv.config();

export const getCoords = async (address: string): Promise<Coord> => {
  const params = {
    access_key: process.env.POSITION_STACK_API_KEY,
    query: address,
  };

  return axios
    .get("http://api.positionstack.com/v1/forward", { params })
    .then((response) => {
      if (response.data.data[0].confidence === 1) {
        return {
          longitude: response.data.data[0].longitude,
          latitude: response.data.data[0].latitude,
        };
      } else
        return {
          longitude: 404,
          latitude: 404,
        };
    })
    .catch((error) => {
      console.log("Error:", error);
      return {
        longitude: 404,
        latitude: 404,
      };
    });
};
