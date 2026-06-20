"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Cpu, Mail, Lock, ArrowRight, Fingerprint, Shield } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#0a0a0f]">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]" />
      <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse" />
      
      {/* Grid */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 opacity-[0.04]">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{ top: `${15 + i * 15}%`, transform: 'rotate(-15deg)' }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-2.5 bg-gradient-to-br from-cyan-600 to-purple-600 rounded-xl shadow-lg shadow-cyan-500/25">
            <Fingerprint className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">Access Terminal</p>
            <p className="text-[10px] text-cyan-400/60 tracking-[0.3em] uppercase">Authentication Required</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#0c0c14]/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl shadow-cyan-500/5">
          <h1 className="text-2xl font-bold text-white text-center mb-1">
            Welcome Back
          </h1>
          <p className="text-white/30 text-sm text-center mb-8">
            Authenticate to continue
          </p>

          <form onSubmit={login} className="space-y-4">
            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-white/20 outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-white/20 outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-400" />
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  Access Terminal <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.06]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-[10px] text-white/20 bg-[#0c0c14] uppercase tracking-widest">Neural ID</span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-white/30">
            Not initialized?{" "}
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Create Account →
            </Link>
          </p>
        </div>

        {/* Bottom hint */}
        <p className="text-center text-[10px] text-white/10 mt-6 font-mono tracking-widest">
          ENCRYPTED CONNECTION • AES-256
        </p>
      </div>
    </div>
  );
}