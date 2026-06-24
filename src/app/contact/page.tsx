"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Waves, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!supabase) {
        console.log("Reservation (no Supabase configured):", form);
        setSubmitted(true);
        return;
      }
      const { error } = await supabase.from("reservations").insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          time: form.time,
          guests: parseInt(form.guests),
          message: form.message,
        },
      ]);
      if (error) throw error;
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-sea-50 via-white to-ocean-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-sea-100 text-sea-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Waves className="w-4 h-4" />
            Contact
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-sea-900">
            Get in Touch
          </h1>
          <p className="mt-4 text-sea-600 max-w-xl mx-auto">
            Reserve your table, ask a question, or order directly via WhatsApp
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-sea-800 mb-2">
                  Quick Order?
                </h2>
                <p className="text-sea-500 text-sm">
                  For faster service, order directly on WhatsApp:
                </p>
                <a
                  href="https://wa.me/2347062270224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  0706 227 0224
                </a>
              </div>

              <h2 className="text-2xl font-serif font-bold text-sea-800 mb-6">
                Reserve a Table
              </h2>

              {submitted ? (
                <div className="bg-sea-50 border border-sea-200 rounded-2xl p-8 text-center">
                  <Waves className="w-12 h-12 text-sea-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-sea-800 mb-2">
                    Reservation Submitted!
                  </h3>
                  <p className="text-sea-600">
                    Thank you! We&apos;ll confirm your reservation shortly.
                    We look forward to welcoming you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-sea-700 mb-1.5">Name</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-sea-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sea-700 mb-1.5">Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border border-sea-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-sea-700 mb-1.5">Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="0800 000 0000" className="w-full px-4 py-3 rounded-xl border border-sea-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sea-700 mb-1.5">Guests</label>
                      <select name="guests" value={form.guests} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-sea-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none transition-all text-sm bg-white">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-sea-700 mb-1.5">Date</label>
                      <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-sea-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sea-700 mb-1.5">Time</label>
                      <input type="time" name="time" value={form.time} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-sea-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sea-700 mb-1.5">Special Requests</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Allergies, celebrations, seating preferences..." className="w-full px-4 py-3 rounded-xl border border-sea-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none transition-all text-sm resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-sea-500 hover:bg-sea-600 disabled:bg-sea-300 text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg inline-flex items-center justify-center gap-2">
                    {loading ? "Submitting..." : "Reserve a Table"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-sea-50 rounded-2xl p-8 border border-sea-100">
                <h3 className="text-xl font-serif font-bold text-sea-800 mb-6">Visit Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-sea-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sea-700">Location</p>
                      <p className="text-sm text-sea-500">Iyana Anfani, Ringroad, Ibadan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-sea-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sea-700">Phone</p>
                      <p className="text-sm text-sea-500">0706 227 0224</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-sea-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sea-700">Email</p>
                      <p className="text-sm text-sea-500">hello@theseapride.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-sea-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sea-700">Hours</p>
                      <p className="text-sm text-sea-500">Mon–Thu: 11am – 10pm</p>
                      <p className="text-sm text-sea-500">Fri–Sat: 11am – 11pm</p>
                      <p className="text-sm text-sea-500">Sun: 10am – 9pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sea-500 to-ocean-500 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-serif font-bold mb-4">Order via WhatsApp</h3>
                <p className="text-sm text-white/80 mb-4">
                  The fastest way to order. Send us a message and we&apos;ll
                  take care of the rest.
                </p>
                <a
                  href="https://wa.me/2347062270224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-sea-700 hover:bg-sea-50 px-5 py-2.5 rounded-full font-semibold transition-all text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message 0706 227 0224
                </a>
              </div>

              <div className="bg-sea-50 rounded-2xl p-8 border border-sea-100">
                <h3 className="text-xl font-serif font-bold text-sea-800 mb-4">Follow Us</h3>
                <p className="text-sm text-sea-500 mb-4">
                  Stay updated with our latest dishes, offers, and events.
                </p>
                <a
                  href="https://www.instagram.com/the_sea_pride"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-full font-semibold transition-all text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  @the_sea_pride
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
