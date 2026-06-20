"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Cpu, Rocket, ArrowRight, Zap, Database,
  Brain, Globe, TrendingUp, BarChart3, Activity,
  MessageSquare, Users, Target, Shield, Clock,
  ChevronRight, ChevronDown, Star, Check, Copy,
  ArrowUpRight, Play, Pause, Quote, Heart,
  Twitter, Linkedin, Github, Send, Bot,
  Workflow, Layers, Code2, Terminal, Wand2,
  Gauge, Wifi, Fingerprint, Infinity, Lightbulb,
  FileText, Search, Megaphone, Share2, Eye,
  ThumbsUp, Award, Crown, Gem, Menu
} from "lucide-react";
import Link from "next/link";

// ===== HOOKS =====
const useScramble = (text: string, trigger: boolean) => {
  const [output, setOutput] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  useEffect(() => {
    if (!trigger) return;
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
  }, [text, trigger]);
  return output;
};

const Counter = ({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black font-mono bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <div className="text-[10px] text-white/30 uppercase tracking-widest mt-2">{label}</div>
    </div>
  );
};

// ===== DATA =====
const features = [
  {
    icon: Brain,
    title: "AI Content Engine",
    subtitle: "Generate & optimize",
    description: "Create SEO-optimized blog posts, ad copy, and social content in seconds. Our AI understands your brand voice and target audience.",
    bullets: ["Blog posts & articles", "Ad copy variations", "Social media captions", "Email sequences"],
    color: "purple",
  },
  {
    icon: Globe,
    title: "SEO Dominator",
    subtitle: "Rank & track",
    description: "Find profitable keywords, track rankings across 50+ countries, and get actionable recommendations to outrank competitors.",
    bullets: ["Keyword research", "Rank tracking", "Competitor analysis", "Site audits"],
    color: "cyan",
  },
  {
    icon: Target,
    title: "Ad Optimizer",
    subtitle: "Launch & scale",
    description: "AI-powered ad creation and optimization. Test hundreds of variations simultaneously and scale winning campaigns automatically.",
    bullets: ["Multi-platform ads", "A/B testing", "Budget optimization", "Performance analytics"],
    color: "emerald",
  },
  {
    icon: BarChart3,
    title: "Analytics Suite",
    subtitle: "Measure & grow",
    description: "Real-time dashboards that connect all your marketing data. From traffic to conversions, everything in one neural interface.",
    bullets: ["Unified dashboard", "Custom reports", "Conversion tracking", "AI insights"],
    color: "amber",
  },
];

const useCases = [
  {
    id: "seo",
    icon: Search,
    title: "SEO Teams",
    desc: "Find untapped keywords, audit your site, and climb rankings with AI-guided recommendations. Our users see 40%+ organic growth within 90 days.",
    stat: "40%",
    statLabel: "Avg organic growth",
  },
  {
    id: "content",
    icon: FileText,
    title: "Content Creators",
    desc: "Generate SEO-optimized articles, social posts, and email sequences that actually convert. Save 15+ hours per week on content creation.",
    stat: "15h",
    statLabel: "Saved per week",
  },
  {
    id: "ads",
    icon: Megaphone,
    title: "Ad Managers",
    desc: "Launch and optimize campaigns across Google, Meta, and TikTok from one dashboard. AI finds winning combinations while you sleep.",
    stat: "3.2x",
    statLabel: "Avg ROAS improvement",
  },
  {
    id: "social",
    icon: Share2,
    title: "Social Teams",
    desc: "Schedule, analyze, and optimize your social presence across all platforms. AI suggests best posting times and content types.",
    stat: "2.8x",
    statLabel: "Engagement increase",
  },
];

