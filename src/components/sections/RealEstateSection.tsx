"use client";
import { motion } from "framer-motion";


const stats = [
    { value: "500+", label: "Tamamlanan Satış" },
    { value: "12+", label: "Yıllık Deneyim" },
    { value: "98%", label: "Müşteri Memnuniyeti" },
];

const features = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: "Geniş Portföy",
        desc: "Yüzlerce seçenek arasından size özel mülk.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V7l-8-4z" />
            </svg>
        ),
        title: "Güvenli Süreç",
        desc: "Satın alma süreçlerinde hukuki güvence.",
    },
];

const listings = [
    {
        id: 1,
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: "Değerleme",
        desc: "Profesyonel piyasa analizi",
    },
    {
        id: 2,
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
        title: "Portföy Yönetimi",
        desc: "Size özel mülk seçenekleri",
    },
    {
        id: 3,
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V7l-8-4z" />
            </svg>
        ),
        title: "Hukuki Danışmanlık",
        desc: "Güvenli satın alma süreci",
    },
    {
        id: 4,
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
        title: "Yatırım Analizi",
        desc: "Karlı fırsatları birlikte keşfedin",
    },
];

const ContentSquare = ({ i, item }: { i: number; item: typeof listings[0] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            className={`group relative bg-white flex flex-col items-start justify-center gap-3 cursor-pointer hover:bg-[#F5F2ED] transition-colors duration-300 ${
                i < listings.length - 1 ? "border-r border-black/10" : ""
            }`}
            style={{ padding: "clamp(14px,1.8vh,22px) clamp(12px,1.4vw,20px)" }}
        >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#B8975A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            <div className="flex items-center justify-center rounded-full" style={{ width: "40px", height: "40px", background: "#B8975A15", color: "#B8975A" }}>
                {item.icon}
            </div>
            <div>
                <p className="text-[#1a1a1a] font-semibold mb-1" style={{ fontSize: "clamp(12px,1.1vw,14px)" }}>{item.title}</p>
                <p className="text-[#888] hidden sm:block" style={{ fontSize: "clamp(10px,0.85vw,12px)" }}>{item.desc}</p>
            </div>
        </motion.div>
    );
};

const MobileStats = () => (
    <div className="flex md:hidden justify-around py-4 border-t border-black/10 mt-4">
        {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
                <p className="text-[#1a1a1a] font-bold" style={{ fontSize: "1.4rem" }}>{s.value}</p>
                <p className="text-[#888] tracking-widest uppercase text-center" style={{ fontSize: "9px" }}>{s.label}</p>
            </div>
        ))}
    </div>
);

