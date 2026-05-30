import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPlay, FaPause, FaStepForward, FaStepBackward, 
  FaVolumeUp, FaVolumeMute, FaList, FaTimes 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const PLAYLIST = [
  {
    title: "A La Bien Mix Party (Club Mix)",
    artist: "DJ Hamida",
    genre: "Electro / Club / Oriental",
    cover: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=400&q=80",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "6:12"
  },
  {
    title: "Déconnecté (Remix Session)",
    artist: "DJ Hamida ft. L'Algérino",
    genre: "Rai / Dancehall / Club",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "7:05"
  },
  {
    title: "C'est Une Dinguerie (Summer Edition)",
    artist: "DJ Hamida",
    genre: "Afrobeat / House / Club",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "5:44"
  },
  {
    title: "Intro Summer Tour 2026",
    artist: "DJ Hamida",
    genre: "EDM / Oriental Bass",
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "5:02"
  }
];

export default function AudioPlayer({ 
  isAudioPlaying, 
  setIsAudioPlaying, 
  activeTrackIndex, 
  setActiveTrackIndex 
}) {
  const audio = PLAYLIST[activeTrackIndex];
  const audioRef = useRef(null);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showList, setShowList] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Sync play/pause state from parent
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isAudioPlaying) {
      audioRef.current.play().catch(e => {
        console.log("Audio autoplay blocked by browser policy. Play triggered by user interaction is required.");
        setIsAudioPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isAudioPlaying, activeTrackIndex, setIsAudioPlaying]);

  // Update track change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isAudioPlaying) {
        audioRef.current.play().catch(e => setIsAudioPlaying(false));
      }
    }
  }, [activeTrackIndex]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleAudioEnded = () => {
    // Autoplay next track
    handleNext();
  };

  const handlePlayPause = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleNext = () => {
    setActiveTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    setActiveTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const handleProgressChange = (e) => {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 z-50 max-w-sm md:w-[360px] select-none font-montserrat">
      {/* HTML5 Audio Hidden Player */}
      <audio
        ref={audioRef}
        src={audio.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      <AnimatePresence>
        {!isMinimized ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="glass-card shadow-[0_15px_30px_rgba(0,0,0,0.5)] rounded-2xl p-4 overflow-hidden relative"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-purple/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-brand-blue/20 rounded-full blur-xl pointer-events-none" />

            {/* Header info */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] tracking-widest text-brand-gold font-bold uppercase">
                NOW PLAYING
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowList(!showList)}
                  className="text-white/70 hover:text-brand-blue transition-colors text-xs p-1"
                  title="Playlist"
                >
                  <FaList />
                </button>
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="text-white/70 hover:text-red-400 transition-colors text-xs p-1"
                  title="Minimize"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Main Info */}
            <div className="flex gap-4 items-center mb-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden relative group">
                <img 
                  src={audio.cover} 
                  alt={audio.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Floating music note icon overlay when playing */}
                {isAudioPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="flex items-end gap-0.5 h-6">
                      <div className="w-0.5 bg-brand-blue eq-bar eq-bar-1 h-4" />
                      <div className="w-0.5 bg-brand-purple eq-bar eq-bar-2 h-5" />
                      <div className="w-0.5 bg-brand-gold eq-bar eq-bar-3 h-3" />
                      <div className="w-0.5 bg-brand-blue eq-bar eq-bar-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-xs truncate font-poppins">
                  {audio.title}
                </h3>
                <p className="text-[10px] text-white/50 truncate mb-1">
                  {audio.artist}
                </p>
                <span className="inline-block text-[8px] bg-brand-purple/20 text-brand-blue px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  {audio.genre}
                </span>
              </div>
            </div>

            {/* Progress Slider */}
            <div className="mb-3">
              <input 
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-blue outline-none"
              />
              <div className="flex justify-between items-center text-[9px] text-white/40 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex justify-between items-center">
              {/* Volume */}
              <div className="flex items-center gap-1.5 w-24">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white/60 hover:text-white transition-colors text-xs"
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple outline-none"
                />
              </div>

              {/* Playback Buttons */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={handlePrev}
                  className="text-white/60 hover:text-brand-blue transition-colors text-sm"
                >
                  <FaStepBackward />
                </button>
                
                <button 
                  onClick={handlePlayPause}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple flex items-center justify-center text-white hover:scale-105 shadow-[0_0_15px_rgba(123,46,255,0.4)] transition-all"
                >
                  {isAudioPlaying ? <FaPause className="text-sm" /> : <FaPlay className="text-sm ml-0.5" />}
                </button>

                <button 
                  onClick={handleNext}
                  className="text-white/60 hover:text-brand-blue transition-colors text-sm"
                >
                  <FaStepForward />
                </button>
              </div>

              {/* Equalizer animation mini */}
              <div className="w-10 flex justify-end">
                {isAudioPlaying ? (
                  <div className="flex items-end gap-0.5 h-6">
                    <span className="w-0.5 bg-brand-blue eq-bar eq-bar-1 h-3" />
                    <span className="w-0.5 bg-brand-purple eq-bar eq-bar-2 h-5" />
                    <span className="w-0.5 bg-brand-gold eq-bar eq-bar-3 h-4" />
                    <span className="w-0.5 bg-brand-blue eq-bar eq-bar-4 h-2" />
                  </div>
                ) : (
                  <div className="flex items-end gap-0.5 h-6">
                    <span className="w-0.5 bg-white/20 h-1" />
                    <span className="w-0.5 bg-white/20 h-1" />
                    <span className="w-0.5 bg-white/20 h-1" />
                    <span className="w-0.5 bg-white/20 h-1" />
                  </div>
                )}
              </div>
            </div>

            {/* Playlist dropdown drawer */}
            <AnimatePresence>
              {showList && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/10 mt-3 pt-3 overflow-hidden"
                >
                  <h4 className="text-[10px] font-bold text-brand-blue tracking-wider mb-2 uppercase">
                    Select Track
                  </h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                    {PLAYLIST.map((track, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveTrackIndex(index);
                          setIsAudioPlaying(true);
                        }}
                        className={`w-full text-left p-2 rounded flex items-center justify-between text-[11px] transition-colors ${
                          index === activeTrackIndex 
                            ? 'bg-brand-purple/20 text-brand-blue font-semibold' 
                            : 'hover:bg-white/5 text-white/70'
                        }`}
                      >
                        <span className="truncate max-w-[200px]">{track.title}</span>
                        <span className="text-[9px] text-white/40">{track.duration}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        ) : (
          /* Mini minimized widget */
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsMinimized(false)}
            className="w-12 h-12 rounded-full bg-brand-dark border border-brand-purple/50 flex items-center justify-center text-brand-blue hover:text-white shadow-[0_0_15px_rgba(123,46,255,0.4)] hover:scale-105 transition-all cursor-pointer"
            title="Open Audio Player"
          >
            {isAudioPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-0.5 bg-brand-blue eq-bar eq-bar-1 h-2" />
                <span className="w-0.5 bg-brand-purple eq-bar eq-bar-2 h-4" />
                <span className="w-0.5 bg-brand-gold eq-bar eq-bar-3 h-3" />
              </div>
            ) : (
              <FaPlay className="text-xs ml-0.5" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
