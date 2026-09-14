import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Heart,
  Calendar,
  MessageSquare,
  Music,
  Sparkles,
  FileText,
  Settings,
  Save,
  Check,
  RefreshCw,
  Eye,
  LogOut,
  ArrowUp,
  ArrowDown,
  Volume2,
  Shield,
  Clock,
  Cake,
  Copy,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { BirthdayConfig, MemoryPhoto, LoveReason } from '../types';
import { initialConfig } from '../config';
import { romanticAudio } from '../utils/audio';

interface DawitDashboardProps {
  config: BirthdayConfig;
  onSaveConfig: (updatedConfig: BirthdayConfig) => void;
  onPreviewMama: () => void;
  onLogout: () => void;
}

type TabType =
  | 'photos'
  | 'apology'
  | 'reasons'
  | 'birthday'
  | 'countdown'
  | 'music'
  | 'animations'
  | 'final'
  | 'backup';

export const DawitDashboard: React.FC<DawitDashboardProps> = ({
  config,
  onSaveConfig,
  onPreviewMama,
  onLogout,
}) => {
  const [localConfig, setLocalConfig] = useState<BirthdayConfig>(config);
  const [activeTab, setActiveTab] = useState<TabType>('photos');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Hidden file input for adding a brand new photo
  const addPhotoInputRef = useRef<HTMLInputElement>(null);

  // Specific photo file input refs mapped by photo id
  const changePhotoInputRef = useRef<HTMLInputElement>(null);
  const [activePhotoChangeId, setActivePhotoChangeId] = useState<string | null>(null);

  const triggerSave = (newConfig: BirthdayConfig) => {
    setLocalConfig(newConfig);
    onSaveConfig(newConfig);
    setSaveSuccess(true);
    romanticAudio.playSparkle();
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // -------------------------------------------------------------
  // Easy Photo Upload Handlers (Direct phone/desktop image file reading)
  // -------------------------------------------------------------
  const handleAddNewPhotoFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      const newPhoto: MemoryPhoto = {
        id: `photo-${Date.now()}`,
        url: dataUrl,
        title: 'My Beautiful Mama',
        caption: 'A precious memory with you that I will cherish forever ❤️',
        date: 'Special Moment',
        location: 'In My Heart',
        category: 'favorite',
      };

      const updated = {
        ...localConfig,
        photos: [newPhoto, ...localConfig.photos],
      };
      triggerSave(updated);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleChangePhotoFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activePhotoChangeId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      const updatedPhotos = localConfig.photos.map((p) =>
        p.id === activePhotoChangeId ? { ...p, url: dataUrl } : p
      );

      const updated = {
        ...localConfig,
        photos: updatedPhotos,
      };
      triggerSave(updated);
      setActivePhotoChangeId(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDeletePhoto = (id: string) => {
    if (localConfig.photos.length <= 1) {
      alert('Please keep at least one photo in the gallery for Mama.');
      return;
    }
    const updatedPhotos = localConfig.photos.filter((p) => p.id !== id);
    const updated = { ...localConfig, photos: updatedPhotos };
    triggerSave(updated);
  };

  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= localConfig.photos.length) return;

    const newPhotos = [...localConfig.photos];
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[targetIdx];
    newPhotos[targetIdx] = temp;

    const updated = { ...localConfig, photos: newPhotos };
    triggerSave(updated);
  };

  const handleUpdatePhotoField = (
    id: string,
    field: keyof MemoryPhoto,
    value: string
  ) => {
    const updatedPhotos = localConfig.photos.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setLocalConfig((prev) => ({ ...prev, photos: updatedPhotos }));
  };

  // -------------------------------------------------------------
  // Reset to Defaults
  // -------------------------------------------------------------
  const handleResetToDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all settings back to original defaults?'
      )
    ) {
      setLocalConfig(initialConfig);
      onSaveConfig(initialConfig);
      triggerSave(initialConfig);
    }
  };

  const handleCopyConfig = () => {
    const code = JSON.stringify(localConfig, null, 2);
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const navItems = [
    { id: 'photos', label: 'Her Photos', icon: ImageIcon },
    { id: 'apology', label: 'Apology Letter', icon: MessageSquare },
    { id: 'reasons', label: 'Love Reasons', icon: Heart },
    { id: 'birthday', label: 'Birthday & Cake', icon: Cake },
    { id: 'countdown', label: 'Reunion Countdown', icon: Calendar },
    { id: 'music', label: 'Music & Audio', icon: Music },
    { id: 'animations', label: 'Visual FX & Fireworks', icon: Sparkles },
    { id: 'final', label: 'Final Letter', icon: FileText },
    { id: 'backup', label: 'Backup & Reset', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0d0413] text-[#fce7f3] relative z-20 flex flex-col">
      {/* Hidden File Inputs for Easy Image Selection from Phone / Computer */}
      <input
        type="file"
        ref={addPhotoInputRef}
        onChange={handleAddNewPhotoFromFile}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={changePhotoInputRef}
        onChange={handleChangePhotoFromFile}
        accept="image/*"
        className="hidden"
      />

      {/* Top Fixed Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#170724]/95 border-b border-amber-500/30 backdrop-blur-md px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white font-romantic tracking-wide">
                Dawit's Settings Dashboard
              </h1>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                Admin Mode
              </span>
            </div>
            <p className="text-[11px] text-pink-300/70">
              Customizing Mahi's 18th Birthday Website in real-time
            </p>
          </div>
        </div>

        {/* Global Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Preview as Mama Button */}
          <button
            onClick={() => {
              romanticAudio.playSparkle();
              onPreviewMama();
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
            title="Experience the birthday website exactly as Mama will see it"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview as Mama</span>
          </button>

          {/* Save Changes Button */}
          <button
            onClick={() => triggerSave(localConfig)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Saved! ❤️</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>

          {/* Exit / Logout */}
          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Lock Dashboard & Return to Entry"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Navigation Tabs */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 bg-[#160623]/80 border border-amber-500/25 rounded-3xl p-3 shadow-xl backdrop-blur-md">
            <div className="text-[11px] uppercase font-semibold text-amber-300/80 tracking-wider px-3 py-2 mb-1">
              Configuration Sections
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/30 via-rose-500/20 to-transparent text-white border-l-4 border-amber-400 font-semibold'
                        : 'text-pink-200/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-amber-300' : 'text-pink-400/80'
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Tips Box */}
            <div className="mt-6 p-3 rounded-2xl bg-black/40 border border-pink-500/20 text-[11px] text-pink-200/70 leading-relaxed">
              <span className="font-semibold text-amber-300 block mb-1">
                💡 Tip for Dawit:
              </span>
              All edits save to this device's memory. When you hand the phone to Mama or send her the link, select “MAMA ❤️” on the first screen. She will have zero visible editing buttons!
            </div>
          </div>
        </aside>

        {/* Right Side: Active Tab Content Panels */}
        <main className="lg:col-span-3">
          <div className="bg-[#180827]/90 border border-pink-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
            {/* ------------------------------------------------------------- */}
            {/* TAB 1: EASY PHOTO MANAGEMENT (Upload from Phone / Computer)   */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-pink-500/20">
                  <div>
                    <h2 className="text-xl font-bold font-romantic text-white flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-amber-400" />
                      <span>Mahi's Photo Gallery</span>
                    </h2>
                    <p className="text-xs text-pink-200/70 mt-0.5">
                      Add, change, reorder, and caption her special photos. Upload directly from your phone gallery.
                    </p>
                  </div>

                  {/* Prominent "+ Add Photo" Button */}
                  <button
                    onClick={() => addPhotoInputRef.current?.click()}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white text-xs font-bold shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Photo (From Phone / PC)</span>
                  </button>
                </div>

                {/* Photo Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localConfig.photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="p-4 rounded-2xl bg-black/40 border border-pink-500/30 flex flex-col justify-between hover:border-pink-400/60 transition-all group"
                    >
                      {/* Image Thumbnail & Actions */}
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 mb-3 group/img">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2 justify-between">
                          <span className="text-[10px] text-zinc-300 font-mono">
                            Photo #{index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Photo Button Actions: "Change Photo" & "Delete Photo" */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => {
                            setActivePhotoChangeId(photo.id);
                            changePhotoInputRef.current?.click();
                          }}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {/* Move Order */}
                        <div className="flex items-center gap-1 bg-zinc-800/60 p-0.5 rounded-xl border border-white/10">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMovePhoto(index, 'up')}
                            className="p-1 rounded-lg hover:bg-white/10 text-zinc-300 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Earlier"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={index === localConfig.photos.length - 1}
                            onClick={() => handleMovePhoto(index, 'down')}
                            className="p-1 rounded-lg hover:bg-white/10 text-zinc-300 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Later"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Photo Metadata Inputs */}
                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="block text-[10px] uppercase font-semibold text-pink-300/80 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={photo.title}
                            onChange={(e) =>
                              handleUpdatePhotoField(photo.id, 'title', e.target.value)
                            }
                            className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-pink-400"
                            placeholder="e.g. The Smile That Melted My World"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-semibold text-pink-300/80 mb-1">
                            Love Caption
                          </label>
                          <textarea
                            rows={2}
                            value={photo.caption}
                            onChange={(e) =>
                              handleUpdatePhotoField(photo.id, 'caption', e.target.value)
                            }
                            className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-pink-400 resize-none text-xs"
                            placeholder="Describe what makes this picture so special..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] uppercase font-semibold text-pink-300/80 mb-1">
                              Date / Tag
                            </label>
                            <input
                              type="text"
                              value={photo.date || ''}
                              onChange={(e) =>
                                handleUpdatePhotoField(photo.id, 'date', e.target.value)
                              }
                              className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-2.5 py-1 text-white text-[11px] focus:outline-none focus:border-pink-400"
                              placeholder="e.g. A Day I'll Never Forget"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-semibold text-pink-300/80 mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              value={photo.location || ''}
                              onChange={(e) =>
                                handleUpdatePhotoField(photo.id, 'location', e.target.value)
                              }
                              className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-2.5 py-1 text-white text-[11px] focus:outline-none focus:border-pink-400"
                              placeholder="e.g. In My Heart"
                            />
                          </div>
                        </div>

                        {/* Direct URL alternative input */}
                        <div className="pt-1">
                          <label className="block text-[10px] uppercase font-semibold text-zinc-400 mb-0.5">
                            Image Web URL (Optional)
                          </label>
                          <input
                            type="text"
                            value={photo.url.startsWith('data:') ? '[Local image uploaded from device]' : photo.url}
                            onChange={(e) => {
                              if (!e.target.value.startsWith('[Local')) {
                                handleUpdatePhotoField(photo.id, 'url', e.target.value);
                              }
                            }}
                            className="w-full bg-black/50 border border-zinc-700 rounded-lg px-2 py-1 text-[11px] text-zinc-300 focus:outline-none focus:border-pink-400 font-mono truncate"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 2: APOLOGY & LOVE LETTER                                  */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'apology' && (
              <div className="space-y-5">
                <div className="pb-4 border-b border-pink-500/20">
                  <h2 className="text-xl font-bold font-romantic text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-rose-400" />
                    <span>Apology & Sincere Love Letter</span>
                  </h2>
                  <p className="text-xs text-pink-200/70 mt-0.5">
                    Express your genuine feelings in Level 4. No excuses, purely heartfelt.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Letter Salutation
                    </label>
                    <input
                      type="text"
                      value={localConfig.apologyLetter.salutation}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          apologyLetter: {
                            ...prev.apologyLetter,
                            salutation: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white font-romantic text-sm focus:outline-none focus:border-pink-400"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Opening Thought
                    </label>
                    <input
                      type="text"
                      value={localConfig.apologyLetter.opening}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          apologyLetter: {
                            ...prev.apologyLetter,
                            opening: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                    />
                  </div>

                  {/* Body Paragraphs */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="uppercase font-semibold text-pink-300">
                        Apology & Love Paragraphs ({localConfig.apologyLetter.apologyBody.length})
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setLocalConfig((prev) => ({
                            ...prev,
                            apologyLetter: {
                              ...prev.apologyLetter,
                              apologyBody: [
                                ...prev.apologyLetter.apologyBody,
                                'Mama, my love for you is endless...',
                              ],
                            },
                          }))
                        }
                        className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Paragraph</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {localConfig.apologyLetter.apologyBody.map((paragraph, pIdx) => (
                        <div key={pIdx} className="relative">
                          <textarea
                            rows={3}
                            value={paragraph}
                            onChange={(e) => {
                              const newBody = [...localConfig.apologyLetter.apologyBody];
                              newBody[pIdx] = e.target.value;
                              setLocalConfig((prev) => ({
                                ...prev,
                                apologyLetter: {
                                  ...prev.apologyLetter,
                                  apologyBody: newBody,
                                },
                              }));
                            }}
                            className="w-full bg-[#110419] border border-pink-500/30 rounded-xl p-3 pr-10 text-white focus:outline-none focus:border-pink-400 leading-relaxed text-xs"
                          />
                          {localConfig.apologyLetter.apologyBody.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newBody = localConfig.apologyLetter.apologyBody.filter(
                                  (_, idx) => idx !== pIdx
                                );
                                setLocalConfig((prev) => ({
                                  ...prev,
                                  apologyLetter: {
                                    ...prev.apologyLetter,
                                    apologyBody: newBody,
                                  },
                                }));
                              }}
                              className="absolute top-2 right-2 p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete paragraph"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Commitment & Promise
                    </label>
                    <textarea
                      rows={2}
                      value={localConfig.apologyLetter.commitment}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          apologyLetter: {
                            ...prev.apologyLetter,
                            commitment: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-pink-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Transition into 18th Birthday Celebration
                    </label>
                    <textarea
                      rows={2}
                      value={localConfig.apologyLetter.transitionToBirthday}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          apologyLetter: {
                            ...prev.apologyLetter,
                            transitionToBirthday: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-pink-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Closing Signature
                    </label>
                    <input
                      type="text"
                      value={localConfig.apologyLetter.closing}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          apologyLetter: {
                            ...prev.apologyLetter,
                            closing: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white font-romantic text-sm focus:outline-none focus:border-pink-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 3: LOVE REASONS & SECRET CARDS (Level 5)                  */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'reasons' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
                  <div>
                    <h2 className="text-xl font-bold font-romantic text-white flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-400" />
                      <span>Why You're Special to Me (Cards)</span>
                    </h2>
                    <p className="text-xs text-pink-200/70 mt-0.5">
                      The cards she flips in Level 5. Edit your reasons or add new ones.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newReason: LoveReason = {
                        id: Date.now(),
                        category: 'Why I Love You',
                        title: 'A New Reason',
                        content: 'Mama, you are the most incredible person in my life ❤️',
                        iconName: 'Heart',
                      };
                      setLocalConfig((prev) => ({
                        ...prev,
                        reasons: [...prev.reasons, newReason],
                      }));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Reason</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {localConfig.reasons.map((reason, idx) => (
                    <div
                      key={reason.id}
                      className="p-4 rounded-2xl bg-black/40 border border-pink-500/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-300">
                          Card #{idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <select
                            value={reason.category}
                            onChange={(e) => {
                              const updated = localConfig.reasons.map((r) =>
                                r.id === reason.id
                                  ? {
                                      ...r,
                                      category: e.target
                                        .value as LoveReason['category'],
                                    }
                                  : r
                              );
                              setLocalConfig((prev) => ({ ...prev, reasons: updated }));
                            }}
                            className="bg-[#110419] border border-pink-500/30 rounded-lg px-2 py-1 text-xs text-pink-200 focus:outline-none"
                          >
                            <option value="Why I Love You">Why I Love You</option>
                            <option value="What I Appreciate">What I Appreciate</option>
                            <option value="Our Memories">Our Memories</option>
                            <option value="Little Things">Little Things</option>
                            <option value="Birthday Wish">Birthday Wish</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              if (localConfig.reasons.length <= 1) return;
                              const updated = localConfig.reasons.filter(
                                (r) => r.id !== reason.id
                              );
                              setLocalConfig((prev) => ({ ...prev, reasons: updated }));
                            }}
                            className="p-1 rounded-lg text-zinc-400 hover:text-rose-400 cursor-pointer"
                            title="Delete card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[10px] uppercase font-semibold text-zinc-400 mb-1">
                            Card Title
                          </label>
                          <input
                            type="text"
                            value={reason.title}
                            onChange={(e) => {
                              const updated = localConfig.reasons.map((r) =>
                                r.id === reason.id ? { ...r, title: e.target.value } : r
                              );
                              setLocalConfig((prev) => ({ ...prev, reasons: updated }));
                            }}
                            className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-pink-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-semibold text-zinc-400 mb-1">
                            Love Note Content
                          </label>
                          <textarea
                            rows={2}
                            value={reason.content}
                            onChange={(e) => {
                              const updated = localConfig.reasons.map((r) =>
                                r.id === reason.id ? { ...r, content: e.target.value } : r
                              );
                              setLocalConfig((prev) => ({ ...prev, reasons: updated }));
                            }}
                            className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-pink-400 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 4: BIRTHDAY & CAKE MESSAGES                               */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'birthday' && (
              <div className="space-y-5">
                <div className="pb-4 border-b border-pink-500/20">
                  <h2 className="text-xl font-bold font-romantic text-white flex items-center gap-2">
                    <Cake className="w-5 h-5 text-amber-400" />
                    <span>Birthday & Milestone Details</span>
                  </h2>
                  <p className="text-xs text-pink-200/70 mt-0.5">
                    Names, age, and cake inscriptions shown throughout the quest.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Her Full / First Name
                    </label>
                    <input
                      type="text"
                      value={localConfig.recipientName}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          recipientName: e.target.value,
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                      placeholder="Mahi"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Her Nickname
                    </label>
                    <input
                      type="text"
                      value={localConfig.nickname}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          nickname: e.target.value,
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                      placeholder="Mama"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={localConfig.senderName}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          senderName: e.target.value,
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                      placeholder="Dawit"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Birthday Age
                    </label>
                    <input
                      type="number"
                      value={localConfig.age}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          age: parseInt(e.target.value) || 18,
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                      min={1}
                      max={120}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Cake Inscription (Frosting text)
                    </label>
                    <input
                      type="text"
                      value={localConfig.cakeMessage || `${localConfig.recipientName} ❤️`}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          cakeMessage: e.target.value,
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white font-romantic text-sm focus:outline-none focus:border-pink-400"
                      placeholder="Mahi ❤️"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 5: UNTIL WE MEET COUNTDOWN                                */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'countdown' && (
              <div className="space-y-5">
                <div className="pb-4 border-b border-pink-500/20">
                  <h2 className="text-xl font-bold font-romantic text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <span>Long-Distance & “Until We Meet” Countdown</span>
                  </h2>
                  <p className="text-xs text-pink-200/70 mt-0.5">
                    Configure your planned reunion date, cities, and distance messages in Level 6.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Target Meeting Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={localConfig.meetingDate.slice(0, 16)}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          meetingDate: new Date(e.target.value).toISOString(),
                        }))
                      }
                      className="w-full max-w-sm bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400 font-mono"
                    />
                    <p className="text-[11px] text-pink-300/60 mt-1">
                      The countdown in Level 6 will tick down live to this date.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase font-semibold text-pink-300 mb-1">
                        Your City Label
                      </label>
                      <input
                        type="text"
                        value={localConfig.yourLocation.city}
                        onChange={(e) =>
                          setLocalConfig((prev) => ({
                            ...prev,
                            yourLocation: {
                              ...prev.yourLocation,
                              city: e.target.value,
                            },
                          }))
                        }
                        className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                        placeholder="e.g. My City / Dawit's Home"
                      />
                    </div>

                    <div>
                      <label className="block uppercase font-semibold text-pink-300 mb-1">
                        Mama's City Label
                      </label>
                      <input
                        type="text"
                        value={localConfig.herLocation.city}
                        onChange={(e) =>
                          setLocalConfig((prev) => ({
                            ...prev,
                            herLocation: {
                              ...prev.herLocation,
                              city: e.target.value,
                            },
                          }))
                        }
                        className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                        placeholder="e.g. Mama's City"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Distance Banner Quote
                    </label>
                    <input
                      type="text"
                      value={localConfig.distanceText}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          distanceText: e.target.value,
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 6: MUSIC & AUDIO                                          */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'music' && (
              <div className="space-y-5">
                <div className="pb-4 border-b border-pink-500/20">
                  <h2 className="text-xl font-bold font-romantic text-white flex items-center gap-2">
                    <Music className="w-5 h-5 text-rose-400" />
                    <span>Music & Sound Settings</span>
                  </h2>
                  <p className="text-xs text-pink-200/70 mt-0.5">
                    The floating music player uses a built-in soothing synthesizer or your own romantic audio link.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Custom Music Stream / Audio URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={localConfig.customMusicUrl || ''}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          customMusicUrl: e.target.value,
                        }))
                      }
                      placeholder="e.g. https://example.com/our-song.mp3 (leave empty for built-in romantic lofi piano)"
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400 font-mono text-xs"
                    />
                    <p className="text-[11px] text-pink-300/60 mt-1">
                      If left empty, the website uses the built-in gentle melodic synthesizer (which never breaks or fails to load).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-pink-500/20 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Audio Effects Test</h4>
                      <p className="text-[11px] text-pink-300/70">
                        Test the chime sound effects used during the birthday game
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => romanticAudio.playSparkle()}
                      className="px-3 py-1.5 rounded-xl bg-pink-600/40 hover:bg-pink-600/70 text-pink-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Test Chime</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 7: VISUAL FX & ANIMATION CONTROLS                         */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'animations' && (
              <div className="space-y-5">
                <div className="pb-4 border-b border-pink-500/20">
                  <h2 className="text-xl font-bold font-romantic text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Animations & Visual Effects</span>
                  </h2>
                  <p className="text-xs text-pink-200/70 mt-0.5">
                    Control the atmospheric effects and celebratory fireworks.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      key: 'fireworksEnabled',
                      label: 'Celebratory Fireworks & Confetti',
                      desc: 'Trigger confetti bursts when she blows candles and opens the surprise',
                    },
                    {
                      key: 'floatingHearts',
                      label: 'Floating Hearts Canvas',
                      desc: 'Gently drifting heart motes floating upward in the background',
                    },
                    {
                      key: 'twinklingStars',
                      label: 'Twinkling Night Sky',
                      desc: 'Deep cosmic canvas with soft glittering stars',
                    },
                    {
                      key: 'soundEffectsEnabled',
                      label: 'Romantic Sound Effects',
                      desc: 'Subtle audio feedback on candle blow, card flips, and button taps',
                    },
                  ].map((item) => {
                    const settings = localConfig.animationSettings || {
                      fireworksEnabled: true,
                      floatingHearts: true,
                      twinklingStars: true,
                      soundEffectsEnabled: true,
                    };
                    const isEnabled = settings[item.key as keyof typeof settings];

                    return (
                      <div
                        key={item.key}
                        className="p-3.5 rounded-2xl bg-black/40 border border-pink-500/20 flex items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="text-xs font-semibold text-white">
                            {item.label}
                          </h4>
                          <p className="text-[11px] text-pink-300/70">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newSettings = {
                              ...settings,
                              [item.key]: !isEnabled,
                            };
                            setLocalConfig((prev) => ({
                              ...prev,
                              animationSettings: newSettings,
                            }));
                          }}
                          className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                            isEnabled ? 'bg-amber-500' : 'bg-zinc-700'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-0.5 ${
                              isEnabled ? 'left-6' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 8: FINAL LETTER & SURPRISE (Level 7)                      */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'final' && (
              <div className="space-y-5">
                <div className="pb-4 border-b border-pink-500/20">
                  <h2 className="text-xl font-bold font-romantic text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-400" />
                    <span>Grand Finale Message & Surprise</span>
                  </h2>
                  <p className="text-xs text-pink-200/70 mt-0.5">
                    The grand final screen and eternal promise letter presented in Level 7.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Finale Heading Title
                    </label>
                    <input
                      type="text"
                      value={localConfig.finalLetter.title}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          finalLetter: {
                            ...prev.finalLetter,
                            title: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white font-romantic text-sm focus:outline-none focus:border-pink-400"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={localConfig.finalLetter.subtitle}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          finalLetter: {
                            ...prev.finalLetter,
                            subtitle: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-400"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="uppercase font-semibold text-pink-300">
                        Finale Body Paragraphs
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setLocalConfig((prev) => ({
                            ...prev,
                            finalLetter: {
                              ...prev.finalLetter,
                              body: [
                                ...prev.finalLetter.body,
                                'Mama, happy 18th birthday my love ❤️',
                              ],
                            },
                          }))
                        }
                        className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Paragraph</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {localConfig.finalLetter.body.map((p, idx) => (
                        <div key={idx} className="relative">
                          <textarea
                            rows={3}
                            value={p}
                            onChange={(e) => {
                              const newBody = [...localConfig.finalLetter.body];
                              newBody[idx] = e.target.value;
                              setLocalConfig((prev) => ({
                                ...prev,
                                finalLetter: {
                                  ...prev.finalLetter,
                                  body: newBody,
                                },
                              }));
                            }}
                            className="w-full bg-[#110419] border border-pink-500/30 rounded-xl p-3 pr-10 text-white focus:outline-none focus:border-pink-400 leading-relaxed text-xs"
                          />
                          {localConfig.finalLetter.body.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newBody = localConfig.finalLetter.body.filter(
                                  (_, i) => i !== idx
                                );
                                setLocalConfig((prev) => ({
                                  ...prev,
                                  finalLetter: {
                                    ...prev.finalLetter,
                                    body: newBody,
                                  },
                                }));
                              }}
                              className="absolute top-2 right-2 p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-pink-300 mb-1">
                      Final Signature
                    </label>
                    <input
                      type="text"
                      value={localConfig.finalLetter.signature}
                      onChange={(e) =>
                        setLocalConfig((prev) => ({
                          ...prev,
                          finalLetter: {
                            ...prev.finalLetter,
                            signature: e.target.value,
                          },
                        }))
                      }
                      className="w-full bg-[#110419] border border-pink-500/30 rounded-xl px-3 py-2 text-white font-romantic text-sm focus:outline-none focus:border-pink-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 9: BACKUP & SYSTEM SETTINGS                               */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'backup' && (
              <div className="space-y-5">
                <div className="pb-4 border-b border-pink-500/20">
                  <h2 className="text-xl font-bold font-romantic text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-amber-400" />
                    <span>Backup & System Settings</span>
                  </h2>
                  <p className="text-xs text-pink-200/70 mt-0.5">
                    Export your custom configuration, copy code, or reset back to original state.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-pink-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-white">
                        Copy Full Configuration
                      </h4>
                      <p className="text-[11px] text-pink-300/70">
                        Copy all text, photos, and settings as JSON to paste or back up
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyConfig}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-pink-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Config JSON</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-rose-300">
                        Reset to Original Defaults
                      </h4>
                      <p className="text-[11px] text-rose-200/60">
                        Restores initial photos, letters, and settings from config.ts
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetToDefaults}
                      className="px-4 py-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/70 border border-rose-500/40 text-rose-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset All</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Floating Bottom Save Notification */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-xs shadow-2xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-white" />
            <span>Changes saved! Ready for Mama ❤️</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
