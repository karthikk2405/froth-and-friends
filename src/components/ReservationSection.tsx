import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Check, Sparkles, QrCode, ArrowRight, MapPin, Heart, Phone, MessageCircle, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Reservation } from '../types';
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '../data/cafeData';

interface ReservationSectionProps {
  onReservationSuccess?: (res: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = () => {
  // Dates: Next 7 days
  const today = new Date();
  const dateOptions = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0].iso);
  const [selectedTime, setSelectedTime] = useState<string>('5:00 PM');
  const [selectedZone, setSelectedZone] = useState<Reservation['seatingArea']>('Indoor AC Lounge');
  const [guestCount, setGuestCount] = useState<number>(3);
  const [occasion, setOccasion] = useState<Reservation['occasion']>('Casual Hangout');

  // Form states
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  // Confirmed reservation
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const timeSlots = [
    { time: '10:30 AM', tag: 'Morning Brews & Opens' },
    { time: '12:00 PM', tag: 'Lunch Rush' },
    { time: '1:30 PM', tag: 'Afternoon Chill' },
    { time: '3:30 PM', tag: 'Coffee & Shakes' },
    { time: '5:00 PM', tag: 'Evening Hangout' },
    { time: '6:30 PM', tag: 'Golden Hour' },
    { time: '8:00 PM', tag: 'Dinner & Bites' },
    { time: '9:30 PM', tag: 'Late Night Vibe' },
    { time: '10:00 PM', tag: 'Late Night Bites (Closes 11P)' },
  ];

