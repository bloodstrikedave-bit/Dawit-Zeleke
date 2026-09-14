import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Flame, Wind, Sparkles, Heart, ArrowRight, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LevelCakeProps {
  nickname: string;
  age: number;
  onNextLevel: () => void;
  cakeMessage?: string;
  recipientName?: string;
}

export const LevelCake: React.FC<LevelCakeProps> = ({
  nickname,
  age = 18,
  onNextLevel,
  cakeMessage,
  recipientName,
}) => {
  // Array of 18 booleans representing lit status
  const [candles, setCandles] = useState<boolean[]>(() => Array(18).fill(true));
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const litCount = candles.filter(Boolean).length;
  const allBlownOut = litCount === 0;

  const triggerCelebration = () => {
    setHasCelebrated(true);
    romanticAudio.playAllCandlesOut();

    // Fireworks confetti bursts
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#fbbf24', '#ffffff', '#a855f7'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleExtinguishOne = (index: number) => {
    if (!candles[index]) return;
    romanticAudio.playCandleBlow();

    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.filter(Boolean).length === 0) {
      setTimeout(triggerCelebration, 300);
    }
  };

  const handleBlowAll = () => {
    if (allBlownOut) return;
    romanticAudio.playCandleBlow();
    setCandles(Array(18).fill(false));
    setTimeout(triggerCelebration, 300);
  };

  const handleRelight = () => {
    setCandles(Array(18).fill(true));
    setHasCelebrated(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 text-center select-none">
      {/* Title & instructions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto mb-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>Level 2: Celebrate 18 Years</span>
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold font-romantic text-white mb-2">
          Make a Wish, <span className="text-pink-400 font-script text-3xl sm:text-5xl">{nickname}</span>
        </h2>
        <p className="text-xs sm:text-sm text-pink-200/80">
          Tap each candle to blow it out, or blow them all together to celebrate your 18th year!
        </p>

        {/* Counter Pill */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-xs font-medium text-pink-300">
          <span>Candles lit: {litCount} / 18</span>
          {litCount > 0 && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
        </div>
      </motion.div>

      {/* The 18th Cake Visual Centerpiece */}
      <div className="relative my-4 w-full max-w-md sm:max-w-lg flex flex-col items-center">
        {/* Glow behind cake */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 via-amber-500/10 to-transparent blur-2xl pointer-events-none" />

        {/* 18 Candles Layout */}
        <div className="relative z-10 w-full px-2">
          {/* Top arch of 18 candles */}
          <div className="grid grid-cols-9 sm:grid-cols-9 gap-1 sm:gap-2 justify-items-center max-w-sm mx-auto mb-1">
            {candles.map((isLit, idx) => (
              <button
                key={idx}
                onClick={() => handleExtinguishOne(idx)}
                className="group flex flex-col items-center cursor-pointer p-0.5 hover:scale-110 active:scale-95 transition-transform"
                title={`Candle #${idx + 1} (Tap to blow out)`}
              >
                {/* Flame */}
                <div className="h-6 flex items-end justify-center">
                  {isLit ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 0.9, 1.1],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{ repeat: Infinity, duration: 0.5 + (idx % 4) * 0.1 }}
                      className="w-3.5 h-5 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 shadow-[0_0_12px_rgba(251,191,36,0.9)] origin-bottom animate-flame"
                    />
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 1, y: 0 }}
                      animate={{ scale: 1.5, opacity: 0, y: -10 }}
                      transition={{ duration: 0.8 }}
                      className="text-[10px] text-zinc-400 font-mono"
                    >
                      💨
                    </motion.div>
                  )}
                </div>

                {/* Wick */}
                <div className="w-0.5 h-1.5 bg-zinc-800" />

                {/* Candle Stick */}
                <div className={`w-2.5 sm:w-3 h-8 sm:h-10 rounded-t-sm shadow-sm transition-colors ${
                  idx % 3 === 0
                    ? 'bg-gradient-to-b from-rose-300 via-pink-400 to-rose-500'
                    : idx % 3 === 1
                    ? 'bg-gradient-to-b from-amber-200 via-amber-300 to-yellow-500'
                    : 'bg-gradient-to-b from-purple-300 via-purple-400 to-fuchsia-600'
                }`}>
                  {/* Candlestick spiral stripe effect */}
                  <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.7)_2px,rgba(255,255,255,0.7)_4px)] rounded-t-sm" />
                </div>
              </button>
            ))}
          </div>

          {/* Birthday Cake Tiers */}
          <div className="w-full max-w-xs sm:max-w-sm mx-auto">
            {/* Top Frosting Layer */}
            <div className="relative h-12 rounded-t-3xl bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 border-2 border-pink-400/40 shadow-inner flex items-center justify-around px-4">
              {/* Dripping Frosting Scallops */}
              <div className="absolute -bottom-2 inset-x-2 flex justify-between">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-4 h-3 bg-pink-300 rounded-b-full shadow-sm" />
                ))}
              </div>
              <span className="text-rose-800 font-script font-bold text-lg sm:text-xl drop-shadow-sm">
                {cakeMessage || `${recipientName || nickname} ❤️`}
              </span>
            </div>

            {/* Middle Sponge Layer */}
            <div className="h-14 bg-gradient-to-r from-[#5a1e3e] via-[#70244e] to-[#5a1e3e] border-x-2 border-pink-500/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f472b6_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-400/30 text-pink-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Sweet 18th Milestone</span>
              </div>
            </div>

            {/* Bottom Base Tier */}
            <div className="h-16 rounded-b-2xl bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 border-2 border-pink-400/50 shadow-2xl flex items-center justify-around px-6 relative">
              {/* Decorative Pearls */}
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-white shadow-md border border-pink-200" />
              ))}
            </div>

            {/* Glass cake stand platter */}
            <div className="h-4 w-11/12 mx-auto rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-xl mt-1" />
            <div className="h-3 w-1/3 mx-auto bg-gradient-to-b from-white/20 to-white/5 rounded-b-lg border-x border-b border-white/20" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {litCount > 0 ? (
            <button
              onClick={handleBlowAll}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-pink-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <Wind className="w-4 h-4" />
              <span>Blow Out All 18 Candles & Make a Wish 🎂</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-4 py-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 text-pink-300 text-xs border border-pink-500/30 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Light the candles again</span>
            </button>
          )}
        </div>
      </div>

      {/* Celebratory Banner & Unlocked Modal */}
      <AnimatePresence>
        {allBlownOut && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="mt-6 max-w-md w-full bg-gradient-to-b from-[#2a0c32]/95 to-[#15051e]/95 border-2 border-pink-400/50 rounded-3xl p-6 shadow-2xl shadow-pink-950/90 backdrop-blur-xl relative"
          >
            {/* Glowing "18" badge */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold font-romantic shadow-lg shadow-rose-500/50 border-2 border-amber-200"
            >
              18
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-bold font-romantic text-white mb-2">
              “18 looks beautiful on you, {nickname} ❤️”
            </h3>

            <p className="text-xs sm:text-sm text-pink-200/90 leading-relaxed mb-5">
              May every wish you made in this moment come true. You deserve all the stars in the night sky. Now, let’s walk through the memories that make my world spin.
            </p>

            <button
              onClick={() => {
                romanticAudio.playSparkle();
                onNextLevel();
              }}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-pink-600/30 flex items-center justify-center gap-2 group transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <span>Step 3: Walk Into Your Memories 📸</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
