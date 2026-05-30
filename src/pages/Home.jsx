import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaCalendarAlt, FaVideo, FaVolumeUp, FaSpotify, FaSoundcloud, FaQuoteLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home({ isAudioPlaying, setIsAudioPlaying, setActiveTrackIndex }) {
  const stats = [
    { value: '500+', label: 'Shows Performed' },
    { value: '20+', label: 'Countries Visited' },
    { value: '50+', label: 'Mixtapes & Singles' },
    { value: '10M+', label: 'Total Streams' }
  ];

  const partners = [
    'Tomorrowland', 'Ultra Europe', 'Pacha Ibiza', 'VIP Room Marrakech',
    'L\'Olympia Paris', 'Amnesia Ibiza', 'Cocoon Club', 'Dunes Club'
  ];

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Festival Director, Electro Beach',
      text: 'DJ Hamida brought an incredible energy that kept 15,000 people dancing from start to finish. His unique blend of genres is unmatched.'
    },
    {
      name: 'Karim Bensalah',
      role: 'Owner, VIP Room Marrakech',
      text: 'Every summer residency with DJ Hamida sells out within hours. He knows exactly how to read the crowd and elevate the vibe.'
    },
    {
      name: 'Antoine Dupont',
      role: 'Music Critic, Le Parisien',
      text: 'The A La Bien Mix Party mixtape series is a cultural phenomenon. Hamida bridges Eastern and Western club music seamlessly.'
    }
  ];

  return (
    <div className="pt-20 select-none">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 px-6">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20 mt-8">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-xs font-bold bg-brand-purple/20 text-brand-blue border border-brand-blue/30 px-4 py-1.5 rounded-full uppercase tracking-[0.25em] mb-4">
                International DJ & Music Producer
              </span>
              
              <h1 className="text-6xl md:text-8xl font-bebas text-white leading-none tracking-wider mb-2">
                DJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-gold text-glow-blue">HAMIDA</span>
              </h1>
              
              <p className="text-sm md:text-base font-montserrat text-white/70 max-w-xl mb-8 leading-relaxed">
                Experience the ultimate fusion of Raï, Hip-Hop, House, and Dance. Creator of the legendary <span className="text-brand-gold font-semibold">"A La Bien Mix Party"</span> compilations.
              </p>
            </motion.div>

            {/* Call To Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => {
                  setActiveTrackIndex(0);
                  setIsAudioPlaying(true);
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-bold uppercase tracking-widest shadow-neon-purple hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <FaPlay className="text-[10px]" />
                <span>Listen Now</span>
              </button>

              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:text-black text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:border-brand-gold hover:shadow-neon-gold transition-all duration-300 flex items-center gap-2.5"
              >
                <FaCalendarAlt />
                <span>Book Event</span>
              </Link>

              <Link
                to="/media"
                className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:text-brand-blue hover:border-brand-blue text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2.5"
              >
                <FaVideo />
                <span>Watch Videos</span>
              </Link>
            </motion.div>
          </div>

          {/* Hero Image Right */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-[8px] border-white/5 shadow-[0_0_50px_rgba(0,229,255,0.25)] group"
            >
              <img 
                src="/dj_hamida_hero.png" 
                alt="DJ Hamida Hero" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Spinning Overlay Elements */}
              <div className="absolute inset-0 border border-brand-blue/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-brand-purple/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Music notes floating overlay */}
              <div className="absolute inset-0 pointer-events-none z-20 flex justify-center items-center">
                <span className="absolute text-brand-blue/30 text-2xl -top-2 left-10 animate-bounce duration-1000">♩</span>
                <span className="absolute text-brand-purple/30 text-3xl bottom-4 right-10 animate-bounce duration-700">♪</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-55 animate-pulse">
          <span className="text-[9px] font-montserrat tracking-[0.35em] text-white/50 uppercase">SCROLL DOWN</span>
          <div className="w-1.5 h-6 rounded-full bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-brand-blue rounded-full animate-[bounce_1.5s_infinite]" />
          </div>
        </div>
      </section>

      {/* Featured Tracks Player Section */}
      <section className="py-20 px-6 relative max-w-7xl mx-auto">
        <div className="absolute -left-20 top-1/2 w-64 h-64 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-gold tracking-[0.2em] uppercase">AUDIOPHILE HUB</span>
          <h2 className="text-4xl md:text-5xl text-white font-bold tracking-widest mt-1 uppercase">
            Featured Mixes
          </h2>
          <div className="w-20 h-1 bg-brand-purple mx-auto mt-4 rounded-full" />
        </div>

        <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center border border-white/5 relative overflow-hidden">
          {/* Glass Vinyl */}
          <div className="relative w-40 h-40 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-black border-4 border-white/5 shadow-lg relative flex items-center justify-center animate-spin-slow">
              <div className="absolute inset-1 border border-white/5 rounded-full" />
              <div className="absolute inset-3 border border-white/5 rounded-full" />
              <div className="absolute inset-5 border border-white/5 rounded-full" />
              
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-brand-black" />
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="text-[10px] font-bold text-brand-purple tracking-widest uppercase">TRENDING DIRECT FROM CLUBS</span>
            <h3 className="text-2xl font-bold font-poppins text-white mt-1">A La Bien Mix Party 2026 (Summer Intro)</h3>
            <p className="text-xs text-white/50 mt-2 leading-relaxed">
              Featuring the newest Oriental and French beats curated for the summer beach festivals of Ibiza, Morocco, and Saint-Tropez. Plug in your headphones and feel the bass.
            </p>

            {/* EQ graphic bars */}
            <div className="flex gap-1.5 h-16 items-end mt-6 justify-center md:justify-start">
              {Array.from({ length: 24 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  className="w-1 bg-gradient-to-t from-brand-blue to-brand-purple rounded-full"
                  animate={{
                    height: isAudioPlaying 
                      ? [8, Math.random() * 56 + 10, 8]
                      : [4, 6, 4]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5 + Math.random() * 0.5,
                    delay: idx * 0.02
                  }}
                  style={{ height: '8px' }}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
              <button 
                onClick={() => {
                  setActiveTrackIndex(0);
                  setIsAudioPlaying(!isAudioPlaying);
                }}
                className="px-6 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue/80 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-neon-blue"
              >
                <FaVolumeUp />
                <span>{isAudioPlaying ? 'Pause visualizer' : 'Listen with visualizer'}</span>
              </button>

              <a 
                href="https://open.spotify.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <FaSpotify className="text-[#1DB954]" />
                <span>Spotify</span>
              </a>

              <a 
                href="https://soundcloud.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <FaSoundcloud className="text-[#FF5500]" />
                <span>Soundcloud</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ticker Section */}
      <section className="py-16 bg-brand-dark/40 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center font-montserrat">
              <h3 className="text-4xl md:text-5xl font-bebas text-brand-gold text-glow-gold">
                {stat.value}
              </h3>
              <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 px-6 relative max-w-7xl mx-auto">
        <div className="absolute -right-20 top-1/3 w-64 h-64 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-brand-blue tracking-[0.2em] uppercase">VIBE CHECK</span>
          <h2 className="text-4xl md:text-5xl text-white font-bold tracking-widest mt-1 uppercase">
            Testimonials
          </h2>
          <div className="w-20 h-1 bg-brand-blue mx-auto mt-4 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-12"
          >
            {testimonials.map((test, index) => (
              <SwiperSlide key={index}>
                <div className="glass-card rounded-2xl p-8 text-center border border-white/5 relative">
                  <FaQuoteLeft className="text-4xl text-brand-purple/20 mx-auto mb-4" />
                  <p className="text-white/80 font-montserrat text-sm md:text-base leading-relaxed italic mb-6">
                    "{test.text}"
                  </p>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest">
                    {test.name}
                  </h4>
                  <span className="text-[10px] text-brand-gold uppercase tracking-wider font-semibold">
                    {test.role}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Partners Scrolling Marquee */}
      <section className="py-12 bg-brand-dark/30 border-y border-white/5 overflow-hidden relative z-10">
        <div className="flex relative w-full items-center">
          <div className="flex animate-marquee whitespace-nowrap gap-16 pr-16 items-center">
            {partners.concat(partners).map((partner, index) => (
              <span 
                key={index} 
                className="font-bebas text-3xl md:text-4xl text-white/20 hover:text-white/60 tracking-widest transition-colors duration-300"
              >
                ★ {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
