"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Zap, Activity, Cpu, Terminal, Shield, Wifi, Battery, Gauge, Trash2, Sparkles, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function SupremeMarketingLab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ cpu: 45, ram: 60, network: 98, uptime: 0 });
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const int = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 15 + 35),
        ram: Math.floor(Math.random() * 10 + 55),
        network: Math.floor(Math.random() * 5 + 93),
        uptime: prev => prev + 1,
      });
    }, 2000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;
    const handleScroll = () => {
      setShowScrollBtn(ref.scrollHeight - ref.scrollTop - ref.clientHeight > 200);
    };
    ref.addEventListener('scroll', handleScroll);
    return () => ref.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const text = await res.text();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Neural link disrupted. Retrying connection...',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020205] text-white font-sans overflow-hidden">
      
      {/* ===== SIDEBAR ===== */}
      <aside className="hidden lg:flex w-80 border-r border-white/[0.04] flex-col bg-[#040408]/80 backdrop-blur-xl p-6 z-20">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/[0.04]">
          <motion.div 
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="p-2.5 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl"
          >
            <Cpu className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest">Neural Core</p>
            <p className="text-[9px] text-purple-400/60 tracking-[0.3em]">v3.0 Active</p>
          </div>
        </div>

        {/* System Metrics */}
        <div className="space-y-4 mb-8">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-mono">System Metrics</p>
          
          {[
            { icon: Cpu, label: 'CPU Load', value: metrics.cpu, color: 'purple' },
            { icon: Gauge, label: 'Memory', value: metrics.ram, color: 'cyan' },
            { icon: Wifi, label: 'Network', value: metrics.network, color: 'emerald' },
          ].map((metric, i) => (
            <div key={i} className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.04] space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-3 h-3 text-white/30" />
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">{metric.label}</span>
                </div>
                <span className="text-[10px] font-mono text-white/60">{metric.value}%</span>
              </div>
              <div className="w-full h-1 bg-white/[0.03] rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full bg-${metric.color}-500/50 rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Uptime */}
        <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Uptime</span>
          </div>
          <p className="text-lg font-mono font-bold text-emerald-400/80">
            {Math.floor(metrics.uptime / 3600)}h {Math.floor((metrics.uptime % 3600) / 60)}m {metrics.uptime % 60}s
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-2">
          <button 
            onClick={() => setMessages([])} 
            className="w-full p-3 bg-white/[0.02] hover:bg-red-500/5 rounded-xl text-[10px] font-bold uppercase border border-white/[0.04] hover:border-red-500/20 transition-all flex items-center justify-center gap-2 text-white/50 hover:text-red-400"
          >
            <Trash2 className="w-3 h-3" /> Clear Memory
          </button>
          <Link href="/dashboard">
            <button className="w-full p-3 bg-white/[0.02] hover:bg-purple-500/5 rounded-xl text-[10px] font-bold uppercase border border-white/[0.04] hover:border-purple-500/20 transition-all text-white/50 hover:text-purple-400">
              ← Return to Dashboard
            </button>
          </Link>
        </div>
      </aside>

      {/* ===== MAIN CHAT ===== */}
      <main className="flex-1 flex flex-col relative bg-[#020205]">
        {/* Top Bar */}
        <nav className="h-14 border-b border-white/[0.04] px-6 flex items-center justify-between bg-[#040408]/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <Terminal className="w-3.5 h-3.5 text-purple-400/60" />
            <p className="text-[9px] text-white/30 uppercase font-mono tracking-[0.2em]">Session: Encrypted</p>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <Shield className="w-3 h-3 text-emerald-400/60" />
            <p className="text-[9px] text-white/20 uppercase font-mono tracking-[0.2em]">AES-256</p>
            <Clock className="w-3 h-3 text-white/20" />
            <p className="text-[9px] text-white/20 font-mono">{new Date().toLocaleTimeString()}</p>
          </div>
        </nav>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scroll-smooth relative">
          
          {/* Background ambient */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/[0.02] rounded-full blur-[100px] pointer-events-none" />

          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mb-8"
                >
                  <Sparkles className="w-16 h-16 text-purple-500/20" />
                </motion.div>
                <p className="text-[11px] text-white/10 font-mono uppercase tracking-[0.5em] mb-2">Neural Uplink Active</p>
                <p className="text-[9px] text-white/05 font-mono tracking-[0.3em]">Initialize conversation to begin</p>
              </motion.div>
            ) : (
              messages.map((m, idx) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-4 max-w-4xl mx-auto w-full ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${
                    m.role === 'user' 
                      ? 'bg-white border-white/20' 
                      : 'bg-black border-purple-500/20'
                  }`}>
                    {m.role === 'user' ? (
                      <User className="w-5 h-5 text-black" />
                    ) : (
                      <Bot className="w-5 h-5 text-purple-400" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex flex-col gap-1 max-w-[75%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-6 py-4 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-white text-black font-medium rounded-br-md' 
                        : 'bg-white/[0.03] border border-white/[0.06] text-gray-200 rounded-bl-md'
                    }`}>
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    </div>
                    <span className="text-[9px] text-white/10 font-mono px-2">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {/* Loading */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 max-w-4xl mx-auto w-full"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-black border border-purple-500/20">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
              <div className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] rounded-bl-md">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-2 h-2 bg-purple-400/60 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Scroll to bottom button */}
        {showScrollBtn && (
          <button
            onClick={() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })}
            className="absolute bottom-40 left-1/2 -translate-x-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full border border-white/10 transition-all z-10"
          >
            <ChevronDown className="w-4 h-4 text-white/60" />
          </button>
        )}

        {/* Input Area */}
        <footer className="p-4 border-t border-white/[0.04] bg-[#040408]/50 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl flex items-end overflow-hidden focus-within:border-purple-500/30 focus-within:bg-white/[0.04] transition-all duration-300">
              <textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { 
                  if(e.key === 'Enter' && !e.shiftKey) { 
                    e.preventDefault(); 
                    handleSubmit(e as any); 
                  }
                }}
                placeholder="Transmit command..."
                rows={1}
                className="w-full bg-transparent border-none focus:ring-0 px-6 py-4 text-sm font-mono text-white/80 placeholder:text-white/20 outline-none resize-none"
                style={{ maxHeight: '120px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
              />
              <div className="flex items-center gap-2 pr-3 pb-3">
                <button 
                  disabled={isLoading || !input.trim()}
                  type="submit"
                  className="bg-white hover:bg-white/90 text-black p-2.5 rounded-xl disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-[9px] text-white/10 text-center mt-3 font-mono">
              Press Enter to transmit • Shift+Enter for new line
            </p>
          </form>
        </footer>
      </main>
    </div>
  );
}