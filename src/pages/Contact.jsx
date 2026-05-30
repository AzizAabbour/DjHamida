import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPlus, FaMinus, FaChevronDown, FaCheck } from 'react-icons/fa';

const FAQS = [
  {
    question: 'How do I book DJ Hamida for an event?',
    answer: 'You can submit an inquiry directly through our booking form on this page, or contact our booking agency at booking@djhamida.com. Please include details about the venue, date, estimated crowd size, and event format.'
  },
  {
    question: 'Does DJ Hamida travel internationally?',
    answer: 'Yes, DJ Hamida is an international touring artist and performs at festivals, clubs, and high-profile private events worldwide. Visas and international technical riders will be arranged upon booking approval.'
  },
  {
    question: 'Can we request specific songs or mixtapes for a private event?',
    answer: 'DJ Hamida curates a custom high-energy set for each gig, incorporating his latest "A La Bien Mix Party" hits, house club anthems, and hip-hop/oriental edits. Specific artist playlist requests can be discussed with our team during the pre-show rider brief.'
  },
  {
    question: 'What are the technical requirements (Rider) for a performance?',
    answer: 'Our standard tech rider requires Pioneer CDJ-3000 decks, a DJM-A9 mixing console, high-fidelity stage monitors, and professional venue lighting/cabling. The detailed technical rider document will be attached to the booking contract.'
  }
];

const NEWS = [
  {
    id: 1,
    date: 'MAY 28, 2026',
    category: 'Release',
    title: 'A La Bien Mix Party Vol. 12 Out Now',
    desc: 'The official summer mixtape has officially arrived across Spotify, Apple Music, and vinyl stores, featuring 22 new edits.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80'
  },
  {
    id: 2,
    date: 'MAY 15, 2026',
    category: 'Residency',
    title: 'Ibiza Beach Club Summer Residencies Open',
    desc: 'Confirming twelve consecutive residency nights at Ibiza Beach Club starting this June. Grab your VIP tickets today.',
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=400&q=80'
  },
  {
    id: 3,
    date: 'APR 30, 2026',
    category: 'Recording',
    title: 'In The Studio: Paris Collaborations',
    desc: 'DJ Hamida is currently in Paris working on collaborative tracks with top French hip-hop and Afrobeat artists.',
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', eventType: 'Club Event', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Accordion active state index
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking query submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', eventType: 'Club Event', message: '' });
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 px-6 font-montserrat select-none max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-brand-gold tracking-[0.25em] uppercase">BOOKINGS & CONTACTS</span>
        <h1 className="text-5xl md:text-7xl text-white font-bold tracking-widest mt-2 uppercase">
          Get In Touch
        </h1>
        <div className="w-24 h-1 bg-brand-purple mx-auto mt-4 rounded-full" />
      </div>

      {/* Main Grid: Form Left, Info Cards Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
        
        {/* Booking Form Left */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5 relative">
            <h2 className="text-2xl font-bebas text-brand-blue tracking-widest uppercase mb-6">
              Simulated Booking Query
            </h2>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-14 h-14 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue flex items-center justify-center text-xl mx-auto mb-4 shadow-neon-blue">
                  <FaCheck />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase">Query Sent Successfully!</h3>
                <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
                  Thank you for your inquiry. A booking representative will respond to your technical rider and availability request within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-6 py-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-1.5 ml-1">Your Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="glass-input text-xs"
                      required 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="glass-input text-xs"
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-1.5 ml-1">Phone Number</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="glass-input text-xs"
                      required 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-1.5 ml-1">Event Type</label>
                    <select 
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="glass-input text-xs"
                    >
                      <option value="Club Event">Club Event</option>
                      <option value="Festival Headline">Festival Headline</option>
                      <option value="Private Booking">Private Booking</option>
                      <option value="Remix/Producer request">Remix/Producer request</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-wider mb-1.5 ml-1">Message & Event Details</label>
                  <textarea 
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="glass-input text-xs resize-none"
                    placeholder="Include gig date, venue location, set duration..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-bold uppercase tracking-widest shadow-neon-purple hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <FaPaperPlane className="text-[10px]" />
                      <span>Submit Query</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

        {/* Agency contact cards right */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-purple/20 transition-all flex items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue text-sm">
              <FaEnvelope />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Booking Agency</h4>
              <p className="text-sm font-semibold text-white">booking@djhamida.com</p>
              <p className="text-[10px] text-white/50 mt-0.5">Management, tours, global events</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-purple/20 transition-all flex items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple text-sm">
              <FaPhoneAlt />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Press & PR Relations</h4>
              <p className="text-sm font-semibold text-white">press@djhamida.com</p>
              <p className="text-[10px] text-white/50 mt-0.5">Interviews, promo pools, radio requests</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-brand-purple/20 transition-all flex items-start gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold text-sm">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">HQ Agency Office</h4>
              <p className="text-sm font-semibold text-white">Paris, France</p>
              <p className="text-[10px] text-white/50 mt-0.5">Europe Tour Logistics base</p>
            </div>
          </div>

        </div>

      </div>

      {/* Accordion FAQ Section */}
      <section className="mb-24 max-w-4xl mx-auto text-left">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-white font-bold tracking-widest uppercase">FAQ Accordion</h2>
          <div className="w-16 h-1 bg-brand-purple mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index} 
                className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <h4 className="text-xs md:text-sm font-bold text-white font-poppins pr-6">
                    {faq.question}
                  </h4>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-white/40 text-xs flex-shrink-0"
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-white/60 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* News & Blog Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-white font-bold tracking-widest uppercase">Latest News</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {NEWS.map((post) => (
            <div 
              key={post.id} 
              className="glass-card rounded-2xl p-4 border border-white/5 hover:border-brand-blue/35 transition-all duration-300 group"
            >
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-neutral-900 mb-4 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 text-[9px] bg-brand-purple text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                  {post.category}
                </span>
              </div>
              
              <span className="text-[8px] font-bold text-brand-gold uppercase tracking-widest font-mono">
                {post.date}
              </span>
              
              <h3 className="text-base font-bold text-white font-poppins mt-1 mb-2 group-hover:text-brand-blue transition-colors">
                {post.title}
              </h3>
              
              <p className="text-xs text-white/60 leading-relaxed">
                {post.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
