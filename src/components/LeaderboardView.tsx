import React, { useState } from 'react';
import { ProviderItem } from '../types';
import { 
  Crown, 
  Lock, 
  Unlock, 
  Star, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  Search, 
  Calendar,
  Sparkles,
  Swords,
  Medal,
  Backpack
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCoinSound, playPopSound, playLevelUpSound } from '../utils/soundEffects';

interface LeaderboardViewProps {
  providers: ProviderItem[];
  isSubscribed: boolean;
  onToggleSubscription: () => void;
  onDirectHire: (provider: ProviderItem) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  providers,
  isSubscribed,
  onToggleSubscription,
  onDirectHire
}) => {
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [searchProvider, setSearchProvider] = useState<string>('');

  const handleUnlock = () => {
    playLevelUpSound();
    onToggleSubscription();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f472b6', '#38bdf8', '#34d399', '#c084fc']
    });
  };

  const handleHireClick = (prov: ProviderItem) => {
    playCoinSound();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      onDirectHire(prov);
    }, 300);
  };

  const filteredProviders = providers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchProvider.toLowerCase()) ||
      p.roleTitle.toLowerCase().includes(searchProvider.toLowerCase()) ||
      p.specialties.some(s => s.toLowerCase().includes(searchProvider.toLowerCase()));
    
    const matchesSpec = filterSpecialty === 'all' || p.specialties.some(s => s.toLowerCase().includes(filterSpecialty.toLowerCase()));
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Cartoon Hall of Heroes Banner */}
      <div className="bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#fb923c] text-slate-950 rounded-3xl p-8 relative overflow-hidden border-4 border-slate-900 shadow-[6px_6px_0_#0f172a]">
        <div className="absolute top-3 right-6 text-5xl animate-bounce select-none pointer-events-none">🏆</div>
        <div className="absolute bottom-2 right-24 text-4xl animate-coin select-none pointer-events-none">👑</div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-black uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0_#fff]">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                CANVAS PAYWALLED FEATURE
              </span>
              <span className="text-xs bg-white/70 text-slate-900 border border-slate-900 px-2.5 py-0.5 rounded-full font-black">
                Hall of Heroes • Top 1% Taskers
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-950 font-game drop-shadow-xs">
              Vetted Hero Leaderboard Ranking
            </h1>
            <p className="text-xs sm:text-sm text-slate-900 font-bold leading-relaxed">
              &quot;Paywalled: Leaderboard ranking of selecting the best service provider (only provide to users who pay the subscription fee)&quot;. Summon top-tier plant druids and speed assemblers with 99.8% on-time records!
            </p>
          </div>

          {/* Subscription State Switcher */}
          <div className="bg-white p-4 rounded-2xl border-3 border-slate-900 shadow-[4px_4px_0_#0f172a] flex flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                Hero Pass Status
              </span>
              <span className="text-sm font-black flex items-center justify-center gap-1.5 mt-0.5 text-slate-950">
                {isSubscribed ? (
                  <>
                    <Unlock className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">VIP Guild Pass Active</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-rose-600" />
                    <span className="text-rose-700">Locked (Free Plan)</span>
                  </>
                )}
              </span>
            </div>

            <button
              onClick={handleUnlock}
              className={`w-full px-5 py-2.5 rounded-xl font-black text-xs transition-all border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer ${
                isSubscribed
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  : 'bg-[#38bdf8] hover:bg-[#0284c7] text-white'
              }`}
            >
              {isSubscribed ? (
                <>
                  <span>Simulate Free Plan (Lock)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Unlock VIP Pass ($9.99/mo or Free Trial)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Paywall Callout Notice if not subscribed */}
      {!isSubscribed && (
        <div className="bg-[#fff7ed] border-4 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0_#0f172a]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#f43f5e] border-3 border-slate-900 text-white flex items-center justify-center shrink-0 shadow-[3px_3px_0_#0f172a]">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 font-game">
                  <span>Pro Hero Leaderboard Ranking is Locked!</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#fde047] text-slate-950 border border-slate-900">
                    Canvas Paywall Rule
                  </span>
                </h3>
                <p className="text-xs text-slate-700 font-medium leading-relaxed max-w-2xl">
                  Per the whiteboard canvas, 1-click direct booking of top-ranked master plant caretakers and speed assemblers is reserved for subscribed members. Unlock to hire the top 1% without competition.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-black text-slate-900">
                  <span className="flex items-center gap-1 text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Identity & gear verified
                  </span>
                  <span className="flex items-center gap-1 text-blue-800">
                    <Zap className="w-4 h-4 text-blue-600" />
                    15-min priority summon
                  </span>
                  <span className="flex items-center gap-1 text-amber-900">
                    <Crown className="w-4 h-4 text-amber-600" />
                    100% Satisfaction Shield
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleUnlock}
              className="px-6 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-black rounded-2xl text-xs border-3 border-slate-900 shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-1 transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Unlock className="w-4 h-4 stroke-[3]" />
              <span>Unlock VIP Pass ($9.99 / mo)</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {['all', 'Plant Care', 'Assembly', 'Lifting', 'Queue'].map((spec) => (
            <button
              key={spec}
              onClick={() => {
                playPopSound();
                setFilterSpecialty(spec);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border-2 border-slate-900 cursor-pointer ${
                filterSpecialty === spec
                  ? 'bg-[#38bdf8] text-slate-950 shadow-[2px_2px_0_#0f172a] -translate-y-0.5'
                  : 'bg-white text-slate-700 hover:bg-slate-100 shadow-[1px_1px_0_#0f172a]'
              }`}
            >
              {spec === 'all' ? 'All Hero Classes' : spec}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchProvider}
            onChange={(e) => setSearchProvider(e.target.value)}
            placeholder="Search hero by name or skill..."
            className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden shadow-[2px_2px_0_#0f172a]"
          />
        </div>
      </div>

      {/* Leaderboard Cards */}
      <div className="space-y-4">
        {filteredProviders.map((provider) => {
          const isRank1 = provider.rank === 1;
          const isRank2 = provider.rank === 2;
          const isRank3 = provider.rank === 3;

          return (
            <div
              key={provider.id}
              className={`bg-white rounded-3xl border-3 border-slate-900 transition-all p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[5px_5px_0_#0f172a] hover:-translate-y-1 ${
                isRank1
                  ? 'bg-gradient-to-r from-[#fffbeb] to-white ring-3 ring-amber-400'
                  : ''
              }`}
            >
              {/* Left Column: Rank Badge + Avatar + Details */}
              <div className="flex items-start gap-4 flex-1">
                {/* Rank Medal */}
                <div className="flex flex-col items-center justify-center shrink-0">
                  <div
                    className={`w-12 h-12 rounded-2xl border-3 border-slate-900 flex items-center justify-center font-black text-base shadow-[2px_2px_0_#0f172a] ${
                      isRank1
                        ? 'bg-[#fbbf24] text-slate-950 animate-wiggle'
                        : isRank2
                        ? 'bg-[#e2e8f0] text-slate-900'
                        : isRank3
                        ? 'bg-[#fdba74] text-slate-950'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    #{provider.rank}
                  </div>
                  <span className="text-[10px] font-black text-slate-500 mt-1 uppercase">
                    {isRank1 ? '👑 Champion' : `Rank #${provider.rank}`}
                  </span>
                </div>

                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-16 h-16 rounded-2xl bg-[#c7d2fe] border-3 border-slate-900 shadow-[2px_2px_0_#0f172a] object-cover"
                  />
                  {provider.verifiedIdentity && (
                    <div
                      title="Verified Identity & Background Checked"
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#38bdf8] text-slate-950 border-2 border-slate-900 flex items-center justify-center shadow-xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Bio & Skills */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-slate-900 text-base font-game">
                      {provider.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono font-bold">
                      {provider.handle}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-[#fef08a] text-slate-950 border border-slate-900">
                      Lvl {provider.playerLevel || 30} • {provider.heroClass || 'Pro Helper'}
                    </span>
                  </div>

                  <p className="text-xs font-black text-blue-700">
                    {provider.roleTitle}
                  </p>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed max-w-xl">
                    {provider.bio}
                  </p>

                  {/* Equipment inventory pills */}
                  {provider.equipment && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase mr-1">
                        🎒 Gear:
                      </span>
                      {provider.equipment.map((eq, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#fff7ed] border border-amber-300 text-amber-900"
                        >
                          {eq}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Middle Stats Column */}
              <div className="grid grid-cols-3 gap-4 border-y sm:border-y-0 sm:border-x-2 border-slate-200 py-3 sm:py-0 sm:px-6 w-full md:w-auto shrink-0">
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-1 font-black text-slate-950 text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-slate-900" />
                    <span>{provider.rating.toFixed(2)}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                    {provider.reviewsCount} reviews
                  </span>
                </div>

                <div className="text-center sm:text-left">
                  <div className="font-black text-slate-950 text-sm">
                    {provider.onTimeRate}%
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                    On-time score
                  </span>
                </div>

                <div className="text-center sm:text-left">
                  <div className="font-black text-slate-950 text-sm">
                    {provider.completedTasks}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                    Quests won
                  </span>
                </div>
              </div>

              {/* Right Action Column */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 shrink-0">
                <div className="text-left md:text-right">
                  <div className="flex items-baseline md:justify-end gap-1">
                    <span className="text-2xl font-black text-slate-950">🪙 ${provider.hourlyRate}</span>
                    <span className="text-xs font-bold text-slate-600">/hr</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-700 block">
                    0% platform surcharge
                  </span>
                </div>

                {isSubscribed ? (
                  <button
                    onClick={() => handleHireClick(provider)}
                    className="px-4 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white font-black rounded-xl text-xs border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>⚔️ Summon Hero</span>
                  </button>
                ) : (
                  <button
                    onClick={handleUnlock}
                    className="px-4 py-2.5 bg-[#fef08a] hover:bg-[#fde047] text-slate-950 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Unlock with VIP Subscription"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Unlock Hire</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
