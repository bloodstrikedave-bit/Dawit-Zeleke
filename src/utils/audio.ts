/**
 * Romantic Web Audio API Synthesizer & Sound Effects
 * Provides dreamy ambient music and responsive sound effects with zero external audio asset dependencies!
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private isMuted = false;
  private musicInterval: number | null = null;
  private gainNode: GainNode | null = null;
  private currentStep = 0;
  private customAudio: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMusic(customUrl?: string): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic(customUrl);
      return true;
    }
  }

  public startMusic(customUrl?: string) {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;

    if (customUrl && customUrl.trim() !== '') {
      try {
        if (!this.customAudio) {
          this.customAudio = new Audio(customUrl);
          this.customAudio.loop = true;
        }
        this.customAudio.volume = this.isMuted ? 0 : 0.4;
        this.customAudio.play().catch(() => {
          // fallback to synthesized music
          this.startSynthesizedMusic();
        });
        this.isMusicPlaying = true;
        return;
      } catch {
        // fallback
      }
    }

    this.startSynthesizedMusic();
  }

  private startSynthesizedMusic() {
    this.isMusicPlaying = true;
    // Romantic warm pentatonic progression: C4, E4, G4, B4, D5, G5, E5, C5, A4, F4
    const notes = [
      261.63, 329.63, 392.00, 493.88,
      523.25, 587.33, 659.25, 783.99,
      440.00, 349.23, 392.00, 523.25
    ];
    const bassNotes = [130.81, 164.81, 174.61, 196.00];

    this.currentStep = 0;

    const playCycle = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.gainNode) return;
      
      const now = this.ctx.currentTime;
      const freq = notes[this.currentStep % notes.length];
      
      // Melody chime
      this.playPluck(freq, now, 0.08, 1.8);

      // Sub warm bass note every 4 beats
      if (this.currentStep % 4 === 0) {
        const bassFreq = bassNotes[Math.floor(this.currentStep / 4) % bassNotes.length];
        this.playPluck(bassFreq, now, 0.12, 3.2, 'triangle');
      }

      this.currentStep++;
    };

    playCycle();
    this.musicInterval = window.setInterval(playCycle, 550);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  private playPluck(freq: number, time: number, volume: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.ctx || !this.gainNode || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);

      // Envelope
      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(volume, time + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // ignore
    }
  }

  // --- Sound Effects ---

  public playSparkle() {
    this.initContext();
    if (!this.ctx || !this.gainNode || this.isMuted) return;
    const now = this.ctx.currentTime;
    const freqs = [880, 1174, 1396, 1760, 2093];
    freqs.forEach((f, i) => {
      this.playPluck(f, now + i * 0.06, 0.1, 0.4, 'sine');
    });
  }

  public playGiftPop() {
    this.initContext();
    if (!this.ctx || !this.gainNode || this.isMuted) return;
    const now = this.ctx.currentTime;
    // Rising festive sweep
    const sweep = [523, 659, 783, 1046, 1318, 1567];
    sweep.forEach((f, i) => {
      this.playPluck(f, now + i * 0.08, 0.12, 0.6, 'triangle');
    });
  }

  public playCandleBlow() {
    this.initContext();
    if (!this.ctx || !this.gainNode || this.isMuted) return;
    const now = this.ctx.currentTime;
    // Soft air/wisp sound using low sine + decay chime
    this.playPluck(220, now, 0.15, 0.3, 'sine');
    this.playPluck(660, now + 0.08, 0.08, 0.5, 'sine');
  }

  public playAllCandlesOut() {
    this.initContext();
    if (!this.ctx || !this.gainNode || this.isMuted) return;
    const now = this.ctx.currentTime;
    // Happy triumphant chord
    const celebration = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    celebration.forEach((f, i) => {
      this.playPluck(f, now + i * 0.1, 0.2, 1.5, 'sine');
    });
  }

  public playHeartTap() {
    this.initContext();
    if (!this.ctx || !this.gainNode || this.isMuted) return;
    const now = this.ctx.currentTime;
    this.playPluck(698.46, now, 0.12, 0.4, 'sine');
    this.playPluck(1046.50, now + 0.05, 0.14, 0.6, 'sine');
  }
}

export const romanticAudio = new RomanticAudioManager();
