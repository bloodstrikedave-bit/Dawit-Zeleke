import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { BirthdayConfig } from '../types';

interface LevelApologyProps {
  apologyLetter: BirthdayConfig['apologyLetter'];
  recipientName: string;
  nickname: string;
  onNextLevel: () => void;
}

export const LevelApology: React.FC<LevelApologyProps> = ({
  apologyLetter,
  nickname,
  onNextLevel,
}) => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [hasForgiven, setHasForgiven] = useState(false);

  const handleOpenLetter = () => {
    romanticAudio.playSparkle();
    setIsLetterOpen(true);
  };

  const handleForgive = () => {
    romanticAudio.playHeartTap();
    setHasForgiven(true);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 text-center select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>Level 4: Pure Honesty</span>
          <Mail className="w-3.5 h-3.5 text-rose-400" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold font-romantic text-white mb-2">
          A Letter For <span className="text-pink-400 font-script text-3xl sm:text-5xl">{nickname}</span>
        </h2>
        <p className="text-xs sm:text-sm text-pink-200/80 max-w-md mx-auto">
          No birthday celebration is complete without clearing what sits heavy in our hearts. Please open this letter.
        </p>
      </motion.div>

      {/* Sealed Envelope vs Unfolded Letter */}
      <div className="relative w-full max-w-xl mx-auto">
        {!isLetterOpen ? (
          /* Sealed Envelope Graphic */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative group cursor-pointer" onClick={handleOpenLetter}>
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-rose-600/30 to-purple-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />

              {/* Envelope Body */}
              <div className="relative w-72 sm:w-96 h-48 sm:h-60 bg-gradient-to-br from-[#381028] via-[#260a1d] to-[#1a0614] rounded-2xl border-2 border-pink-400/40 shadow-2xl p-6 flex flex-col items-center justify-center overflow-hidden">
                {/* Envelope Flap Triangles */}
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#4a1435] to-[#2e0b20] border-b border-pink-400/30 clip-triangle shadow-md" />

                {/* Wax Seal */}
                <div className="relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-red-900 border-2 border-rose-300 shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-pink-200 fill-pink-200 animate-pulse" />
                </div>

                <div className="relative z-10 mt-3 text-center">
                  <span className="text-xs font-romantic font-semibold tracking-wider text-pink-200 block">
                    Confidential & From The Heart
                  </span>
                  <span className="text-[11px] text-pink-400/90 font-mono mt-0.5 block">
                    Tap the seal to break and read
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Unfolded Sincere Letter */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-gradient-to-b from-[#1f0a28]/95 via-[#16061c]/98 to-[#100314]/98 border-2 border-pink-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl text-left"
          >
            {/* Soft decorative header stamp */}
            <div className="flex items-center justify-between border-b border-pink-500/20 pb-4 mb-6">
              <div>
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest block">
                  My Sincere Apology & Promise
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-romantic text-white mt-0.5">
                  {apologyLetter.salutation}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              </div>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 text-xs sm:text-sm text-pink-100/90 leading-relaxed font-sans font-normal">
              <p className="font-romantic text-sm sm:text-base text-pink-200 italic font-medium">
                "{apologyLetter.opening}"
              </p>

              {apologyLetter.apologyBody.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 my-4">
                <p className="font-medium text-pink-200">
                  {apologyLetter.commitment}
                </p>
              </div>

              {/* Natural transition to romantic birthday celebration */}
              <div className="pt-2 border-t border-pink-500/20">
                <p className="font-romantic text-sm sm:text-base text-amber-200 leading-relaxed font-medium">
                  {apologyLetter.transitionToBirthday}
                </p>
              </div>

              <p className="font-script text-2xl sm:text-3xl text-pink-300 pt-2 text-right">
                {apologyLetter.closing}
              </p>
            </div>

            {/* Interactive Soft Forgiveness Action */}
            <div className="mt-8 pt-4 border-t border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!hasForgiven ? (
                <button
                  onClick={handleForgive}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-pink-950/70 hover:bg-pink-900/80 border border-pink-400/50 text-pink-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                  <span>Send Dawit a Forgiving Hug 🤗</span>
                </button>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Hug received across the distance! ❤️ Thank you, Mama</span>
                </motion.div>
              )}

              <button
                onClick={() => {
                  romanticAudio.playSparkle();
                  onNextLevel();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-pink-600/30 flex items-center justify-center gap-2 group transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                <span>Step 5: Why You’re Special to Me ❤️</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
