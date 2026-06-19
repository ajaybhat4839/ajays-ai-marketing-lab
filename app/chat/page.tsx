"use client";
// @ts-nocheck

import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, Zap, Sparkles, Activity, RefreshCw, Cpu
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export default function SupremeMarketingLab() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat() as any;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ cpu: 42, ram: 65, latency: 12 });

  useEffect(() => {
    const int = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * (48 - 40 + 1) + 40),
        ram: Math.floor(Math.random() * (68 - 62 + 1) + 62),
        latency: Math.floor(Math.random() * (15 - 8 + 1) + 8)
      });
    }, 3000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-screen w-full bg-[#020202] text-white font-sans overflow-hidden">
      {/* 1. SIDEBAR */}
      <aside className="hidden lg:flex w-72 border-r border-white/5 flex-col bg-black/40 backdrop-blur-3xl z-50">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
              <Cpu size={20} className="text-purple-400" />
            </div>
            <div className="text-left leading-tight">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[.2em]">Master Control</p>
              <p className="text-xs font-bold text-white font-mono italic text-purple-300">AJAY_OS_V2</p>
            </div>
          </div>
          <div className="space-y-4 text-[10px] font-mono text-white/30 tracking-widest uppercase">
            <div className="flex justify-between font-bold">CPU CORE <span className="text-purple-400 font-black">{metrics.cpu}%</span></div>
            <div className="flex justify-between font-bold">SYSTEM RAM <span className="text-cyan-400 font-black">{metrics.ram}%</span></div>
          </div>
        </div>
        <div className="p-8 mt-auto border-t border-white/5">
          <button onClick={() => setMessages([])} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl hover:text-red-400 transition-all text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <RefreshCw size={12} /> REBOOT SESSION
          </button>
        </div>
      </aside>

      {/* 2. MAIN CORE */}
      <main className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:40px_40px]">
        {/* NAV (CLOSED CORRECTLY) */}
        <nav className="h-16 border-b border-white/5 bg-black/80 flex items-center justify-between px-10">
          <div className="text-[10px] uppercase tracking-widest text-white/40 font-black italic">
            Neural Strategy Link // Ping: {metrics.latency}MS_STABLE
          </div>
          <div className="flex items-center gap-4">
            <Activity size={14} className="text-emerald-500" />
          </div>
        </nav>

        {/* CHAT INTERFACE */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 scroll-smooth">
          <AnimatePresence>
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-20 uppercase font-black tracking-[0.5em] text-[10px] space-y-4">
                <Zap size={60} className="text-purple-500 animate-pulse" />
                <p>Initialize Marketing Core Sequence</p>
              </div>
            )}
            {messages.map((m: any) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={m.id}
                className={`flex gap-6 max-w-4xl mx-auto w-full ${m.role === 'user' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
              >
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xl ${
                  m.role === 'user' ? 'bg-white border-white' : 'bg-black border-purple-500/40 text-purple-400'
                }`}>
                  {m.role === 'user' ? <User size={20} className="text-black" /> : <Bot size={20} />}
                </div>
                <div className={`p-8 rounded-3xl border transition-all max-w-[80%] ${
                  m.role === 'user' ? 'bg-white text-black font-bold border-white/20' : 'bg-white/[0.03] border-white/10 text-gray-200'
                }`}>
                  <div className="text-[14px] leading-relaxed tracking-wide">
                    {m.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* INPUT DECK */}
        <footer className="p-10 border-t border-white/5 bg-[#050505] z-10">
          <form onSubmit={(e) => handleSubmit(e)} className="max-w-4xl mx-auto group">
            <div className="relative bg-black border border-white/10 rounded-3xl flex flex-col p-1 transition-all focus-within:border-purple-500/60 shadow-2xl">
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
                placeholder="INPUT_NEURAL_COMMAND..."
                className="w-full bg-transparent border-none focus:ring-0 p-8 text-[12px] font-mono font-bold tracking-[0.2em] outline-none min-h-[90px] resize-none text-purple-400 uppercase placeholder:opacity-20"
              />
              <div className="flex justify-between items-center p-4 border-t border-white/5 bg-white/[0.01]">
                <div className="flex gap-4 px-3 text-white/30 uppercase text-[9px] font-mono font-black italic tracking-widest animate-pulse">
                  Link_Status: Active
                </div>
                <button 
                  disabled={isLoading || !input} 
                  type="submit" 
                  className="bg-white text-black h-12 px-10 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-20 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  {isLoading ? "TX_WAIT" : "TRANSMIT"} <Send size={12} />
                </button>
              </div>
            </div>
          </form>
        </footer>
      </main>
    </div>
  );
}