import React, { useState, useEffect } from 'react';
import { ROADSHOW_SCENARIOS } from '../data/mockData';
import { 
  Tv, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  Camera, 
  Sparkles, 
  Clock, 
  Wrench, 
  Zap, 
  ThumbsUp, 
  ArrowRight,
  ShieldCheck,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCoinSound, playPopSound, playSuccessFanfare } from '../utils/soundEffects';

interface RoadshowViewProps {
  onDelegateChore: () => void;
  onOpenInteraction: () => void;
}

export const RoadshowView: React.FC<RoadshowViewProps> = ({
  onDelegateChore,
  onOpenInteraction
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenario = ROADSHOW_SCENARIOS[selectedScenarioIndex];
  const step = scenario.steps[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < scenario.steps.length - 1) {
            playPopSound();
            return prev + 1;
          } else {
            setIsPlaying(false);
            playSuccessFanfare();
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 }
            });
            return prev;
          }
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, scenario.steps.length]);

  const handleNext = () => {
    if (currentStepIndex < scenario.steps.length - 1) {
      playPopSound();
      setCurrentStepIndex(currentStepIndex + 1);
      if (currentStepIndex + 1 === scenario.steps.length - 1) {
        playSuccessFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      playPopSound();
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    playPopSound();
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle':
        return <span className="text-2xl animate-bounce">⚠️</span>;
      case 'Send':
        return <span className="text-2xl animate-coin">📜</span>;
      case 'CheckCircle2':
        return <span className="text-2xl animate-wiggle">⚔️</span>;
      case 'Camera':
        return <span className="text-2xl">📸</span>;
      case 'Sparkles':
        return <span className="text-2xl animate-coin">🏆</span>;
      case 'Clock':
        return <span className="text-2xl animate-bounce">⏱️</span>;
      case 'Wrench':
        return <span className="text-2xl animate-wiggle">🔨</span>;
      case 'Zap':
        return <span className="text-2xl animate-coin">⚡</span>;
      case 'ThumbsUp':
        return <span className="text-2xl">👍</span>;
      default:
        return <span className="text-2xl">✨</span>;
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top Banner explaining Roadshow feature from Canvas */}
      <div className="bg-gradient-to-r from-[#c084fc] via-[#818cf8] to-[#38bdf8] text-slate-950 rounded-3xl p-8 relative overflow-hidden border-4 border-slate-900 shadow-[6px_6px_0_#0f172a]">
        <div className="absolute top-2 right-6 text-5xl animate-bounce select-none pointer-events-none">🎬</div>
        <div className="absolute bottom-2 right-24 text-4xl animate-wiggle select-none pointer-events-none">🍿</div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef08a] border-2 border-slate-900 text-slate-950 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#0f172a]">
                <Tv className="w-3.5 h-3.5 text-slate-950" />
                CANVAS NOTE #3 • LIVE ROADSHOW THEATER
              </span>
              <span className="text-xs text-white bg-slate-900 px-2.5 py-0.5 rounded-full font-black border border-white">
                Interactive Cutscenes
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white font-game drop-shadow-[0_2px_0_#0f172a]">
              &quot;Roadshows: Live enactment of how you can use the app&quot;
            </h1>
            <p className="text-xs sm:text-sm text-slate-950 font-bold leading-relaxed">
              Step into interactive game cutscenes demonstrating how busy Quest Givers delegate chores and how local Task Heroes earn gold with zero commissions!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-3 border-slate-900 shadow-[3px_3px_0_#0f172a] shrink-0">
            {ROADSHOW_SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  playPopSound();
                  setSelectedScenarioIndex(idx);
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-2 border-slate-900 ${
                  selectedScenarioIndex === idx
                    ? 'bg-[#fbbf24] text-slate-950 shadow-[2px_2px_0_#0f172a]'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {sc.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Cartoon Theater Box */}
      <div className="bg-white rounded-3xl border-4 border-slate-900 shadow-[6px_6px_0_#0f172a] overflow-hidden">
        {/* Scenario Header Bar */}
        <div className="bg-[#fffbeb] border-b-3 border-slate-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1.5">
              <span>🎭 HERO STORY:</span>
              <span>{scenario.persona}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 font-game">
              {scenario.title}
            </h2>
            <p className="text-xs text-slate-600 font-bold mt-0.5">
              {scenario.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-black px-3.5 py-1.5 bg-[#bbf7d0] text-emerald-950 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] flex items-center gap-1.5">
              <span>{scenario.timeSaved}</span>
            </span>
          </div>
        </div>

        {/* Stepper Navigation Pills like Video Game Level Select */}
        <div className="grid grid-cols-5 border-b-3 border-slate-900 bg-[#fef08a] divide-x-2 divide-slate-900 text-xs font-black">
          {scenario.steps.map((st, idx) => {
            const isActive = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={idx}
                onClick={() => {
                  playPopSound();
                  setCurrentStepIndex(idx);
                  setIsPlaying(false);
                }}
                className={`p-3 text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  isActive
                    ? 'bg-[#38bdf8] text-slate-950 font-black shadow-inner'
                    : isCompleted
                    ? 'bg-[#bbf7d0] text-emerald-950 hover:bg-[#86efac]'
                    : 'text-slate-600 hover:bg-amber-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider">
                    Stage {idx + 1}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-900 stroke-[3]" />
                  )}
                </div>
                <span className="line-clamp-1 font-black text-[11px]">
                  {st.stage.split(':')[1] || st.stage}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage Content Cutscene Display */}
        <div className="p-7 md:p-10 space-y-8 bg-gradient-to-b from-[#fef7ee] to-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Comic Cutscene Visual Card */}
            <div className="w-full md:w-1/2 bg-white rounded-3xl border-3 border-slate-900 p-6 shadow-[4px_4px_0_#0f172a] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#fef08a] border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0_#0f172a]">
                    {renderIcon(step.visualIcon)}
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block font-game">
                      {step.actor}
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">
                      Live Simulation
                    </span>
                  </div>
                </div>

                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#c084fc] text-slate-950 border-2 border-slate-900 shadow-[1px_1px_0_#0f172a]">
                  {step.stage.split(':')[0]}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#fffbeb] border-2 border-slate-900 text-xs text-slate-900 font-bold leading-relaxed">
                {step.action}
              </div>

              {/* Comic Book Speech Bubble */}
              <div className="relative bg-[#38bdf8] text-slate-950 border-3 border-slate-900 rounded-3xl p-4 text-xs font-black shadow-[3px_3px_0_#0f172a]">
                <div className="text-[10px] uppercase tracking-wider text-blue-950 font-black mb-1">
                  💬 Character Dialogue:
                </div>
                <p className="leading-snug">{step.dialogue}</p>
              </div>
            </div>

            {/* Context & Platform Mechanics */}
            <div className="w-full md:w-1/2 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-950 bg-[#fbbf24] px-3 py-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] inline-block">
                  ⭐ Value Proposition in Action
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-game">
                  {step.stage}
                </h3>
                <p className="text-xs text-slate-700 font-bold leading-relaxed">
                  In this stage, Rent-Somebody automates escrow safety, real-time messaging, and photo proof verification so chores are executed like clockwork!
                </p>
              </div>

              {/* RPG Level Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black text-slate-900">
                  <span>Enactment Progress</span>
                  <span>{Math.round(((currentStepIndex + 1) / scenario.steps.length) * 100)}% Complete</span>
                </div>
                <div className="h-4 w-full bg-[#fde68a] rounded-full border-2 border-slate-900 overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#10b981] rounded-full transition-all duration-300 border border-slate-900"
                    style={{ width: `${((currentStepIndex + 1) / scenario.steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Safe Escrow Notice */}
              <div className="bg-[#bbf7d0] border-2 border-slate-900 rounded-2xl p-3 flex items-center gap-3 text-xs text-slate-950 shadow-[2px_2px_0_#0f172a]">
                <span className="text-xl">🛡️</span>
                <div className="font-bold">
                  <strong className="block text-slate-950 font-black">100% Escrow Protection + Zero Platform Commission</strong>
                  Gold held in safe vault until photo proof is approved.
                </div>
              </div>
            </div>
          </div>

          {/* Player Controls Bar */}
          <div className="pt-6 border-t-3 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playPopSound();
                  setIsPlaying(!isPlaying);
                }}
                className="px-5 py-2.5 bg-[#fef08a] hover:bg-[#fde047] text-slate-950 rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 stroke-[3]" /> : <Play className="w-4 h-4 fill-slate-950" />}
                <span>{isPlaying ? 'Pause Enactment' : 'Auto-Play Cutscenes'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="p-2.5 bg-white border-2 border-slate-900 rounded-xl text-slate-800 hover:bg-slate-100 shadow-[2px_2px_0_#0f172a] active:translate-y-0.5 cursor-pointer"
                title="Restart from Stage 1"
              >
                <RotateCcw className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="px-4 py-2 bg-white border-2 border-slate-900 rounded-xl text-xs font-black text-slate-900 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-[2px_2px_0_#0f172a] active:translate-y-0.5 cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4 stroke-[3]" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentStepIndex === scenario.steps.length - 1}
                className="px-5 py-2 bg-[#38bdf8] hover:bg-[#0284c7] text-slate-950 rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playPopSound();
                  onOpenInteraction();
                }}
                className="px-4 py-2 bg-[#a7f3d0] hover:bg-[#6ee7b7] text-slate-950 border-2 border-slate-900 rounded-xl text-xs font-black shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer transition-all"
              >
                <span>⚔️ Battle Room</span>
              </button>
              <button
                onClick={() => {
                  playPopSound();
                  onDelegateChore();
                }}
                className="px-5 py-2 bg-[#f43f5e] hover:bg-[#e11d48] text-white rounded-xl text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Delegate Quest</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
