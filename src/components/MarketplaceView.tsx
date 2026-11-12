import React, { useState } from 'react';
import { TaskItem, TaskCategory, UserRole } from '../types';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Leaf, 
  Wrench, 
  ShoppingBag, 
  Users, 
  Boxes, 
  SprayCan, 
  Laptop, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Share2,
  CheckCircle2,
  Coins,
  Flame,
  Swords,
  Scroll
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCoinSound, playPopSound } from '../utils/soundEffects';

interface MarketplaceViewProps {
  tasks: TaskItem[];
  currentRole: UserRole;
  onSelectTask: (task: TaskItem) => void;
  onOpenPostModal: () => void;
  onOpenRoadshow: () => void;
  onOpenLeaderboard: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  tasks,
  currentRole,
  onSelectTask,
  onOpenPostModal,
  onOpenRoadshow,
  onOpenLeaderboard
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'today' | 'urgent'>('all');
  const [claimedTasks, setClaimedTasks] = useState<string[]>([]);
  const [quickInput, setQuickInput] = useState('');

  const categories: { id: TaskCategory; label: string; icon: string; bg: string }[] = [
    { id: 'all', label: 'All Quests', icon: '📜', bg: 'bg-[#fef08a]' },
    { id: 'plants', label: 'Plant Caretaker', icon: '🌿', bg: 'bg-[#bbf7d0]' },
    { id: 'assembly', label: 'Furniture Assembly', icon: '🔨', bg: 'bg-[#bfdbfe]' },
    { id: 'errands', label: 'Grocery & Errands', icon: '🍎', bg: 'bg-[#fed7aa]' },
    { id: 'queuing', label: 'Queue / Line Guard', icon: '🥐', bg: 'bg-[#e9d5ff]' },
    { id: 'moving', label: 'Heavy Lifting & Move', icon: '📦', bg: 'bg-[#fbcfe8]' },
    { id: 'cleaning', label: 'Deep Cleaning', icon: '✨', bg: 'bg-[#99f6e4]' },
    { id: 'tech', label: 'Tech & Smart Setup', icon: '💻', bg: 'bg-[#c7d2fe]' },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesCat = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency = urgencyFilter === 'all' || task.urgency === urgencyFilter;
    return matchesCat && matchesSearch && matchesUrgency;
  });

  const handleClaimChore = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playCoinSound();
    setClaimedTasks((prev) => [...prev, taskId]);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#fbbf24', '#38bdf8', '#f472b6', '#34d399']
    });
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();
    onOpenPostModal();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Cartoon Video Game Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#38bdf8] via-[#818cf8] to-[#c084fc] text-slate-950 p-7 md:p-10 border-4 border-slate-900 shadow-[6px_6px_0_#0f172a]">
        {/* Floating Game Decorative Stickers */}
        <div className="absolute top-4 right-8 text-4xl animate-bounce select-none pointer-events-none">⭐</div>
        <div className="absolute bottom-6 right-16 text-4xl animate-wiggle select-none pointer-events-none">🪴</div>
        <div className="absolute top-1/2 right-1/4 text-3xl animate-coin select-none pointer-events-none">🪙</div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fef08a] border-2 border-slate-900 text-slate-950 text-xs font-black shadow-[2px_2px_0_#0f172a]">
            <span>🎮</span>
            <span>CHORES RPG GUILD • ON-DEMAND HUMAN ADVENTURERS</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight font-game text-white drop-shadow-[0_3px_0_#0f172a]">
            Make your to-do lists <span className="bg-[#fde047] text-slate-950 px-2 py-0.5 rounded-xl border-3 border-slate-900 inline-block rotate-1 shadow-[3px_3px_0_#0f172a]">disappear quicker</span>, by asking someone else to do it for you!
          </h1>

          {/* Dual Class Mechanics Cards (Directly from canvas sticky notes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-white/95 rounded-2xl p-4 border-3 border-slate-900 shadow-[4px_4px_0_#0f172a] hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-2 font-black text-blue-900 text-sm mb-1">
                <span className="text-xl">👑</span>
                <span>People who want to spend money (Quest Givers)</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Spend gold to complete daily chores (plant caretaker, furniture assembly, grocery lines) and save precious hours of your life!
              </p>
            </div>

            <div className="bg-white/95 rounded-2xl p-4 border-3 border-slate-900 shadow-[4px_4px_0_#0f172a] hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-2 font-black text-emerald-900 text-sm mb-1">
                <span className="text-xl">⚔️</span>
                <span>People who got time (Task Heroes / Helpers)</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Earn gold & XP by helping neighbors with chores on your own schedule. Keep 100% of your earnings with 0% commission in Free Trial!
              </p>
            </div>
          </div>

          {/* Quick delegate action input */}
          <form onSubmit={handleQuickSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-[#fffbeb] p-2 rounded-2xl border-3 border-slate-900 shadow-[4px_4px_0_#0f172a]">
              <div className="flex items-center gap-2 flex-1 w-full px-3">
                <Search className="w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="Need a chore done? (e.g. Water 15 plants this Friday, assemble dresser, wait in line...)"
                  className="w-full bg-transparent text-slate-900 font-bold placeholder-slate-500 text-sm focus:outline-hidden py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#f43f5e] hover:bg-[#e11d48] text-white font-black rounded-xl text-sm border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Delegate Quest</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </form>

          {/* Game Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-slate-900">
            <span className="bg-[#fef08a] px-3 py-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center gap-1.5">
              <span>🛡️</span>
              <span>Smart Escrow Vault</span>
            </span>
            <span className="bg-[#a7f3d0] px-3 py-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center gap-1.5">
              <span>⚡</span>
              <span>0% Platform Commission Trial</span>
            </span>
            <button 
              type="button"
              onClick={() => {
                playPopSound();
                onOpenLeaderboard();
              }}
              className="bg-[#fed7aa] hover:bg-[#fdba74] px-3 py-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center gap-1.5 cursor-pointer"
            >
              <span>👑</span>
              <span>Hall of Heroes (VIP)</span>
            </button>
            <button 
              type="button"
              onClick={() => {
                playPopSound();
                onOpenRoadshow();
              }}
              className="bg-[#e9d5ff] hover:bg-[#d8b4fe] px-3 py-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center gap-1.5 cursor-pointer"
            >
              <span>🎬</span>
              <span>Watch Live Enactment</span>
            </button>
          </div>
        </div>
      </section>

      {/* Categories Filter Pills with Game Icons */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 font-game">
            <span>📜 Active Quest Board</span>
            <span className="text-xs font-black text-slate-900 bg-[#fde047] border-2 border-slate-900 px-2.5 py-0.5 rounded-full shadow-[2px_2px_0_#0f172a]">
              {filteredTasks.length} Available Bounties
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Urgency:</span>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value as any)}
              className="text-xs bg-white border-2 border-slate-900 rounded-xl px-3 py-1.5 text-slate-900 focus:outline-hidden font-black shadow-[2px_2px_0_#0f172a] cursor-pointer"
            >
              <option value="all">All Timelines</option>
              <option value="urgent">⚡ Urgent (&lt; 2 hrs)</option>
              <option value="today">📅 Today</option>
            </select>
          </div>
        </div>

        {/* Chunky Category Buttons */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playPopSound();
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all border-2 border-slate-900 cursor-pointer ${
                  isSelected
                    ? `${cat.bg} text-slate-950 shadow-[3px_3px_0_#0f172a] -translate-y-1`
                    : 'bg-white text-slate-800 hover:bg-amber-50 shadow-[2px_2px_0_#0f172a]'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quest by name, equipment, or neighborhood..."
            className="w-full pl-11 pr-4 py-3 bg-white border-3 border-slate-900 rounded-2xl text-xs font-bold text-slate-900 placeholder-slate-500 focus:outline-hidden shadow-[3px_3px_0_#0f172a]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              playPopSound();
              setSelectedCategory('plants');
            }}
            className="px-4 py-3 bg-[#bbf7d0] hover:bg-[#86efac] text-slate-950 border-2 border-slate-900 rounded-2xl text-xs font-black flex items-center gap-2 shadow-[2px_2px_0_#0f172a] active:translate-y-0.5 cursor-pointer"
          >
            <span>🌿</span>
            <span>Plant Caretakers Only</span>
          </button>
          <button
            onClick={() => {
              playPopSound();
              onOpenPostModal();
            }}
            className="px-5 py-3 bg-[#f43f5e] hover:bg-[#e11d48] text-white rounded-2xl text-xs font-black border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-1 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>+ Delegate Quest</span>
          </button>
        </div>
      </div>

      {/* Chores Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => {
          const isClaimed = claimedTasks.includes(task.id);
          return (
            <div
              key={task.id}
              onClick={() => {
                playPopSound();
                onSelectTask(task);
              }}
              className="bg-white rounded-3xl border-3 border-slate-900 p-5 hover:-translate-y-1.5 transition-all duration-150 shadow-[5px_5px_0_#0f172a] cursor-pointer flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-black px-3 py-1 rounded-xl bg-[#fef08a] text-slate-950 border-2 border-slate-900 shadow-[1.5px_1.5px_0_#0f172a]">
                    {task.categoryLabel}
                  </span>
                  
                  {task.urgency === 'urgent' ? (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-xl bg-[#f43f5e] text-white border-2 border-slate-900 shadow-[1.5px_1.5px_0_#0f172a] flex items-center gap-1 animate-pulse">
                      <Flame className="w-3 h-3 fill-white" />
                      URGENT (&lt;2H)
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-300">
                      ⏱️ {task.createdAt}
                    </span>
                  )}
                </div>

                <h3 className="font-black text-slate-900 text-base leading-snug mb-2 font-game group-hover:text-blue-600 transition-colors">
                  {task.title}
                </h3>

                <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed mb-4">
                  {task.description}
                </p>
              </div>

              {/* Task Details & Action Bottom */}
              <div className="space-y-3 pt-3 border-t-2 border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span className="truncate max-w-[150px]">{task.location}</span>
                  </div>
                  <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300">
                    {task.distance}
                  </span>
                </div>

                {/* Bounty & XP Box */}
                <div className="flex items-center justify-between bg-[#fffbeb] rounded-2xl p-3 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-950">🪙 ${task.budget}</span>
                      <span className="text-[11px] font-bold text-slate-600">/ ~{task.estimatedHours}h</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-black text-emerald-700">
                      <span>🛡️ 0% Fee (Free Trial)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md border border-purple-300 inline-block mb-1">
                      ⭐ +{task.xpReward || 200} XP
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold block">
                      {task.bidsCount} Adventurers Bid
                    </span>
                  </div>
                </div>

                {/* Poster info & Action button */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={task.postedBy.avatar}
                      alt={task.postedBy.name}
                      className="w-9 h-9 rounded-2xl bg-[#bfdbfe] border-2 border-slate-900 shadow-[1px_1px_0_#0f172a]"
                    />
                    <div>
                      <div className="text-xs font-black text-slate-900 leading-tight flex items-center gap-1">
                        <span>{task.postedBy.name}</span>
                        <span className="text-[9px] bg-blue-100 text-blue-900 px-1 rounded font-mono font-bold">
                          Lvl {task.postedBy.playerLevel || 10}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                        <span>⭐ {task.postedBy.rating}</span>
                        <span>•</span>
                        <span>{task.postedBy.tasksPosted} posted</span>
                      </div>
                    </div>
                  </div>

                  {currentRole === 'seller' ? (
                    <button
                      onClick={(e) => handleClaimChore(task.id, e)}
                      disabled={isClaimed}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 border-slate-900 transition-all flex items-center gap-1 cursor-pointer ${
                        isClaimed
                          ? 'bg-[#a7f3d0] text-emerald-950 shadow-[1px_1px_0_#0f172a]'
                          : 'bg-[#10b981] hover:bg-[#059669] text-white shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5'
                      }`}
                    >
                      {isClaimed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Claimed!</span>
                        </>
                      ) : (
                        <>
                          <span>⚔️ Claim Quest</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectTask(task)}
                      className="px-3 py-1.5 rounded-xl text-xs font-black bg-white hover:bg-amber-100 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Multi-channel Distribution Banner (Canvas: Channels) */}
      <section className="bg-[#fef08a] border-4 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0_#0f172a] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-white border border-slate-900 px-2 py-0.5 rounded-lg shadow-[1px_1px_0_#0f172a]">
              🌐 MULTI-CHANNEL SYNDICATION GUILD
            </span>
            <span className="text-xs text-slate-700 font-bold">From Lean Canvas Channels note</span>
          </div>
          <h4 className="text-lg font-black text-slate-900 font-game">
            Recruiting across Upwork, LinkedIn, TikTok & Instagram
          </h4>
          <p className="text-xs text-slate-700 font-medium max-w-xl">
            Rent-Somebody automatically broadcasts your quest to social platforms and local task networks to summon verified helpers in under 5 minutes!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => {
              playPopSound();
              alert('Quest bounty link copied! Ready to share to LinkedIn, IG Stories, Upwork, or WhatsApp.');
            }}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 border-2 border-slate-900 rounded-xl text-xs font-black text-slate-900 flex items-center gap-1.5 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            <span>Share to LinkedIn / Socials</span>
          </button>
          <button 
            onClick={() => {
              playPopSound();
              onOpenPostModal();
            }}
            className="px-5 py-2.5 bg-[#f43f5e] hover:bg-[#e11d48] text-white rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            + Post Custom Quest
          </button>
        </div>
      </section>
    </div>
  );
};
