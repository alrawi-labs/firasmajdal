import { Testimonial } from "../types";
import avatar1 from "../assets/avatar-1.png";
import avatar2 from "../assets/avatar-2.png";
import avatar3 from "../assets/avatar-3.png";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmet Yilmaz",
    title: "Yatirimci",
    quote: "Premium Danismanlik ile calismak, Istanbul'daki yatirim surecimizi inanilmaz derecede kolaylastirdi. Hukuki ve emlak destekleri kusursuzdu.",
    image: avatar1,
  },
  {
    id: "2",
    name: "Elena Rossi",
    title: "Uluslararasi Musteri",
    quote: "Vatandaslik basvurum ve yali satin alma surecimde gosterdikleri ozen, Premium Danismanlik'in neden en iyisi oldugunu kanitladi.",
    image: avatar2,
  },
  {
    id: "3",
    name: "Kerem Kaya",
    title: "Holding Yoneticisi",
    quote: "Kurumsal ofis arayisimizda hizli, analitik ve nokta atisi cozumler sundular. Luks gayrimenkulde tek adresimiz.",
    image: avatar3,
  },
];
