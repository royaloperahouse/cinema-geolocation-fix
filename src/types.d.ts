export interface Venue {
  id: string;
  slug: string;
  name: string;
  address: string;
  website: string;
  longitude: number | string;
  latitude: number | string;
  dateModified: string;
}

export interface Coord {
  longitude: string | number;
  latitude: string | number;
}

export interface Summary {
  total: number;
  successful: string[];
  failed: string[];
  untouched: string[];
}
