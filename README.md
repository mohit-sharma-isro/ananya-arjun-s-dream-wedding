# Ananya & Arjun's Dream Wedding

Build a luxury, interactive Indian wedding invitation web app (mobile-first, fully responsive) for Ananya & Arjun (Dec 20, 2026, Ahmedabad, Gujarat) with a refined pastel aesthetic (#FFF9F2 warm ivory, blush pink, soft peach, sage green, champagne, muted gold accents):

1. Centralized Data Architecture:
   - Create a central `src/data/weddingData.ts` containing all couple info, dates, story timeline, family blessings, gallery items, and events (name, date, start/end time, venue, address, lat/lng, Google Maps link, dress code, description, theme color).

2. Sections & Features:
   - Hero / Welcome Screen: Cinematic opening with "॥ श्री गणेशाय नमः ॥", monogram, couple names, date/city, floating rose petals, ambient background music player toggle (unmuted upon interaction), and an "Open Invitation" CTA that smoothly reveals the rest of the site.
   - Couple Section: Elegant dual portraits with romantic intro and stationery typography (Playfair/Cormorant style serif + clean sans-serif).
   - Our Story: Interactive vertical timeline with dates, milestones, descriptions, and photo reveals.
   - Live Countdown: Dynamic countdown to December 20, 2026 with "The day has arrived ❤️" state upon completion.
   - Wedding Events Explorer: Filterable/browseable cards for Mehendi (Sage), Haldi (Peach), Sangeet (Powder Blue), Wedding (Blush), and Reception (Champagne).
   - Event Details Modal / Bottom Sheet: Rich modal with dress code, timing, venue info, "Add to Calendar" (Google Calendar + .ics download), and "Get Directions".
   - Venues & Map: Venue section with interactive map display and direct Google Maps navigation links.
   - Gallery & Lightbox: Masonry/grid layout with category filters and full-screen lightbox with touch swipe and keyboard support.
   - RSVP Form: Responsive form with validation (name, email/phone, attendance toggle, guest count, meal preferences, dietary notes, message) and an elegant confirmation state.
   - Family & Blessings: Blessings from both bride's and groom's families.
   - WhatsApp Sharing: "Share Invitation" button with pre-filled invitation copy and link.
   - Mobile Navigation & Smooth Scrolling: Thumb-friendly navigation bar or slide-out menu.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a19b47c8-5316-42d8-869f-f67f1c000ba8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
