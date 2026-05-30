import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaTimes, FaCamera, FaVideo, FaInstagram, FaHeart, FaComment } from 'react-icons/fa';

const PHOTOS = [
  { id: 1, title: 'Summer Session Festival', category: 'festivals', src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80' },
  { id: 2, title: 'Pacha Residency Night', category: 'clubs', src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80' },
  { id: 3, title: 'Synthesizer Track Mastering', category: 'studio', src: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&q=80' },
  { id: 4, title: 'Ibiza Beach Club Sunset Mix', category: 'clubs', src: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=800&q=80' },
  { id: 5, title: 'Marrakech VIP Room Opening', category: 'clubs', src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80' },
  { id: 6, title: 'Crowd Energy Saint-Tropez', category: 'festivals', src: 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?w=800&q=80' }
];

const VIDEOS = [
  { 
    id: 'dQw4w9WgXcQ', // Placeholder youtube id
    title: 'DJ Hamida - Live at Tomorrowland (Summer Set)', 
    duration: '22:15',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80'
  },
  { 
    id: 'dQw4w9WgXcQ', 
    title: 'A La Bien Mix Party 2026 Promo Video', 
    duration: '3:45',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80'
  },
  { 
    id: 'dQw4w9WgXcQ', 
    title: 'Studio Tour: Recording Mixtape Vol. 12', 
    duration: '12:30',
    thumbnail: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&q=80'
  }
];

const INSTAGRAM_POSTS = [
  { id: 1, likes: '4.8k', comments: '122', src: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=400&q=80' },
  { id: 2, likes: '3.2k', comments: '98', src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80' },
  { id: 3, likes: '5.1k', comments: '144', src: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80' },
  { id: 4, likes: '2.9k', comments: '80', src: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80' }
];

export default function Media() {
  const [activeSubTab, setActiveSubTab] = useState('photos'); // photos, videos, instagram
  const [photoFilter, setPhotoFilter] = useState('all');
  const [lightboxData, setLightboxData] = useState(null); // { type: 'image'|'video', src|ytId, title }

  const filteredPhotos = photoFilter === 'all' 
    ? PHOTOS 
    : PHOTOS.filter(p => p.category === photoFilter);

  const openLightbox = (type, srcOrYtId, title) => {
    setLightboxData({ type, srcOrYtId, title });
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  return (
    <div className="pt-24 pb-20 px-6 font-montserrat select-none max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-brand-gold tracking-[0.25em] uppercase">GALLERY & CLIPS</span>
        <h1 className="text-5xl md:text-7xl text-white font-bold tracking-widest mt-2 uppercase">
          Media Hub
        </h1>
        <div className="w-24 h-1 bg-brand-purple mx-auto mt-4 rounded-full" />
      </div>

      {/* Sub Menu Selector */}
      <div className="flex justify-center gap-4 mb-12 border-b border-white/5 pb-6">
        <button
          onClick={() => setActiveSubTab('photos')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'photos' 
              ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-neon-purple' 
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          <FaCamera />
          <span>Photos</span>
        </button>

        <button
          onClick={() => setActiveSubTab('videos')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'videos' 
              ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-neon-purple' 
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          <FaVideo />
          <span>Videos</span>
        </button>

        <button
          onClick={() => setActiveSubTab('instagram')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'instagram' 
              ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-[0_0_15px_rgba(253,29,29,0.3)]' 
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          <FaInstagram />
          <span>Instagram Feed</span>
        </button>
      </div>

      {/* Media Content Area */}
      <AnimatePresence mode="wait">
        
        {/* Photo Gallery Tab */}
        {activeSubTab === 'photos' && (
          <motion.div
            key="photos-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Category Sub Filter */}
            <div className="flex justify-center flex-wrap gap-3">
              {['all', 'festivals', 'clubs', 'studio'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setPhotoFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                    photoFilter === cat 
                      ? 'border-brand-gold text-brand-gold bg-brand-gold/10' 
                      : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry-like Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {filteredPhotos.map((photo) => (
                <motion.div
                  layout
                  key={photo.id}
                  onClick={() => openLightbox('image', photo.src, photo.title)}
                  className="rounded-xl overflow-hidden aspect-video relative group border border-white/5 cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={photo.src} 
                    alt={photo.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Photo Title Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest mb-1">
                      {photo.category}
                    </span>
                    <h4 className="text-sm font-bold text-white font-poppins">{photo.title}</h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Video Gallery Tab */}
        {activeSubTab === 'videos' && (
          <motion.div
            key="videos-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {VIDEOS.map((vid) => (
              <div 
                key={vid.id}
                onClick={() => openLightbox('video', vid.id, vid.title)}
                className="glass-card rounded-2xl p-4 border border-white/5 hover:border-brand-blue/30 hover:shadow-neon-blue transition-all duration-300 cursor-pointer group"
              >
                <div className="rounded-xl overflow-hidden aspect-video mb-4 relative bg-black flex items-center justify-center">
                  <img 
                    src={vid.thumbnail} 
                    alt={vid.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Play Button */}
                  <div className="w-12 h-12 rounded-full bg-brand-blue text-black flex items-center justify-center text-sm shadow-lg group-hover:scale-110 transition-transform relative z-10">
                    <FaPlay className="ml-0.5" />
                  </div>
                  
                  <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-2 py-0.5 rounded font-semibold text-white/80 relative z-10 font-mono">
                    {vid.duration}
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-white leading-snug font-poppins group-hover:text-brand-blue transition-colors">
                  {vid.title}
                </h3>
                <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider font-semibold">
                  Click to play clip
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Instagram Grid Feed */}
        {activeSubTab === 'instagram' && (
          <motion.div
            key="instagram-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <p className="text-xs text-white/50 max-w-md mx-auto">
                Follow <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:underline">@djhamidaofficial</a> on Instagram for real-time club updates.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {INSTAGRAM_POSTS.map((post) => (
                <a 
                  key={post.id}
                  href="https://instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="rounded-xl overflow-hidden aspect-square relative group border border-white/5 block"
                >
                  <img 
                    src={post.src} 
                    alt="Instagram Post" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover stats overlays */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white text-xs font-bold font-mono">
                    <div className="flex items-center gap-1.5">
                      <FaHeart className="text-red-500" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaComment className="text-brand-blue" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Fullscreen Lightbox Overlay Modal */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6"
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl p-2 cursor-pointer transition-colors"
              title="Close"
            >
              <FaTimes />
            </button>

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-4xl w-full flex flex-col items-center gap-4"
            >
              {lightboxData.type === 'image' ? (
                <img 
                  src={lightboxData.srcOrYtId} 
                  alt={lightboxData.title} 
                  className="max-h-[75vh] object-contain rounded-lg border border-white/10"
                />
              ) : (
                /* YouTube Iframe Embed */
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${lightboxData.srcOrYtId}?autoplay=1`}
                    title={lightboxData.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              
              <h3 className="text-sm md:text-base font-bold text-white font-poppins text-center">
                {lightboxData.title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
