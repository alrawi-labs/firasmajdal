import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, CheckCircle, Award, Map } from "lucide-react";

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  inView: boolean;
}

function Counter({ end, duration, suffix = "", inView }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    if (inView) {
      window.requestAnimationFrame(step);
    }
  }, [end, duration, inView]);

  return (
    <span className="font-serif text-4xl md:text-5xl font-bold text-primary">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { id: 1, end: 500, suffix: "+", label: "Mutlu Musteri", icon: Users },
    { id: 2, end: 250, suffix: "+", label: "Tamamlanan Proje", icon: CheckCircle },
    { id: 3, end: 15, suffix: "+", label: "Yillik Deneyim", icon: Award },
    { id: 4, end: 10, suffix: "+", label: "Stratejik Lokasyon", icon: Map },
  ];

  return (
    <section ref={ref} className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pattern-dots" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  <Icon className="w-8 h-8" />
                </div>
                <Counter end={stat.end} duration={2000} suffix={stat.suffix} inView={isInView} />
                <p className="mt-3 text-white/80 font-medium tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
