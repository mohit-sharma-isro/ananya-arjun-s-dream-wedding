import { useState, type FormEvent } from "react";
import { Check, Heart } from "lucide-react";
import { events, mealOptions } from "@/data/weddingData";
import { SectionHeading } from "./SectionHeading";

type Errors = Partial<Record<"name" | "contact" | "guests" | "meal", string>>;

const field =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/25";

export function RsvpSection() {
  const [attending, setAttending] = useState(true);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [guests, setGuests] = useState(1);
  const [meal, setMeal] = useState("");
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [attendingEvents, setAttendingEvents] = useState<string[]>(events.map((e) => e.id));
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const toggleEvent = (id: string) =>
    setAttendingEvents((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please tell us your name.";
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
    const isPhone = /^[+]?[\d\s-]{8,15}$/.test(contact.trim());
    if (!isEmail && !isPhone) next.contact = "Enter a valid email or phone number.";
    if (attending) {
      if (!Number.isFinite(guests) || guests < 1 || guests > 10) next.guests = "Between 1 and 10 guests.";
      if (!meal) next.meal = "Choose a meal preference.";
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    try {
      const saved = JSON.parse(localStorage.getItem("aa-rsvps") ?? "[]");
      saved.push({
        name,
        contact,
        attending,
        guests: attending ? guests : 0,
        meal,
        dietary,
        message,
        attendingEvents,
        at: new Date().toISOString(),
      });
      localStorage.setItem("aa-rsvps", JSON.stringify(saved));
    } catch {
      /* storage unavailable — confirmation still shown */
    }
    setDone(true);
  };

  return (
    <section id="rsvp" className="bg-blush-soft/50 px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Kindly Reply"
        title="RSVP"
        subtitle="Please respond by 30 November 2026 so we can save you a seat and a plate."
      />

      <div className="mx-auto max-w-xl">
        {done ? (
          <div className="reveal is-visible rounded-3xl border border-gold/30 bg-card p-9 text-center shadow-[0_30px_70px_-52px_var(--ink)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush-soft">
              {attending ? <Check className="h-7 w-7 text-blush-ink" /> : <Heart className="h-7 w-7 text-blush-ink" />}
            </div>
            <h3 className="mt-6 font-display text-3xl text-ink">
              {attending ? "We can't wait to see you" : "We'll miss you dearly"}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">
              {attending
                ? `Thank you, ${name.split(" ")[0]}. Your RSVP for ${guests} ${guests === 1 ? "guest" : "guests"} is noted. We'll send venue details closer to the date.`
                : `Thank you for letting us know, ${name.split(" ")[0]}. You'll be in our hearts on the day.`}
            </p>
            <button
              type="button"
              onClick={() => setDone(false)}
              className="mt-7 text-[0.62rem] uppercase tracking-[0.24em] text-gold underline underline-offset-4"
            >
              Edit my response
            </button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            noValidate
            className="reveal space-y-5 rounded-3xl border border-gold/20 bg-card p-6 shadow-[0_30px_70px_-55px_var(--ink)] sm:p-8"
          >
            <div>
              <label htmlFor="rsvp-name" className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-ink/70">
                Full name
              </label>
              <input
                id="rsvp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Riya Shah"
                className={field}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="mt-1.5 text-xs text-primary">{errors.name}</p>}
            </div>

            <div>
              <label
                htmlFor="rsvp-contact"
                className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-ink/70"
              >
                Email or phone
              </label>
              <input
                id="rsvp-contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="riya@email.com or +91 98250 12345"
                className={field}
                aria-invalid={!!errors.contact}
              />
              {errors.contact && <p className="mt-1.5 text-xs text-primary">{errors.contact}</p>}
            </div>

            <div>
              <span className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-ink/70">Will you attend?</span>
              <div className="grid grid-cols-2 gap-2 rounded-full bg-muted p-1">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => setAttending(v)}
                    aria-pressed={attending === v}
                    className={`rounded-full py-2.5 text-[0.65rem] uppercase tracking-[0.2em] transition ${
                      attending === v ? "bg-ink text-ivory" : "text-ink/70"
                    }`}
                  >
                    {v ? "Joyfully accept" : "Regretfully decline"}
                  </button>
                ))}
              </div>
            </div>

            {attending && (
              <>
                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-ink/70"
                  >
                    Number of guests (including you)
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={10}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className={field}
                    aria-invalid={!!errors.guests}
                  />
                  {errors.guests && <p className="mt-1.5 text-xs text-primary">{errors.guests}</p>}
                </div>

                <div>
                  <span className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-ink/70">
                    Events you'll join
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {events.map((ev) => (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => toggleEvent(ev.id)}
                        aria-pressed={attendingEvents.includes(ev.id)}
                        className={`rounded-full border px-3.5 py-2 text-[0.6rem] uppercase tracking-[0.18em] transition ${
                          attendingEvents.includes(ev.id)
                            ? "border-transparent bg-champagne-soft text-champagne-ink"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {ev.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="rsvp-meal"
                    className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-ink/70"
                  >
                    Meal preference
                  </label>
                  <select
                    id="rsvp-meal"
                    value={meal}
                    onChange={(e) => setMeal(e.target.value)}
                    className={field}
                    aria-invalid={!!errors.meal}
                  >
                    <option value="">Select a preference</option>
                    {mealOptions.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  {errors.meal && <p className="mt-1.5 text-xs text-primary">{errors.meal}</p>}
                </div>

                <div>
                  <label
                    htmlFor="rsvp-diet"
                    className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-ink/70"
                  >
                    Allergies or dietary notes
                  </label>
                  <input
                    id="rsvp-diet"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    placeholder="Nut allergy, low spice…"
                    className={field}
                  />
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="rsvp-message"
                className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-ink/70"
              >
                A note for Ananya & Arjun
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something lovely…"
                className={`${field} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-primary py-4 text-[0.68rem] uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-90 active:scale-[0.99]"
            >
              Send RSVP
            </button>
            <p className="text-center text-[0.65rem] text-muted-foreground">
              Your reply is saved on this device. Connect a database later to collect responses centrally.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
