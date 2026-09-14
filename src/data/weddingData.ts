import brideImg from "@/assets/bride.jpg";
import groomImg from "@/assets/groom.jpg";
import heroImg from "@/assets/hero.jpg";
import mehendiImg from "@/assets/mehendi.jpg";
import haldiImg from "@/assets/haldi.jpg";
import sangeetImg from "@/assets/sangeet.jpg";
import weddingImg from "@/assets/wedding.jpg";
import receptionImg from "@/assets/reception.jpg";

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
  bride: {
    name: "Ananya",
    fullName: "Ananya Mehta",
    parents: "Daughter of Mr. Rajesh & Mrs. Sunita Mehta",
    image: brideImg,
    bio: "An architect from Ahmedabad who sketches buildings on napkins, collects old Gujarati poetry and makes the best masala chai on the street.",
  },
  groom: {
    name: "Arjun",
    fullName: "Arjun Desai",
    parents: "Son of Mr. Nikhil & Mrs. Priya Desai",
    image: groomImg,
    bio: "A product designer from Mumbai who runs at sunrise, plays the tabla badly with great enthusiasm, and has loved Ananya since a rainy Tuesday in 2019.",
  },
  hashtag: "#AnanyaFoundHerArjun",
  city: "Ahmedabad, Gujarat",
  weddingDate: "2026-12-20T19:00:00+05:30",
  displayDate: "Sunday, 20 December 2026",
  heroImage: heroImg,
  invocation: "॥ श्री गणेशाय नमः ॥",
  welcome:
    "With the blessings of our families, we invite you to join us as two hearts, two families and a thousand little moments become one.",
};

export const themes: Record<ThemeKey, { label: string; color: string; soft: string; ink: string }> = {
  sage: { label: "Sage", color: "var(--sage)", soft: "var(--sage-soft)", ink: "var(--sage-ink)" },
  peach: { label: "Peach", color: "var(--peach)", soft: "var(--peach-soft)", ink: "var(--peach-ink)" },
  powder: { label: "Powder Blue", color: "var(--powder)", soft: "var(--powder-soft)", ink: "var(--powder-ink)" },
  blush: { label: "Blush", color: "var(--blush)", soft: "var(--blush-soft)", ink: "var(--blush-ink)" },
  champagne: {
    label: "Champagne",
    color: "var(--champagne)",
    soft: "var(--champagne-soft)",
    ink: "var(--champagne-ink)",
  },
};

export const events: WeddingEvent[] = [
  {
    id: "mehendi",
    name: "Mehendi",
    subtitle: "Henna & Harmony",
    date: "2026-12-18",
    startTime: "16:00",
    endTime: "21:00",
    venue: "The Courtyard, House of MG",
    address: "Opp. Sidi Saiyyed Mosque, Lal Darwaja, Ahmedabad, Gujarat 380001",
    lat: 23.0258,
    lng: 72.5873,
    mapsLink: "https://www.google.com/maps/search/?api=1&query=House+of+MG+Ahmedabad",
    dressCode: "Sage green & ivory — light cottons, floral prints",
    description:
      "An afternoon of henna, mint coolers and old film songs in a shaded haveli courtyard. Come early, the artists have long queues and longer stories.",
    theme: "sage",
    image: mehendiImg,
  },
  {
    id: "haldi",
    name: "Haldi",
    subtitle: "Turmeric & Sunshine",
    date: "2026-12-19",
    startTime: "10:00",
    endTime: "13:00",
    venue: "Riverfront Lawn, Vivanta Ahmedabad",
    address: "Sarkhej - Gandhinagar Hwy, Ambli, Ahmedabad, Gujarat 380058",
    lat: 23.0361,
    lng: 72.5064,
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Vivanta+Ahmedabad+SG+Highway",
    dressCode: "Soft peach & marigold yellow — wear what you don't mind staining",
    description:
      "Turmeric, laughter and a great deal of mess under the winter sun. Breakfast thalis and sugarcane juice served all morning.",
    theme: "peach",
    image: haldiImg,
  },
  {
    id: "sangeet",
    name: "Sangeet",
    subtitle: "A Night of Dancing",
    date: "2026-12-19",
    startTime: "19:30",
    endTime: "01:00",
    venue: "Grand Ballroom, Hyatt Regency Ahmedabad",
    address: "17/A, Ashram Rd, Vasant Vihar, Ahmedabad, Gujarat 380009",
    lat: 23.0396,
    lng: 72.5709,
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Ahmedabad",
    dressCode: "Powder blue & silver — indo-western cocktail",
    description:
      "Family performances, a live dhol section and a dance floor that refuses to close. Rehearsals are optional, enthusiasm is not.",
    theme: "powder",
    image: sangeetImg,
  },
  {
    id: "wedding",
    name: "Wedding",
    subtitle: "The Pheras",
    date: "2026-12-20",
    startTime: "19:00",
    endTime: "23:00",
    venue: "Mandap Lawns, Rajpath Club",
    address: "Sarkhej - Gandhinagar Hwy, Bodakdev, Ahmedabad, Gujarat 380054",
    lat: 23.0374,
    lng: 72.5102,
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Rajpath+Club+Ahmedabad",
    dressCode: "Blush pink & ivory — traditional formal",
    description:
      "The baraat arrives at dusk, the pheras begin under a canopy of blush roses. Please be seated by 7:30 pm for the varmala.",
    theme: "blush",
    image: weddingImg,
  },
  {
    id: "reception",
    name: "Reception",
    subtitle: "Champagne & Celebration",
    date: "2026-12-21",
    startTime: "19:00",
    endTime: "23:30",
    venue: "Crystal Hall, The Leela Gandhinagar",
    address: "Mahatma Mandir Complex, Gandhinagar, Gujarat 382010",
    lat: 23.2295,
    lng: 72.6503,
    mapsLink: "https://www.google.com/maps/search/?api=1&query=The+Leela+Gandhinagar",
    dressCode: "Champagne & gold — black tie optional",
    description:
      "A quieter, glittering evening of dinner, toasts and photographs with everyone we love before we disappear on honeymoon.",
    theme: "champagne",
    image: receptionImg,
  },
];

