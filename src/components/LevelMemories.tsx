import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryPhoto } from '../types';
import { Sparkles, Heart, ChevronLeft, ChevronRight, Maximize2, X, ArrowRight, Camera } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LevelMemoriesProps {
  photos: MemoryPhoto[];
  nickname: string;
  onNextLevel: () => void;
  onUpdatePhoto?: (index: number, updated: Partial<MemoryPhoto>) => void;
}

export const LevelMemories: React.FC<LevelMemoriesProps> = ({
  photos,
  nickname,
  onNextLevel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  const activePhoto = photos[currentIndex] || photos[0];

  const handleNext = () => {
    romanticAudio.playHeartTap();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    romanticAudio.playHeartTap();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 text-center select-none">
      {/* Level Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>Level 3: Treasured Memories</span>
          <Camera className="w-3.5 h-3.5 text-pink-400" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold font-romantic text-white mb-2">
          Glimpses of <span className="text-pink-400 font-script text-3xl sm:text-5xl">My Favorite Girl</span>
        </h2>
        <p className="text-xs sm:text-sm text-pink-200/80">
          Every photo of you is a masterclass in beauty. Click any photo to enlarge it.
        </p>
      </motion.div>

      {/* Cinematic Main Carousel Card */}
      <div className="relative w-full max-w-lg mx-auto">
        {/* Glowing backdrop halo */}
        <div className="absolute -inset-2 bg-gradient-to-r from-rose-600/30 via-pink-500/20 to-purple-600/30 rounded-3xl blur-xl pointer-events-none" />

        <div className="relative bg-[#1a0822]/90 border border-pink-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Polaroid Frame */}
          <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activePhoto.id}
                src={activePhoto.url}
                alt={activePhoto.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Gradient shadow over photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Floating Heart Particles in photo corners */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-pink-300 text-xs">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              <span>{currentIndex + 1} / {photos.length}</span>
            </div>

            {/* Expand button */}
            <button
              onClick={() => setSelectedPhoto(activePhoto)}
              className="absolute top-3 left-3 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-pink-600/70 transition-colors cursor-pointer"
              title="Full screen view"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-400 block mb-1">
                {activePhoto.date || 'Sweet Memory'} • {activePhoto.location || 'Close to Heart'}
              </span>
              <h4 className="text-lg sm:text-xl font-bold font-romantic text-white mb-1">
                {activePhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-pink-100/90 line-clamp-2 leading-relaxed font-sans">
                {activePhoto.caption}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/30 text-pink-200 transition-colors flex items-center gap-1 text-xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Thumbnail dots */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    romanticAudio.playHeartTap();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 bg-rose-500 shadow-sm shadow-rose-400'
                      : 'w-2 bg-pink-950/80 hover:bg-pink-800'
                  }`}
                  aria-label={`Jump to photo ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/30 text-pink-200 transition-colors flex items-center gap-1 text-xs cursor-pointer"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Advance to Level 4 Button */}
      <div className="mt-8">
        <button
          onClick={() => {
            romanticAudio.playSparkle();
            onNextLevel();
          }}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-pink-600/30 flex items-center gap-2 group transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
        >
          <span>Step 4: A Letter From My Deepest Heart 💌</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Expanded Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl w-full bg-[#180820] border border-pink-500/40 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-pink-600 transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[65vh] overflow-hidden rounded-2xl mb-4 bg-black/50">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full max-h-[65vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span className="text-xs uppercase tracking-wider text-pink-400 font-semibold">
                {selectedPhoto.date || 'Timeless'}
              </span>
              <h3 className="text-xl font-bold font-romantic text-white mt-1 mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-pink-200/90 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
