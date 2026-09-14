import React from 'react';
import { motion } from 'motion/react';
import { Lock, Heart, Sparkles, Shield, Crown, Stars } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface EntryScreenProps {
  onSelectDawit: () => void;
  onSelectMama: () => void;
  nickname: string;
}

export const EntryScreen: React.FC<EntryScreenProps> = ({
  onSelectDawit,
  onSelectMama,
  nickname = 'Mama',
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 select-none">
      {/* Subtle floating ambient orb behind cards */}
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-pink-600/15 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl mx-auto mb-8 sm:mb-12 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-amber-500/20 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-4 shadow-lg backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>An 18th Birthday Milestone Universe</span>
          <Stars className="w-3.5 h-3.5 text-pink-300" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold font-romantic text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-100 tracking-tight drop-shadow-md">
          Enter as… ❤️
        </h1>
        <p className="mt-3 text-sm sm:text-base text-pink-200/80 font-light max-w-md mx-auto leading-relaxed">
          Welcome to your private celebration sanctuary. Please choose your path below.
        </p>
      </motion.div>

      {/* Two Large Path Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-3xl w-full mx-auto relative z-10">
        {/* DAWIT 🔐 Card */}
        <motion.button
          onClick={() => {
            romanticAudio.playSparkle();
            onSelectDawit();
          }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#220d2c]/90 via-[#170620]/90 to-[#100318]/90 border-2 border-amber-500/30 hover:border-amber-400/80 shadow-2xl hover:shadow-amber-500/20 text-left transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer backdrop-blur-xl"
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400 opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Background watermark */}
          <Shield className="absolute -right-6 -bottom-6 w-36 h-36 text-amber-500/5 group-hover:text-amber-500/10 transition-colors pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 group-hover:bg-amber-500/30 transition-all shadow-md">
                <Lock className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                Secure Access
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-romantic text-white group-hover:text-amber-200 transition-colors">
                DAWIT 🔐
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/70 font-light leading-relaxed mb-4">
              Private settings, photo manager, message editor, countdown control, and live website customization.
            </p>
          </div>

          <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-300 font-medium">
            <span>Password required</span>
            <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Unlock Dashboard →
            </span>
          </div>
        </motion.button>

        {/* MAMA ❤️ Card */}
        <motion.button
          onClick={() => {
            romanticAudio.playHeartTap();
            onSelectMama();
          }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#330f2f]/90 via-[#210722]/90 to-[#120317]/90 border-2 border-rose-500/40 hover:border-rose-400 shadow-2xl hover:shadow-rose-600/30 text-left transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer backdrop-blur-xl"
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Background watermark */}
          <Heart className="absolute -right-6 -bottom-6 w-36 h-36 text-rose-500/5 group-hover:text-rose-500/10 transition-colors pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/25 border border-rose-400/40 flex items-center justify-center text-rose-300 group-hover:bg-rose-500/40 transition-all shadow-md">
                <Crown className="w-6 h-6 text-rose-300 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 animate-pulse">
                Birthday Girl ✨
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-romantic text-white group-hover:text-pink-200 transition-colors">
                MAMA ❤️
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-pink-100/80 font-light leading-relaxed mb-4">
              Step directly into your interactive 18th birthday celebration, surprises, cake, and loving memories.
            </p>
          </div>

          <div className="pt-4 border-t border-rose-500/20 flex items-center justify-between text-xs text-rose-300 font-medium">
            <span>Begin Birthday Experience</span>
            <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Surprise →
            </span>
          </div>
        </motion.button>
      </div>

      <div className="mt-10 sm:mt-14 text-center text-xs text-pink-300/40 tracking-wider font-light">
        A loving digital milestone created with all my heart
      </div>
    </div>
  );
};