export function RealEstateSection() {
    return (
        <section
        id="estates"
            className="font-serif font-semibold bg-[#F5F2ED] w-full overflow-x-hidden scroll-mt-5"
            style={{ minHeight: "100svh" }}
        >
            <div
                className="w-full h-full grid md:grid-cols-[1fr_auto_auto]"
                style={{
                    padding: "clamp(24px,10vh,152px) clamp(24px,5vw,80px)",
                    gap: "clamp(16px,3vw,48px)",
                }}
            >
                {/* Sol — metin + butonlar + kartlar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col justify-between h-full"
                >
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 mb-4"
                        style={{ border: "0.5px solid rgba(184, 151, 90, 0.3)", borderRadius: "16px" }}
                    >
                        <div className="p-6 md:p-8">
                            <p className="text-[#B8975A] tracking-[0.28em] uppercase mb-3" style={{ fontSize: "clamp(10px,1vw,12px)" }}>
                                Gayrimenkul Danışmanlığı
                            </p>
                            <h1 className="text-[#1a1a1a] leading-[1.05] mb-4" style={{ fontSize: "clamp(1.8rem,3.8vw,3.4rem)" }}>
                                Hayalinizdeki<br />Mülkü Birlikte<br />Buluyoruz
                            </h1>
                            <div className="mb-4" style={{ width: "36px", height: "2px", background: "#B8975A" }} />
                            <p className="text-[#555] leading-relaxed mb-6" style={{ fontSize: "clamp(13px,1.1vw,15px)", maxWidth: "380px" }}>
                                Lüks konut ve ticari gayrimenkul yatırımlarınızda değerleme, portföy yönetimi ve satın alma süreçlerinde profesyonel rehberlik.
                            </p>
                            <div className="flex flex-col gap-3 mb-6">
                                {features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div
                                            className="flex items-center justify-center rounded-full flex-shrink-0"
                                            style={{
                                                width: "clamp(36px,4vw,44px)",
                                                height: "clamp(36px,4vw,44px)",
                                                background: i === 0 ? "#1a1a1a" : "#B8975A20",
                                                color: i === 0 ? "#fff" : "#B8975A",
                                            }}
                                        >
                                            {f.icon}
                                        </div>
                                        <div>
                                            <p className="text-[#1a1a1a] font-semibold" style={{ fontSize: "clamp(13px,1.1vw,15px)" }}>{f.title}</p>
                                            <p className="text-[#888]" style={{ fontSize: "clamp(11px,0.95vw,13px)" }}>{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <button
                                    className="flex items-center gap-2 bg-[#1a1a1a] text-white hover:bg-[#B8975A] transition-colors duration-300 tracking-[0.18em] uppercase"
                                    style={{ fontSize: "clamp(10px,1vw,12px)", padding: "clamp(11px,1.4vh,15px) clamp(18px,2.2vw,30px)" }}
                                >
                                    İletişime Geç
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                                <button
                                    className="flex items-center gap-2 border text-[#1a1a1a] hover:border-[#B8975A] hover:text-[#B8975A] transition-colors duration-300 tracking-[0.18em] uppercase"
                                    style={{ fontSize: "clamp(10px,1vw,12px)", padding: "clamp(11px,1.4vh,15px) clamp(18px,2.2vw,30px)", borderColor: "rgba(0,0,0,0.25)" }}
                                >
                                    Tüm İlanlar
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                            <MobileStats />
                        </div>

                        {/* soovImg — desktop: sağ kolonda (md:block), mobil: kartın altında tam genişlik */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.15 }}
                            className="relative w-full overflow-hidden"
                            style={{
                                minHeight: "240px",
                                borderRadius: "0 0 14px 14px", /* mobil: alt köşeler */
                            }}
                        >
                            {/* md+ için border-radius override */}
                            <style>{`@media(min-width:768px){.soov-inner{border-radius:0 16px 16px 0 !important;}}`}</style>
                            <div
                                className="soov-inner absolute inset-0"
                                style={{ borderRadius: "inherit", overflow: "hidden" }}
                            >
                                <img
                                    src="assets/soov.png"
                                    alt="About Fotoğrafı"
                                    className="w-full h-full object-cover object-top"
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ background: "linear-gradient(to right, #F5F2ED 0%, #F0EDE8 2%, transparent 28%)" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Hizmet kartları */}
                    <div
                        className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden"
                        style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
                    >
                        {listings.map((item, i) => (
                            <ContentSquare key={item.id} i={i} item={item} />
                        ))}
                    </div>
                </motion.div>

                {/* Orta — gayrimankullerImg */}
                {/* Desktop: orijinal (hidden md:block, sabit genişlik).
                    Mobil: hidden md:block kaldırıldı → tam genişlik, 280px yükseklik */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.15 }}
                    style={{ borderRadius: "16px", overflow: "hidden" }}
                >
                    <style>{`
                        /* Mobil: tam genişlik kart */
                        .gay-photo { width: 100%; height: 280px; }
                        /* Desktop: orijinal boyutlar */
                        @media(min-width:768px){
                            .gay-photo {
                                width: clamp(220px,24vw,360px);
                                height: 100%;
                                max-height: 100svh;
                                position: relative;
                            }
                        }
                    `}</style>
                    <div className="gay-photo" style={{ overflow: "hidden", borderRadius: "16px" }}>
                        <img
                            src="assets/gayrimankuller.png"
                            alt="Gayrimenkul Danışmanı"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                </motion.div>

                {/* Sağ — stats + alıntı: sadece desktop (orijinaliyle aynı) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="hidden md:flex flex-col self-stretch"
                    style={{
                        width: "clamp(140px,13vw,185px)",
                        justifyContent: "space-around",
                        alignItems: "stretch",
                    }}
                >
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center justify-between flex-1"
                            style={{ background: "#F1EDEA" }}
                        >
                            <div style={{ border: "none", borderTop: "2px solid #B8975A", margin: "0 8px", height: "0.1px", width: "30%" }} />
                            <div className="flex flex-col items-center">
                                <p className="text-[#1a1a1a] leading-none" style={{ fontSize: "clamp(1.6rem,2.6vw,2.4rem)", fontWeight: 700 }}>{s.value}</p>
                                <div style={{ width: "24px", background: "#B8975A50" }} />
                                <p className="text-[#888] tracking-[0.18em] uppercase text-center" style={{ fontSize: "10px" }}>{s.label}</p>
                            </div>
                            <div />
                        </div>
                    ))}
                    <div
                        className="rounded-xl"
                        style={{ background: "#1a1a1a", border: "0.5px solid rgba(255,255,255,0.08)", padding: "clamp(14px,1.8vh,22px)" }}
                    >
                        <p className="text-[#B8975A] mb-1" style={{ fontSize: "clamp(18px,2vw,24px)", lineHeight: 1, fontWeight: 700 }}>"</p>
                        <p className="text-white leading-snug mb-2" style={{ fontSize: "13px" }}>Hayalinizdeki mülkü birlikte buluyoruz.</p>
                        <p className="text-[#888]" style={{ fontSize: "11px" }}>Portföyümüzü keşfetmek için iletişime geçin.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}