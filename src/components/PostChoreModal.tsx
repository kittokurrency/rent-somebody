import React, { useState } from 'react';
import { TaskItem, TaskCategory } from '../types';
import { 
  X, 
  Sparkles, 
  Plus, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Leaf, 
  Wrench, 
  ShoppingBag, 
  Users, 
  Boxes, 
  SprayCan, 
  Laptop
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCoinSound, playPopSound } from '../utils/soundEffects';

interface PostChoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChoreCreated: (newChore: TaskItem) => void;
}

export const PostChoreModal: React.FC<PostChoreModalProps> = ({
  isOpen,
  onClose,
  onChoreCreated
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('plants');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(45);
  const [estimatedHours, setEstimatedHours] = useState(1.5);
  const [location, setLocation] = useState('Upper West Side, Manhattan');
  const [urgency, setUrgency] = useState<'flexible' | 'today' | 'urgent'>('today');

  if (!isOpen) return null;

  const categoryOptions: { id: TaskCategory; label: string; icon: string; bg: string }[] = [
    { id: 'plants', label: 'Plant Caretaker', icon: '🌿', bg: 'bg-[#bbf7d0]' },
    { id: 'assembly', label: 'Furniture Assembly', icon: '🔨', bg: 'bg-[#bfdbfe]' },
    { id: 'errands', label: 'Grocery & Errands', icon: '🍎', bg: 'bg-[#fed7aa]' },
    { id: 'queuing', label: 'Queue / Line Proxy', icon: '🥐', bg: 'bg-[#e9d5ff]' },
    { id: 'moving', label: 'Heavy Lifting & Move', icon: '📦', bg: 'bg-[#fbcfe8]' },
    { id: 'cleaning', label: 'Deep Cleaning', icon: '✨', bg: 'bg-[#99f6e4]' },
    { id: 'tech', label: 'Tech & Smart Setup', icon: '💻', bg: 'bg-[#c7d2fe]' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    playCoinSound();
    const matchedCat = categoryOptions.find((c) => c.id === category);

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: title.startsWith('Quest:') || title.includes('Quest') ? title.trim() : `📜 Quest: ${title.trim()}`,
      category,
      categoryLabel: matchedCat ? matchedCat.label : 'General Chore',
      description: description.trim(),
      budget: Number(budget),
      xpReward: Math.round(Number(budget) * 4),
      estimatedHours: Number(estimatedHours),
      location: location.trim(),
      distance: '0.4 mi away (Nearby)',
      urgency,
      postedBy: {
        name: 'Clara Chen (You)',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Clara&backgroundColor=b6e3f4,c0aede,ffd5dc',
        rating: 5.0,
        tasksPosted: 15,
        playerLevel: 12,
      },
      bidsCount: 0,
      status: 'open',
      zeroCommissionNotice: true,
      createdAt: 'Just now',
    };

    onChoreCreated(newTask);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#38bdf8', '#f472b6', '#34d399']
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        onClick={() => {
          playPopSound();
          onClose();
        }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="relative bg-[#fffbeb] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-[6px_6px_0_#0f172a] border-4 border-slate-900 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b-3 border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#fbbf24] border-2 border-slate-900 text-slate-950 flex items-center justify-center shadow-[2px_2px_0_#0f172a]">
              <span className="text-2xl animate-coin">📜</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 font-game">
                Post Quest Bounty
              </h2>
              <p className="text-xs text-slate-600 font-bold">
                Make your to-do list disappear in minutes!
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

        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs font-bold">
          {/* Chore Category Selector */}
          <div>
            <label className="text-slate-900 font-black block mb-2">
              Select Quest Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categoryOptions.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => {
                    playPopSound();
                    setCategory(cat.id);
                  }}
                  className={`p-2.5 rounded-2xl border-2 border-slate-900 text-left flex items-center gap-2 transition-all cursor-pointer ${
                    category === cat.id
                      ? `${cat.bg} text-slate-950 font-black shadow-[3px_3px_0_#0f172a] -translate-y-0.5`
                      : 'bg-white hover:bg-slate-50 text-slate-700 shadow-[1px_1px_0_#0f172a]'
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-slate-900 font-black block mb-1">
              Quest Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Water 15 delicate Monsteras, assemble 6-drawer dresser, bakery queue..."
              className="w-full px-3.5 py-3 bg-white border-2 border-slate-900 rounded-2xl text-xs text-slate-900 font-bold focus:outline-hidden shadow-[2px_2px_0_#0f172a]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-slate-900 font-black block mb-1">
              Quest Objective & Instructions
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Specify where keys/lockbox are, special plant moisture needs, tools provided, photo verification required..."
              className="w-full px-3.5 py-3 bg-white border-2 border-slate-900 rounded-2xl text-xs text-slate-900 font-medium focus:outline-hidden shadow-[2px_2px_0_#0f172a]"
            />
          </div>

          {/* Budget & Duration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-900 font-black">
                  Bounty Gold ($)
                </label>
                <span className="text-[10px] text-emerald-700 font-black bg-emerald-100 border border-emerald-300 px-2 py-0.2 rounded-md">
                  0% Fee (Free Trial)
                </span>
              </div>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="15"
                  max="1000"
                  required
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-slate-900 rounded-2xl text-sm font-black text-slate-900 focus:outline-hidden shadow-[2px_2px_0_#0f172a]"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-900 font-black block mb-1">
                Estimated Duration
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="24"
                  required
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-slate-900 rounded-2xl text-sm font-black text-slate-900 focus:outline-hidden shadow-[2px_2px_0_#0f172a]"
                />
              </div>
            </div>
          </div>

          {/* Location & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-900 font-black block mb-1">
                Neighborhood / Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. SoHo, Upper West Side, Brooklyn..."
                  className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-slate-900 rounded-2xl text-xs font-bold text-slate-900 focus:outline-hidden shadow-[2px_2px_0_#0f172a]"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-900 font-black block mb-1">
                Urgency Timeline
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-white border-2 border-slate-900 rounded-2xl text-xs font-black text-slate-900 focus:outline-hidden shadow-[2px_2px_0_#0f172a]"
              >
                <option value="today">📅 Today (Standard Quest)</option>
                <option value="urgent">⚡ Urgent (Needed in &lt; 2 hrs)</option>
                <option value="flexible">🏖️ Flexible / Weekend</option>
              </select>
            </div>
          </div>

          {/* Free Trial Guarantee */}
          <div className="p-3 bg-[#bbf7d0] border-2 border-slate-900 rounded-2xl flex items-center justify-between shadow-[2px_2px_0_#0f172a]">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <div className="text-[11px] text-slate-950 font-bold">
                <strong>Free Trial Guarantee:</strong> 100% of your ${budget} gold goes to your task hero! Platform commission: $0.00.
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                onClose();
              }}
              className="px-4 py-2 bg-white border-2 border-slate-900 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 cursor-pointer shadow-[1px_1px_0_#0f172a]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-[#f43f5e] hover:bg-[#e11d48] text-white font-black rounded-2xl text-xs border-3 border-slate-900 shadow-[3px_3px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-1 transition-all flex items-center gap-2 cursor-pointer font-game"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Broadcast Quest Bounty</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
