import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Building2, Scale, Users } from "lucide-react";

// ─── Veri ────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 1,
    icon: FileText,
    title: "Resmi Belgeler",
    description: "Tapu, sözleşme ve noter evraklarında eksiksiz tercüme.",
  },
  {
    id: 2,
    icon: Building2,
    title: "Gayrimenkul Görüşmeleri",
    description: "Satış, kira ve keşif süreçlerinde yanınızda.",
  },
  {
    id: 3,
    icon: Scale,
    title: "Hukuki Tercüme",
    description: "Mahkeme, avukatlık ve resmi kurum yazışmaları.",
  },
  {
    id: 4,
    icon: Users,
    title: "Refakatçi Tercüman",
    description: "Toplantı, hastane ve resmi ziyaretlerde bire bir destek.",
  },
];

// ─── Alt bileşenler ────────────────────────────────────────────────────────────

interface ServiceCardProps {
  service: (typeof services)[number];
  index: number;
  isInView: boolean;
}

function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6
                 hover:border-white/[0.14] hover:bg-white/[0.06] transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20
                      flex items-center justify-center text-amber-400 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-white/90 mb-1">{service.title}</h4>
        <p className="text-xs text-white/40 leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Ana bileşen ──────────────────────────────────────────────────────────────

export function TranslatorSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-[#0d1117] overflow-hidden"
      aria-labelledby="translator-heading"
    >
      {/* Izgara deseni */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,rgba(255,255,255,0.025) 0,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 80px)," +
            "repeating-linear-gradient(0deg,rgba(255,255,255,0.025) 0,rgba(255,255,255,0.025) 1px,transparent 1px,transparent 80px)",
        }}
      />

      {/* Yumuşak ışık lekeleri */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(251,191,36,0.07) 0%,transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 65%)" }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Sol: metin bloğu ── */}
          <div>
            {/* Etiket */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-medium tracking-[0.18em] uppercase text-amber-400/80 mb-4"
            >
              Tercümanlık Hizmetleri
            </motion.p>

            {/* Başlık */}
            <motion.h2
              id="translator-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-6"
            >
              İki dil,
              <br />
              <span className="text-amber-400">bir güven.</span>
            </motion.h2>

            {/* Alt başlık */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/50 text-base leading-relaxed mb-10 max-w-md"
            >
              Türkçe ve Arapça arasında resmi belgelerden günlük iletişime
              kadar her adımda yanınızdayım. Dil engeli yüzünden hiçbir
              fırsatınızı kaçırmamanız için burdayım.
            </motion.p>

            {/* Dil çifti */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-10"
            >
              {/* Türkçe */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08]
                              bg-white/[0.04] px-5 py-3">
                <span className="text-2xl" role="img" aria-label="Türk bayrağı">🇹🇷</span>
                <div>
                  <p className="text-sm font-medium text-white/90 leading-none">Türkçe</p>
                  <p className="text-xs text-white/35 mt-0.5">Ana dil</p>
                </div>
              </div>

              {/* Ok */}
              <div className="text-white/20 shrink-0">
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden="true">
                  <path d="M0 6h20M14 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Arapça */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08]
                              bg-white/[0.04] px-5 py-3">
                <span className="text-2xl" role="img" aria-label="Suudi Arabistan bayrağı">🇸🇦</span>
                <div>
                  <p className="text-sm font-medium text-white/90 leading-none">Arapça</p>
                  <p className="text-xs text-white/35 mt-0.5 font-arabic" dir="rtl">عربي</p>
                </div>
              </div>
            </motion.div>

            {/* Alıntı */}
            <motion.blockquote
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="border-l-2 border-amber-500/40 pl-5"
              style={{ borderRadius: 0 }}
            >
              <p className="font-serif text-base italic text-white/40 leading-relaxed">
                "Yabancı hissetmeden, kendi dilinizde anlaşılarak işlerinizi
                yürütebilirsiniz."
              </p>
            </motion.blockquote>
          </div>

          {/* ── Sağ: hizmet kartları ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}