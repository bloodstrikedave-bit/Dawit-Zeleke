import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Heart, Clock, Sparkles, Send, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { BirthdayConfig } from '../types';

interface LevelLongDistanceProps {
  config: BirthdayConfig;
  onNextLevel: () => void;
  onUpdateMeetingDate?: (newDate: string) => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const LevelLongDistance: React.FC<LevelLongDistanceProps> = ({
  config,
  onNextLevel,
}) => {
  const meetingDateStr = config.meetingDate;
  const [pulseKey, setPulseKey] = useState(0);

  const calculateTimeLeft = (targetDate: string): TimeRemaining => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeLeft(meetingDateStr));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(meetingDateStr));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(meetingDateStr));
    }, 1000);
    return () => clearInterval(timer);
  }, [meetingDateStr]);

  const handleSendHeartPulse = () => {
    romanticAudio.playHeartTap();
    setPulseKey((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8 text-center select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>Level 6: Our Journey</span>
          <Globe className="w-3.5 h-3.5 text-pink-400" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold font-romantic text-white mb-2">
          Connected Across Every Horizon
        </h2>
        <p className="text-xs sm:text-sm text-pink-200/80 max-w-md mx-auto">
          {config.distanceText}
        </p>
      </motion.div>

      {/* Stylized Luminous Long-Distance Map Visual */}
      <div className="relative w-full max-w-2xl mx-auto mb-6">
        {/* Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-rose-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl pointer-events-none" />

        <div className="relative h-60 sm:h-72 w-full rounded-3xl bg-[#14061d]/90 border border-pink-500/30 shadow-2xl p-6 backdrop-blur-xl overflow-hidden flex flex-col justify-between">
          {/* Subtle cosmic grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Top badges */}
          <div className="relative z-10 flex items-center justify-between text-xs text-pink-300/80">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {config.yourLocation.city}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-[11px] text-pink-300">
              One Shared Heartbeat
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
              {config.herLocation.city} ({config.nickname})
            </span>
          </div>

          {/* Interactive Arc & Pulses */}
          <div className="relative z-10 my-auto h-28 w-full flex items-center justify-between px-4 sm:px-12">
            {/* Person 1: Him */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg shadow-rose-600/40 border-2 border-rose-300">
                  {config.senderName.charAt(0)}
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-ping" />
              </div>
              <span className="text-xs font-semibold text-white mt-1">Me</span>
              <span className="text-[10px] text-pink-400/80">{config.yourLocation.city}</span>
            </div>

            {/* Connecting Curved Arc with Animated Hearts */}
            <div className="relative flex-1 mx-4 h-12 flex items-center justify-center">
              {/* SVG Arc line */}
              <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none" viewBox="0 0 200 40">
                <path
                  d="M 0 35 Q 100 -10 200 35"
                  fill="transparent"
                  stroke="rgba(244, 63, 94, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Animated travelling heart */}
              <motion.div
                key={pulseKey}
                animate={{
                  x: [-100, 100],
                  y: [15, -15, 15],
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                }}
                className="absolute text-rose-400"
              >
                <Heart className="w-6 h-6 fill-rose-500 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              </motion.div>
            </div>

            {/* Person 2: Her (Mama) */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold shadow-lg shadow-pink-600/40 border-2 border-pink-300">
                  {config.recipientName.charAt(0)}
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-400 border-2 border-black animate-pulse" />
              </div>
              <span className="text-xs font-semibold text-white mt-1">{config.nickname}</span>
              <span className="text-[10px] text-pink-400/80">{config.herLocation.city}</span>
            </div>
          </div>

          {/* Interactive Button inside map */}
          <div className="relative z-10 flex items-center justify-center">
            <button
              onClick={handleSendHeartPulse}
              className="px-4 py-1.5 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-200 text-xs font-medium flex items-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Send className="w-3 h-3 text-rose-400" />
              <span>Send a live heart to {config.nickname} ❤️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Emotional Quote from the Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto my-4 p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/50 to-rose-950/40 border border-pink-500/30 text-center shadow-lg"
      >
        <p className="font-romantic text-sm sm:text-base text-pink-100 italic leading-relaxed">
          “I’m waiting for the day I finally meet you, {config.nickname}… the day I can see you in front of me, hold you close, and finally kiss you. ❤️ Beka bla, I’ll keep waiting for that day.”
        </p>
      </motion.div>

      {/* “Until We Meet” Emotional Countdown */}
      <div className="w-full max-w-lg mx-auto my-4">
        <div className="flex items-center justify-center mb-3 px-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-300 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Until We Meet Countdown</span>
          </div>
        </div>

        {/* 4 Countdown Time Blocks */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#220a2e]/90 to-[#14061c]/90 border border-pink-500/35 shadow-xl backdrop-blur-md flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 to-amber-400" />
              <span className="text-2xl sm:text-4xl font-bold font-romantic text-white tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-semibold text-pink-300/80 tracking-wider mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Advance to Final Level */}
      <div className="mt-8">
        <button
          onClick={() => {
            romanticAudio.playSparkle();
            onNextLevel();
          }}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-pink-600/30 flex items-center gap-2 group transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
        >
          <span>Final Level: The Grand 18th Surprise 🎆</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
