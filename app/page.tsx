"use client";

import Link from "next/link";
import { Cpu, Sparkles, TrendingUp, Zap, Brain, Bot, ArrowRight, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* 1. FUTURISTIC BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* 2. GLOWING ORBS */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. NAVIGATION (FIXED) */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md px-6 md:px-20 h-20 flex items-center justify-between">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <Cpu className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold tracking-tighter text-xl uppercase italic">Ajay's AI Lab</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[.2em] uppercase text-white/40">
           <span className="hover:text-purple-400 cursor-pointer transition-colors">Infrastructure</span>
           <span className="hover:text-purple-400 cursor-pointer transition-colors">Security</span>
           <Link href="/login" className="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-colors">Access Console</Link>
        </div>
      </nav>

      {/* 4. HERO SECTION */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-44 pb-32">
        <section className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 flex items-center gap-2 text-purple-400 text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            <Sparkles size={14} className="animate-pulse" /> The World's First Growth Protocol
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-[120px] font-black leading-[0.85] tracking-tight italic bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 mb-12"
          >
            HYPER <br/> GROWTH
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl text-white/40 text-sm md:text-lg mb-12 leading-relaxed tracking-wide font-medium"
          >
            Transform your trajectory with the lab. Recursive marketing audits, 
            instant SEO mapping, and human-resonant copywriting—all synced in 42ms.
          </motion.p>

          <Link href="/chat">
            <button className="group relative bg-white text-black text-xs font-black uppercase tracking-[0.2em] px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
               <span className="flex items-center gap-3">Start Production <ArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
            </button>
          </Link>
        </section>

        {/* 5. BENTO BOX SECTION */}
        <div className="grid md:grid-cols-12 gap-6 mt-44 h-auto">
          
          <BentoBox 
            colSpan="md:col-span-8"
            icon={<Globe className="text-purple-500 w-8 h-8" />}
            title="Global SEO Mapping"
            description="Dynamic node deployment for real-time indexing of all your marketing verticles across 128 search clusters."
          />

          <BentoBox 
            colSpan="md:col-span-4"
            icon={<Zap className="text-cyan-400 w-8 h-8" />}
            title="42ms Latency"
            description="No spinners. Only raw, streamed output directly from the core."
          />

          <BentoBox 
            colSpan="md:col-span-4"
            icon={<Shield className="text-emerald-400 w-8 h-8" />}
            title="Secure Arch"
            description="SSL_AUTH Layer-7 encryption for every generation."
          />

          <BentoBox 
            colSpan="md:col-span-8"
            icon={<Brain className="text-purple-300 w-8 h-8" />}
            title="Neural Marketing Core"
            description="Tuned with Gemini Flash & GPT-4o-Mini for surgical content generation that drives authentic conversions."
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-20 px-20 text-center opacity-30 text-[9px] font-mono tracking-widest uppercase flex flex-col items-center gap-4">
          <p>LAB_CONNECTION: SECURE • DATA_ENCRYPTION: AES_256 • PROTOCOL_V: 16.2.9</p>
          <div className="w-1/4 h-px bg-white/20" />
          <p>&copy; Ajay's AI Lab // System Authorized</p>
      </footer>
    </div>
  );
}

function BentoBox({ icon, title, description, colSpan }: { icon: any, title: string, description: string, colSpan: string }) {
  return (
    <div className={`p-10 rounded-[32px] bg-white/[0.03] border border-white/5 flex flex-col gap-6 relative overflow-hidden group hover:bg-white/[0.05] hover:border-white/20 transition-all ${colSpan}`}>
      <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity translate-y-5">
        {icon}
      </div>
      <div className="p-3 bg-white/[0.03] w-fit rounded-xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-black uppercase tracking-tight italic mb-3">{title}</h3>
        <p className="text-sm text-white/40 leading-relaxed max-w-sm">{description}</p>
      </div>
    </div>
  );
}