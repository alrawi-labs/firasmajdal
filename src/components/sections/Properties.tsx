import { motion } from "framer-motion";
import { PropertyCard } from "../components/PropertyCard";
import { properties } from "../data/properties";
import { LuxuryCTA } from "./LuxuryCTA";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Properties() {
  return (
    <section id="properties" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-3">
              Portfoy
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              One Cikan Gayrimenkullerimiz
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="#"
              className="inline-flex items-center font-medium text-foreground hover:text-primary transition-colors border-b border-primary/30 hover:border-primary pb-1"
            >
              Tum Gayrimenkuller
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
