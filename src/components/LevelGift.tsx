import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift as GiftIcon, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LevelGiftProps {
  recipientName: string;
  nickname: string;
  age: number;
  onNextLevel: () => void;
}

export const LevelGift: React.FC<LevelGiftProps> = ({
  nickname,
  age,
  onNextLevel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenGift = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    romanticAudio.playGiftPop();

    // Trigger explosive celebratory confetti from sides and center
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#f59e0b', '#fb7185', '#fbbf24', '#ffffff'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      romanticAudio.playSparkle();
    }, 900);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12 text-center select-none overflow-hidden">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Opening Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="max-w-2xl mx-auto mb-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
          <span>Level 1: The Birthday Quest</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-romantic tracking-tight text-white mb-3 drop-shadow-md">
          Happy <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent">{age}th</span> Birthday,
          <br />
          <span className="font-script font-normal text-4xl sm:text-6xl md:text-7xl text-pink-300 block mt-1">
            My {nickname} ❤️
          </span>
        </h1>

        <p className="text-sm sm:text-base text-pink-200/80 max-w-md mx-auto leading-relaxed">
          Welcome to your secret digital realm, crafted with endless love.
          An unforgettable birthday adventure awaits you...
        </p>
      </motion.div>

      {/* Interactive Gift Box Section */}
      <div className="relative z-10 my-4">
        {!isOpen ? (
          <div className="flex flex-col items-center">
            {/* Pulsing prompt tag */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-rose-950/80 to-purple-950/80 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-medium shadow-lg shadow-pink-950/40 backdrop-blur-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>“I have something special for you…”</span>
            </motion.div>

            {/* 3D Gift Box Button */}
            <button
              onClick={handleOpenGift}
              disabled={isOpening}
              className="group relative cursor-pointer outline-none focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="Open your birthday gift box"
            >
              {/* Outer pulsing glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rose-600/40 to-pink-500/40 blur-xl group-hover:blur-2xl transition-all opacity-75 group-hover:opacity-100 animate-pulse-glow" />

              {/* Gift Box Container */}
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl bg-gradient-to-br from-rose-600 via-pink-700 to-purple-900 border-2 border-pink-300/40 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                {/* Gold Vertical Ribbon */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 sm:w-9 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 shadow-md" />
                
                {/* Gold Horizontal Ribbon */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 sm:h-9 bg-gradient-to-b from-amber-300 via-yellow-100 to-amber-400 shadow-md" />

                {/* Ribbon Bow on top */}
                <motion.div
                  animate={isOpening ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : { scale: [1, 1.06, 1] }}
                  transition={isOpening ? { duration: 0.5 } : { repeat: Infinity, duration: 2.2 }}
                  className="absolute -top-3 sm:-top-4 z-20 flex items-center justify-center"
                >
                  <div className="relative flex items-center">
                    <div className="w-9 h-7 sm:w-12 sm:h-9 rounded-full border-4 border-amber-300 bg-amber-400/90 -rotate-25 shadow-lg" />
                    <div className="w-5 h-5 rounded-full bg-amber-200 border-2 border-amber-400 z-10 -mx-2 shadow-inner" />
                    <div className="w-9 h-7 sm:w-12 sm:h-9 rounded-full border-4 border-amber-300 bg-amber-400/90 rotate-25 shadow-lg" />
                  </div>
                </motion.div>

                {/* Shimmer Pattern overlay */}
                <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

                {/* Center Badge / Heart */}
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-950/85 border border-pink-300/60 backdrop-blur-md shadow-xl flex flex-col items-center justify-center group-hover:rotate-6 transition-transform">
                  <GiftIcon className="w-8 h-8 text-amber-300 animate-bounce" />
                  <span className="text-[10px] font-bold tracking-wider text-pink-200 mt-1 uppercase">
                    Tap to Open
                  </span>
                </div>
              </div>
            </button>

            <span className="mt-5 text-xs text-pink-300/70 tracking-wide animate-pulse">
              Click the box to unlock your surprise ✨
            </span>
          </div>
        ) : (
          /* Revealed state */
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="max-w-md w-full bg-gradient-to-b from-[#240a2c]/90 to-[#15051e]/95 border-2 border-pink-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-pink-950/80 backdrop-blur-xl relative"
          >
            {/* Burst of floating stars */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/40">
              <Sparkles className="w-8 h-8 text-white animate-spin" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-romantic text-white mb-2">
              The Journey Has Begun!
            </h3>

            <p className="text-sm text-pink-200/90 leading-relaxed mb-6">
              You’ve unlocked your 18th birthday experience, Mama! Let’s celebrate the queen you are with 18 glowing candles waiting for your wish.
            </p>

            <button
              onClick={() => {
                romanticAudio.playSparkle();
                onNextLevel();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-sm shadow-xl shadow-pink-600/30 flex items-center justify-center gap-2 group transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <span>Step 2: Blow Your 18th Birthday Candles 🎂</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
