import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Core Components
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ThreeBackground from './components/ThreeBackground';
import AudioPlayer from './components/AudioPlayer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Music from './pages/Music';
import Media from './pages/Media';
import Events from './pages/Events';
import Shop from './pages/Shop';
import Contact from './pages/Contact';

// Page wrapper for animations
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AppContent({ 
  isAudioPlaying, 
  setIsAudioPlaying, 
  activeTrackIndex, 
  setActiveTrackIndex 
}) {
  const location = useLocation();
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  return (
    <>
      {/* Cinematic Loading Preloader */}
      <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />

      {isLoadingComplete && (
        <div className="relative min-h-screen flex flex-col justify-between">
          
          {/* Three.js 3D Particle Wave Field */}
          <ThreeBackground isAudioPlaying={isAudioPlaying} />

          {/* Custom Cursor Ring Follower */}
          <CustomCursor isAudioPlaying={isAudioPlaying} />

          {/* Sticky Glass Navbar */}
          <Navbar />

          {/* Page Routing Views */}
          <main className="flex-grow z-10">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <PageWrapper>
                    <Home 
                      isAudioPlaying={isAudioPlaying} 
                      setIsAudioPlaying={setIsAudioPlaying} 
                      setActiveTrackIndex={setActiveTrackIndex} 
                    />
                  </PageWrapper>
                } />
                <Route path="/about" element={
                  <PageWrapper>
                    <About />
                  </PageWrapper>
                } />
                <Route path="/music" element={
                  <PageWrapper>
                    <Music 
                      isAudioPlaying={isAudioPlaying} 
                      setIsAudioPlaying={setIsAudioPlaying} 
                      activeTrackIndex={activeTrackIndex} 
                      setActiveTrackIndex={setActiveTrackIndex} 
                    />
                  </PageWrapper>
                } />
                <Route path="/media" element={
                  <PageWrapper>
                    <Media />
                  </PageWrapper>
                } />
                <Route path="/events" element={
                  <PageWrapper>
                    <Events />
                  </PageWrapper>
                } />
                <Route path="/shop" element={
                  <PageWrapper>
                    <Shop />
                  </PageWrapper>
                } />
                <Route path="/contact" element={
                  <PageWrapper>
                    <Contact />
                  </PageWrapper>
                } />
                <Route path="*" element={
                  <PageWrapper>
                    <Home 
                      isAudioPlaying={isAudioPlaying} 
                      setIsAudioPlaying={setIsAudioPlaying} 
                      setActiveTrackIndex={setActiveTrackIndex} 
                    />
                  </PageWrapper>
                } />
              </Routes>
            </AnimatePresence>
          </main>

          {/* Floating Docked Audio Player */}
          <AudioPlayer 
            isAudioPlaying={isAudioPlaying} 
            setIsAudioPlaying={setIsAudioPlaying} 
            activeTrackIndex={activeTrackIndex} 
            setActiveTrackIndex={setActiveTrackIndex} 
          />

          {/* Premium Footer */}
          <Footer />
          
        </div>
      )}
    </>
  );
}

export default function App() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  return (
    <Router>
      <AppContent 
        isAudioPlaying={isAudioPlaying} 
        setIsAudioPlaying={setIsAudioPlaying} 
        activeTrackIndex={activeTrackIndex} 
        setActiveTrackIndex={setActiveTrackIndex} 
      />
    </Router>
  );
}
