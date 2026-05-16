import { Phone } from "lucide-react";
import logo from "../assets/firas_logo_just.png";

const navLinks = [
  { label: "Anasayfa", href: "#hero" },
  { label: "Hakkımızda", href: "#about" },
  { label: "Hukuk", href: "#law" },
  { label: "Gayrimenkuller", href: "#estates" },
  { label: "Tercüman", href: "#translator" },
  { label: "İletişim", href: "#contact" },
];

const services = [
  { label: "Gayrimenkul Hukuku", href: "#law" },
  { label: "Yatırım Danışmanlığı", href: "#law" },
  { label: "İkamet İzni İşlemleri", href: "#law" },
  { label: "Ticaret Hukuku", href: "#law" },
  { label: "Portföy Yönetimi", href: "#estates" },
  { label: "Arapça-Türkçe Yeminli Tercümanlık", href: "#translator" },
];

export function Footer() {
  return (
    <footer className="bg-[#041225] text-white pt-20 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand Col */}
          <div className="md:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Firas Real Estate" className="h-30 w-auto object-contain" />
              <div className="flex flex-col ml-3 mt-2">
                <span className="font-serif text-4xl tracking-widest font-bold text-primary">
                  FİRAS
                </span>
                <span className="text-[1rem] tracking-[0.2em] font-medium text-white/70">
                  REAL ESTATE
                </span>
              </div>
            </a>
            <p className="text-white/60 leading-relaxed mb-8 max-w-sm font-light text-sm">
              Lüks gayrimenkul yatırımları, hukuki danışmanlık ve Arapça-Türkçe yeminli tercümanlıkta güvenin adresi. İstanbul'un prestijli projelerinde ayrıcalıklı hizmet.
            </p>
            <div className="flex items-start gap-5">
              <div
                style={{
                  width: "42px", height: "42px",
                  border: "1px solid rgba(201,168,76,0.35)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Phone size={22} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ color: "#C9A84C", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", marginBottom: "4px" }}>
                  TELEFON
                </p>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: 1.5 }}>
                  +90 542 766 61 90
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-4 md:pl-8">
            <h4 className="font-serif text-xl font-bold text-white mb-6">Hızlı Linkler</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm relative group inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-xl font-bold text-white mb-6">Hizmetlerimiz</h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm relative group inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/50 text-xs">
          <p>© {new Date().getFullYear()} Firas Real Estate. Tüm hakları saklıdır.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-primary transition-colors">Kullanım Koşulları</a>
            <a href="#" className="hover:text-primary transition-colors">KVKK Aydınlatma Metni</a>
          </div>
        </div>
      </div>
    </footer>
  );
}