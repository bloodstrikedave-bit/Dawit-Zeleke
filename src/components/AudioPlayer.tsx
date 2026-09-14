import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface AudioPlayerProps {
  customMusicUrl?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ customMusicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a gentle hint after 2 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleMusic = () => {
    setShowTooltip(false);
    const playing = romanticAudio.toggleMusic(customMusicUrl);
    setIsPlaying(playing);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = romanticAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Gentle helper tooltip to invite playing music */}
      {showTooltip && !isPlaying && (
        <div className="bg-gradient-to-r from-pink-900/90 to-purple-950/90 text-pink-100 text-xs px-3 py-1.5 rounded-full border border-pink-500/40 shadow-xl backdrop-blur-md animate-bounce flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5 text-pink-400" />
          <span>Tap to play romantic melody 🎵</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="ml-1 text-pink-400 hover:text-white"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 bg-[#170921]/80 backdrop-blur-md p-1.5 pl-3 rounded-full border border-pink-500/30 shadow-xl shadow-purple-950/40 hover:border-pink-400/60 transition-all">
        <button
          onClick={handleToggleMusic}
          className="flex items-center gap-2 text-xs font-medium text-pink-200 hover:text-white transition-colors cursor-pointer"
          title={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        >
          <div className="relative">
            <Disc className={`w-5 h-5 text-pink-400 ${isPlaying ? 'animate-spin' : ''}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </div>
          <span className="hidden sm:inline">
            {isPlaying ? 'Melody Playing' : 'Romantic Music'}
          </span>
        </button>

        {isPlaying && (
          <button
            onClick={handleToggleMute}
            className="p-1.5 rounded-full bg-pink-950/60 hover:bg-pink-900/70 text-pink-300 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute sound' : 'Mute sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
};
