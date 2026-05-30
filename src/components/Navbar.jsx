import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Background glass opacity change
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll progress computation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Music', path: '/music' },
    { name: 'Media', path: '/media' },
    { name: 'Events', path: '/events' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-montserrat ${
          scrolled 
            ? 'bg-[#050505]/80 border-b border-white/5 backdrop-blur-md py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start leading-none group">
            <span className="font-bebas text-2xl md:text-3xl text-white tracking-widest text-glow-blue transition-all duration-300 group-hover:text-brand-blue">
              DJ HAMIDA
            </span>
            <span className="text-[7px] text-brand-gold tracking-[0.4em] font-semibold mt-0.5 uppercase">
              A LA BIEN MIX PARTY
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  text-xs font-semibold uppercase tracking-widest hover:text-brand-blue transition-colors relative py-1
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-blue after:transition-all hover:after:w-full
                  ${isActive ? 'text-brand-blue after:w-full font-bold text-glow-blue' : 'text-white/70'}
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Book Now Button Desktop */}
          <div className="hidden lg:block">
            <Link 
              to="/contact" 
              className="px-5 py-2.5 rounded-full bg-transparent border border-brand-purple text-white hover:text-black text-xs font-bold uppercase tracking-wider hover:bg-brand-purple hover:shadow-neon-purple transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <FaCalendarAlt className="group-hover:rotate-12 transition-transform" />
              <span>Book Event</span>
            </Link>
          </div>

          {/* Burger Menu Button Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-brand-blue text-xl p-1.5 transition-colors"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-blue via-brand-purple to-brand-gold transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-brand-black/95 backdrop-blur-lg flex flex-col justify-center items-center lg:hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 w-80 h-80 bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-1/4 w-80 h-80 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col items-center gap-6 z-10 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      text-2xl font-bebas tracking-widest transition-colors block py-2
                      ${isActive ? 'text-brand-blue text-glow-blue' : 'text-white/60 hover:text-white'}
                    `}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-6"
              >
                <Link
                  to="/contact"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white text-sm font-bold uppercase tracking-widest shadow-neon-purple hover:scale-105 transition-all flex items-center gap-2"
                >
                  <FaCalendarAlt />
                  <span>Book Event</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
