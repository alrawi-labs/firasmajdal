import { Service } from "../types";
import { Building2, Scale, Globe } from "lucide-react";

export const services: Service[] = [
  {
    id: "1",
    title: "Gayrimenkul Danışmanlığı",
    description: "Luks konut ve ticari gayrimenkul yatirimlarinizda degerleme, portfoy yonetimi ve satin alma sureclerinde profesyonel rehberlik.",
    icon: Building2,
  },
  {
    id: "2",
    title: "Hukuki Danışmanlık",
    description: "Gayrimenkul hukuku, yabancilar hukuku ve vatandaslik sureclerinde uzman avukat kadromuzla tam kapsamli guvence.",
    icon: Scale,
  },
  {
    id: "3",
    title: "Tercume Hizmetleri",
    description: "Resmi belgelerinizin yeminli tercumesi ve uluslararasi islemlerinizde anadilde destek saglayan uzman tercumanlik.",
    icon: Globe,
  },
];
