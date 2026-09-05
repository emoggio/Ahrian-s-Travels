import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, Sparkles, Calendar, Star, BookOpen, 
  MapPin, Globe, Compass, Landmark, MessageSquare, 
  Camera, Plus, Trash2, Heart, Undo2
} from 'lucide-react';
import { VisitedEntity, TravelMemory } from '../../types';
import { WORLD_COUNTRIES, getCountryData } from '../../data/worldCountriesData';
import { WORLD_CITIES } from '../../data/worldCitiesData';
import { US_STATES } from '../../data/worldStatesData';

interface LocationDrawerProps {
  entity: VisitedEntity | null;
  onClose: () => void;
  onToggleScratch: (id: string, type: 'country' | 'state' | 'city', name: string, countryCode: string, countryName: string) => void;
  onUpdateMemory: (id: string, memory: Partial<TravelMemory>) => void;
  isVisited: boolean;
}

export const LocationDrawer: React.FC<LocationDrawerProps> = ({
  entity,
  onClose,
  onToggleScratch,
  onUpdateMemory,
  isVisited
}) => {
  if (!entity) return null;

  const [date, setDate] = useState<string>(entity.memory?.dateVisited || '');
  const [rating, setRating] = useState<number>(entity.memory?.rating || 5);
  const [notes, setNotes] = useState<string>(entity.memory?.notes || '');
  const [favoriteSpot, setFavoriteSpot] = useState<string>(entity.memory?.favoriteSpot || '');
  const [companions, setCompanions] = useState<string>(entity.memory?.travelCompanions || '');
  const [photos, setPhotos] = useState<string[]>(entity.memory?.photos || []);
  const [isPhotoInputOpen, setIsPhotoInputOpen] = useState<boolean>(false);
  const [photoUrlInput, setPhotoUrlInput] = useState<string>('');

  useEffect(() => {
    if (entity) {
      setDate(entity.memory?.dateVisited || new Date().toISOString().split('T')[0]);
      setRating(entity.memory?.rating || 5);
      setNotes(entity.memory?.notes || '');
      setFavoriteSpot(entity.memory?.favoriteSpot || '');
      setCompanions(entity.memory?.travelCompanions || '');
      setPhotos(entity.memory?.photos || []);
    }
  }, [entity]);

  // Sync memory changes
  const handleSaveMemory = (updates: Partial<TravelMemory>) => {
    if (!entity) return;
    onUpdateMemory(entity.id, updates);
  };

  // Get metadata depending on type
  const countryInfo = entity.type === 'country' 
    ? getCountryData(entity.id, entity.name)
    : getCountryData(entity.countryCode, entity.countryName);

  const cityInfo = entity.type === 'city' 
    ? WORLD_CITIES.find(c => c.id === entity.id)
    : null;

  const stateInfo = entity.type === 'state' 
    ? US_STATES[entity.id.replace('state-', '')]
    : null;

  const flagEmoji = cityInfo?.flagEmoji || countryInfo?.flagEmoji || '📍';
  const isoCode = (entity.type === 'state' ? 'us' : (countryInfo?.isoA2 || entity.countryCode.slice(0, 2) || 'un')).toLowerCase();

  const handleAddPhotoUrl = () => {
    if (photoUrlInput.trim()) {
      const updated = [...photos, photoUrlInput.trim()];
      setPhotos(updated);
      handleSaveMemory({ photos: updated });
      setPhotoUrlInput('');
      setIsPhotoInputOpen(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      if (base64) {
        const updated = [...photos, base64];
        setPhotos(updated);
        handleSaveMemory({ photos: updated });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    handleSaveMemory({ photos: updated });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 md:bottom-auto md:top-14 md:right-4 md:left-auto md:w-96 z-40 bg-slate-900/95 backdrop-blur-2xl border-t md:border border-slate-800 rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] md:max-h-[calc(100vh-5rem)] flex flex-col animate-slideUp md:animate-fadeIn">
      {/* Drawer Header */}
      <div className="relative p-4 pb-3 bg-gradient-to-b from-slate-800/80 to-slate-900/80 border-b border-slate-800 flex-shrink-0">
        {/* Mobile handle bar */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-3 md:hidden" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* High-res Official Country Flag Badge */}
            <div className="relative flex-shrink-0 w-11 h-8 rounded-lg overflow-hidden border border-amber-500/40 shadow-md bg-slate-950 flex items-center justify-center">
              <img 
                src={`https://flagcdn.com/w160/${isoCode}.png`}
                alt={`${entity.name} flag`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-xl absolute pointer-events-none">{flagEmoji}</span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold text-slate-100 truncate">
                  {entity.name}
                </h2>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full font-mono ${
                  entity.type === 'country'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : entity.type === 'city'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  {entity.type}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                {entity.type === 'city' 
                  ? `${cityInfo?.countryName || entity.countryName}${cityInfo?.stateName ? `, ${cityInfo.stateName}` : ''}`
                  : entity.type === 'state'
                  ? `${entity.countryName} (State)`
                  : `${countryInfo.continent} • Capital: ${countryInfo.capital}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scratch / Undo Scratch Action Button */}
        <div className="mt-3">
          <button
            onClick={() => onToggleScratch(entity.id, entity.type, entity.name, entity.countryCode, entity.countryName)}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              isVisited
                ? 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 hover:border-rose-400'
                : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:brightness-110 shadow-foil'
            }`}
          >
            {isVisited ? (
              <>
                <Undo2 className="w-4 h-4 text-rose-400" />
                <span>Undo & Delete Scratched {entity.type === 'city' ? 'City Pin' : entity.type === 'state' ? 'State' : 'Country'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Scratch & Reveal {entity.name}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs text-slate-300">
        {/* Quick Facts & Greeting */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Local Greeting & Details</span>
          </div>

          {countryInfo.greeting && (
            <div className="flex items-baseline gap-2 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800/80">
              <span className="text-slate-400">Greeting:</span>
              <span className="text-amber-200 font-semibold italic text-sm">{countryInfo.greeting}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-slate-300">
            {countryInfo.currency && (
              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                <span className="text-[10px] text-slate-400 block">Currency</span>
                <span className="font-semibold text-slate-200">{countryInfo.currency}</span>
              </div>
            )}
            {countryInfo.capital && (
              <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                <span className="text-[10px] text-slate-400 block">Capital</span>
                <span className="font-semibold text-slate-200">{countryInfo.capital}</span>
              </div>
            )}
            {cityInfo?.landmark && (
              <div className="col-span-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Must-See Landmark</span>
                  <span className="font-semibold text-slate-200">{cityInfo.landmark}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fun Trivia & Facts */}
        {(cityInfo?.trivia || countryInfo?.trivia || stateInfo?.trivia) && (
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Interesting Trivia & Lore</span>
            </div>
            
            {cityInfo?.trivia && (
              <p className="text-slate-300 leading-relaxed italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                "{cityInfo.trivia}"
              </p>
            )}

            {countryInfo?.trivia && (
              <ul className="space-y-1.5 pl-1">
                {countryInfo.trivia.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Personal Travel Journal & Memory Log */}
        <div className="p-3.5 bg-gradient-to-b from-amber-500/5 to-slate-950/80 border border-amber-500/20 rounded-2xl space-y-3 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Personal Travel Journal</span>
            </div>
            <span className="text-[10px] text-amber-400/80 font-mono">Auto-saved</span>
          </div>

          {/* Date Visited */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Date Visited</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                handleSaveMemory({ dateVisited: e.target.value });
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Travel Rating</span>
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    handleSaveMemory({ rating: star });
                  }}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star 
                    className={`w-5 h-5 ${
                      star <= rating 
                        ? 'text-amber-400 fill-amber-400' 
                        : 'text-slate-600'
                    }`} 
                  />
                </button>
              ))}
              <span className="text-xs text-amber-300 font-bold ml-2">{rating} / 5</span>
            </div>
          </div>

          {/* Travel Companions */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Travel Companion(s)
            </label>
            <input
              type="text"
              value={companions}
              onChange={(e) => {
                setCompanions(e.target.value);
                handleSaveMemory({ travelCompanions: e.target.value });
              }}
              placeholder="e.g. Best friends, Solo backpacking, Family"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Favorite Spot / Food */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Favorite Spot, Cafe or Dish
            </label>
            <input
              type="text"
              value={favoriteSpot}
              onChange={(e) => {
                setFavoriteSpot(e.target.value);
                handleSaveMemory({ favoriteSpot: e.target.value });
              }}
              placeholder="e.g. Sunset at the harbor, best pistachio croissant"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Travel Notes & Memories */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Memories & Notes</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                handleSaveMemory({ notes: e.target.value });
              }}
              placeholder="Write about your journey, stories, highlights, what you felt..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
            />
          </div>

          {/* Photo Gallery & Upload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>Travel Photos</span>
              </label>
              
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 cursor-pointer flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setIsPhotoInputOpen(prev => !prev)}
                  className="text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                >
                  Link URL
                </button>
              </div>
            </div>

            {isPhotoInputOpen && (
              <div className="flex items-center gap-1.5 mb-2">
                <input
                  type="url"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={handleAddPhotoUrl}
                  className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-400"
                >
                  Add
                </button>
              </div>
            )}

            {photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {photos.map((src, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-700">
                    <img src={src} alt="Travel memory" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemovePhoto(i)}
                      className="absolute top-1 right-1 p-1 bg-slate-950/80 text-rose-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 italic text-center py-2 bg-slate-900/40 rounded-xl border border-slate-800/40">
                No photos attached yet. Upload or link photos to remember your trip!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
