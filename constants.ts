
import { PlanetData } from './types';

export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    color: 'bg-gray-400',
    hoverColor: 'hover:bg-gray-300',
    size: 8,
    orbitalRadius: 60,
    orbitalPeriod: 8.8,
    description: "The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth's Moon.",
    funFact: "A year on Mercury is just 88 Earth days long."
  },
  {
    id: 'venus',
    name: 'Venus',
    color: 'bg-yellow-200',
    hoverColor: 'hover:bg-yellow-100',
    size: 14,
    orbitalRadius: 100,
    orbitalPeriod: 22.5,
    description: "Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
    funFact: "A day on Venus is longer than a year on Venus."
  },
  {
    id: 'earth',
    name: 'Earth',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-400',
    size: 16,
    orbitalRadius: 150,
    orbitalPeriod: 36.5,
    description: "Our home planet is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
    funFact: "Earth's rotation is gradually slowing."
  },
  {
    id: 'mars',
    name: 'Mars',
    color: 'bg-red-700',
    hoverColor: 'hover:bg-red-600',
    size: 10,
    orbitalRadius: 210,
    orbitalPeriod: 68.7,
    description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.",
    funFact: "Mars has the tallest volcano in the solar system, Olympus Mons."
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: 'bg-orange-300',
    hoverColor: 'hover:bg-orange-200',
    size: 40,
    orbitalRadius: 300,
    orbitalPeriod: 120,
    description: "Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red Spot is a centuries-old storm bigger than Earth.",
    funFact: "Jupiter has the shortest day of all the planets."
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: 'bg-yellow-400',
    hoverColor: 'hover:bg-yellow-300',
    size: 36,
    orbitalRadius: 400,
    orbitalPeriod: 295,
    description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
    funFact: "Saturn is the least dense planet; it would float in water."
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: 'bg-cyan-300',
    hoverColor: 'hover:bg-cyan-200',
    size: 24,
    orbitalRadius: 500,
    orbitalPeriod: 840,
    description: "Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
    funFact: "Uranus is often called the 'ice giant'."
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: 'bg-blue-800',
    hoverColor: 'hover:bg-blue-700',
    size: 22,
    orbitalRadius: 600,
    orbitalPeriod: 1650,
    description: "Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.",
    funFact: "Neptune has the strongest winds in the solar system."
  },
];
