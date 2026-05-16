import { Property } from "../types";
import property1 from "../assets/property-1.png";
import property2 from "../assets/property-2.png";
import property3 from "../assets/property-3.png";
import property4 from "../assets/property-4.png";

export const properties: Property[] = [
  {
    id: "1",
    title: "Bosphorus View Luxury Apartment",
    type: "apartment",
    location: "Besiktas, Istanbul",
    price: "45.000.000",
    m2: 250,
    rooms: "4+1",
    status: "SATILIK",
    image: property1,
  },
  {
    id: "2",
    title: "Classic Yali Mansion",
    type: "villa",
    location: "Sariyer, Istanbul",
    price: "120.000.000",
    m2: 600,
    rooms: "7+2",
    status: "SATILIK",
    image: property2,
  },
  {
    id: "3",
    title: "Premium Corporate Office",
    type: "office",
    location: "Levent, Istanbul",
    price: "85.000",
    m2: 350,
    rooms: "Open Plan",
    status: "KIRALIK",
    image: property3,
  },
  {
    id: "4",
    title: "Infinity Pool Penthouse",
    type: "penthouse",
    location: "Sisli, Istanbul",
    price: "75.000.000",
    m2: 400,
    rooms: "5+1",
    status: "SATILIK",
    image: property4,
  },
];