export const story: StoryMoment[] = [
  {
    id: "met",
    date: "August 2019",
    title: "A rainy Tuesday in Bandra",
    description:
      "We reached for the same last umbrella at a corner shop. Arjun let go. Ananya bought him a coffee out of guilt. Four hours passed.",
    image: mehendiImg,
  },
  {
    id: "firsttrip",
    date: "March 2021",
    title: "The Kutch road trip",
    description:
      "White salt desert, one broken car stereo, and a full-moon night where we agreed we would be very bad at being apart.",
    image: sangeetImg,
  },
  {
    id: "families",
    date: "November 2023",
    title: "Two families, one dining table",
    description:
      "Dhoklas, nervous jokes and our mothers exchanging recipes within eleven minutes. By dessert, it was already decided.",
    image: haldiImg,
  },
  {
    id: "proposal",
    date: "February 2026",
    title: "The proposal at Sabarmati",
    description:
      "Sunset on the riverfront, a ring hidden inside a book of Gujarati poetry, and a yes said before the question finished.",
    image: weddingImg,
  },
];

export const gallery: GalleryItem[] = [
  { id: "g1", src: brideImg, alt: "Ananya in a blush lehenga", category: "Portraits", tall: true },
  { id: "g2", src: groomImg, alt: "Arjun in an ivory sherwani", category: "Portraits", tall: true },
  { id: "g3", src: mehendiImg, alt: "Mehendi being applied", category: "Celebrations" },
  { id: "g4", src: haldiImg, alt: "Haldi ceremony", category: "Celebrations" },
  { id: "g5", src: sangeetImg, alt: "Sangeet night dancing", category: "Celebrations", tall: true },
  { id: "g6", src: weddingImg, alt: "The couple at the mandap", category: "Celebrations" },
  { id: "g7", src: heroImg, alt: "Floral mandap at sunset", category: "Venues", tall: true },
  { id: "g8", src: receptionImg, alt: "Reception hall in champagne gold", category: "Venues" },
];

export const galleryCategories = ["All", "Portraits", "Celebrations", "Venues"] as const;

export const blessings: Blessing[] = [
  {
    id: "b1",
    side: "Bride's Family",
    names: "Rajesh & Sunita Mehta",
    relation: "Parents of the bride",
    message:
      "We have watched Ananya grow from a girl who drew houses to a woman who builds them. May her new home be full of light, laughter and always an extra chair at the table.",
  },
  {
    id: "b2",
    side: "Bride's Family",
    names: "Kamlaben Mehta",
    relation: "Grandmother of the bride",
    message:
      "Beta, marriage is not two people becoming one. It is two people learning to walk at the same pace. Walk slowly, and keep holding hands.",
  },
  {
    id: "b3",
    side: "Groom's Family",
    names: "Nikhil & Priya Desai",
    relation: "Parents of the groom",
    message:
      "Ananya did not join our family, she completed it. Arjun, be gentle, be patient, and never go to sleep on an argument.",
  },
  {
    id: "b4",
    side: "Groom's Family",
    names: "Meera Desai",
    relation: "Sister of the groom",
    message:
      "I am gaining the sister I always asked for and losing the last person who let me win at carrom. A fair trade. Be endlessly happy, you two.",
  },
];

export const mealOptions = ["Gujarati Thali", "Jain (no root vegetables)", "Vegan", "Pure Vegetarian"] as const;

export const shareMessage = `${couple.invocation}

Ananya & Arjun are getting married!
${couple.displayDate} · ${couple.city}

You're warmly invited to all our celebrations — Mehendi, Haldi, Sangeet, the Wedding and Reception. See the full invitation, venues and RSVP here:`;
