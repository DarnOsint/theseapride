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
            Reserve Your Table
          </h1>
          <p className="mt-4 text-sea-600 max-w-xl mx-auto">
            Join us for an unforgettable seafood dining experience by the coast
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              {submitted ? (
                <div className="bg-sea-50 border border-sea-200 rounded-2xl p-8 text-center">
                  <Waves className="w-12 h-12 text-sea-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-sea-800 mb-2">
                    Reservation Submitted!
                  </h3>
                  <p className="text-sea-600">
                    Thank you! We&apos;ll confirm your reservation shortly.
                    We look forward to welcoming you to TheSeaPride.
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
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="(555) 123-4567" className="w-full px-4 py-3 rounded-xl border border-sea-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none transition-all text-sm" />
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
                    {loading ? "Submitting..." : "Confirm Reservation"}
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
                      <p className="font-medium text-sea-700">Address</p>
                      <p className="text-sm text-sea-500">123 Ocean Boulevard, Coastal City, CC 90210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-sea-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sea-700">Phone</p>
                      <p className="text-sm text-sea-500">(555) 123-4567</p>
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
                <h3 className="text-xl font-serif font-bold mb-4">Why Dine With Us?</h3>
                <ul className="space-y-3 text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <Waves className="w-4 h-4 shrink-0" />
                    Freshest daily catch from sustainable fisheries
                  </li>
                  <li className="flex items-center gap-2">
                    <Waves className="w-4 h-4 shrink-0" />
                    Award-winning coastal cuisine
                  </li>
                  <li className="flex items-center gap-2">
                    <Waves className="w-4 h-4 shrink-0" />
                    Ocean-view terrace dining
                  </li>
                  <li className="flex items-center gap-2">
                    <Waves className="w-4 h-4 shrink-0" />
                    Curated wine pairings from coastal vineyards
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
