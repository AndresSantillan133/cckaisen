export const BRAND = {
  name: "CCKaisen",
  coach: "Charly",
  location: "Uruapan, Michoacán",
  whatsappNumber: "5214521986285",
  whatsappDisplay: "+52 1 452 198 6285",
};

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encoded}`;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola Charly, quiero información sobre los planes de CCKaisen 💪";
