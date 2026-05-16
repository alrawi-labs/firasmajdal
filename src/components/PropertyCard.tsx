import { motion } from "framer-motion";
import { Property } from "../types";
import { Heart, MapPin, Maximize, BedDouble } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl"
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider bg-primary/90 text-primary-foreground backdrop-blur-md rounded-full shadow-sm">
            {property.status}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <button className="p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm">
            <Heart className="w-4 h-4" />
          </button>
        </div>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1.5" />
          {property.location}
        </div>
        
        <h3 className="font-serif text-xl font-semibold text-foreground mb-4 line-clamp-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center justify-between py-4 border-y border-border/50 mb-4">
          <div className="flex items-center text-sm font-medium text-foreground">
            <Maximize className="w-4 h-4 text-primary mr-2" />
            {property.m2} m²
          </div>
          <div className="flex items-center text-sm font-medium text-foreground">
            <BedDouble className="w-4 h-4 text-primary mr-2" />
            {property.rooms}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground font-medium">Fiyat</div>
          <div className="font-serif text-xl font-bold text-primary">
            {property.price} TL
          </div>
        </div>
      </div>
    </motion.div>
  );
}
