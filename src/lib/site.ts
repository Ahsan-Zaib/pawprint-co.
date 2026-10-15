import grooming from "@/assets/grooming.jpg";
import walking from "@/assets/walking.jpg";
import sitting from "@/assets/sitting.jpg";
import daycare from "@/assets/daycare.jpg";
import taxi from "@/assets/taxi.jpg";
import hero from "@/assets/hero.jpg";

/** PLACEHOLDER — replace with the official WhatsApp number (international format, digits only). */
export const WHATSAPP_NUMBER = "440000000000";
export const CONTACT_EMAIL = "hello@example.com"; // PLACEHOLDER
export const CURRENCY = "£";

export function waLink(message = "Hi Pawprint & Co., I'd like to know more about your services.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type ServiceSlug = "dog-grooming" | "dog-walking" | "pet-sitting" | "boarding-daycare" | "pet-transport" | "additional-services";

export interface ServiceCategory {
  slug: ServiceSlug;
  name: string;
  short: string;
  emoji: string;
  image: string;
  tone: "mint" | "peach" | "cream";
  intro: string;
  items: string[];
  suitableFor: string[];
  duration: string;
  preparation: string[];
  safety: string[];
  faqs: { q: string; a: string }[];
  note?: string;
  waMessage: string;
}

export const services: ServiceCategory[] = [
  {
    slug: "dog-grooming",
    name: "Dog Grooming",
    short: "Fresh, fluffy and comfortable — grooming tailored to coat, breed and temperament.",
    emoji: "✂️",
    image: grooming,
    tone: "mint",
    intro:
      "Calm, patient grooming sessions that leave your dog looking great and feeling even better. Every visit starts with a gentle hello and a coat check so we can tailor the session to your dog.",
    items: [
      "Full grooming packages",
      "Bathing and blow-drying",
      "Brushing and coat maintenance",
      "Nail trimming",
      "Ear cleaning where appropriate",
      "Puppy introduction grooming",
      "Breed-appropriate coat care",
      "De-shedding treatments",
      "Grooming add-ons",
      "Special coat-care requests",
    ],
    suitableFor: ["Puppies having their first groom", "Adult dogs of all sizes", "Nervous dogs who need a slower pace", "Double-coated breeds needing de-shedding"],
    duration: "Typically 1–3 hours depending on size, coat condition and package.",
    preparation: ["Give your dog a short walk before the appointment", "Let us know about any skin conditions, lumps or sensitivities", "Share any previous grooming experiences or worries"],
    safety: ["Full grooms, hand-stripping and breed styling are carried out by qualified groomers using professional equipment", "We'll pause or stop a session if your dog becomes distressed", "Severely matted coats may need a shorter clip for comfort"],
    faqs: [
      { q: "How often should my dog be groomed?", a: "It depends on the coat. Many dogs benefit from a groom every 4–8 weeks; we'll recommend a routine after the first visit." },
      { q: "Can you groom anxious dogs?", a: "Yes — we take things slowly, offer breaks and keep sessions as calm as possible. Please tell us about any anxieties when booking." },
    ],
    note: "Services marked as full grooms require a qualified groomer and specialist equipment.",
    waMessage: "Hi, I'd like a quote for dog grooming.",
  },
  {
    slug: "dog-walking",
    name: "Dog Walking & Exercise",
    short: "Joyful walks and enrichment that fit your dog's energy, age and routine.",
    emoji: "🦮",
    image: walking,
    tone: "peach",
    intro:
      "From bouncy puppies to gentle seniors, we plan every walk around your dog's needs, lead requirements and personality — with an update after each outing.",
    items: [
      "Individual dog walks",
      "Group walks where suitable",
      "Puppy walks",
      "Scheduled weekday walks",
      "Weekend walks",
      "Recurring walking plans",
      "Exercise and enrichment visits",
      "Senior-dog walks tailored to mobility",
      "Updates after walks",
    ],
    suitableFor: ["Busy owners who want a reliable routine", "Puppies building confidence", "Senior dogs needing shorter, gentler walks", "Dogs who prefer one-to-one attention"],
    duration: "30 or 60-minute walks, one-off or on a recurring schedule.",
    preparation: ["Tell us about recall, reactivity and lead preferences", "Leave a harness, lead and poo bags somewhere easy to find", "Share any health or mobility considerations"],
    safety: ["Group walks are only offered to dogs assessed as suitable", "Dogs stay on lead unless you've given written permission and recall is reliable", "Walks may be shortened in extreme weather"],
    faqs: [
      { q: "Will you walk my dog with others?", a: "Only if you'd like a group walk and your dog is a good match. One-to-one walks are always available." },
      { q: "Do I get updates?", a: "Yes — we'll send a short update after each walk." },
    ],
    waMessage: "Hi, I'd like to arrange a dog walking appointment.",
  },
  {
    slug: "pet-sitting",
    name: "Pet Sitting & Home Visits",
    short: "Loving care in the comfort of home — feeding, fuss, fresh water and company.",
    emoji: "🏡",
    image: sitting,
    tone: "mint",
    intro:
      "Your pet stays in familiar surroundings while we take care of feeding, cleaning, playtime and companionship. Each visit has a clear scope so you always know what's included.",
    items: [
      "Cat sitting",
      "Dog sitting, where offered",
      "Feeding visits",
      "Fresh water and food checks",
      "Litter tray cleaning",
      "Playtime and companionship",
      "Puppy check-ins",
      "Senior-pet visits",
      "Routine home visits",
      "Holiday pet sitting",
      "Overnight sitting, if offered",
    ],
    suitableFor: ["Cats who prefer staying home", "Pets on a set feeding routine", "Owners going on holiday", "Senior pets who need a check-in"],
    duration: "30-minute or 1-hour visits, once or several times a day.",
    preparation: ["Write down feeding amounts and routines", "Leave vet details and emergency contacts", "Arrange key handover in advance"],
    safety: ["Visits cover the care agreed at booking — longer tasks may need a longer visit", "We'll contact you and your vet if we have any health concerns", "Overnight sitting is only available where offered"],
    faqs: [
      { q: "Can you give medication?", a: "Simple oral medication can often be given — please describe it when booking and we'll confirm." },
      { q: "How do keys work?", a: "We'll arrange a secure key handover before the first visit." },
    ],
    waMessage: "Hi, I'd like to book pet sitting for my pet.",
  },
  {
    slug: "boarding-daycare",
    name: "Boarding & Daycare",
    short: "Play, rest and socialising in a safe, supervised environment.",
    emoji: "🐾",
    image: daycare,
    tone: "peach",
    intro:
      "Half-day and full-day daycare, plus overnight stays, for dogs who love company. Boarding and daycare are offered only where suitable facilities, staffing, licensing, insurance and welfare procedures are in place.",
    items: [
      "Daycare sessions",
      "Half-day daycare",
      "Full-day daycare",
      "Overnight boarding",
      "Multi-day boarding",
      "Puppy daycare, where suitable",
      "Socialisation sessions where appropriate",
      "Regular daycare packages",
    ],
    suitableFor: ["Sociable dogs who enjoy other dogs", "Owners with long workdays", "Puppies learning good social skills", "Short trips away"],
    duration: "Half-day, full-day or multi-night stays.",
    preparation: ["A short introduction visit is required before the first stay", "Vaccinations and flea/worm treatment must be up to date", "Pack food, bedding and any comfort items"],
    safety: ["Availability depends on facilities, staffing and licensing", "Dogs are matched into play groups by size and temperament", "Rest periods are built into every day"],
    faqs: [
      { q: "Is there an assessment?", a: "Yes, every dog has a short trial session first to make sure they'll be happy and safe." },
      { q: "Is boarding always available?", a: "Boarding is subject to availability and capacity. Please request your dates and we'll confirm." },
    ],
    note: "Availability depends on suitable facilities, staffing, licensing and insurance.",
    waMessage: "Hi, I'd like to ask about daycare or boarding.",
  },
  {
    slug: "pet-transport",
    name: "Pet Taxi & Transport",
    short: "Safe, calm journeys to the vet, groomer, daycare and back home.",
    emoji: "🚗",
    image: taxi,
    tone: "mint",
    intro:
      "Pre-arranged local trips with pets secured safely for every journey. Perfect when you can't make an appointment yourself.",
    items: [
      "Veterinary appointment transportation",
      "Grooming appointment transportation",
      "Pet pickup and drop-off",
      "Daycare transportation",
      "Pre-arranged local pet transport",
    ],
    suitableFor: ["Busy owners", "Owners without a car", "Pets with regular appointments"],
    duration: "Priced per journey within the local service area.",
    preparation: ["Share the pickup and destination addresses", "Provide a carrier for cats and small pets", "Let us know about travel sickness or anxiety"],
    safety: ["All pets travel secured in a crate or approved harness", "Service is limited to the local service area; extra mileage fees may apply", "We can't transport pets that are seriously unwell — in an emergency, contact your vet"],
    faqs: [{ q: "How far do you travel?", a: "We cover our local service area. Journeys outside it may carry an additional fee — just ask." }],
    note: "Service-area restrictions and additional mileage fees may apply.",
    waMessage: "Hi, I'd like to arrange pet transport.",
  },
  {
    slug: "additional-services",
    name: "Additional Services",
    short: "Extras and custom plans for multi-pet homes, celebrations and more.",
    emoji: "✨",
    image: hero,
    tone: "peach",
    intro: "Flexible extras to make pet life easier. Tell us what you need and we'll put together a plan.",
    items: [
      "Pet waste cleanup",
      "Basic pet supply delivery",
      "Pet accessories and essentials",
      "Puppy routine support",
      "Pet photography",
      "Pet birthday packages",
      "Enrichment activities",
      "Holiday pet-care packages",
      "Multi-pet household services",
      "Custom pet-care plans",
    ],
    suitableFor: ["Multi-pet households", "New puppy owners", "Special occasions"],
    duration: "Varies — usually quoted individually.",
    preparation: ["Describe what you'd like in your booking notes"],
    safety: ["Some extras are only available alongside another service"],
    faqs: [{ q: "Can you build a custom plan?", a: "Yes — request a custom quote and we'll get back to you." }],
    waMessage: "Hi, I'd like to ask about your additional pet services.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------
 * EXAMPLE PRICING — development values only. Replace before launch.
 * ------------------------------------------------------------------ */
export interface PricedOption {
  id: string;
  service: ServiceSlug;
  label: string;
  base: number;
  minutes: number;
  sizePricing?: boolean;
  quoteOnly?: boolean;
}

export const pricingOptions: PricedOption[] = [
  { id: "groom-full", service: "dog-grooming", label: "Full groom", base: 45, minutes: 150, sizePricing: true },
  { id: "groom-bath", service: "dog-grooming", label: "Bath & blow-dry", base: 30, minutes: 75, sizePricing: true },
  { id: "groom-puppy", service: "dog-grooming", label: "Puppy introduction", base: 25, minutes: 45 },
  { id: "walk-30", service: "dog-walking", label: "30-minute walk", base: 12, minutes: 30 },
  { id: "walk-60", service: "dog-walking", label: "1-hour walk", base: 18, minutes: 60 },
  { id: "sit-30", service: "pet-sitting", label: "30-minute home visit", base: 14, minutes: 30 },
  { id: "sit-60", service: "pet-sitting", label: "1-hour home visit", base: 20, minutes: 60 },
  { id: "day-half", service: "boarding-daycare", label: "Half-day daycare", base: 20, minutes: 240 },
  { id: "day-full", service: "boarding-daycare", label: "Full-day daycare", base: 32, minutes: 480 },
  { id: "board-night", service: "boarding-daycare", label: "Overnight boarding (per night)", base: 40, minutes: 1440 },
  { id: "taxi-local", service: "pet-transport", label: "Local journey (one way)", base: 15, minutes: 45 },
  { id: "custom", service: "additional-services", label: "Custom plan", base: 0, minutes: 60, quoteOnly: true },
];

export const sizeMultipliers = { small: 1, medium: 1.2, large: 1.45, giant: 1.7 } as const;
export type PetSize = keyof typeof sizeMultipliers;

export const addOns = [
  { id: "nails", label: "Nail trim", price: 8 },
  { id: "teeth", label: "Teeth brushing", price: 6 },
  { id: "deshed", label: "De-shedding treatment", price: 12 },
  { id: "photo", label: "Photo update", price: 0 },
  { id: "meds", label: "Medication (oral)", price: 3 },
];

export const pricingRules = {
  additionalPetRate: 0.5, // each extra pet adds 50% of base
  travelFeeOutsideArea: 6,
  minimumCharge: 12,
  recurringDiscount: { daily: 0.1, weekly: 0.08, fortnightly: 0.05, monthly: 0.03, custom: 0 } as Record<string, number>,
  depositRate: 0, // no deposit by default
};

/** Example "core" postcode prefixes — PLACEHOLDER service area. */
export const coreAreaPrefixes = ["AB1", "AB2", "AB3"];

export type Frequency = "one-time" | "daily" | "weekly" | "fortnightly" | "monthly" | "custom";

export interface QuoteInput {
  optionIds: string[];
  pets: number;
  size: PetSize;
  addOnIds: string[];
  frequency: Frequency;
  postcode: string;
}

export function calculateQuote(q: QuoteInput) {
  const lines: { label: string; amount: number }[] = [];
  let needsManual = false;
  const opts = pricingOptions.filter((o) => q.optionIds.includes(o.id));
  let minutes = 0;
  for (const o of opts) {
    if (o.quoteOnly) {
      needsManual = true;
      continue;
    }
    const mult = o.sizePricing ? sizeMultipliers[q.size] : 1;
    const base = o.base * mult;
    lines.push({ label: o.label + (o.sizePricing ? ` (${q.size})` : ""), amount: base });
    if (q.pets > 1) lines.push({ label: `Additional pets × ${q.pets - 1}`, amount: base * pricingRules.additionalPetRate * (q.pets - 1) });
    minutes += o.minutes;
  }
  for (const a of addOns.filter((a) => q.addOnIds.includes(a.id))) {
    lines.push({ label: a.label, amount: a.price * q.pets });
  }
  const pc = q.postcode.trim().toUpperCase().replace(/\s/g, "");
  if (pc && !coreAreaPrefixes.some((p) => pc.startsWith(p))) {
    lines.push({ label: "Travel fee (outside core area)", amount: pricingRules.travelFeeOutsideArea });
  }
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const rate = q.frequency === "one-time" ? 0 : pricingRules.recurringDiscount[q.frequency] ?? 0;
  const discount = subtotal * rate;
  let total = subtotal - discount;
  if (total > 0 && total < pricingRules.minimumCharge) total = pricingRules.minimumCharge;
  return { lines, subtotal, discount, discountRate: rate, total, minutes, needsManual };
}

export const money = (n: number) => `${CURRENCY}${n.toFixed(2)}`;
