import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Bot, 
  Send, 
  HelpCircle, 
  Crown,
  Calculator,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { AI_FAQS } from '../data/mockData';
import { playPopSound, playCoinSound } from '../utils/soundEffects';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLeaderboard: () => void;
  onOpenPostChore: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onOpenLeaderboard,
  onOpenPostChore
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'live_agent'>('guide');
  
  // Calculator state
  const [calcCategory, setCalcCategory] = useState<'plants' | 'assembly' | 'errands' | 'moving'>('plants');
  const [calcHours, setCalcHours] = useState(1.5);
  const [calcUrgency, setCalcUrgency] = useState<'standard' | 'urgent'>('standard');

  // Live Agent Chat state
  const [chatLog, setChatLog] = useState<{ sender: 'agent' | 'user'; text: string; time: string }[]>([
    {
      sender: 'agent',
      text: 'Greetings Adventurer! 🤖 I am your 24/7 Rent-Somebody NPC Companion & Live Support Agent. How can I help you delegate a quest or optimize your hero earnings today?',
      time: 'Just now'
    }
  ]);
  const [agentInput, setAgentInput] = useState('');

  if (!isOpen) return null;

  // Pricing calculator logic
  const baseRates = {
    plants: 28,
    assembly: 35,
    errands: 25,
    moving: 40
  };
  const multiplier = calcUrgency === 'urgent' ? 1.3 : 1.0;
  const estimatedTotal = Math.round(baseRates[calcCategory] * calcHours * multiplier);

  const handleAskQuestion = (q: string, a: string) => {
    playPopSound();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatLog((prev) => [
      ...prev,
      { sender: 'user', text: q, time },
      { sender: 'agent', text: a, time }
    ]);
  };

  const handleSendAgentMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentInput.trim()) return;

    playPopSound();
    const userText = agentInput.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatLog((prev) => [...prev, { sender: 'user', text: userText, time }]);
    setAgentInput('');

    setTimeout(() => {
      playCoinSound();
      let reply = 'Thank you for reaching out! Our team is standing by 24/7. All chores are secured by smart escrow and zero commission fees during your free trial.';
      
      const lower = userText.toLowerCase();
      if (lower.includes('commission') || lower.includes('fee') || lower.includes('free trial')) {
        reply = 'During our Free Trial event, 0% platform commissions are charged! Requesters pay the exact bounty, and task heroes keep 100% of the gold.';
      } else if (lower.includes('leaderboard') || lower.includes('rank') || lower.includes('vip') || lower.includes('subscription')) {
        reply = 'The Pro Leaderboard (Hall of Heroes) is a paywalled directory of top 1% vetted taskers with 99.8% on-time records. You can unlock it with a monthly VIP pass!';
      } else if (lower.includes('plant') || lower.includes('care')) {
        reply = 'For plant care, always specify pot count, humidity misting needs, and leave plant vitamins on the counter. Julian Vance (#1 Horticulturist) brings calibrated moisture meters!';
      } else if (lower.includes('escrow') || lower.includes('pay') || lower.includes('safe')) {
        reply = 'Smart Escrow holds gold safely until timestamped photo proof is uploaded and you click "Approve Proof & Release".';
      }

      setChatLog((prev) => [...prev, { sender: 'agent', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={() => {
          playPopSound();
          onClose();
        }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#fef7ee] h-full shadow-[0_0_20px_rgba(0,0,0,0.4)] flex flex-col z-10 border-l-4 border-slate-900">
        {/* Drawer Header */}
        <div className="p-4 bg-[#fbbf24] text-slate-950 flex items-center justify-between border-b-3 border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#38bdf8] border-2 border-slate-900 flex items-center justify-center text-slate-950 shadow-[2px_2px_0_#0f172a]">
              <span className="text-2xl animate-spin-slow">🤖</span>
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 font-game flex items-center gap-1.5">
                <span>Rent-Somebody AI NPC Suite</span>
                <span className="text-[10px] bg-[#f43f5e] text-white font-black px-1.5 py-0.2 rounded-md border border-slate-900 uppercase">
                  24/7
                </span>
              </h2>
              <p className="text-[11px] text-slate-700 font-bold">
                Shopify-Style Guidance + Live NPC Agent
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="p-1.5 bg-white rounded-xl border-2 border-slate-900 text-slate-800 hover:bg-slate-100 shadow-[1px_1px_0_#0f172a] cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-2 bg-[#fef08a] border-b-3 border-slate-900 text-xs font-black">
          <button
            onClick={() => {
              playPopSound();
              setActiveTab('guide');
            }}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all border-2 border-slate-900 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-[#38bdf8] text-slate-950 shadow-[2px_2px_0_#0f172a]'
                : 'bg-white/80 text-slate-700 hover:bg-white'
            }`}
          >
            <span>💡</span>
            <span>Shopify-Style Coach</span>
          </button>

          <button
            onClick={() => {
              playPopSound();
              setActiveTab('live_agent');
            }}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all border-2 border-slate-900 cursor-pointer ${
              activeTab === 'live_agent'
                ? 'bg-[#34d399] text-slate-950 shadow-[2px_2px_0_#0f172a]'
                : 'bg-white/80 text-slate-700 hover:bg-white'
            }`}
          >
            <span>🤖</span>
            <span>24hr Live Agent</span>
          </button>
        </div>

        {/* Tab 1: Shopify-Style Guidance */}
        {activeTab === 'guide' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Note badge */}
            <div className="bg-[#fffbeb] border-3 border-slate-900 rounded-2xl p-3 text-xs text-slate-900 font-bold shadow-[2px_2px_0_#0f172a] flex items-start gap-2">
              <span className="text-xl">⭐</span>
              <div>
                <strong>Canvas Note:</strong> &quot;AI guidance on how to use your app. Similar to Shopify.&quot;
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                  We provide smart price recommendations, quest templates, and ranking tips.
                </p>
              </div>
            </div>

            {/* Smart Pricing & Budget Calculator */}
            <div className="bg-white border-3 border-slate-900 rounded-3xl p-5 shadow-[4px_4px_0_#0f172a] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 flex items-center gap-1.5 font-game">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  Chore Price & Fair Wage Calculator
                </span>
                <span className="text-[10px] bg-yellow-100 border border-slate-900 px-2 py-0.5 rounded font-black text-slate-900">
                  Local AI
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-800 font-black block mb-1">Chore Category</label>
                  <select
                    value={calcCategory}
                    onChange={(e) => {
                      playPopSound();
                      setCalcCategory(e.target.value as any);
                    }}
                    className="w-full bg-[#fef7ee] border-2 border-slate-900 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-hidden"
                  >
                    <option value="plants">🌿 Plant & Green Caretaker</option>
                    <option value="assembly">🔨 IKEA & Furniture Assembly</option>
                    <option value="errands">🍎 Grocery Run & Errands</option>
                    <option value="moving">📦 Heavy Lifting & Moving Boxes</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-slate-800 font-black mb-1">
                    <span>Estimated Duration</span>
                    <span className="font-black text-blue-700">{calcHours} hours</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={calcHours}
                    onChange={(e) => setCalcHours(parseFloat(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setCalcUrgency('standard');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black border-2 border-slate-900 cursor-pointer ${
                      calcUrgency === 'standard'
                        ? 'bg-[#38bdf8] text-slate-950 shadow-[2px_2px_0_#0f172a]'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setCalcUrgency('urgent');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-black border-2 border-slate-900 cursor-pointer ${
                      calcUrgency === 'urgent'
                        ? 'bg-[#f43f5e] text-white shadow-[2px_2px_0_#0f172a]'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    ⚡ Urgent (&lt;2h)
                  </button>
                </div>

                {/* Estimate Result Box */}
                <div className="p-4 bg-[#fef08a] border-2 border-slate-900 rounded-2xl flex items-center justify-between shadow-[2px_2px_0_#0f172a]">
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-900 block">
                      Recommended Fair Offer
                    </span>
                    <span className="text-2xl font-black text-slate-950 font-game">🪙 ${estimatedTotal}</span>
                    <span className="text-[10px] text-emerald-800 font-bold block">
                      0% fee applied ($0 deduction)
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      playCoinSound();
                      onClose();
                      onOpenPostChore();
                    }}
                    className="px-3.5 py-2 bg-[#f43f5e] hover:bg-[#e11d48] text-white rounded-xl font-black text-xs border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
                  >
                    Use This Bounty
                  </button>
                </div>
              </div>
            </div>

            {/* Smart Coaching Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                AI Onboarding Playbooks
              </h3>

              <div className="p-3 bg-white rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] text-xs space-y-1">
                <div className="font-black text-slate-900 flex items-center gap-1.5 font-game">
                  <span>🌿</span>
                  <span>How to Delegate Plant Care Seamlessly</span>
                </div>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
                  List humidity requirements, drainage locations, and leave plant vitamins on the counter. Request timestamped photos of each room.
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] text-xs space-y-1">
                <div className="font-black text-slate-900 flex items-center gap-1.5 font-game">
                  <span>👑</span>
                  <span>How Task Heroes Reach Top 1% Hall of Fame</span>
                </div>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
                  Complete 5 chores with a 5.0 rating, verify identity credentials, and maintain a &gt;99% on-time record to unlock top hourly rates!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 24hr Live Agent Chat & FAQ */}
        {activeTab === 'live_agent' && (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* FAQ Pills at top */}
            <div className="p-3 bg-[#fffbeb] border-b-2 border-slate-900 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block">
                Quick FAQ Answers:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {AI_FAQS.slice(0, 3).map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleAskQuestion(faq.q, faq.a)}
                    className="text-[11px] px-2.5 py-1 bg-white hover:bg-amber-100 border-2 border-slate-900 rounded-xl text-slate-900 font-bold text-left transition-all shadow-[1px_1px_0_#0f172a] cursor-pointer"
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fef7ee]">
              {chatLog.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    item.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-3xl p-3.5 text-xs font-bold leading-relaxed border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] ${
                      item.sender === 'user'
                        ? 'bg-[#38bdf8] text-slate-950 rounded-tr-xs'
                        : 'bg-white text-slate-900 rounded-tl-xs'
                    }`}
                  >
                    {item.text}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold mt-0.5 px-1">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendAgentMessage}
              className="p-3 border-t-3 border-slate-900 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                placeholder="Ask our 24/7 NPC agent anything..."
                className="flex-1 py-2.5 px-3 bg-[#fef7ee] border-2 border-slate-900 rounded-2xl text-xs font-bold text-slate-900 placeholder-slate-500 focus:outline-hidden"
              />
              <button
                type="submit"
                className="p-2.5 rounded-2xl bg-[#f43f5e] hover:bg-[#e11d48] text-white border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <Send className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