const testimonials = [
  {
    quote: "This tool replaced 3 separate subscriptions. The AI content engine alone saves us 20 hours weekly.",
    name: "Priya Sharma",
    role: "Growth Lead, TechVentures",
    avatar: "PS",
    color: "purple",
  },
  {
    quote: "Finally an SEO tool that doesn't require a PhD to use. The AI recommendations are actually actionable.",
    name: "Marcus Chen",
    role: "Founder, DigitalNomad.io",
    avatar: "MC",
    color: "cyan",
  },
  {
    quote: "Went from 0 to 50K monthly organic traffic in 6 months. The rank tracker and keyword suggestions are gold.",
    name: "Sarah Johnson",
    role: "Marketing Director, ScaleUp",
    avatar: "SJ",
    color: "emerald",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    icon: Zap,
    features: ["5 AI generations/day", "100 keyword lookups", "Basic analytics", "1 project", "Community support"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    icon: Crown,
    features: ["Unlimited AI generations", "10,000 keyword lookups", "Advanced analytics", "10 projects", "Priority support", "Custom branding"],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    icon: Globe,
    features: ["Everything in Pro", "Unlimited projects", "API access", "White-label", "Dedicated manager", "SLA guarantee"],
    cta: "Contact Us",
    popular: false,
  },
];

const faqs = [
  { q: "How is this different from other AI tools?", a: "We combine multiple AI models (Groq, Gemini, OpenAI) with real-time marketing data. It's not just chat — it's a complete marketing operating system." },
  { q: "Is there a free trial?", a: "Yes! The Starter plan is free forever with generous limits. No credit card required." },
  { q: "Which AI model do you use?", a: "We use a multi-model approach: Groq for speed, Gemini for creativity, and OpenAI as backup. You always get the best response." },
  { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no questions asked. Cancel with one click." },
  { q: "Is my data secure?", a: "Your data is encrypted with AES-256. We never train on your content or share your data with third parties." },
];

// ===== COMPONENT =====
export default function HomePage() {
  const [heroInView, setHeroInView] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState("seo");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const title = useScramble("Ajay's AI Lab", heroInView);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useEffect(() => setHeroInView(true), []);

  return (
    <main className="relative bg-[#020205] text-white overflow-hidden">
      
      {/* ===== NAVIGATION ===== */}
      <motion.nav
        style={{ opacity: headerOpacity }}
        className="fixed top-0 w-full z-50 border-b border-white/[0.04] bg-[#020205]/80 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="p-2 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl"
            >
              <Cpu className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-mono text-sm font-bold tracking-[.2em]">AJAY_CORE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase font-bold tracking-widest text-white/40">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#use-cases" className="hover:text-purple-400 transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:block text-[10px] font-bold text-white/60 hover:text-white uppercase tracking-widest">Login</Link>
            <Link href="/signup">
              <button className="text-[10px] font-bold bg-white text-black px-5 py-2.5 rounded-xl uppercase hover:scale-105 transition-transform tracking-widest">
                Get Started
              </button>
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {mobileMenu && (
          <div className="md:hidden border-t border-white/[0.04] bg-[#020205] p-6 space-y-4">
            {["Features", "Solutions", "Pricing", "FAQ"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-white/60 hover:text-white">{item}</a>
            ))}
            <Link href="/login" className="block text-sm text-white/60 hover:text-white">Login</Link>
          </div>
        )}
      </motion.nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_120%,rgba(34,211,238,0.08),transparent)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-purple-500/20 rounded-full bg-purple-500/5"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-purple-300/80 tracking-[0.3em] uppercase font-mono">Neural Marketing OS — Now Live</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black font-mono tracking-tighter leading-[0.85] mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20">
              {title}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-white/40 font-mono text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            One platform for all your marketing. AI-powered SEO, content, ads, and analytics — <br className="hidden md:block" />
            built for founders and lean teams who want to move fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold px-10 py-4 rounded-2xl flex items-center gap-3 overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.3)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative text-sm tracking-[0.2em] uppercase">Start Free</span>
                <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative bg-white/5 border border-white/10 text-white font-bold px-10 py-4 rounded-2xl flex items-center gap-3 overflow-hidden backdrop-blur-sm"
              >
                <Terminal size={18} />
                <span className="text-sm tracking-[0.2em] uppercase">Live Demo</span>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            <Counter end={500} suffix="+" label="Active Users" />
            <Counter end={50} suffix="K+" label="Keywords Tracked" />
            <Counter end={99.7} suffix="%" label="AI Accuracy" />
            <Counter end={3} suffix="x" label="Avg Growth" />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-white/10"
        >
          <ChevronDown size={30} />
        </motion.div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <p className="text-[10px] text-purple-400 tracking-[0.4em] uppercase mb-4">// Capabilities</p>
            <h2 className="text-4xl md:text-6xl font-black font-mono tracking-tighter mb-4">
              Everything you need<br />to grow faster
            </h2>
            <p className="text-white/30 font-mono text-sm max-w-xl mx-auto">
              Four powerful tools. One neural interface. Zero complexity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -3 }}
                className="group p-8 bg-white/[0.02] border border-white/[0.06] rounded-3xl hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-500"
              >
                <div className={`p-3 bg-${feature.color}-500/10 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon size={24} className={`text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                <p className="text-[11px] text-purple-400/60 uppercase tracking-wider mb-4">{feature.subtitle}</p>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <Check size={14} className={`text-${feature.color}-400 shrink-0`} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES SECTION ===== */}
      <section id="use-cases" className="relative py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] text-cyan-400 tracking-[0.4em] uppercase mb-4">// Solutions</p>
            <h2 className="text-4xl md:text-5xl font-black font-mono tracking-tighter mb-4">
              Built for your team
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {useCases.map((uc) => (
              <button
                key={uc.id}
                onClick={() => setActiveUseCase(uc.id)}
                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeUseCase === uc.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-white/[0.02] text-white/40 border border-white/[0.04] hover:text-white hover:border-white/10'
                }`}
              >
                {uc.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {useCases.filter(uc => uc.id === activeUseCase).map((uc) => (
              <motion.div
                key={uc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto text-center"
              >
                <div className="inline-flex items-center gap-3 p-6 bg-white/[0.02] border border-white/[0.06] rounded-3xl mb-8">
                  <div className="p-4 bg-purple-500/10 rounded-2xl">
                    <uc.icon size={40} className="text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black font-mono">{uc.stat}</div>
                    <div className="text-xs text-white/30">{uc.statLabel}</div>
                  </div>
                </div>
                <p className="text-white/50 text-lg leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="relative py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] text-emerald-400 tracking-[0.4em] uppercase mb-4">// Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-black font-mono tracking-tighter">
              Loved by builders
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="p-8 bg-white/[0.02] border border-white/[0.06] rounded-3xl hover:border-purple-500/20 transition-all"
              >
                <Quote size={30} className={`text-${t.color}-400/30 mb-4`} />
                <p className="text-white/70 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-${t.color}-500/20 rounded-full flex items-center justify-center text-sm font-bold text-${t.color}-400`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-[10px] text-white/30">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="relative py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] text-amber-400 tracking-[0.4em] uppercase mb-4">// Pricing</p>
            <h2 className="text-4xl md:text-5xl font-black font-mono tracking-tighter mb-4">
              Start free, scale up
            </h2>
            <p className="text-white/30 font-mono text-sm">No hidden fees. Cancel anytime.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative p-8 bg-white/[0.02] border rounded-3xl transition-all ${
                  tier.popular 
                    ? 'border-purple-500/30 bg-purple-500/[0.03]' 
                    : 'border-white/[0.06] hover:border-purple-500/20'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="p-3 bg-white/5 rounded-2xl w-fit mb-6">
                  <tier.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black font-mono">{tier.price}</span>
                  <span className="text-white/30 text-sm">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <button className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                    tier.popular
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}>
                    {tier.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="relative py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] text-purple-400 tracking-[0.4em] uppercase mb-4">// FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black font-mono tracking-tighter">
              Got questions?
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border border-white/[0.06] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-all"
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={18} className="text-white/30" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-white/50 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative bg-gradient-to-br from-purple-600/10 to-cyan-600/10 border border-purple-500/20 rounded-3xl p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-cyan-600/5 to-purple-600/5 blur-3xl rounded-full" />
            <Sparkles size={40} className="text-purple-400 mx-auto mb-6 relative" />
            <h2 className="text-3xl md:text-5xl font-black font-mono tracking-tighter mb-4 relative">
              Ready to launch?
            </h2>
            <p className="text-white/40 font-mono text-sm mb-10 relative max-w-md mx-auto">
              Join 500+ marketers already growing with neural AI.
            </p>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-white text-black font-bold px-12 py-5 rounded-2xl text-sm tracking-[0.2em] uppercase shadow-[0_0_80px_rgba(139,92,246,0.3)]"
              >
                Get Started Free
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.04] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Cpu size={16} className="text-purple-400" />
            <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Ajay Core v3.0</span>
          </div>
          <div className="flex gap-6 text-[10px] text-white/20 tracking-widest uppercase">
            <a href="#" className="hover:text-white/60 transition-colors">Docs</a>
            <a href="#" className="hover:text-white/60 transition-colors">API</a>
            <a href="#" className="hover:text-white/60 transition-colors">Status</a>
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
          <p className="text-[10px] text-white/10 font-mono">© 2026 NEURAL SYSTEMS</p>
        </div>
      </footer>
    </main>
  );
}