import React from 'react';
import { LevelId } from '../types';
import { Gift, Cake, Image, Mail, Heart, Globe, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface QuestProgressProps {
  currentLevel: LevelId;
  unlockedLevel: LevelId;
  onSelectLevel: (lvl: LevelId) => void;
}

const levels: { id: LevelId; title: string; short: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 1, title: 'Open Gift', short: 'Gift', icon: Gift },
  { id: 2, title: '18th Cake', short: 'Cake', icon: Cake },
  { id: 3, title: 'Memories', short: 'Photos', icon: Image },
  { id: 4, title: 'My Apology', short: 'Apology', icon: Mail },
  { id: 5, title: 'Why I Love You', short: 'Love', icon: Heart },
  { id: 6, title: 'Until We Meet', short: 'Meet', icon: Globe },
  { id: 7, title: 'Final Surprise', short: 'Finale', icon: Sparkles },
];

export const QuestProgress: React.FC<QuestProgressProps> = ({
  currentLevel,
  unlockedLevel,
  onSelectLevel,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 py-2.5 sm:px-6 sm:py-3 bg-[#0d0615]/80 backdrop-blur-md border-b border-pink-500/20 shadow-lg shadow-pink-950/30">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Title indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping hidden sm:inline-block" />
          <div className="leading-tight">
            <span className="text-[11px] uppercase tracking-wider text-pink-400/90 font-semibold block">
              Mahi's 18th Journey
            </span>
            <span className="text-xs text-zinc-300 font-medium hidden sm:inline">
              Level {currentLevel} of 7
            </span>
          </div>
        </div>

        {/* Levels step pills */}
        <nav aria-label="Quest Levels" className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {levels.map((lvl) => {
            const isCurrent = currentLevel === lvl.id;
            const isUnlocked = unlockedLevel >= lvl.id;
            const isCompleted = unlockedLevel > lvl.id;
            const Icon = lvl.icon;

            return (
              <button
                key={lvl.id}
                onClick={() => isUnlocked && onSelectLevel(lvl.id)}
                disabled={!isUnlocked}
                title={lvl.title}
                className={`group relative flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white shadow-lg shadow-pink-500/30 ring-1 ring-pink-300/50 scale-105'
                    : isCompleted
                    ? 'bg-pink-950/50 text-pink-300 hover:bg-pink-900/60 border border-pink-500/30 cursor-pointer'
                    : isUnlocked
                    ? 'bg-zinc-900/60 text-pink-200 border border-zinc-700/50 cursor-pointer'
                    : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800/40 cursor-not-allowed opacity-60'
                }`}
              >
                <span className="shrink-0">
                  {isCompleted && !isCurrent ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : !isUnlocked ? (
                    <Lock className="w-3 h-3 text-zinc-500" />
                  ) : (
                    <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'animate-bounce' : ''}`} />
                  )}
                </span>
                <span className="hidden md:inline whitespace-nowrap">
                  {lvl.title}
                </span>
                <span className="inline md:hidden text-[11px] whitespace-nowrap">
                  {lvl.short}
                </span>

                {isCurrent && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full border-2 border-pink-400/80 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
