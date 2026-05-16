import { motion } from "framer-motion";
import { Service } from "../types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-2xl p-8 border border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
      
      <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
        <Icon className="w-7 h-7 text-primary" />
      </div>

      <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
        {service.title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed">
        {service.description}
      </p>

      <div className="mt-8 flex items-center text-sm font-semibold text-primary uppercase tracking-wider">
        <span className="mr-2">Detayli Bilgi</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </motion.div>
  );
}
