import React, { useState } from 'react';
import { UserRole, TaskItem, ProviderItem } from './types';
import { INITIAL_TASKS, TOP_PROVIDERS } from './data/mockData';
import { Header } from './components/Header';
import { MarketplaceView } from './components/MarketplaceView';
import { LeaderboardView } from './components/LeaderboardView';
import { RoadshowView } from './components/RoadshowView';
import { JobInteractionView } from './components/JobInteractionView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { PostChoreModal } from './components/PostChoreModal';
import { CanvasView } from './components/CanvasView';
import { 
  Sparkles, 
  ShieldCheck, 
  X, 
  Server, 
  Smartphone, 
  Bot, 
  Users, 
  Globe
} from 'lucide-react';
import { playPopSound, playCoinSound } from './utils/soundEffects';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('buyer');
  const [activeTab, setActiveTab] = useState<'marketplace' | 'leaderboard' | 'roadshow' | 'interaction' | 'canvas'>('marketplace');
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [providers] = useState<ProviderItem[]>(TOP_PROVIDERS);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true); // default true for rich preview experience, toggleable
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isPostChoreOpen, setIsPostChoreOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const handleChoreCreated = (newTask: TaskItem) => {
    setTasks((prev) => [newTask, ...prev]);
    setActiveTab('marketplace');
  };

  const handleDirectHireProvider = (provider: ProviderItem) => {
    setActiveTab('interaction');
  };

  return (
    <div className="min-h-screen flex flex-col font-game selection:bg-[#fbbf24] selection:text-slate-950">
      {/* Cartoon Game Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isSubscribed={isSubscribed}
        onToggleSubscription={() => setIsSubscribed(!isSubscribed)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        onOpenPostChore={() => setIsPostChoreOpen(true)}
        activeJobsCount={1}
      />

      {/* Main Game Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'marketplace' && (
          <MarketplaceView
            tasks={tasks}
            currentRole={currentRole}
            onSelectTask={(task) => setSelectedTask(task)}
            onOpenPostModal={() => setIsPostChoreOpen(true)}
            onOpenRoadshow={() => setActiveTab('roadshow')}
            onOpenLeaderboard={() => setActiveTab('leaderboard')}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            providers={providers}
            isSubscribed={isSubscribed}
            onToggleSubscription={() => setIsSubscribed(!isSubscribed)}
            onDirectHire={handleDirectHireProvider}
          />
        )}

        {activeTab === 'roadshow' && (
          <RoadshowView
            onDelegateChore={() => setIsPostChoreOpen(true)}
            onOpenInteraction={() => setActiveTab('interaction')}
          />
        )}

        {activeTab === 'interaction' && (
          <JobInteractionView
            currentRole={currentRole}
            onOpenAIAgent={() => setIsAIAssistantOpen(true)}
            onOpenLeaderboard={() => setActiveTab('leaderboard')}
          />
        )}

        {activeTab === 'canvas' && (
          <CanvasView
            onGoToTab={(tab) => setActiveTab(tab)}
            onOpenAI={() => setIsAIAssistantOpen(true)}
          />
        )}
      </main>

      {/* Quest Detail Modal (Cartoon Game Style) */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => {
              playPopSound();
              setSelectedTask(null);
            }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          ></div>

          <div className="relative bg-[#fffbeb] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-[6px_6px_0_#0f172a] border-4 border-slate-900 z-10 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-black px-3 py-1 rounded-xl bg-[#fef08a] text-slate-950 border-2 border-slate-900 shadow-[1.5px_1.5px_0_#0f172a]">
                  {selectedTask.categoryLabel}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2 font-game">
                  {selectedTask.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  playPopSound();
                  setSelectedTask(null);
                }}
                className="p-1.5 bg-white rounded-xl border-2 border-slate-900 text-slate-800 hover:bg-slate-100 shadow-[1px_1px_0_#0f172a] cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>

            <p className="text-xs text-slate-700 font-bold leading-relaxed">
              {selectedTask.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-4 bg-white rounded-2xl border-3 border-slate-900 shadow-[2px_2px_0_#0f172a] text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-black uppercase block">
                  Bounty Loot
                </span>
                <span className="text-2xl font-black text-slate-950 font-game">
                  🪙 ${selectedTask.budget}
                </span>
                <span className="text-[10px] text-emerald-700 font-black block">
                  0% fee (Free Trial Promo)
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-black uppercase block">
                  Location & Time
                </span>
                <span className="font-black text-slate-900 block truncate">
                  {selectedTask.location}
                </span>
                <span className="text-[11px] text-slate-600 font-bold">
                  {selectedTask.distance} • ~{selectedTask.estimatedHours}h
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-[#bbf7d0] border-2 border-slate-900 rounded-2xl flex items-center gap-3 text-xs text-slate-950 shadow-[2px_2px_0_#0f172a]">
              <span className="text-xl">🛡️</span>
              <span className="font-bold">
                Gold bounty is held securely in the Smart Escrow Vault and released only after verified photo proof is approved!
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <img
                  src={selectedTask.postedBy.avatar}
                  alt={selectedTask.postedBy.name}
                  className="w-10 h-10 rounded-2xl bg-blue-100 border-2 border-slate-900 shadow-[1px_1px_0_#0f172a]"
                />
                <div>
                  <div className="text-xs font-black text-slate-900">
                    {selectedTask.postedBy.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold">
                    ⭐ {selectedTask.postedBy.rating} ({selectedTask.postedBy.tasksPosted} posted)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playCoinSound();
                    setSelectedTask(null);
                    setActiveTab('interaction');
                  }}
                  className="px-5 py-2.5 bg-[#f43f5e] hover:bg-[#e11d48] text-white rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer font-game"
                >
                  {currentRole === 'seller' ? `⚔️ Claim Quest ($${selectedTask.budget})` : '⚔️ Enter Battle Room'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI NPC Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onOpenLeaderboard={() => {
          setIsAIAssistantOpen(false);
          setActiveTab('leaderboard');
        }}
        onOpenPostChore={() => {
          setIsAIAssistantOpen(false);
          setIsPostChoreOpen(true);
        }}
      />

      {/* Post Chore Modal */}
      <PostChoreModal
        isOpen={isPostChoreOpen}
        onClose={() => setIsPostChoreOpen(false)}
        onChoreCreated={handleChoreCreated}
      />

      {/* Cartoon Game Footer referencing Canvas Notes */}
      <footer className="mt-auto bg-[#0f172a] text-slate-300 text-xs border-t-4 border-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Canvas Mission */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-black text-base font-game">
                <div className="w-8 h-8 rounded-xl bg-[#38bdf8] border-2 border-white flex items-center justify-center text-slate-950 shadow-[2px_2px_0_#000]">
                  <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                </div>
                <span>Rent-Somebody RPG</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px] font-bold">
                &quot;Make your to-do lists disappear quicker, by asking someone else to do it for you.&quot;
              </p>
              <div className="text-[11px] text-amber-400 font-black">
                ⭐ Free Trial Active: 0% Loot Commission Tax!
              </div>
            </div>

            {/* Col 2: Key Resources (from canvas) */}
            <div className="space-y-2">
              <span className="text-[#fef08a] font-black text-xs uppercase tracking-wider block font-game">
                Key Resources (Architecture)
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-300 font-bold">
                <li className="flex items-center gap-2">
                  <span>🧑‍🌾</span>
                  <span>Actual Human Caretakers & Taskers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🖥️</span>
                  <span>Server for hosting, cloud server (hardware)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🤖</span>
                  <span>Customer service chatbot & 24hr Live Agent</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <span>Hardware devices (computer, mobile phone)</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Channels (from canvas) */}
            <div className="space-y-2">
              <span className="text-[#fef08a] font-black text-xs uppercase tracking-wider block font-game">
                Channels & Reach Guild
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-300 font-bold">
                <li className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>Website & Desktop Interface</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <span>Mobile App (iOS & Android)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>💼</span>
                  <span>Job posting (Upwork, LinkedIn, etc.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📸</span>
                  <span>Social Media (IG / TikTok / Facebook / Threads)</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Dual Customer Segments */}
            <div className="space-y-2">
              <span className="text-[#fef08a] font-black text-xs uppercase tracking-wider block font-game">
                Customer Classes
              </span>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/20">
                  <strong className="text-amber-300 block font-black">👑 People who want to spend money:</strong>
                  <span className="font-medium text-slate-200">Delegate chores, buy back free time, vanquish to-do lists.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/20">
                  <strong className="text-emerald-300 block font-black">⚔️ People who got time:</strong>
                  <span className="font-medium text-slate-200">Help neighbors, earn gold with 0% fees on flexible hours.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-bold gap-4">
            <div>
              © 2026 Rent-Somebody. Built from Lean Canvas Whiteboard specifications.
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  playPopSound();
                  setActiveTab('canvas');
                }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Inspect Canvas Blueprint
              </button>
              <button 
                onClick={() => {
                  playPopSound();
                  setActiveTab('leaderboard');
                }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Hall of Heroes (VIP)
              </button>
              <button 
                onClick={() => {
                  playPopSound();
                  setActiveTab('roadshow');
                }}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Live Cutscenes
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
