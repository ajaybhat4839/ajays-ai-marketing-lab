"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, Cpu, Rocket, ArrowRight, Zap, Database } from "lucide-react";
import Link from "next/link";

// --- TEXT SCRAMBLE HOOK ---
const useScramble = (text: string) => {
  const [output, setOutput] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(text.split("").map((_, i) => {
        if (i < iteration) return text[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return output;
};

export default function CrazyLanding() {
  const title = useScramble("AI MARKETING LAB 2026");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX);
  const springY = useSpring(mouseY);

  return (
    <main 
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 mouse-spotlight overflow-hidden"
    >
      {/* 1. BACKGROUND NEURAL GRID */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-150" />
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[180px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/20 rounded-full blur-[180px] animate-cyber-float" />

      {/* 2. HEADER HUD */}
      <nav className="fixed top-6 w-[90%] max-w-7xl z-50 flex justify-between items-center bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full px-8 py-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-lg"><Cpu size={18} /></div>
          <span className="font-mono text-xs font-bold tracking-[.3em]">NEURAL CORE v3</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] uppercase font-bold tracking-widest text-gray-400">
          <a href="#" className="hover:text-purple-400 transition-colors">Documentation</a>
          <a href="#" className="hover:text-purple-400 transition-colors">API Console</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Infrastructure</a>
        </div>
        <Link href="/chat">
          <button className="text-[10px] font-bold bg-white text-black px-4 py-2 rounded-full uppercase hover:scale-105 transition-transform tracking-widest">Connect</button>
        </Link>
      </nav>

      {/* 3. CENTERPIECE (THE HERO) */}
      <section className="relative z-10 text-center flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="px-4 py-1.5 mb-6 border border-purple-500/30 rounded-full bg-purple-500/10 text-purple-400 text-[10px] tracking-[0.4em] uppercase"
        >
          System Authorization Successful
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-mono tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20 uppercase">
          {title}
        </h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="max-w-xl text-gray-400 font-mono text-sm leading-relaxed mb-10 tracking-wide"
        >
          // Fully autonomous SEO architectures. <br/> 
          // Recursive branding models with Gemini Ultra connectivity.
        </motion.p>

        <Link href="/chat">
          <motion.button
            whileHover={{ scale: 1.05, rotate: "1deg" }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-white text-black font-bold px-12 py-5 rounded-xl flex items-center gap-3 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative text-sm tracking-widest uppercase">Start Interaction</span>
            <ArrowRight size={20} className="relative group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </Link>
      </section>

      {/* 4. DATA NODES GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 relative z-10">
          {[
            { label: "Neural Traffic", value: "98.2k", icon: Rocket },
            { label: "Data Siphon", value: "32 ms", icon: Zap },
            { label: "Ghost Copy", value: "Verified", icon: Sparkles },
            { label: "Storage Path", value: "Supabase", icon: Database }
          ].map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
              className="p-6 border border-white/10 bg-white/5 backdrop-blur-lg rounded-2xl flex flex-col gap-3 min-w-[160px]"
            >
              <item.icon size={20} className="text-purple-400" />
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-lg font-mono font-bold">{item.value}</div>
              </div>
            </motion.div>
          ))}
      </div>
    </main>
  );
}