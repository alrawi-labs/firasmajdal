
const WHATSAPP_NUMBER = "905427666190";

export function getWhatsAppLink(message?: string): string {
  const defaultMessage = "Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.";
  const text = encodeURIComponent(message ?? defaultMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}