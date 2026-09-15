import brideImg from "@/assets/bride.jpg";
import groomImg from "@/assets/groom.jpg";
import heroImg from "@/assets/hero.jpg";
import haldiImg from "@/assets/haldi.png";
import sangeetImg from "@/assets/sangeet.png";
import weddingImg from "@/assets/wedding.png";
import logoImg from "@/assets/logo.png";
import maImg from "@/assets/m&a.png";

export type ThemeKey = "sage" | "peach" | "powder" | "blush" | "champagne";

export interface WeddingEvent {
  id: string;
  name: string;
  subtitle: string;
  date: string; // ISO date, e.g. 2026-12-18
  startTime: string; // 24h HH:MM
  endTime: string;
  venue: string;
  address: string;
  lat: number;
  lng: number;
  mapsLink: string;
  dressCode: string;
  description: string;
  theme: ThemeKey;
  image: string;
}

export interface StoryMoment {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export const story: StoryMoment[] = [];

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "Portraits" | "Celebrations" | "Venues";
  tall?: boolean;
}

export interface Blessing {
  id: string;
  side: "Bride's Family" | "Groom's Family";
  names: string;
  relation: string;
  message: string;
}

export const couple = {
  coupleImage: maImg,
  bride: {
    name: "Akansha",
    fullName: "Akansha Wankhade",
    parents: "Daughter of Mr. Vilas Wankhade & Mrs. Minakshi Wankhade",
    image: brideImg,
    bio: "Carrying the warmth of Maharashtra, now coding the future for ISRO's skies,  She spins grace through the rhythm of dance and breathes life onto canvas with vibrant strokes of painting.",
  },
  groom: {
    name: "Mohit",
    fullName: "Mohit Sharma",
    parents: "Son of Mr. Rajinder Kumar & Late Mrs. Seema Sharma",
    image: groomImg,
    bio: "Rooted in the soil of Punjab, A Scientist reaching for the stars, He maps the infinite skies while weaving melodies, captures fleeting moments through a lens, and wanders the world with a curious heart.",
  },
  hashtag: "#MohitWedsAkansha",
  city: "Ludhiana, Punjab",
  weddingDate: "2026-11-21T19:00:00+05:30",
  displayDate: "Saturday, 21 November 2026",
  heroImage: heroImg,
  logoImage: logoImg,
  invocation: "॥ श्री गणेशाय नमः ॥",
  welcome:
    "With the blessings of Late Shri Ram Prakash Sharma & Smt Pushvindera Rani, We invite you to join us as two hearts, two families and a thousand little moments become one.",
};

export const themes: Record<ThemeKey, { label: string; color: string; soft: string; ink: string }> = {
  sage: { label: "Sage", color: "var(--sage)", soft: "var(--sage-soft)", ink: "var(--sage-ink)" },
  peach: { label: "Marigold Yellow", color: "var(--peach)", soft: "var(--peach-soft)", ink: "var(--peach-ink)" },
  powder: { label: "Traditional Punjabi", color: "var(--powder)", soft: "var(--powder-soft)", ink: "var(--powder-ink)" },
  blush: { label: "Picture Perfect", color: "var(--blush)", soft: "var(--blush-soft)", ink: "var(--blush-ink)" },
  champagne: {
    label: "Champagne",
    color: "var(--champagne)",
    soft: "var(--champagne-soft)",
    ink: "var(--champagne-ink)",
  },
};

export const events: WeddingEvent[] = [
  {
    id: "haldi",
    name: "Haldi",
    subtitle: "Turmeric & Sunshine",
    date: "2026-11-19",
    startTime: "11:00",
    endTime: "13:00",
    venue: "Dhamot",
    address: "Dhamot, Punjab",
    lat: 30.6385,
    lng: 76.0125,
    mapsLink: "https://maps.app.goo.gl/jQ3kYXVQoQn5Yy3Z8?g_st=ic",
    dressCode: "Marigold Yellow",
    description:
      "Turmeric, laughter and joyful celebrations starting from 11:00 AM onwards.",
    theme: "peach",
    image: haldiImg,
  },
  {
    id: "sangeet",
    name: "Jaago (Sangeet)",
    subtitle: "A Night of Dancing",
    date: "2026-11-19",
    startTime: "18:00",
    endTime: "22:00",
    venue: "Dhamot",
    address: "Dhamot, Punjab",
    lat: 30.6385,
    lng: 76.0125,
    mapsLink: "https://maps.app.goo.gl/jQ3kYXVQoQn5Yy3Z8?g_st=ic",
    dressCode: "Traditional Punjabi ",
    description:
      "A night of Jaago, music, live dhol and dancing starting from 6:00 PM onwards.",
    theme: "powder",
    image: sangeetImg,
  },
  {
    id: "wedding",
    name: "Wedding",
    subtitle: "The Pheras & Celebration",
    date: "2026-11-21",
    startTime: "10:00",
    endTime: "16:00",
    venue: "By The Falls Mansion",
    address: "Ludhiana, Punjab",
    lat: 30.8654,
    lng: 75.7891,
    mapsLink: "https://maps.app.goo.gl/Qbd3A9LUKMCBLbGk9?g_st=ic",
    dressCode: "Dress to impress and help us make our day picture perfect!",
    description:
      "The grand wedding celebrations at By The Falls Mansion, Ludhiana.",
    theme: "blush",
    image: weddingImg,
  },
];

export const gallery: GalleryItem[] = [
  { id: "g1", src: brideImg, alt: "Akansha in a blush lehenga", category: "Portraits", tall: true },
  { id: "g2", src: groomImg, alt: "Mohit in an ivory sherwani", category: "Portraits", tall: true },
  { id: "g4", src: haldiImg, alt: "Haldi ceremony", category: "Celebrations" },
  { id: "g5", src: sangeetImg, alt: "Sangeet night dancing", category: "Celebrations", tall: true },
  { id: "g6", src: weddingImg, alt: "The couple at the mandap", category: "Celebrations" },
  { id: "g7", src: heroImg, alt: "Floral mandap at sunset", category: "Venues", tall: true },
];

export const galleryCategories = ["All", "Portraits", "Celebrations", "Venues"] as const;

export const blessings: Blessing[] = [
  {
    id: "b1",
    side: "Bride's Family",
    names: "Vilas & Minakshi Wankhade",
    relation: "Parents of the bride",
    message:
      "She was the little girl who dreamed beyond the clouds, and today she steps into a beautiful new chapter. May Akansha's home always be blessed with warmth, laughter, and boundless joy. We welcome Mohit with open hearts into our family—a man whose warmth and partnership make him the true keeper of her happiness.",
  },
  {
    id: "b3",
    side: "Groom's Family",
    names: "Rajinder Kumar Sharma",
    relation: "Father of the groom",
    message:
      "We are so overjoyed to officially welcome you into our family, Akansha. Watching Mohit love you has been a true joy, and we can’t wait to share in the magic of your wedding day as you officially become a daughter of our hearts.",
  },
];

export const mealOptions = ["Gujarati Thali", "Jain (no root vegetables)", "Vegan", "Pure Vegetarian"] as const;

export const shareMessage = `${couple.invocation}

Mohit & Akansha are getting married!
${couple.displayDate} · ${couple.city}

You're warmly invited to all our celebrations — Haldi, Jaago (Sangeet), and the Wedding. See the full invitation, venues and RSVP here:`;
