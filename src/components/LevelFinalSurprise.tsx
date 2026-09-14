import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Award, RotateCcw, Send, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { BirthdayConfig } from '../types';

interface LevelFinalSurpriseProps {
  config: BirthdayConfig;
  onRestart: () => void;
}

export const LevelFinalSurprise: React.FC<LevelFinalSurpriseProps> = ({
  config,
  onRestart,
}) => {
  const [kissCount, setKissCount] = useState(0);
  const [showVow, setShowVow] = useState(false);

  useEffect(() => {
    // Initial celebration fireworks blast
    romanticAudio.playAllCandlesOut();

    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#fbbf24', '#e879f9'];

    const interval: number = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        spread: 360,
        startVelocity: 30,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors,
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const handleSendKiss = () => {
    romanticAudio.playHeartTap();
    setKissCount((prev) => prev + 1);

    confetti({
      particleCount: 25,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#ec4899', '#fb7185'],
    });
  };

  const heroPhoto = config.photos[0];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 text-center select-none overflow-hidden">
      {/* Ambient background glow bursts */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-r from-rose-600/30 to-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Title Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="max-w-3xl mx-auto mb-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold uppercase tracking-widest mb-4 shadow-lg backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>Final Milestone Reached</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-romantic tracking-tight text-white mb-3 drop-shadow-[0_4px_20px_rgba(244,63,94,0.4)]">
          HAPPY 18TH BIRTHDAY,
          <br />
          <span className="font-script font-normal text-4xl sm:text-7xl md:text-8xl bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent block mt-1">
            MY {config.nickname.toUpperCase()} ❤️
          </span>
        </h1>

        <p className="text-sm sm:text-base text-pink-200/90 max-w-xl mx-auto leading-relaxed">
          {config.finalLetter.subtitle}
        </p>
      </motion.div>

      {/* Hero Photo with Majestic Romantic Frame */}
      {heroPhoto && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative my-4 z-10 group"
        >
          {/* Pulsing halo */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-glow" />

          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border-2 border-amber-300/60 shadow-2xl bg-black">
            <img
              src={heroPhoto.url}
              alt="Mahi Birthday Girl"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute bottom-3 inset-x-3 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">
                The Birthday Queen
              </span>
              <span className="text-lg font-bold font-romantic text-white">
                {config.recipientName} ({config.nickname})
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Heartfelt Final Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="relative z-10 max-w-xl w-full mx-auto my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#220a2e]/95 to-[#120419]/95 border-2 border-pink-500/40 shadow-2xl backdrop-blur-xl text-left"
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-pink-100/90 leading-relaxed font-sans font-normal">
          {config.finalLetter.body.map((para, i) => (
            <p key={i} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-pink-500/25 flex items-center justify-between">
          <span className="text-xs text-pink-400 uppercase tracking-wider font-semibold">
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="font-script text-2xl sm:text-3xl text-amber-300 font-bold">
            {config.finalLetter.signature}
          </span>
        </div>
      </motion.div>

      {/* Interactive Celebratory Buttons */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-2 mb-8">
        <button
          onClick={handleSendKiss}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-600/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <Heart className="w-4 h-4 fill-white animate-bounce" />
          <span>Send Birthday Kisses to Mama ({kissCount}) 💋</span>
        </button>

        <button
          onClick={() => setShowVow(true)}
          className="px-5 py-3 rounded-full bg-[#20092c] hover:bg-[#2c0c3c] border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>View 18th Birthday Keepsake Vow 📜</span>
        </button>

        <button
          onClick={onRestart}
          className="px-4 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Journey</span>
        </button>
      </div>

      {/* Keepsake Vow Modal */}
      {showVow && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowVow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-lg w-full bg-gradient-to-b from-[#2d0f36] to-[#16051c] border-2 border-amber-300/60 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-400/20 border border-amber-300 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-300" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-romantic text-white mb-1">
              Certificate of Eternal Devotion
            </h3>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block mb-4">
              Presented to Mahi on her 18th Birthday
            </span>

            <p className="text-xs sm:text-sm text-pink-100/90 leading-relaxed font-sans mb-6">
              "This certifies that on this day, as you turn 18, Dawit solemnly pledges to cherish, protect, respect, and love Mahi with every breath. Across every mile and every passing day, until we are finally in each other’s arms."
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-pink-300 mb-6 font-mono">
              <span>Status: Sealed in the Stars forever</span>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>

            <button
              onClick={() => setShowVow(false)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-semibold shadow-md cursor-pointer hover:opacity-95"
            >
              Keep Close to My Heart ❤️
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
