export interface Property {
  id: string;
  title: string;
  type: "apartment" | "villa" | "office" | "penthouse";
  location: string;
  price: string;
  m2: number;
  rooms: string;
  status: "SATILIK" | "KIRALIK";
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  image: string;
}
