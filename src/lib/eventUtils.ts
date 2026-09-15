import type { WeddingEvent } from "@/data/weddingData";

const IST_OFFSET_MIN = 330;

/** Build a UTC Date from an IST date + HH:MM time. */
export function istToDate(date: string, time: string): Date {
  const [y = 1970, m = 1, d = 1] = date.split("-").map(Number);
  const [hh = 0, mm = 0] = time.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh, mm) - IST_OFFSET_MIN * 60_000);
}

function toStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function eventRange(event: WeddingEvent) {
  const start = istToDate(event.date, event.startTime);
  let end =
    event.endTime && event.endTime.toLowerCase() !== "onwards"
      ? istToDate(event.date, event.endTime)
      : new Date(start.getTime() + 4 * 3600_000);
  if (end <= start) end = new Date(end.getTime() + 24 * 3600_000);
  return { start, end };
}

export function formatTimeRange(event: WeddingEvent) {
  const fmt = (t: string) => {
    if (!t) return "";
    if (t.toLowerCase() === "onwards") return "Onwards";
    const parts = t.split(":");
    if (parts.length < 2) return t;
    const h = Number(parts[0]);
    const m = Number(parts[1]);
    if (isNaN(h) || isNaN(m)) return t;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
  };

  if (!event.endTime || event.endTime.toLowerCase() === "onwards") {
    return `${fmt(event.startTime)} Onwards`;
  }
  return `${fmt(event.startTime)} – ${fmt(event.endTime)}`;
}

export function formatEventDate(date: string) {
  const [y = 1970, m = 1, d = 1] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function googleCalendarUrl(event: WeddingEvent) {
  const { start, end } = eventRange(event);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.name} — Mohit & Akansha`,
    dates: `${toStamp(start)}/${toStamp(end)}`,
    details: `${event.description}\n\nDress code: ${event.dressCode}`,
    location: `${event.venue}, ${event.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcs(event: WeddingEvent) {
  const { start, end } = eventRange(event);
  const esc = (s: string) => s.replace(/[,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mohit & Akansha//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}-mohit-akansha@wedding`,
    `DTSTAMP:${toStamp(new Date())}`,
    `DTSTART:${toStamp(start)}`,
    `DTEND:${toStamp(end)}`,
    `SUMMARY:${esc(`${event.name} — Mohit & Akansha`)}`,
    `DESCRIPTION:${esc(`${event.description}\nDress code: ${event.dressCode}`)}`,
    `LOCATION:${esc(`${event.venue}, ${event.address}`)}`,
    "END:VCALENDAR",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}-mohit-akansha.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function directionsUrl(event: WeddingEvent) {
  return event.mapsLink || `https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}`;
}

export function embedMapUrl(lat: number, lng: number) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}
