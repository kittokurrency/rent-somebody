import React, { useState } from 'react';
import { ChatMessage, UserRole } from '../types';
import { INITIAL_CHAT_MESSAGES } from '../data/mockData';
import { 
  Send, 
  Camera, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  MapPin, 
  Lock,
  Swords,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCoinSound, playPopSound, playSuccessFanfare } from '../utils/soundEffects';

interface JobInteractionViewProps {
  currentRole: UserRole;
  onOpenAIAgent: () => void;
  onOpenLeaderboard: () => void;
}

export const JobInteractionView: React.FC<JobInteractionViewProps> = ({
  currentRole,
  onOpenAIAgent,
  onOpenLeaderboard
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isEscrowReleased, setIsEscrowReleased] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    playPopSound();
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: currentRole === 'buyer' ? 'buyer' : 'seller',
      senderName: currentRole === 'buyer' ? 'Clara Chen (You - Lvl 12)' : 'Julian Vance (You - Rank #1)',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    if (currentRole === 'buyer') {
      setTimeout(() => {
        playPopSound();
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'seller',
            senderName: 'Julian Vance (Rank #1 Druid)',
            text: 'Roger that Clara! Double checked moisture readings on all 16 pots and secured the door lockbox! 🌱✨',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        ]);
      }, 1000);
    }
  };

  const handleReleaseEscrow = () => {
    playSuccessFanfare();
    setIsEscrowReleased(true);
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#34d399', '#38bdf8', '#f472b6', '#c084fc']
    });

    const releaseMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'system',
      senderName: '🛡️ Rent-Somebody Escrow Vault',
      text: `🎉 VICTORY! Bounty of $45.00 ${tipAmount > 0 ? `+ $${tipAmount}.00 tip` : ''} disbursed to Julian Vance! Platform Loot Tax: $0.00 (Free Trial Event)! Julian gained +180 XP!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, releaseMsg]);
  };

  const handleAddTip = (amount: number) => {
    playCoinSound();
    setTipAmount(amount);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleSimulatePhoto = () => {
    playPopSound();
    const photoMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'seller',
      senderName: 'Julian Vance (Rank #1 Druid)',
      text: 'Fresh timestamped photo verification: moisture meters reading 65% across all 16 Monsteras and ferns! 📸',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachmentUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80',
      attachmentCaption: '✨ 16 Tropical Plants Inspected & Hydrated'
    };
    setMessages((prev) => [...prev, photoMsg]);
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Cartoon Workspace Header */}
      <div className="bg-[#fffbeb] rounded-3xl border-4 border-slate-900 p-6 shadow-[5px_5px_0_#0f172a] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-950 bg-[#34d399] px-3 py-1 rounded-xl border-2 border-slate-900 shadow-[1.5px_1.5px_0_#0f172a]">
              ⚔️ BATTLE ROOM & CHAT WORKSPACE
            </span>
            <span className="text-xs text-slate-700 font-bold">
              Canvas Note: &quot;Interface for Buyers and sellers to interact&quot;
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 font-game">
            🌿 Water 16 Rare Monsteras & Orchids (Plant Caretaker)
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Upper West Side (Floor 4)
            </span>
            <span className="flex items-center gap-1 font-black text-slate-950">
              🪙 Escrow Bounty: $45.00 Gold
            </span>
            <span className="text-emerald-700 font-black flex items-center gap-1">
              <span>🛡️ 0% Fee (Free Trial Promo)</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playPopSound();
              onOpenAIAgent();
            }}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-950 rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>24hr NPC Live Agent</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Milestones & Escrow Console + Chat Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Milestones & Escrow Release Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Milestone Stepper */}
          <div className="bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[5px_5px_0_#0f172a] space-y-5">
            <h3 className="font-black text-slate-900 text-sm flex items-center justify-between font-game">
              <span>Quest Quest Milestones</span>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl uppercase border-2 border-slate-900 ${
                isEscrowReleased
                  ? 'bg-[#34d399] text-slate-950 shadow-[1px_1px_0_#0f172a]'
                  : 'bg-[#fbbf24] text-slate-950 shadow-[1px_1px_0_#0f172a]'
              }`}>
                {isEscrowReleased ? '🎉 Victory Claimed' : '⏳ Proof Verification'}
              </span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-[#34d399] border-2 border-slate-900 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-[1px_1px_0_#0f172a]">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">1. Hero Summoned (Julian Vance)</div>
                  <div className="text-[11px] text-slate-600 font-medium">Julian claimed bounty. Escrow gold locked in vault.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-[#34d399] border-2 border-slate-900 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-[1px_1px_0_#0f172a]">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">2. Arrival & Lockbox Opened</div>
                  <div className="text-[11px] text-slate-600 font-medium">2:22 PM • Moisture probe calibrated.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-[#34d399] border-2 border-slate-900 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-[1px_1px_0_#0f172a]">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">3. Plant Druid Quest In Progress</div>
                  <div className="text-[11px] text-slate-600 font-medium">16 rare plants watered, misted, drainage inspected.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-[#34d399] border-2 border-slate-900 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-[1px_1px_0_#0f172a]">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">4. Timestamped Photo Proof Submitted</div>
                  <div className="text-[11px] text-slate-600 font-medium">Photo uploaded into encrypted quest stream.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-xl border-2 border-slate-900 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-[1px_1px_0_#0f172a] ${
                  isEscrowReleased
                    ? 'bg-[#34d399] text-slate-950'
                    : 'bg-[#fef08a] text-slate-900'
                }`}>
                  {isEscrowReleased ? '✓' : '🔒'}
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">5. Bounty Release & XP Awarded</div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    {isEscrowReleased
                      ? 'Gold transferred to Julian with 0% loot tax.'
                      : 'Approve photo proof to release gold vault!'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cartoon Escrow Vault Console */}
          <div className="bg-[#fef08a] rounded-3xl border-4 border-slate-900 p-6 shadow-[5px_5px_0_#0f172a] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5 font-game">
                <span>🛡️</span>
                <span>Smart Escrow Gold Vault</span>
              </span>
              <span className="text-[11px] bg-white border border-slate-900 px-2 py-0.5 rounded-lg font-black text-emerald-800">
                0% Fee Active
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border-3 border-slate-900 shadow-[2px_2px_0_#0f172a] space-y-2 text-xs font-bold">
              <div className="flex justify-between text-slate-800">
                <span>Chore Bounty:</span>
                <span className="font-black text-slate-950">$45.00 Gold</span>
              </div>
              {tipAmount > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>Hero Appreciation Tip:</span>
                  <span className="font-black">+${tipAmount}.00</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-700 font-black">
                <span>Platform Commission:</span>
                <span>$0.00 (Free Trial Promo)</span>
              </div>
              <div className="pt-2 border-t-2 border-slate-200 flex justify-between text-sm font-black text-slate-950">
                <span>Total Bounty Payout:</span>
                <span className="text-2xl text-emerald-600 font-game">
                  🪙 ${45 + tipAmount}.00
                </span>
              </div>
            </div>

            {/* Tip Helper quick buttons */}
            {!isEscrowReleased && (
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-900 font-black block">
                  Award bonus gold tip to Julian:
                </span>
                <div className="flex items-center gap-2">
                  {[5, 10, 15].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleAddTip(amt)}
                      className={`flex-1 py-2 rounded-xl text-xs font-black border-2 border-slate-900 transition-all cursor-pointer ${
                        tipAmount === amt
                          ? 'bg-[#38bdf8] text-slate-950 shadow-[2px_2px_0_#0f172a] -translate-y-0.5'
                          : 'bg-white hover:bg-amber-100 text-slate-800 shadow-[1px_1px_0_#0f172a]'
                      }`}
                    >
                      +${amt} Gold
                    </button>
                  ))}
                  {tipAmount > 0 && (
                    <button
                      onClick={() => setTipAmount(0)}
                      className="text-[11px] font-bold text-slate-600 hover:text-slate-950 underline px-1"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Release Escrow Button */}
            {!isEscrowReleased ? (
              <button
                onClick={handleReleaseEscrow}
                className="w-full py-4 bg-[#10b981] hover:bg-[#059669] text-white font-black rounded-2xl text-sm border-3 border-slate-900 shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer font-game"
              >
                <span>🎉 VICTORY! APPROVE & RELEASE GOLD</span>
              </button>
            ) : (
              <div className="bg-[#bbf7d0] border-2 border-slate-900 rounded-2xl p-3 text-center text-xs text-emerald-950 font-black shadow-[2px_2px_0_#0f172a]">
                ⭐ Quest Completed! Julian received ${45 + tipAmount}.00 Gold and +180 XP!
              </div>
            )}

            {/* Simulation Helpers */}
            <div className="pt-2 border-t-2 border-slate-900/10 flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span>Interactive Controls:</span>
              <button
                onClick={handleSimulatePhoto}
                className="bg-white px-2 py-0.5 rounded-lg border border-slate-900 text-blue-700 hover:bg-blue-50 cursor-pointer"
              >
                + Sim Photo Proof
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Cartoon Chat Stream (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border-3 border-slate-900 shadow-[5px_5px_0_#0f172a] flex flex-col h-[650px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b-3 border-slate-900 bg-[#fffbeb] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=JulianHero&backgroundColor=b6e3f4,ffd5dc"
                  alt="Julian Vance"
                  className="w-12 h-12 rounded-2xl border-2 border-slate-900 bg-amber-100 shadow-[1.5px_1.5px_0_#0f172a]"
                />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-slate-900 absolute -top-1 -right-1"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900 font-game">Julian Vance</span>
                  <span className="text-[10px] font-black px-2 py-0.2 rounded-md bg-[#fbbf24] text-slate-950 border border-slate-900 uppercase">
                    🥇 Rank #1 Druid
                  </span>
                </div>
                <span className="text-[11px] text-slate-600 font-bold">
                  Master Horticulturist • Lvl 48 • On-site Manhattan
                </span>
              </div>
            </div>

            <button 
              onClick={() => {
                playPopSound();
                onOpenLeaderboard();
              }}
              className="text-xs text-blue-800 hover:underline font-black bg-blue-50 border border-blue-300 px-3 py-1 rounded-xl"
            >
              View Hero Card
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#fef7ee]">
            {messages.map((msg) => {
              const isMe =
                (currentRole === 'buyer' && msg.sender === 'buyer') ||
                (currentRole === 'seller' && msg.sender === 'seller');
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <div className="bg-[#fef08a] border-2 border-slate-900 text-slate-950 font-black text-[11px] px-4 py-2 rounded-2xl max-w-md text-center shadow-[2px_2px_0_#0f172a]">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-baseline gap-2 mb-1 px-1">
                    <span className="text-[11px] font-black text-slate-900">
                      {msg.senderName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`max-w-md rounded-3xl p-4 text-xs font-bold leading-relaxed border-2 border-slate-900 shadow-[3px_3px_0_#0f172a] ${
                      isMe
                        ? 'bg-[#38bdf8] text-slate-950 rounded-tr-xs'
                        : 'bg-white text-slate-900 rounded-tl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Photo attachment proof */}
                    {msg.attachmentUrl && (
                      <div className="mt-3 rounded-2xl overflow-hidden border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
                        <img
                          src={msg.attachmentUrl}
                          alt="Task photo proof"
                          className="w-full h-48 object-cover hover:scale-105 transition-transform"
                        />
                        {msg.attachmentCaption && (
                          <div className="bg-slate-900 text-white text-[10px] font-black px-3 py-1.5">
                            {msg.attachmentCaption}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t-3 border-slate-900 bg-white flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleSimulatePhoto}
              title="Upload photo proof of completed chore"
              className="p-2.5 rounded-2xl bg-[#fed7aa] border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:bg-[#fdba74] active:translate-y-0.5 cursor-pointer text-slate-900"
            >
              <Camera className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                currentRole === 'buyer'
                  ? 'Message Julian about your plants, instructions...'
                  : 'Message Clara, give quest progress update...'
              }
              className="flex-1 py-2.5 px-3 bg-slate-50 border-2 border-slate-900 rounded-2xl text-xs font-bold text-slate-900 placeholder-slate-500 focus:outline-hidden focus:bg-white shadow-[2px_2px_0_#0f172a]"
            />

            <button
              type="submit"
              className="p-3 rounded-2xl bg-[#f43f5e] hover:bg-[#e11d48] text-white border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <Send className="w-4 h-4 stroke-[3]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
