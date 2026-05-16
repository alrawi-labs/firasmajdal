import { motion } from "framer-motion";
import { Testimonial } from "../types";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-card rounded-2xl p-8 border border-border shadow-sm relative"
    >
      <div className="absolute -top-6 right-8">
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
          <Quote className="w-6 h-6 fill-current" />
        </div>
      </div>

      <p className="text-muted-foreground text-lg leading-relaxed italic mb-8 pt-4">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 mr-4"
        />
        <div>
          <h4 className="font-serif font-bold text-foreground text-lg">
            {testimonial.name}
          </h4>
          <p className="text-primary text-sm font-medium">
            {testimonial.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
