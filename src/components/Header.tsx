import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  Sparkles, 
  Clock, 
  Coins, 
  Crown, 
  Tv, 
  MessageSquare, 
  FileSpreadsheet,
  Plus, 
  Search,
  Volume2,
  VolumeX,
  Swords,
  ScrollText,
  ShieldAlert
} from 'lucide-react';
import { playPopSound, playCoinSound, setSoundEnabled, isSoundEnabled } from '../utils/soundEffects';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: 'marketplace' | 'leaderboard' | 'roadshow' | 'interaction' | 'canvas';
  onTabChange: (tab: 'marketplace' | 'leaderboard' | 'roadshow' | 'interaction' | 'canvas') => void;
  isSubscribed: boolean;
  onToggleSubscription: () => void;
  onOpenAIAssistant: () => void;
  onOpenPostChore: () => void;
  activeJobsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  isSubscribed,
  onToggleSubscription,
  onOpenAIAssistant,
  onOpenPostChore,
  activeJobsCount
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [goldCoins, setGoldCoins] = useState(1450);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playCoinSound();
  };

  const handleTabClick = (tab: any) => {
    playPopSound();
    onTabChange(tab);
  };

  const handleRoleSwitch = (role: UserRole) => {
    playCoinSound();
    onRoleChange(role);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fffbeb] border-b-4 border-slate-900 shadow-[0_4px_0_#0f172a]">
      {/* Arcade / Game Event Announcement Ticker */}
      <div className="bg-[#fbbf24] text-slate-950 text-xs px-4 py-1.5 flex items-center justify-between font-bold border-b-2 border-slate-900 select-none">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-[1px_1px_0_#fff]">
            ⭐ SPECIAL EVENT
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <span>Free Trial Event Active:</span>
            <span className="bg-emerald-400 text-slate-950 px-2 py-0.2 rounded-md border border-slate-900 font-black">
              0% LOOT TAX / COMMISSION!
            </span>
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-slate-900 text-xs">
          <span className="flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-full border border-slate-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            24hr NPC Live Agent Standing By
          </span>
          <button 
            onClick={() => handleTabClick('canvas')}
            className="hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Whiteboard Blueprint
          </button>
        </div>
      </div>

      {/* Main Game Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Cartoon Game Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleTabClick('marketplace')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#38bdf8] border-3 border-slate-900 flex items-center justify-center text-slate-950 shadow-[3px_3px_0_#0f172a] group-hover:scale-105 group-active:translate-y-1 transition-all">
                <Sparkles className="w-7 h-7 text-amber-300 fill-amber-300 stroke-slate-900 stroke-2 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-slate-900 font-game drop-shadow-xs">
                    Rent<span className="text-[#f43f5e]">-</span>Somebody
                  </span>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-lg bg-[#f472b6] text-white border-2 border-slate-900 shadow-[1.5px_1.5px_0_#0f172a] uppercase">
                    RPG v2.0
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-bold -mt-0.5">
                  Make your to-do lists disappear quicker!
                </p>
              </div>
            </button>
          </div>

          {/* Game Quests & Modes Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-[#fef08a] p-1.5 rounded-2xl border-3 border-slate-900 shadow-[3px_3px_0_#0f172a]">
            <button
              onClick={() => handleTabClick('marketplace')}
              className={`px-3.5 py-2 text-xs font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'marketplace'
                  ? 'bg-[#38bdf8] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]'
                  : 'text-slate-800 hover:bg-amber-200/60'
              }`}
            >
              <ScrollText className="w-4 h-4 text-slate-950" />
              <span>Quest Board</span>
            </button>

            <button
              onClick={() => handleTabClick('leaderboard')}
              className={`px-3.5 py-2 text-xs font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer relative ${
                activeTab === 'leaderboard'
                  ? 'bg-[#fbbf24] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]'
                  : 'text-slate-800 hover:bg-amber-200/60'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Hall of Heroes</span>
              <span className="text-[9px] bg-[#f43f5e] text-white font-black px-1.5 py-0.2 rounded-md border border-slate-900 uppercase">
                VIP
              </span>
            </button>

            <button
              onClick={() => handleTabClick('roadshow')}
              className={`px-3.5 py-2 text-xs font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'roadshow'
                  ? 'bg-[#c084fc] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]'
                  : 'text-slate-800 hover:bg-amber-200/60'
              }`}
            >
              <Tv className="w-4 h-4 text-purple-700" />
              <span>Live Enactment</span>
            </button>

            <button
              onClick={() => handleTabClick('interaction')}
              className={`px-3.5 py-2 text-xs font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer relative ${
                activeTab === 'interaction'
                  ? 'bg-[#34d399] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]'
                  : 'text-slate-800 hover:bg-amber-200/60'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-800" />
              <span>Battle Room & Chat</span>
              {activeJobsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border border-slate-900">
                  {activeJobsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabClick('canvas')}
              className={`px-3.5 py-2 text-xs font-black rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'canvas'
                  ? 'bg-[#f472b6] text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]'
                  : 'text-slate-800 hover:bg-amber-200/60'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-pink-700" />
              <span>Blueprint</span>
            </button>
          </nav>

          {/* Right Game Controls: Role Class Switcher + Sound + Gold Vault */}
          <div className="flex items-center gap-2.5">
            {/* Player Gold Pouch Counter */}
            <div 
              onClick={() => {
                setGoldCoins(g => g + 50);
                playCoinSound();
              }}
              title="Click to claim daily bonus gold!"
              className="hidden lg:flex items-center gap-1.5 bg-[#fef08a] px-3 py-1.5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] cursor-pointer hover:scale-105 active:scale-95 transition-all select-none"
            >
              <span className="text-base animate-coin">🪙</span>
              <span className="text-xs font-black text-slate-900">{goldCoins} Gold</span>
            </div>

            {/* Sound FX Toggle Button */}
            <button
              onClick={toggleSound}
              title={soundOn ? 'Sound Effects Enabled' : 'Muted'}
              className="p-2 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:bg-amber-50 active:translate-y-0.5 cursor-pointer text-slate-800"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Dual Role Class Toggle (Directly from canvas segments) */}
            <div className="flex items-center p-1 bg-[#fed7aa] rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
              <button
                onClick={() => handleRoleSwitch('buyer')}
                className={`px-2.5 py-1 text-xs font-black rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
                  currentRole === 'buyer'
                    ? 'bg-[#38bdf8] text-slate-950 border-2 border-slate-900 shadow-[1.5px_1.5px_0_#0f172a]'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
                title="People who want to spend money & save time"
              >
                <span>👑</span>
                <span className="hidden xl:inline">Spend $ (Giver)</span>
                <span className="xl:hidden">Hire</span>
              </button>

              <button
                onClick={() => handleRoleSwitch('seller')}
                className={`px-2.5 py-1 text-xs font-black rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
                  currentRole === 'seller'
                    ? 'bg-[#34d399] text-slate-950 border-2 border-slate-900 shadow-[1.5px_1.5px_0_#0f172a]'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
                title="People who got time & want to earn money"
              >
                <span>⚔️</span>
                <span className="hidden xl:inline">Got Time (Hero)</span>
                <span className="xl:hidden">Earn</span>
              </button>
            </div>

            {/* AI Guide Companion NPC Button */}
            <button
              onClick={() => {
                playPopSound();
                onOpenAIAssistant();
              }}
              className="px-3 py-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-slate-950 rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Shopify-style AI NPC Coach & 24hr Live Agent"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-900 animate-spin-slow" />
              <span className="hidden sm:inline">AI NPC Coach</span>
              <span className="sm:hidden">NPC</span>
            </button>

            {/* Primary Action Button */}
            {currentRole === 'buyer' ? (
              <button
                onClick={() => {
                  playPopSound();
                  onOpenPostChore();
                }}
                className="bg-[#f43f5e] hover:bg-[#e11d48] text-white px-3.5 py-2 rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2.5px_2.5px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Post Bounty</span>
              </button>
            ) : (
              <button
                onClick={() => handleTabClick('marketplace')}
                className="bg-[#10b981] hover:bg-[#059669] text-white px-3.5 py-2 rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2.5px_2.5px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Search className="w-4 h-4 stroke-[3]" />
                <span>Find Quests</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
