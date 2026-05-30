import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSpotify, FaSoundcloud, FaYoutube, FaInstagram, 
  FaFacebookF, FaTiktok, FaPaperPlane 
} from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const socialLinks = [
    { name: 'Spotify', icon: <FaSpotify />, url: 'https://open.spotify.com/', color: 'hover:text-[#1DB954]' },
    { name: 'SoundCloud', icon: <FaSoundcloud />, url: 'https://soundcloud.com/', color: 'hover:text-[#FF5500]' },
    { name: 'YouTube', icon: <FaYoutube />, url: 'https://youtube.com/', color: 'hover:text-[#FF0000]' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com/', color: 'hover:text-[#E1306C]' },
    { name: 'Facebook', icon: <FaFacebookF />, url: 'https://facebook.com/', color: 'hover:text-[#1877F2]' },
    { name: 'TikTok', icon: <FaTiktok />, url: 'https://tiktok.com/', color: 'hover:text-[#00F2FE]' }
  ];

  return (
    <footer className="bg-brand-black border-t border-white/5 py-12 relative overflow-hidden font-montserrat z-10">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-2">
          <Link to="/" className="flex flex-col items-start leading-none mb-4">
            <span className="font-bebas text-3xl text-white tracking-widest text-glow-blue">
              DJ HAMIDA
            </span>
            <span className="text-[8px] text-brand-gold tracking-[0.4em] font-semibold mt-0.5 uppercase">
              A LA BIEN MIX PARTY
            </span>
          </Link>
          <p className="text-white/60 text-xs leading-relaxed max-w-sm mb-6">
            DJ Hamida is an internationally acclaimed DJ and music producer, recognized for his iconic "A La Bien Mix Party" series blending Raï, Hip-Hop, House, and R&B into high-energy club anthems.
          </p>
          
          {/* Social Icons Row */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/70 ${social.color} hover:bg-white/10 hover:scale-110 transition-all text-sm`}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue mb-4">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/about" className="text-white/65 hover:text-brand-purple transition-colors">
                Biography & Bio
              </Link>
            </li>
            <li>
              <Link to="/music" className="text-white/65 hover:text-brand-purple transition-colors">
                Mixtapes & Releases
              </Link>
            </li>
            <li>
              <Link to="/media" className="text-white/65 hover:text-brand-purple transition-colors">
                Photos & Videos
              </Link>
            </li>
            <li>
              <Link to="/events" className="text-white/65 hover:text-brand-purple transition-colors">
                Tour Dates & Gigs
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-white/65 hover:text-brand-purple transition-colors">
                Official Merchandise
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">
            Mailing List
          </h4>
          <p className="text-white/60 text-xs mb-4 leading-relaxed">
            Subscribe to get direct announcements of upcoming festivals, tour dates, and exclusive mixtape drops.
          </p>

          <form onSubmit={handleSubscribe} className="relative">
            <input 
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-xs text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 placeholder-white/30"
              required
            />
            <button 
              type="submit"
              className="absolute right-1 top-1 bottom-1 w-9 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white flex items-center justify-center hover:scale-105 transition-all text-xs"
              title="Subscribe"
            >
              <FaPaperPlane />
            </button>
          </form>

          {subscribed && (
            <p className="text-[10px] text-brand-blue font-bold tracking-wider mt-2 uppercase animate-pulse">
              ✓ Subscribed Successfully!
            </p>
          )}
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 tracking-wider">
        <span className="uppercase">
          © {new Date().getFullYear()} DJ HAMIDA. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-4 mt-2 md:mt-0 uppercase">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
