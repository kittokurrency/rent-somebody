import React from 'react';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { playPopSound } from '../utils/soundEffects';

interface CanvasViewProps {
  onGoToTab: (tab: 'marketplace' | 'leaderboard' | 'roadshow' | 'interaction') => void;
  onOpenAI: () => void;
}

export const CanvasView: React.FC<CanvasViewProps> = ({ onGoToTab, onOpenAI }) => {
  const canvasAnnotations = [
    {
      noteText: '"Make your to-do lists disappear quicker, by asking someone else to do it for you"',
      color: 'bg-[#fef08a] text-slate-950 border-2 border-slate-900',
      category: '⭐ Value Proposition',
      implementedAs: 'Hero Banner Tagline & Quick Delegate search bar in Quest Board',
      action: () => onGoToTab('marketplace'),
      buttonText: 'View Hero Banner'
    },
    {
      noteText: '"Free trial: Users can explore the app for a specific period and there will be no commissions during that time"',
      color: 'bg-[#bfdbfe] text-slate-950 border-2 border-slate-900',
      category: '🎉 Pricing & Growth Promo',
      implementedAs: 'Marquee 0% Commission Announcement Bar & Escrow fee waiver ($0 loot tax)',
      action: () => onGoToTab('marketplace'),
      buttonText: 'View 0% Fee Banner'
    },
    {
      noteText: '"Paywalled: Leaderboard ranking of selecting the best service provider (only provide to the user who are pay the subscription fee)"',
      color: 'bg-[#fde047] text-slate-950 border-2 border-slate-900',
      category: '👑 Revenue & Paywall',
      implementedAs: 'Hall of Heroes VIP Leaderboard with interactive subscription toggle & direct-hire pass',
      action: () => onGoToTab('leaderboard'),
      buttonText: 'Explore VIP Hall of Heroes'
    },
    {
      noteText: '"Roadshows: Live enactment of how you can use the app"',
      color: 'bg-[#c084fc] text-slate-950 border-2 border-slate-900',
      category: '🎬 Customer Education & Demo',
      implementedAs: 'Interactive Live Roadshow Theater with 5-stage automated cutscene simulation',
      action: () => onGoToTab('roadshow'),
      buttonText: 'Launch Live Roadshow'
    },
    {
      noteText: '"AI guidance on how to use your app. Similar to Shopify."',
      color: 'bg-[#fed7aa] text-slate-950 border-2 border-slate-900',
      category: '💡 AI NPC Guide',
      implementedAs: 'Shopify-Style AI Onboarding NPC with real-time wage & duration calculator',
      action: onOpenAI,
      buttonText: 'Open AI Guide'
    },
    {
      noteText: '"24hr live agent to answer any FAQ sort of thing" & "Customer service chatbot"',
      color: 'bg-[#fed7aa] text-slate-950 border-2 border-slate-900',
      category: '🤖 Support & Trust',
      implementedAs: '24/7 Live NPC Agent Drawer + Escrow dispute mediation service',
      action: onOpenAI,
      buttonText: 'Chat with 24hr Agent'
    },
    {
      noteText: '"Interface for the Buyers and sellers to interact"',
      color: 'bg-[#bbf7d0] text-slate-950 border-2 border-slate-900',
      category: '⚔️ Core Product',
      implementedAs: 'Live Milestone Battle Room, photo proof review, encrypted chat & escrow release',
      action: () => onGoToTab('interaction'),
      buttonText: 'Open Battle Room'
    },
    {
      noteText: '"Care" caretaker for plants',
      color: 'bg-[#bbf7d0] text-slate-950 border-2 border-slate-900',
      category: '🌿 Signature Chore Quest',
      implementedAs: 'Horticulture category, Rank #1 Julian Vance, and Plant Rescue Roadshow',
      action: () => onGoToTab('marketplace'),
      buttonText: 'See Plant Quests'
    },
    {
      noteText: '"People who got time" vs "People who want to spend money"',
      color: 'bg-[#fbcfe8] text-slate-950 border-2 border-slate-900',
      category: '👥 Customer Segments',
      implementedAs: 'Header Dual Role Class Switcher (👑 Quest Giver vs ⚔️ Task Hero)',
      action: () => onGoToTab('marketplace'),
      buttonText: 'Toggle Classes in Header'
    },
    {
      noteText: '"Channels: website, mobile app, Job posting (Upwork, Linkedin), Social Media (IG/Tiktok/Thread)"',
      color: 'bg-[#fed7aa] text-slate-950 border-2 border-slate-900',
      category: '🌐 Channels & Syndication',
      implementedAs: 'Multi-Channel Guild Syndication Bar with 1-click sharing to LinkedIn & Upwork',
      action: () => onGoToTab('marketplace'),
      buttonText: 'View Syndication'
    }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Cartoon Blueprint Header */}
      <div className="bg-gradient-to-r from-[#818cf8] via-[#a855f7] to-[#ec4899] text-white rounded-3xl p-8 border-4 border-slate-900 shadow-[6px_6px_0_#0f172a]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fef08a] border-2 border-slate-900 text-slate-950 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#0f172a]">
                <FileSpreadsheet className="w-3.5 h-3.5 text-slate-950" />
                WHITEBOARD GAME BLUEPRINT
              </span>
              <span className="text-xs text-white bg-slate-900 px-2.5 py-0.5 rounded-full font-black border border-white">
                100% Fidelity Mapping
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white font-game drop-shadow-[0_2px_0_#0f172a]">
              Lean Canvas to RPG Interface Mapping
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 font-bold leading-relaxed">
              Every sticky note and business model section from your uploaded whiteboard diagram (Rent-Somebody_6201a25a.png) has been translated into an interactive, cartoon game interface!
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border-3 border-slate-900 text-xs text-slate-900 shadow-[3px_3px_0_#0f172a] space-y-1">
            <div className="font-black text-slate-950 flex items-center gap-1.5 font-game">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>10/10 Sticky Notes Built</span>
            </div>
            <p className="text-[11px] text-slate-600 font-bold">
              All mechanics fully playable!
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Original Picture Preview */}
      <div className="bg-white rounded-3xl border-4 border-slate-900 p-6 shadow-[5px_5px_0_#0f172a] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 font-game">
              <span>Original Lean Canvas Diagram</span>
              <span className="text-xs font-bold text-slate-500 font-mono">
                (/public/assets/aistudio/Rent-Somebody_6201a25a.png)
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-bold">
              The original whiteboard brainstorm that powers all game systems in this interface.
            </p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border-3 border-slate-900 bg-slate-50 shadow-inner group relative">
          <img
            src="/assets/aistudio/Rent-Somebody_6201a25a.png"
            alt="Rent-Somebody Lean Canvas Whiteboard"
            className="w-full h-auto max-h-[460px] object-contain mx-auto"
          />
        </div>
      </div>

      {/* Structured Implementation Breakdown Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 font-game">
          <span>Game Mechanics Traceability</span>
          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#fde047] text-slate-950 border-2 border-slate-900 shadow-[1.5px_1.5px_0_#0f172a]">
            {canvasAnnotations.length} Mapped Game Mechanics
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {canvasAnnotations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border-3 border-slate-900 p-5 shadow-[4px_4px_0_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-xl shadow-[1px_1px_0_#0f172a] ${item.color}`}>
                    Sticky Note #{idx + 1} • {item.category}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                </div>

                <div className="text-xs font-black text-slate-900 italic font-game">
                  {item.noteText}
                </div>

                <div className="p-3.5 rounded-2xl bg-[#fffbeb] border-2 border-slate-900 text-xs text-slate-800 font-bold space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                    Game Interface Implementation:
                  </span>
                  <p>{item.implementedAs}</p>
                </div>
              </div>

              <div className="pt-2 border-t-2 border-slate-200 flex justify-end">
                <button
                  onClick={() => {
                    playPopSound();
                    item.action();
                  }}
                  className="px-4 py-2 bg-[#fef08a] hover:bg-[#fde047] text-slate-950 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{item.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
