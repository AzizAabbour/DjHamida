import React from 'react';
import { motion } from 'framer-motion';
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarCheck, FaHistory } from 'react-icons/fa';

const UPCOMING_EVENTS = [
  {
    date: 'JUN 15, 2026',
    venue: 'VIP Room',
    city: 'Marrakech',
    country: 'Morocco',
    status: 'Tickets Available',
    soldOut: false
  },
  {
    date: 'JUN 28, 2026',
    venue: 'Plage de Rochebonne',
    city: 'Saint-Malo',
    country: 'France',
    status: 'Free Festival Entry',
    soldOut: false
  },
  {
    date: 'JUL 04, 2026',
    venue: 'Pacha Ibiza',
    city: 'Ibiza',
    country: 'Spain',
    status: 'Selling Fast',
    soldOut: false
  },
  {
    date: 'JUL 18, 2026',
    venue: 'Nikki Beach',
    city: 'Marbella',
    country: 'Spain',
    status: 'Sold Out',
    soldOut: true
  },
  {
    date: 'AUG 02, 2026',
    venue: 'Le VIP Cannes',
    city: 'Cannes',
    country: 'France',
    status: 'Tickets Available',
    soldOut: false
  },
  {
    date: 'AUG 15, 2026',
    venue: 'Dunes Club',
    city: 'Agadir',
    country: 'Morocco',
    status: 'Tickets Available',
    soldOut: false
  }
];

const PAST_EVENTS = [
  {
    name: 'Mawazine Festival',
    type: 'Mainstage Headline Set',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80'
  },
  {
    name: 'L\'Olympia Paris',
    type: 'Sold-out Solo Show',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80'
  },
  {
    name: 'Ultra Europe Mix Session',
    type: 'Resistance Stage',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=500&q=80'
  }
];

export default function Events() {
  return (
    <div className="pt-24 pb-20 px-6 font-montserrat select-none max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-brand-gold tracking-[0.25em] uppercase">ON THE ROAD</span>
        <h1 className="text-5xl md:text-7xl text-white font-bold tracking-widest mt-2 uppercase">
          Tour Dates
        </h1>
        <div className="w-24 h-1 bg-brand-purple mx-auto mt-4 rounded-full" />
      </div>

      {/* Tour Timeline Section */}
      <section className="mb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {UPCOMING_EVENTS.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-blue/35 transition-all flex flex-col md:flex-row items-center justify-between gap-6"
            >
              {/* Date Column */}
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex flex-col items-center justify-center text-brand-purple">
                  <FaCalendarCheck className="text-lg" />
                </div>
                <div>
                  <h4 className="text-lg font-bebas text-white tracking-wider">{event.date}</h4>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Scheduled Date</span>
                </div>
              </div>

              {/* Venue & Location */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold font-poppins text-white">{event.venue}</h3>
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-white/50 mt-1">
                  <FaMapMarkerAlt className="text-brand-blue text-[10px]" />
                  <span>{event.city}, {event.country}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-center md:text-right">
                <span className={`inline-block text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2 ${
                  event.soldOut 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20 animate-pulse'
                }`}>
                  {event.status}
                </span>
                
                {/* Tickets CTA */}
                <div>
                  {event.soldOut ? (
                    <button 
                      disabled
                      className="w-full md:w-auto px-6 py-2 rounded-full bg-white/5 border border-white/5 text-white/30 text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <a 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className="inline-block w-full md:w-auto text-center px-6 py-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple hover:scale-105 text-white text-xs font-bold uppercase tracking-wider shadow-neon-purple transition-transform cursor-pointer"
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <FaTicketAlt />
                        <span>Get Tickets</span>
                      </span>
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* Past Shows Section */}
      <section>
        <div className="text-center mb-12">
          <div className="flex justify-center text-brand-gold text-2xl mb-2">
            <FaHistory />
          </div>
          <h2 className="text-3xl md:text-4xl text-white font-bold tracking-widest uppercase">
            Past Gigs & Residencies
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PAST_EVENTS.map((past, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-brand-purple/30 transition-all group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video relative overflow-hidden bg-black">
                <img 
                  src={past.image} 
                  alt={past.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 text-[10px] bg-brand-gold text-black font-bold px-2 py-0.5 rounded font-mono">
                  {past.year}
                </span>
              </div>
              
              <div className="p-5 text-left">
                <span className="text-[9px] font-bold text-brand-blue uppercase tracking-widest">
                  {past.type}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 font-poppins">
                  {past.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
