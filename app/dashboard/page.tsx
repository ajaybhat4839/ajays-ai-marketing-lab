"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, Cpu, Zap, Brain, Globe, BarChart3,
  MessageSquare, Users, Target, Bell, Search, Menu,
  ChevronRight, ArrowUpRight, Star, CheckCircle2,
  AlertTriangle, Radio, Command, Layers, Settings,
  Workflow, Bot, FileText, Megaphone, Mail, Rocket,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// ===== COMPONENTS =====
const GlowingCard = ({ children }: { children: React.ReactNode }) => (
  <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-500 group">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };
  return (
    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono uppercase tracking-wider ${colors[status]}`}>
      {status}
    </span>
  );
};

const Sparkline = ({ data }: { data: number[] }) => (
  <svg width="80" height="30" className="opacity-60">
    <path
      d={`M0 ${30 - data[0]} ${data.map((d, i) => `L${i * (80 / (data.length - 1))} ${30 - d}`).join(' ')}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-purple-400"
    />
  </svg>
);

// ===== TOOLS =====
const tools = [
  { title: "AI Chatbot", desc: "Chat with AI assistant", icon: Bot, link: "/chat" },
  { title: "SEO Analyzer", desc: "Analyze SEO and keywords", icon: Search, link: "/dashboard/seo" },
  { title: "ATS Resume", desc: "Create ATS optimized resume", icon: FileText, link: "/ats-resume-generator" },
  { title: "Ad Generator", desc: "Generate marketing ads", icon: Megaphone, link: "/dashboard/ads" },
  { title: "Email Generator", desc: "Create AI emails", icon: Mail, link: "/dashboard/email" },
  { title: "Blog Writer", desc: "Write SEO blog posts", icon: FileText, link: "/dashboard/blog" },
];

// ===== MAIN COMPONENT =====
export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setMounted(true);
    const int = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(int);
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const metrics = [
    { label: "Total Traffic", value: "847.2K", change: 12.5, icon: Globe },
    { label: "AI Tasks", value: "1,247", change: 8.3, icon: Brain },
    { label: "Conversion", value: "24.8%", change: -2.1, icon: Target },
    { label: "Response", value: "32ms", change: 15.7, icon: Zap },
  ];

  const projects = [
    { id: 1, name: "SEO Domination", status: 'active' as const, progress: 78, aiScore: 94, icon: Globe },
    { id: 2, name: "Social Blast", status: 'active' as const, progress: 45, aiScore: 88, icon: Users },
    { id: 3, name: "Email Flow", status: 'paused' as const, progress: 92, aiScore: 76, icon: MessageSquare },
    { id: 4, name: "Ad Campaign", status: 'completed' as const, progress: 100, aiScore: 99, icon: Target },
  ];

  const activities = [
    { id: 1, type: 'success' as const, message: 'AI Content Generator completed task #4821', time: '2 min ago' },
    { id: 2, type: 'warning' as const, message: 'SEO Crawler detected 3 broken links', time: '15 min ago' },
    { id: 3, type: 'info' as const, message: 'New competitor analysis available', time: '1 hour ago' },
    { id: 4, type: 'success' as const, message: 'Email campaign sent to 12K users', time: '2 hours ago' },
  ];

  const sparklineData = [10, 25, 15, 35, 20, 30, 28];

  return (
    <div className="flex h-screen text-white overflow-hidden relative" style={{ background: 'radial-gradient(ellipse at 30% 20%, #0f0c29 0%, #0a0a1a 40%, #020210 100%)' }}>
      
      {/* ===== SIDEBAR ===== */}
      <motion.aside animate={{ width: sidebarOpen ? 280 : 0 }} className="h-full border-r border-white/[0.04] bg-[#060612]/90 backdrop-blur-2xl flex flex-col overflow-hidden z-30 shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="p-2 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl">
              <Cpu className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <p className="text-sm font-bold tracking-wider">NEURAL CORE</p>
              <p className="text-[9px] text-purple-400/60 tracking-[0.3em]">v3.0</p>
            </div>
          </div>
          <nav className="space-y-1">
            {[
              { id: 'overview', icon: Command, label: 'Overview' },
              { id: 'projects', icon: Layers, label: 'Projects' },
              { id: 'analytics', icon: BarChart3, label: 'Analytics' },
              { id: 'ai-tools', icon: Brain, label: 'AI Tools' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${activeTab === item.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/[0.03]'}`}>
                <item.icon className="w-4 h-4" /><span className="font-medium">{item.label}</span>
                {activeTab === item.id && <motion.div layoutId="activeTab" className="w-1 h-4 bg-purple-500 rounded-full ml-auto" />}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-white/[0.04] space-y-2">
          <Link href="/chat"><button className="w-full p-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2"><Zap className="w-4 h-4" /> AI Terminal</button></Link>
          <button onClick={logout} className="w-full p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-sm font-medium flex items-center justify-center gap-2 text-red-400 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </motion.aside>

      {/* ===== MAIN ===== */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/[0.04] px-6 flex items-center justify-between bg-[#060612]/70 backdrop-blur-2xl shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/[0.05] rounded-lg"><Menu className="w-4 h-4 text-white/60" /></button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
              <input placeholder="Search..." className="w-64 pl-9 pr-4 py-2 bg-white/[0.02] border border-white/[0.06] rounded-xl text-sm text-white/60 placeholder:text-white/20 outline-none focus:border-purple-500/30" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {mounted && <span className="text-[10px] text-white/20 font-mono tracking-wider hidden sm:block">{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>}
            <button className="relative p-2 hover:bg-white/[0.05] rounded-lg"><Bell className="w-4 h-4 text-white/60" /><span className="absolute top-1 right-1 w-4 h-4 bg-purple-500 rounded-full text-[8px] flex items-center justify-center font-bold">3</span></button>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">A</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* ===== WELCOME ===== */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, Ajay</h1>
            <p className="text-white/30 text-sm font-mono">{'>'} Neural systems operational. All tools ready.</p>
          </motion.div>

          {/* ===== TOOLS GRID ===== */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {tools.map((tool, idx) => (
              <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Link href={tool.link}>
                  <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:bg-white/[0.04] hover:border-purple-500/20 hover:scale-[1.02] transition-all duration-300 text-center group h-full flex flex-col items-center justify-center gap-2">
                    <tool.icon size={28} className="text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold">{tool.title}</span>
                    <span className="text-[9px] text-white/30 hidden md:block">{tool.desc}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ===== METRICS ===== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1 }}>
                <GlowingCard>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-purple-500/10 rounded-xl"><metric.icon className="w-4 h-4 text-purple-400" /></div>
                    <div className={`flex items-center gap-1 text-[10px] ${metric.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{metric.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ChevronRight className="w-3 h-3 rotate-90" />}{Math.abs(metric.change)}%</div>
                  </div>
                  <p className="text-2xl font-bold font-mono mb-1">{metric.value}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">{metric.label}</p>
                  <div className="mt-2"><Sparkline data={sparklineData} /></div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>

          {/* ===== PROJECTS & ACTIVITY ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GlowingCard>
                <div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold">Active Projects</h2><button className="text-[10px] text-purple-400 uppercase tracking-widest flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></button></div>
                <div className="space-y-3">
                  {projects.map((project, idx) => (
                    <motion.div key={project.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center gap-3 p-3 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl border border-white/[0.04] transition-all">
                      <div className="p-2 bg-purple-500/10 rounded-xl shrink-0"><project.icon className="w-4 h-4 text-purple-400" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1"><span className="font-medium text-sm truncate">{project.name}</span><StatusBadge status={project.status} /></div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-white/[0.04] rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" /></div>
                          <span className="text-[10px] text-white/30 font-mono">{project.progress}%</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0"><div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /><span className="text-sm font-bold">{project.aiScore}</span></div><span className="text-[9px] text-white/20">AI Score</span></div>
                    </motion.div>
                  ))}
                </div>
              </GlowingCard>
            </div>
            <div>
              <GlowingCard>
                <div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold">Live Activity</h2><div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /><span className="text-[9px] text-emerald-400/60 uppercase tracking-wider">Live</span></div></div>
                <div className="space-y-1">
                  {activities.map((activity, idx) => (
                    <motion.div key={activity.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex gap-2 p-2 hover:bg-white/[0.02] rounded-xl transition-all">
                      {activity.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />}
                      {activity.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />}
                      {activity.type === 'info' && <Radio className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />}
                      <div className="min-w-0"><p className="text-xs text-white/70 truncate">{activity.message}</p><p className="text-[10px] text-white/20 mt-0.5">{activity.time}</p></div>
                    </motion.div>
                  ))}
                </div>
              </GlowingCard>
            </div>
          </div>

          {/* ===== QUICK ACTIONS ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { icon: Brain, label: 'AI Writer' },
              { icon: Globe, label: 'SEO Audit' },
              { icon: Users, label: 'Audience' },
              { icon: Workflow, label: 'Automation' },
            ].map((action, idx) => (
              <motion.button key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + idx * 0.1 }} whileHover={{ scale: 1.02 }} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl text-left hover:bg-purple-500/5 hover:border-purple-500/20 transition-all group">
                <div className="p-2 bg-purple-500/10 rounded-xl w-fit mb-2"><action.icon className="w-4 h-4 text-purple-400" /></div>
                <p className="font-semibold text-sm">{action.label}</p>
              </motion.button>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}