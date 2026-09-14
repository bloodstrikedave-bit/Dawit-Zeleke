import { BirthdayConfig } from './types';

/**
 * =========================================================================
 * 💖 MAHI'S 18th BIRTHDAY CONFIGURATION
 * =========================================================================
 * Dawit, you can easily customize anything here:
 * 1. Photos: Update URLs in `photos` array with your own image links
 * 2. Meeting Date: Change `meetingDate` to your planned reunion date
 * 3. Messages & Apology: Edit the text to match your exact feelings
 * =========================================================================
 */

export const initialConfig: BirthdayConfig = {
  recipientName: "Mahi",
  nickname: "Mama",
  senderName: "Dawit",
  age: 18,
  
  // Configure your target meeting date (YYYY-MM-DDTHH:mm:ss)
  meetingDate: "2026-12-31T20:00:00",
  
  yourLocation: {
    city: "My City",
    coords: { x: 28, y: 44 }, // Location dot on romantic world visual
  },
  herLocation: {
    city: "Mama's City",
    coords: { x: 74, y: 38 }, // Location dot on romantic world visual
  },
  distanceText: "Thousands of miles apart, yet beating to the very same heart",

  // 💌 Apology & Love Letter
  apologyLetter: {
    salutation: "My Dearest Mama,",
    opening: "Before we blow out the candles, there is something I need to speak directly from my deepest heart to yours.",
    apologyBody: [
      "I know that I hurt you recently, Mama. Seeing you upset because of me broke something inside me that I can't even describe in words. I want to tell you directly: I am genuinely, truly sorry.",
      "I refuse to make any excuses, because you never deserve anything less than pure gentleness, patience, and complete understanding from me. You trusted me with your tender heart, and whenever I fall short of protecting that trust, the regret eats away at my soul.",
      "You mean everything to me, Mahi. You are not just a part of my life; you are my peace, my sweetest habit, and the girl I want to protect through every storm. I never want to be the cause of your sorrow—I only ever want to be the reason behind that radiant smile that lights up my whole world.",
      "I promise you with all of me that I am learning, I am listening, and I will continuously work to be the man who treats you with the tender care, respect, and unconditional love you deserve every single day."
    ],
    commitment: "Thank you for being patient with me, Mama. Please forgive me. Let me hold your heart more carefully from here on out.",
    transitionToBirthday: "And today, as the clock turns and you step into your 18th year, I want to leave every ounce of pain in the past. You are turning eighteen, my gorgeous girl—and this entire digital world was crafted to celebrate just how deeply you are adored.",
    closing: "Forever and always yours, with all my love ❤️"
  },

  // 📸 Her Photos (Easily replace these with her real pictures!)
  photos: [
    {
      id: "photo-1",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      title: "The Smile That Melted My World",
      caption: "The moment I first saw you smile like this, I knew no other girl in this universe could ever compare to my Mama.",
      date: "A Day I'll Never Forget",
      location: "In My Heart Forever",
      category: "favorite"
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
      title: "Pure Radiance at 18",
      caption: "Your eyes have this magic in them—even through a screen thousands of miles away, you make everything quiet and warm.",
      date: "Golden Hour Glow",
      location: "Across the Distance",
      category: "sweet"
    },
    {
      id: "photo-3",
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop",
      title: "My Favorite Laugh",
      caption: "When you laugh until your cheeks hurt... that's my favorite soundtrack in the entire world, Mama.",
      date: "Unfiltered Joy",
      location: "Late Night Video Calls",
      category: "laughter"
    },
    {
      id: "photo-4",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
      title: "18 Looks Beautiful On You",
      caption: "Eighteen chapters of pure elegance, kindness, and grace. You are blooming into the most breathtaking woman.",
      date: "Chapter 18 Begins",
      location: "Her Special Day",
      category: "special"
    },
    {
      id: "photo-5",
      url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
      title: "My Peace & My Home",
      caption: "No matter how chaotic the world gets, hearing your voice instantly calms my spirit. You are home to me, Mahi.",
      date: "Every Sweet Night",
      location: "Distance Means Nothing",
      category: "favorite"
    },
    {
      id: "photo-6",
      url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop",
      title: "The Queen of My Heart",
      caption: "Today, tomorrow, and every year ahead. Happy 18th Birthday, Mama.",
      date: "Forever Promise",
      location: "Always With You",
      category: "special"
    }
  ],

  // ❤️ Why You're Special to Me (Interactive cards)
  reasons: [
    {
      id: 1,
      category: "Why I Love You",
      title: "The Way You Say My Name",
      content: "Whenever you call me, there is this warmth and tenderness in your voice that makes all my worries vanish in an instant.",
      iconName: "Heart"
    },
    {
      id: 2,
      category: "What I Appreciate",
      title: "Your Unmatched Kindness",
      content: "You have the softest soul, Mama. The way you care about people and love so deeply inspires me to be a better person every single day.",
      iconName: "Sparkles"
    },
    {
      id: 3,
      category: "Our Memories",
      title: "Late Night Calls Under the Stars",
      content: "Those endless hours where neither of us wanted to hang up, whispering our secrets, laughing at silly jokes, and falling asleep together on call.",
      iconName: "Moon"
    },
    {
      id: 4,
      category: "Little Things",
      title: "Your Pout & Cute Quirks",
      content: "Even when you get a little dramatic or playfully upset with me, you are the most adorable human being to ever exist on this planet.",
      iconName: "Smile"
    },
    {
      id: 5,
      category: "Why I Love You",
      title: "You Are My Safe Haven",
      content: "In a world that can be so noisy and exhausting, you are the calm sanctuary where my soul finds true comfort.",
      iconName: "ShieldHeart"
    },
    {
      id: 6,
      category: "What I Appreciate",
      title: "Your Strength & Grace",
      content: "Turning 18 is a big milestone, but seeing the grace, intelligence, and ambition you carry makes me so remarkably proud to be yours.",
      iconName: "Crown"
    },
    {
      id: 7,
      category: "Birthday Wish",
      title: "My 18th Birthday Wish For You",
      content: "May your 18th year be flooded with blessings, dreams turned to reality, boundless happiness, and peace that overflows.",
      iconName: "Gift"
    },
    {
      id: 8,
      category: "Why I Love You",
      title: "Our Unbreakable Bond",
      content: "Miles and borders are nothing but temporary numbers. What we share lives in the invisible strings tying our souls together.",
      iconName: "Infinity"
    },
    {
      id: 9,
      category: "Our Memories",
      title: "Dreaming of Our First Hug",
      content: "Every single day I picture that exact second when the airport doors open, our eyes lock, and I finally wrap my arms around you.",
      iconName: "Flame"
    },
    {
      id: 10,
      category: "Birthday Wish",
      title: "A Lifetime of Celebrating You",
      content: "This is only the beginning. I promise to celebrate every birthday of yours with even more love than the year before.",
      iconName: "PartyPopper"
    }
  ],

  // 🎆 Final Celebration Letter
  finalLetter: {
    title: "HAPPY 18TH BIRTHDAY, MY MAMA ❤️",
    subtitle: "Today, Tomorrow, and Every Day That Follows",
    body: [
      "Eighteen years ago, the most precious soul was brought into this universe, and I am the luckiest man alive because somehow, out of billions of people, you chose to love me.",
      "Distance might keep my hands from holding yours today, but no ocean or timezone could ever stop my heart from beating solely for you, Mahi.",
      "“I’m waiting for the day I finally meet you, Mama… the day I can see you in front of me, hold you close, and finally kiss you. ❤️ Beka bla, I’ll keep waiting for that day.”",
      "Blow out your candles with pride today. Step boldly into 18 knowing you are cherished beyond words, respected beyond measure, and loved with every heartbeat I have."
    ],
    signature: "Forever Yours, Your Dawit ❤️"
  },
  animationSettings: {
    fireworksEnabled: true,
    floatingHearts: true,
    twinklingStars: true,
    soundEffectsEnabled: true,
  },
  cakeMessage: "Mahi ❤️"
};
