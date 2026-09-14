export type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ViewMode = 'entry' | 'dawit_login' | 'dawit_admin' | 'mama' | 'dawit_preview';

export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  date?: string;
  location?: string;
  category?: 'favorite' | 'sweet' | 'laughter' | 'special';
}

export interface LoveReason {
  id: number;
  category: 'Why I Love You' | 'What I Appreciate' | 'Our Memories' | 'Little Things' | 'Birthday Wish';
  title: string;
  content: string;
  iconName: string;
}

export interface AnimationSettings {
  fireworksEnabled: boolean;
  floatingHearts: boolean;
  twinklingStars: boolean;
  soundEffectsEnabled: boolean;
}

export interface BirthdayConfig {
  recipientName: string; // "Mahi"
  nickname: string; // "Mama"
  senderName: string; // "Dawit"
  age: number; // 18
  meetingDate: string; // ISO string e.g. "2026-12-25T18:00:00"
  yourLocation: {
    city: string;
    coords: { x: number; y: number }; // percentage on map canvas
  };
  herLocation: {
    city: string;
    coords: { x: number; y: number }; // percentage on map canvas
  };
  distanceText: string;
  apologyLetter: {
    salutation: string;
    opening: string;
    apologyBody: string[];
    commitment: string;
    transitionToBirthday: string;
    closing: string;
  };
  photos: MemoryPhoto[];
  reasons: LoveReason[];
  finalLetter: {
    title: string;
    subtitle: string;
    body: string[];
    signature: string;
  };
  customMusicUrl?: string;
  animationSettings?: AnimationSettings;
  cakeMessage?: string;
}