  const seatingZones: { id: Reservation['seatingArea']; title: string; desc: string; icon: string }[] = [
    { id: 'Indoor AC Lounge', title: 'Indoor AC Lounge', desc: 'Plush sofa seating, cool air-conditioning, ambient lo-fi music', icon: '❄️' },
    { id: 'Alfresco Friends Patio', title: 'Alfresco Patio', desc: 'Breezy garden seating, evening fairy lights, pet-friendly', icon: '🌿' },
    { id: 'Youth Community Table', title: 'Community & Work Bench', desc: 'High-speed WiFi, laptop power plugs, board games corner', icon: '💻' },
    { id: 'Private Birthday Corner', title: 'Birthday & Party Corner', desc: 'Decorations setup, customized music, group celebration booth', icon: '🎉' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setFormError('Please provide both your name and phone number to book.');
      return;
    }
    setFormError(null);

    const newRes: Reservation = {
      id: `FNF-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: name.trim(),
      phone: phone.trim(),
      date: selectedDate,
      timeSlot: selectedTime,
      guests: guestCount,
      seatingArea: selectedZone,
      occasion,
      specialRequest: specialRequest ? specialRequest.trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    setConfirmedReservation(newRes);

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#D4E72B', '#141512', '#FFE815', '#FF5F7E']
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleSendToWhatsApp = () => {
    if (!confirmedReservation) return;
    const msg = `*TABLE RESERVATION - FROTH & FRIENDS VIJAYAWADA*\n` +
      `📌 *Booking ID:* ${confirmedReservation.id}\n` +
      `👤 *Name:* ${confirmedReservation.guestName}\n` +
      `📞 *Phone:* ${confirmedReservation.phone}\n` +
      `📅 *Date:* ${confirmedReservation.date}\n` +
      `⏰ *Time Slot:* ${confirmedReservation.timeSlot}\n` +
      `👥 *Guests:* ${confirmedReservation.guests} People\n` +
      `🛋️ *Zone:* ${confirmedReservation.seatingArea}\n` +
      `🎈 *Occasion:* ${confirmedReservation.occasion}\n` +
      (confirmedReservation.specialRequest ? `📝 *Note:* ${confirmedReservation.specialRequest}\n` : '') +
      `\nPlease confirm our table at Ramavarappadu / Benz Circle!`;

    const link = document.createElement('a');
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reservation-section" className="py-12 lg:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF0C2] text-xs font-brand font-black text-[#141512]">
          <Clock className="w-3.5 h-3.5 text-[#B9CE14]" />
          <span>Daily Hours: 10:30 AM – 11:00 PM (10:30A – 11P)</span>
        </div>
        <h2 className="font-brand text-3xl sm:text-4xl lg:text-5xl text-[#141512] font-black tracking-tight">
          Reserve a Spot with Friends
        </h2>
        <p className="text-sm sm:text-base text-[#4F5342]">
          Planning a weekend hangout, birthday surprise, study group, or casual coffee date? Reserve in advance with zero booking fee. Open full time from 10:30 AM to 11:00 PM daily.
        </p>
      </div>

      {/* Confirmed Reservation Pass */}
      {confirmedReservation ? (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border-2 border-[#141512] p-6 sm:p-8 shadow-[8px_8px_0px_#141512] space-y-6 text-center animate-fadeIn">
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#D4E72B] border-2 border-[#141512] shadow-xs">
            <Check className="w-8 h-8 text-[#141512] stroke-[3]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-brand font-extrabold uppercase tracking-widest text-[#797F68]">
              Reservation Confirmed!
            </span>
            <h3 className="font-brand text-3xl font-black text-[#141512]">
              {confirmedReservation.id}
            </h3>
            <p className="text-sm text-stone-600">
              We have held your table for <strong>{confirmedReservation.guestName}</strong> at Froth & Friends.
            </p>
          </div>

          {/* Ticket Details Box */}
          <div className="p-4 rounded-2xl bg-[#FBFBF6] border-2 border-[#141512] text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-[#E2E4D5] pb-2">
              <span className="text-stone-500 font-medium">Date & Time:</span>
              <span className="font-brand font-black text-[#141512]">{confirmedReservation.date} at {confirmedReservation.timeSlot}</span>
            </div>
            <div className="flex justify-between border-b border-[#E2E4D5] pb-2">
              <span className="text-stone-500 font-medium">Party Size:</span>
              <span className="font-brand font-black text-[#141512]">{confirmedReservation.guests} Guests ({confirmedReservation.occasion})</span>
            </div>
            <div className="flex justify-between border-b border-[#E2E4D5] pb-2">
              <span className="text-stone-500 font-medium">Seating Zone:</span>
              <span className="font-brand font-black text-[#141512]">{confirmedReservation.seatingArea}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 font-medium">Contact Phone:</span>
              <span className="font-mono font-bold text-[#141512]">{confirmedReservation.phone}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleSendToWhatsApp}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-brand font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send Reservation to WhatsApp (+91 97059 81111)</span>
            </button>

            <a
              href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
              className="w-full py-3 px-4 bg-white border-2 border-[#141512] text-[#141512] font-brand font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 hover:bg-[#F2F4E6] transition-all"
            >
              <Phone className="w-4 h-4 text-[#B9CE14]" />
              <span>Call Café for Special Decor / Cake: {PHONE_NUMBER}</span>
            </a>

            <button
              onClick={() => setConfirmedReservation(null)}
              className="text-xs text-stone-500 hover:text-stone-900 font-bold underline"
            >
              Make Another Reservation
            </button>
          </div>

        </div>
      ) : (
        /* Reservation Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Date & Slot Selector */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-[#141512] p-5 sm:p-7 shadow-[6px_6px_0px_#141512] space-y-6">
            
            {/* Step 1: Select Date */}
            <div className="space-y-2">
              <label className="text-xs font-brand font-black uppercase tracking-wider text-[#141512] flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#B9CE14]" />
                <span>1. Select Date</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {dateOptions.map((opt) => (
                  <button
                    key={opt.iso}
                    type="button"
                    onClick={() => setSelectedDate(opt.iso)}
                    className={`p-2.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                      selectedDate === opt.iso
                        ? 'bg-[#141512] text-[#D4E72B] border-[#141512] shadow-xs'
                        : 'bg-[#FBFBF6] text-stone-700 border-[#DFE0D2] hover:bg-[#EFF2D8]'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold">{opt.dayName}</span>
                    <span className="font-mono text-base font-black">{opt.dayNum}</span>
                    <span className="text-[9px] uppercase font-semibold">{opt.month}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Time Slot */}
            <div className="space-y-2">
              <label className="text-xs font-brand font-black uppercase tracking-wider text-[#141512] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B9CE14]" />
                <span>2. Select Time Slot</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedTime(slot.time)}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                      selectedTime === slot.time
                        ? 'bg-[#D4E72B] text-[#141512] border-[#141512] font-black'
                        : 'bg-white text-stone-700 border-[#DFE0D2] hover:bg-[#F9FBF0]'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold block">{slot.time}</span>
                    <span className="text-[10px] text-stone-500 block truncate">{slot.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Seating Atmosphere Zone */}
            <div className="space-y-2">
              <label className="text-xs font-brand font-black uppercase tracking-wider text-[#141512] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B9CE14]" />
                <span>3. Preferred Seating Zone</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {seatingZones.map((zone) => (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZone(zone.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all flex items-start gap-2.5 ${
                      selectedZone === zone.id
                        ? 'bg-[#EFF2D8] border-[#141512] shadow-xs'
                        : 'bg-white border-[#DFE0D2] hover:bg-[#F9FBF0]'
                    }`}
                  >
                    <span className="text-xl shrink-0">{zone.icon}</span>
                    <div>
                      <span className="font-brand font-black text-xs text-[#141512] block">
                        {zone.title}
                      </span>
                      <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">
                        {zone.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Guest Details & Confirm */}
          <form 
            onSubmit={handleSubmit}
            className="lg:col-span-5 bg-white rounded-3xl border-2 border-[#141512] p-5 sm:p-7 shadow-[6px_6px_0px_#141512] space-y-4"
          >
            <h3 className="font-brand font-black text-xl text-[#141512]">
              Guest & Party Details
            </h3>

            {/* Guest Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-brand font-bold text-stone-700 block">
                Number of Guests
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6, '8+'].map((num) => (
                  <button
                    key={num.toString()}
                    type="button"
                    onClick={() => setGuestCount(typeof num === 'number' ? num : 8)}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono font-black border-2 transition-all ${
                      (guestCount === num || (num === '8+' && guestCount >= 8))
                        ? 'bg-[#141512] text-[#D4E72B] border-[#141512]'
                        : 'bg-[#FBFBF6] text-stone-700 border-[#DFE0D2] hover:bg-stone-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="space-y-1.5">
              <label className="text-xs font-brand font-bold text-stone-700 block">
                Occasion
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value as Reservation['occasion'])}
                className="w-full text-xs p-2.5 rounded-xl bg-[#FBFBF6] border-2 border-[#DFE0D2] font-semibold"
              >
                <option value="Casual Hangout">Casual Hangout</option>
                <option value="Birthday Celebration">Birthday Celebration (Decor friendly)</option>
                <option value="Work / Study Date">Work / Study Date (WiFi & quiet)</option>
                <option value="Group Gathering">College / Alumni Gathering</option>
              </select>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-brand font-bold text-stone-700 block">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Varma"
                className="w-full text-xs p-2.5 rounded-xl bg-[#FBFBF6] border border-[#DFE0D2] font-medium focus:outline-none focus:border-[#141512]"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-brand font-bold text-stone-700 block">
                Phone Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 97059 81111"
                className="w-full text-xs p-2.5 rounded-xl bg-[#FBFBF6] border border-[#DFE0D2] font-mono focus:outline-none focus:border-[#141512]"
              />
            </div>

            {/* Special Request */}
            <div className="space-y-1">
              <label className="text-xs font-brand font-bold text-stone-700 block">
                Special Request or Dietary Note
              </label>
              <textarea
                rows={2}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="e.g. Birthday cake table, quiet corner, baby chair..."
                className="w-full text-xs p-2 rounded-xl bg-[#FBFBF6] border border-[#DFE0D2] focus:outline-none focus:border-[#141512]"
              />
            </div>

            {/* Form Error Banner */}
            {formError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                <span>⚠️</span>
                <span>{formError}</span>
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              id="confirm-reservation-btn"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#D4E72B] hover:bg-[#C2D622] text-[#141512] font-brand font-black text-sm border-2 border-[#141512] shadow-[3px_3px_0px_#141512] transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm Reservation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-stone-500 font-medium">
              We will confirm your table via WhatsApp / SMS instantly. Need immediate support? Call <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`} className="underline font-bold text-[#141512]">{PHONE_NUMBER}</a>.
            </p>
          </form>

        </div>
      )}

    </section>
  );
};
