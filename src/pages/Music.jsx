import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaSpotify, FaSoundcloud, FaClock, FaHeart, FaHeadphones } from 'react-icons/fa';
import { PLAYLIST } from '../components/AudioPlayer';

const ALBUMS = [
  {
    title: "A La Bien Mix Party 2026",
    type: "Mixtape / Album",
    year: "2026",
    tracks: "22 Tracks",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
    spotifyUrl: "https://open.spotify.com/",
    soundcloudUrl: "https://soundcloud.com/"
  },
  {
    title: "A La Bien Mix Party 2025",
    type: "Mixtape / Album",
    year: "2025",
    tracks: "20 Tracks",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
    spotifyUrl: "https://open.spotify.com/",
    soundcloudUrl: "https://soundcloud.com/"
  },
  {
    title: "A La Bien Mix Party 2024",
    type: "Mixtape / Album",
    year: "2024",
    tracks: "25 Tracks",
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&q=80",
    spotifyUrl: "https://open.spotify.com/",
    soundcloudUrl: "https://soundcloud.com/"
  },
  {
    title: "Summer Club Session",
    type: "EP",
    year: "2023",
    tracks: "6 Tracks",
    cover: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=500&q=80",
    spotifyUrl: "https://open.spotify.com/",
    soundcloudUrl: "https://soundcloud.com/"
  }
];

