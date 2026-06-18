"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Brain, 
  Bot, 
  ArrowRight, 
  Code, 
  Globe, 
  Shield 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-10 overflow-hidden relative selection:bg-white/20">
      
      {/* 1. FUTURISTIC FLOATING BACKGROUND ORBS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -50, 60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 80, -70, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{
            x: [0, 40, -40, 0],
            y: [0, 100, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[180px]"
        />
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="relative z-10 max-w-7xl mx-auto flex justify-between items-center py-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <div className="bg-gradient-to-tr from-purple-500 to-emerald-400 p-2 rounded-xl shadow-lg shadow-purple-500/20">
            <Cpu className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-[#dcd2c1] to-gray-400">
            AJAY'S AI LAB
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <Link href="/login">
            <button className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/40 transition-colors text-sm font-medium tracking-wide">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
              Get Started
            </button>
          </Link>
        </motion.div>
      </header>

      {/* 3. HERO SECTION */}
      <main className="relative z-10 max-w-7xl mx-auto mt-24 md:mt-32 text-center flex flex-col items-center">
        
        {/* Floating "World AI" Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-400 tracking-wider uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>The Future of World AI is Here</span>
        </motion.div>

        {/* Dynamic Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500"
        >
          AI-Powered <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-emerald-400">
            Growth Engine
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed tracking-wide"
        >
          Deploy next-generation content, target predictive audiences, and optimize search engine indexes continuously with our fully autonomous neural network.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Link href="/chat">
            <button className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-500 text-white font-bold tracking-wider hover:opacity-90 transition-all flex items-center space-x-3 shadow-xl shadow-purple-500/10 border border-white/10">
              <span>ENTER THE LAB</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </main>

      {/* 4. DYNAMIC INTERACTIVE CARDS */}
      <section className="relative z-10 max-w-7xl mx-auto mt-32 grid md:grid-cols-3 gap-6 pb-20">
        
        <Card 
          icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
          title="SEO Intelligence"
          text="Deploy dynamic page structure recommendations and high-authority search term models automatically."
          delay={0.7}
        />

        <Card 
          icon={<Brain className="w-6 h-6 text-indigo-400" />}
          title="Autonomous Copy"
          text="Instantly draft short-form campaigns, customer narratives, and hooks formatted for high conversions."
          delay={0.8}
        />

        <Card 
          icon={<Bot className="w-6 h-6 text-emerald-400" />}
          title="Conversational Engine"
          text="Fully connected with Google Gemini to offer human-grade analytical marketing audits in real-time."
          delay={0.9}
        />

      </section>

    </div>
  );
}

/* 5. GLASSMORPHISM FLOATING CARD COMPONENT */
function Card({ icon, title, text, delay }: { icon: React.ReactNode; title: string; text: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ 
        y: -10, 
        borderColor: "rgba(255,255,255,0.25)",
        backgroundColor: "rgba(255,255,255,0.06)"
      }}
      className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all flex flex-col items-start text-left cursor-pointer group"
    >
      <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-inner">
        {icon}
      </div>

      <h2 className="text-2xl font-bold tracking-wide text-white group-hover:text-emerald-300 transition-colors">
        {title}
      </h2>

      <p className="mt-4 text-gray-400 leading-relaxed text-sm tracking-wide">
        {text}
      </p>
    </motion.div>
  );
}