export type EntityType = 'country' | 'state' | 'city';

export interface TravelMemory {
  dateVisited?: string;
  rating?: number; // 1 to 5 stars
  notes?: string;
  favoriteSpot?: string;
  travelCompanions?: string;
  photos?: string[]; // base64 or URL
}

export interface VisitedEntity {
  id: string; // ISO code or unique city ID
  type: EntityType;
  name: string;
  countryCode: string;
  countryName: string;
  scratchedAt: number; // timestamp
  lat?: number;
  lng?: number;
  flagEmoji?: string;
  landmark?: string;
  stateCode?: string;
  stateName?: string;
  memory?: TravelMemory;
}

export interface CountryInfo {
  id: string; // ISO A3 or A2
  name: string;
  isoA2: string;
  isoA3: string;
  continent: string;
  capital: string;
  currency: string;
  flagEmoji: string;
  greeting: string;
  trivia: string[];
  famousLandmarks: string[];
  color: string; // reveal color
}

export interface StateInfo {
  id: string;
  name: string;
  countryCode: string;
  countryName: string;
  capital?: string;
  trivia?: string[];
  color: string;
}

export interface CityInfo {
  id: string;
  name: string;
  countryCode: string;
  countryName: string;
  stateCode?: string;
  stateName?: string;
  lat: number;
  lng: number;
  population?: number;
  landmark?: string;
  trivia?: string;
  flagEmoji?: string;
  isCapital?: boolean;
}

export type SearchFilterType = 'all' | 'country' | 'city' | 'state';

export type MapTheme = 'gold' | 'midnight' | 'vintage' | 'emerald' | 'cyber';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progress: number; // 0 to 100
  reqText: string;
}

export interface ScratchAction {
  type: 'scratch' | 'unscratch' | 'update_memory';
  entity: VisitedEntity;
  previousMemory?: TravelMemory;
}