export default function Music({ 
  isAudioPlaying, 
  setIsAudioPlaying, 
  activeTrackIndex, 
  setActiveTrackIndex 
}) {
  const [activeTab, setActiveTab] = useState('releases'); // releases, spotify, soundcloud

  const handleTrackPlay = (index) => {
    if (activeTrackIndex === index) {
      setIsAudioPlaying(!isAudioPlaying);
    } else {
      setActiveTrackIndex(index);
      setIsAudioPlaying(true);
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 font-montserrat select-none max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-brand-blue tracking-[0.25em] uppercase">MUSIC SHOWCASE</span>
        <h1 className="text-5xl md:text-7xl text-white font-bold tracking-widest mt-2 uppercase">
          Discography
        </h1>
        <div className="w-24 h-1 bg-brand-purple mx-auto mt-4 rounded-full" />
      </div>

      {/* Tabs Menu */}
      <div className="flex justify-center gap-4 mb-16 border-b border-white/5 pb-6">
        <button
          onClick={() => setActiveTab('releases')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === 'releases' 
              ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-neon-purple' 
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          Latest Releases
        </button>

        <button
          onClick={() => setActiveTab('spotify')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'spotify' 
              ? 'bg-[#1DB954] text-black shadow-[0_0_15px_rgba(29,185,84,0.4)]' 
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          <FaSpotify />
          <span>Spotify UI</span>
        </button>

        <button
          onClick={() => setActiveTab('soundcloud')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'soundcloud' 
              ? 'bg-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.4)]' 
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          <FaSoundcloud />
          <span>Soundcloud</span>
        </button>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'releases' && (
          <motion.div
            key="releases"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mixtape Albums Grid */}
            <div className="text-left mb-10">
              <h2 className="text-2xl font-bebas text-brand-gold tracking-widest uppercase mb-6">
                Mixtapes & Compilation Albums
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ALBUMS.map((album, i) => (
                  <div 
                    key={i} 
                    className="glass-card rounded-2xl p-4 border border-white/5 hover:border-brand-purple/40 hover:shadow-neon-purple transition-all duration-300 group"
                  >
                    <div className="rounded-xl overflow-hidden aspect-square mb-4 relative">
                      <img 
                        src={album.cover} 
                        alt={album.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Play Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <a 
                          href={album.spotifyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-10 h-10 rounded-full bg-[#1DB954] text-black flex items-center justify-center hover:scale-110 transition-transform text-lg"
                        >
                          <FaSpotify />
                        </a>
                        <a 
                          href={album.soundcloudUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-10 h-10 rounded-full bg-[#FF5500] text-white flex items-center justify-center hover:scale-110 transition-transform text-lg"
                        >
                          <FaSoundcloud />
                        </a>
                      </div>
                    </div>
                    
                    <span className="text-[9px] font-bold text-brand-blue uppercase tracking-widest">
                      {album.type} • {album.year}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 truncate font-poppins">
                      {album.title}
                    </h3>
                    <p className="text-[10px] text-white/40 mt-1 font-semibold">
                      {album.tracks}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* In-App Interactive Audio Player Playlist */}
            <div className="text-left mt-16">
              <h2 className="text-2xl font-bebas text-brand-blue tracking-widest uppercase mb-6">
                Interactive Music Player Playlist
              </h2>
              <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
                <div className="grid grid-cols-12 p-4 text-[10px] font-bold text-white/40 border-b border-white/5 uppercase tracking-wider">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-6 md:col-span-7">Title</div>
                  <div className="col-span-3 md:col-span-3">Genre</div>
                  <div className="col-span-2 md:col-span-1 text-center">Duration</div>
                </div>

                <div className="divide-y divide-white/5">
                  {PLAYLIST.map((track, index) => {
                    const isActive = index === activeTrackIndex;
                    const isPlay = isActive && isAudioPlaying;
                    return (
                      <div 
                        key={index} 
                        className={`grid grid-cols-12 p-4 items-center text-xs transition-colors hover:bg-white/5 ${
                          isActive ? 'bg-brand-purple/10 text-brand-blue' : 'text-white/80'
                        }`}
                      >
                        {/* Play button index */}
                        <div className="col-span-1 flex justify-center">
                          <button 
                            onClick={() => handleTrackPlay(index)}
                            className="w-7 h-7 rounded-full bg-white/5 hover:bg-brand-blue hover:text-black flex items-center justify-center text-[10px] transition-all cursor-pointer"
                          >
                            {isPlay ? <FaPause /> : <FaPlay className="ml-0.5" />}
                          </button>
                        </div>
                        
                        {/* Details */}
                        <div className="col-span-6 md:col-span-7 flex items-center gap-3">
                          <img src={track.cover} alt={track.title} className="w-9 h-9 rounded object-cover flex-shrink-0" />
                          <div className="truncate">
                            <h4 className="font-semibold text-white truncate font-poppins">{track.title}</h4>
                            <p className="text-[10px] text-white/50 truncate">{track.artist}</p>
                          </div>
                        </div>

                        {/* Genre */}
                        <div className="col-span-3 md:col-span-3">
                          <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-white/60 font-semibold uppercase tracking-wider">
                            {track.genre}
                          </span>
                        </div>

                        {/* Duration */}
                        <div className="col-span-2 md:col-span-1 text-center text-white/40 font-semibold">
                          {track.duration}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Premium Spotify UI Mock */}
        {activeTab === 'spotify' && (
          <motion.div
            key="spotify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto text-left"
          >
            <div className="bg-[#121212] rounded-3xl p-6 border border-white/5 overflow-hidden font-poppins relative">
              {/* Spotify Gradient Banner */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#1DB954]/20 to-transparent" />
              
              {/* Spotify Header */}
              <div className="relative z-10 flex flex-col md:flex-row items-end gap-6 mb-8 pt-4">
                <img 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80" 
                  alt="A La Bien Spotify" 
                  className="w-36 h-36 md:w-44 md:h-44 object-cover shadow-[0_15px_30px_rgba(0,0,0,0.5)] rounded-md"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">VERIFIED ARTIST PROFILE</span>
                  <h2 className="text-4xl md:text-5xl font-black text-white mt-1">DJ HAMIDA</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-semibold text-white/70">
                    <FaSpotify className="text-[#1DB954] text-lg" />
                    <span>A La Bien Mix Party Official</span>
                    <span>•</span>
                    <span className="text-white">1.2M Monthly Listeners</span>
                  </div>
                </div>
              </div>

              {/* Action buttons spotify */}
              <div className="relative z-10 flex items-center gap-6 mb-8">
                <button className="w-12 h-12 rounded-full bg-[#1DB954] text-black hover:scale-105 flex items-center justify-center text-lg shadow-lg font-bold">
                  <FaPlay className="ml-1" />
                </button>
                <button className="border border-white/30 rounded-full px-4 py-1.5 text-xs text-white hover:border-white font-bold uppercase tracking-wider">
                  Follow
                </button>
              </div>

              {/* Popular Song Mock Spotify Grid */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-4">Popular Tracks</h3>
                <div className="space-y-1">
                  {[
                    { id: 1, title: 'Déconnecté', plays: '48,102,400', time: '3:20' },
                    { id: 2, title: 'C\'est une Dinguerie', plays: '12,504,220', time: '2:55' },
                    { id: 3, title: 'A La Bien Mix Party (Intro)', plays: '8,409,003', time: '5:41' },
                    { id: 4, title: 'Introduction Summer 2025', plays: '6,211,402', time: '4:10' },
                    { id: 5, title: 'Marbella Beach Club Vibe', plays: '3,890,111', time: '3:30' }
                  ].map((track) => (
                    <div key={track.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-xs group transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="w-4 text-center text-white/40 font-bold">{track.id}</span>
                        <div>
                          <p className="font-semibold text-white">{track.title}</p>
                          <p className="text-[10px] text-white/40">DJ Hamida</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="hidden sm:inline text-white/40">{track.plays} streams</span>
                        <span className="text-white/40 w-10 text-right">{track.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <a 
                  href="https://open.spotify.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1DB954] text-black font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full hover:scale-105 transition-all shadow-md"
                >
                  <FaSpotify />
                  <span>Open Spotify App</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* SoundCloud Player Section */}
        {activeTab === 'soundcloud' && (
          <motion.div
            key="soundcloud"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-card rounded-3xl p-6 border border-white/5 relative overflow-hidden text-left">
              <div className="flex items-center gap-3 mb-6">
                <FaSoundcloud className="text-[#FF5500] text-3xl" />
                <div>
                  <h3 className="text-lg font-bold text-white font-poppins">SoundCloud Integration</h3>
                  <p className="text-xs text-white/40">Listen to the latest live sets and special edits directly</p>
                </div>
              </div>
              
              {/* SoundCloud Mock Embed Container */}
              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 relative flex gap-4 items-center">
                <div className="w-24 h-24 bg-brand-purple/20 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <FaSoundcloud className="text-white/20 text-5xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] bg-[#FF5500]/20 text-[#FF5500] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    SPECIAL CLUB SET
                  </span>
                  <h4 className="text-sm font-semibold text-white mt-1 truncate">DJ HAMIDA LIVE SET IBIZA BEACH CLUB 2026</h4>
                  <p className="text-[10px] text-white/40 mt-0.5">Uploaded 3 days ago</p>
                  
                  {/* Waveform graphic illustration */}
                  <div className="h-8 flex gap-0.5 items-end mt-4">
                    {Array.from({ length: 48 }).map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`w-[2px] bg-white/20 rounded-t ${idx < 18 ? 'bg-[#FF5500]' : ''}`} 
                        style={{ height: `${20 + Math.sin(idx * 0.15) * 15 + Math.cos(idx * 0.2) * 8}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a 
                  href="https://soundcloud.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FF5500] text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full hover:scale-105 transition-all shadow-md"
                >
                  <FaSoundcloud />
                  <span>Explore SoundCloud Playlist</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
