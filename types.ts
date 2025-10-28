
export interface PlanetData {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  size: number; // relative size in pixels
  orbitalRadius: number; // relative distance from sun in pixels
  orbitalPeriod: number; // relative time for one orbit in seconds
  description: string;
  funFact: string;
}
