import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaGlobe, FaMusic, FaClock } from 'react-icons/fa';

export default function About() {
  const stats = [
    { icon: <FaGlobe className="text-brand-blue" />, value: '20+', label: 'Countries Visited' },
    { icon: <FaMusic className="text-brand-purple" />, value: '500+', label: 'Shows Performed' },
    { icon: <FaAward className="text-brand-gold" />, value: '50+', label: 'Releases & Singles' },
    { icon: <FaClock className="text-brand-blue" />, value: '15+', label: 'Years Experience' }
  ];

  const milestones = [
    {
      year: '2010',
      title: 'Residency Beginnings',
      desc: 'Secured primary residencies at high-profile nightclubs across Paris and Lyon, establishing his signature "mix party" styling.'
    },
    {
      year: '2014',
      title: 'Breakthrough: "Déconnecté"',
      desc: 'Released the summer smash hit "Déconnecté" ft. L\'Algérino and Kayna Samet, gathering millions of views and earning gold-certified status.'
    },
    {
      year: '2018',
      title: 'Global Expansion & Tours',
      desc: 'Launched his first world tour, performing across the Middle East, North Africa, and French-speaking territories in North America.'
    },
    {
      year: '2022',
      title: 'Independent Label Launch',
      desc: 'Founded his own production label and creative studio, signing and supporting emerging Maghrebi-French talent.'
    },
    {
      year: '2026',
      title: 'Summer Festival Residencies',
      desc: 'Headline acts booked across major European summer beach festivals in Saint-Tropez, Marbella, Ibiza, and Agadir.'
    }
  ];

  return (
    <div className="pt-24 pb-20 px-6 font-montserrat select-none max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-brand-gold tracking-[0.25em] uppercase">THE ARTIST</span>
        <h1 className="text-5xl md:text-7xl text-white font-bold tracking-widest mt-2 uppercase">
          Biography
        </h1>
        <div className="w-24 h-1 bg-brand-purple mx-auto mt-4 rounded-full" />
      </div>

      {/* Main Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        {/* Bio Photo Left */}
        <div className="lg:col-span-5 relative group">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] relative z-10"
          >
            <img 
              src="/dj_hamida_studio.png" 
              alt="DJ Hamida Studio" 
              className="w-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-500"
            />
            {/* Glowing neon tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
          </motion.div>
          
          {/* Decorative backdrop box */}
          <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-brand-blue/30 pointer-events-none z-0" />
        </div>

        {/* Bio Text Right */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bebas text-brand-blue tracking-wider mb-4 uppercase">
              The Legend Behind "A La Bien Mix Party"
            </h2>
            
            <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-6">
              Born with a passion for rhythm, DJ Hamida has established himself as one of the most versatile and energetic DJs on the international club scene. Originating from France, he is celebrated for pioneering a unique crossover sound that fuses French hip-hop, Raï, Afrobeat, and European house music.
            </p>

            <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-6">
              His signature annual mixtape compilations, the <span className="text-brand-gold font-semibold">"A La Bien Mix Party"</span> series, have become summer anthems for millions of fans, regularly charting in Europe and North Africa. By collaborating with high-profile artists, he consistently blends traditional North African music elements with contemporary electronic synthesizer grooves.
            </p>

            <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-8">
              Whether performing at massive open-air festivals in Morocco, packed residencies in Cannes and Saint-Tropez, or club venues in Dubai and Ibiza, DJ Hamida brings a charismatic, high-energy stage presence that bridges cultures and moves crowds worldwide.
            </p>
          </motion.div>

          {/* Core Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-4 text-center border border-white/5"
              >
                <div className="flex justify-center text-lg mb-2">
                  {stat.icon}
                </div>
                <h4 className="text-2xl font-bebas text-white tracking-widest">
                  {stat.value}
                </h4>
                <p className="text-[9px] text-white/50 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Timeline */}
      <section className="mb-24 relative">
        <div className="absolute -left-20 top-1/3 w-64 h-64 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white font-bold tracking-widest uppercase">
            Career Timeline
          </h2>
          <div className="w-20 h-1 bg-brand-blue mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-white/10 max-w-3xl mx-auto pl-6 md:pl-10 space-y-12 py-4">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Timeline circle dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-brand-black border-2 border-brand-blue group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors duration-300 shadow-[0_0_8px_rgba(0,229,255,0.4)]" />
              
              {/* Content Card */}
              <div className="glass-card rounded-xl p-5 md:p-6 border border-white/5 group-hover:border-brand-purple/35 transition-all">
                <span className="text-xs font-bold text-brand-gold tracking-widest font-montserrat uppercase">
                  {milestone.year}
                </span>
                <h3 className="text-xl font-bold font-poppins text-white mt-1 uppercase">
                  {milestone.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mt-2">
                  {milestone.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements and Industry Certifications */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-white font-bold tracking-widest uppercase">
            Industry Achievements
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="glass-card rounded-xl p-6 border border-white/5 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold text-xl mb-4 shadow-neon-gold">
              <FaAward />
            </div>
            <h3 className="text-lg font-bold text-white font-poppins mb-2 uppercase">SNEP Gold Record</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Certified Gold mixtape sales for the breakout track "Déconnecté", crossing over 150,000 equivalent album streams.
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 border border-white/5 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-purple text-xl mb-4 shadow-neon-purple">
              <FaAward />
            </div>
            <h3 className="text-lg font-bold text-white font-poppins mb-2 uppercase">NRJ DJ Awards Nominee</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Nominated in the Best Club DJ category alongside elite French electro artists for outstanding summer tours.
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 border border-white/5 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue text-xl mb-4 shadow-neon-blue">
              <FaAward />
            </div>
            <h3 className="text-lg font-bold text-white font-poppins mb-2 uppercase">Maghreb Breakthrough DJ</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Recognized as the primary crossover artist bringing Maghreb-Oriental traditional loops into the European dance mainstream.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
