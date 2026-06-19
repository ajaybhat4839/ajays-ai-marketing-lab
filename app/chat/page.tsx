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
            <div className="space-y-4 text-[10px] font-mono">
                <div className="flex justify-between uppercase text-white/30 tracking-widest">CPU: <span className="text-purple-400 font-black">{metrics.cpu}%</span></div>
                <div className="flex justify-between uppercase text-white/30 tracking-widest">RAM: <span className="text-cyan-400 font-black">{metrics.ram}%</span></div>
            </div>
        </div>
        <div className="p-8 mt-auto border-t border-white/5">
            <button onClick={() => setMessages([])} className="w-full bg-white/5 border border-white/10 p-3 rounded-xl hover:text-red-400 transition-all text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                <RefreshCw size={12}/> Reset Session
            </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:40px_40px]">
        <nav className="h-16 border-b bor