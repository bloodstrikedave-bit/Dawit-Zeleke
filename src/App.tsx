import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LevelId, BirthdayConfig, ViewMode } from './types';
import { initialConfig } from './config';
import { BackgroundStars } from './components/BackgroundStars';
import { QuestProgress } from './components/QuestProgress';
import { AudioPlayer } from './components/AudioPlayer';
import { LevelGift } from './components/LevelGift';
import { LevelCake } from './components/LevelCake';
import { LevelMemories } from './components/LevelMemories';
import { LevelApology } from './components/LevelApology';
import { LevelLoveReasons } from './components/LevelLoveReasons';
import { LevelLongDistance } from './components/LevelLongDistance';
import { LevelFinalSurprise } from './components/LevelFinalSurprise';
import { EntryScreen } from './components/EntryScreen';
import { DawitLoginModal } from './components/DawitLoginModal';
import { DawitDashboard } from './components/DawitDashboard';
import { ArrowLeft, Shield } from 'lucide-react';

const STORAGE_KEY = 'mahi_birthday_config_v2';

const loadInitialConfig = (): BirthdayConfig => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialConfig, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load saved config from localStorage', err);
  }
  return initialConfig;
};

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(loadInitialConfig);
  const [viewMode, setViewMode] = useState<ViewMode>('entry');
  const [currentLevel, setCurrentLevel] = useState<LevelId>(1);
  const [unlockedLevel, setUnlockedLevel] = useState<LevelId>(1);

  const handleSaveConfig = (updatedConfig: BirthdayConfig) => {
    setConfig(updatedConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfig));
    } catch (err) {
      console.warn('Failed to persist birthday config', err);
    }
  };

  const handleNextLevel = () => {
    setCurrentLevel((prev) => {
      const next = Math.min(7, prev + 1) as LevelId;
      setUnlockedLevel((unlocked) => Math.max(unlocked, next) as LevelId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return next;
    });
  };

  const handleSelectLevel = (level: LevelId) => {
    if (level <= unlockedLevel) {
      setCurrentLevel(level);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setCurrentLevel(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // SCREEN 1: "ENTER AS..." (Entry Screen)
  // -------------------------------------------------------------
  if (viewMode === 'entry' || viewMode === 'dawit_login') {
    return (
      <div className="min-h-screen bg-[#09030e] text-[#fce7f3] relative selection:bg-pink-500 selection:text-white flex flex-col justify-center">
        <BackgroundStars
          enableStars={config.animationSettings?.twinklingStars ?? true}
          enableHearts={config.animationSettings?.floatingHearts ?? true}
        />
        <EntryScreen
          onSelectDawit={() => setViewMode('dawit_login')}
          onSelectMama={() => {
            setCurrentLevel(1);
            setViewMode('mama');
          }}
          nickname={config.nickname}
        />
        <DawitLoginModal
          isOpen={viewMode === 'dawit_login'}
          onSuccess={() => setViewMode('dawit_admin')}
          onClose={() => setViewMode('entry')}
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: DAWIT PRIVATE ADMIN & SETTINGS DASHBOARD
  // -------------------------------------------------------------
  if (viewMode === 'dawit_admin') {
    return (
      <DawitDashboard
        config={config}
        onSaveConfig={handleSaveConfig}
        onPreviewMama={() => {
          setCurrentLevel(1);
          setViewMode('dawit_preview');
        }}
        onLogout={() => setViewMode('entry')}
      />
    );
  }

  // -------------------------------------------------------------
  // SCREEN 3: MAMA BIRTHDAY EXPERIENCE (Or Dawit Preview)
  // ZERO admin buttons, ZERO settings gear, ZERO edit indications in Mama mode!
  // -------------------------------------------------------------
  const isDawitPreview = viewMode === 'dawit_preview';

  return (
    <div className="min-h-screen bg-[#09030e] text-[#fce7f3] relative selection:bg-pink-500 selection:text-white flex flex-col justify-between">
      {/* Dynamic Starry Night & Floating Hearts Background */}
      <BackgroundStars
        enableStars={config.animationSettings?.twinklingStars ?? true}
        enableHearts={config.animationSettings?.floatingHearts ?? true}
      />

      {/* Discreet Banner ONLY shown in Dawit's Preview Mode (NEVER to Mama) */}
      {isDawitPreview && (
        <div className="sticky top-0 z-50 bg-[#1e0a29]/95 border-b border-amber-500/40 backdrop-blur-md px-4 py-2 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Dawit Preview: Testing Mama's View</span>
            <span className="text-[10px] text-pink-300/70 hidden sm:inline">
              (Mama will see none of this preview bar)
            </span>
          </div>
          <button
            onClick={() => setViewMode('dawit_admin')}
            className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      )}

      {/* Quest Level Progression Bar */}
      <QuestProgress
        currentLevel={currentLevel}
        unlockedLevel={unlockedLevel}
        onSelectLevel={handleSelectLevel}
      />

      {/* Main Interactive Birthday Stage */}
      <main className="relative z-10 pt-16 sm:pt-20 pb-12 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentLevel === 1 && (
            <motion.div
              key="level-1"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <LevelGift
                recipientName={config.recipientName}
                nickname={config.nickname}
                age={config.age}
                onNextLevel={handleNextLevel}
              />
            </motion.div>
          )}

          {currentLevel === 2 && (
            <motion.div
              key="level-2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <LevelCake
                nickname={config.nickname}
                recipientName={config.recipientName}
                cakeMessage={config.cakeMessage}
                age={config.age}
                onNextLevel={handleNextLevel}
              />
            </motion.div>
          )}

          {currentLevel === 3 && (
            <motion.div
              key="level-3"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <LevelMemories
                photos={config.photos}
                nickname={config.nickname}
                onNextLevel={handleNextLevel}
              />
            </motion.div>
          )}

          {currentLevel === 4 && (
            <motion.div
              key="level-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <LevelApology
                apologyLetter={config.apologyLetter}
                recipientName={config.recipientName}
                nickname={config.nickname}
                onNextLevel={handleNextLevel}
              />
            </motion.div>
          )}

          {currentLevel === 5 && (
            <motion.div
              key="level-5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <LevelLoveReasons
                reasons={config.reasons}
                nickname={config.nickname}
                onNextLevel={handleNextLevel}
              />
            </motion.div>
          )}

          {currentLevel === 6 && (
            <motion.div
              key="level-6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <LevelLongDistance
                config={config}
                onNextLevel={handleNextLevel}
              />
            </motion.div>
          )}

          {currentLevel === 7 && (
            <motion.div
              key="level-7"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <LevelFinalSurprise
                config={config}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Audio Controller (Does not auto-play, clearly labeled) */}
      <AudioPlayer customMusicUrl={config.customMusicUrl} />
    </div>
  );
}
