import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoveReason } from '../types';
import { Heart, Sparkles, Moon, Smile, ShieldCheck, Crown, Gift, Infinity as InfinityIcon, Flame, PartyPopper, ArrowRight, Eye, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LevelLoveReasonsProps {
  reasons: LoveReason[];
  nickname: string;
  onNextLevel: () => void;
}

// Icon helper map
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Sparkles,
  Moon,
  Smile,
  ShieldHeart: ShieldCheck,
  Crown,
  Gift,
  Infinity: InfinityIcon,
  Flame,
  PartyPopper,
};

export const LevelLoveReasons: React.FC<LevelLoveReasonsProps> = ({
  reasons,
  nickname,
  onNextLevel,
}) => {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [selectedReason, setSelectedReason] = useState<LoveReason | null>(null);

  const toggleReveal = (id: number) => {
    romanticAudio.playHeartTap();
    if (!revealedIds.includes(id)) {
      setRevealedIds((prev) => [...prev, id]);
    }
  };

  const handleRevealAll = () => {
    romanticAudio.playSparkle();
    setRevealedIds(reasons.map((r) => r.id));
  };

  const revealedCount = revealedIds.length;
  const isAllRevealed = revealedCount === reasons.length;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 text-center select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>Level 5: The Little Things</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold font-romantic text-white mb-2">
          Why You’re Special to Me, <span className="text-pink-400 font-script text-3xl sm:text-5xl">{nickname}</span>
        </h2>
        <p className="text-xs sm:text-sm text-pink-200/80 max-w-md mx-auto">
          Tap each glowing secret to reveal what makes my heart beat for you.
        </p>

        {/* Counter & Reveal All */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <div className="px-3.5 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-xs text-pink-300 font-medium">
            Unlocked: {revealedCount} / {reasons.length}
          </div>
          {!isAllRevealed && (
            <button
              onClick={handleRevealAll}
              className="text-xs text-pink-400 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Reveal All Messages ✨
            </button>
          )}
        </div>
      </motion.div>

      {/* Grid of Interactive Secret Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 max-w-5xl mx-auto w-full mb-8">
        {reasons.map((reason) => {
          const isRevealed = revealedIds.includes(reason.id);
          const Icon = iconMap[reason.iconName] || Heart;

          return (
            <div
              key={reason.id}
              onClick={() => {
                toggleReveal(reason.id);
                setSelectedReason(reason);
              }}
              className={`relative rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer overflow-hidden border ${
                isRevealed
                  ? 'bg-[#1e0a2b]/80 border-pink-500/40 shadow-lg shadow-pink-950/40 hover:border-pink-400/80 hover:scale-[1.02]'
                  : 'bg-[#14061c]/60 border-pink-500/20 hover:border-pink-500/50 hover:bg-[#1a0824]/70'
              }`}
            >
              {/* Category Pill & Number */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/25">
                  {reason.category}
                </span>
                <span className="text-xs text-pink-400/60 font-mono">
                  #{reason.id}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`p-2 rounded-xl ${isRevealed ? 'bg-rose-500/20 text-rose-300' : 'bg-zinc-800/80 text-zinc-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm sm:text-base font-bold font-romantic text-white line-clamp-1">
                  {reason.title}
                </h4>
              </div>

              {/* Message Content preview */}
              {isRevealed ? (
                <p className="text-xs sm:text-sm text-pink-200/90 leading-relaxed font-sans line-clamp-3">
                  {reason.content}
                </p>
              ) : (
                <div className="py-3 flex items-center justify-center gap-2 text-xs text-pink-400/70 border border-dashed border-pink-500/30 rounded-xl bg-pink-950/20">
                  <Eye className="w-3.5 h-3.5 animate-pulse" />
                  <span>Tap to reveal secret #{reason.id}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Advance to Level 6 Button */}
      <div className="mt-2">
        <button
          onClick={() => {
            romanticAudio.playSparkle();
            onNextLevel();
          }}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-pink-600/30 flex items-center gap-2 group transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
        >
          <span>Step 6: Our Long-Distance Story 🌍</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Modal for viewing single expanded reason */}
      <AnimatePresence>
        {selectedReason && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedReason(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full bg-[#1b0825] border border-pink-500/50 rounded-3xl p-6 sm:p-8 text-left shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  {selectedReason.category} • #{selectedReason.id}
                </span>
                <button
                  onClick={() => setSelectedReason(null)}
                  className="text-zinc-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-xl font-bold font-romantic text-white mb-3">
                {selectedReason.title}
              </h3>

              <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed font-sans mb-6">
                "{selectedReason.content}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-pink-500/20 text-xs text-pink-300/80">
                <span className="font-script text-lg text-pink-300">With all my love</span>
                <button
                  onClick={() => setSelectedReason(null)}
                  className="px-4 py-1.5 rounded-full bg-pink-950 border border-pink-500/40 text-pink-200 hover:bg-pink-900"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
