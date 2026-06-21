"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, Wand2, ImageIcon, Loader2, Share2 } from "lucide-react";
import Image from "next/image";

export default function ImageLab() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.imageUrl) setImageUrl(data.imageUrl);
    } catch (e) {
      console.error("Lab Error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4">
      {/* GLOWING AMBIENCE */}
      <div className="fixed inset-0 bg-purple-600/5 pointer-events-none blur-[150px]" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-start">
        
        {/* LEFT SIDE: COMMAND PANEL */}
        <div className="space-y-8 relative z-10">
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-2 italic uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Visual Lab Engine
            </h2>
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest">Authorized_Creative_System_V2</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6 focus-within:border-purple-500/40 transition-colors">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe a cinematic marketing ad with futuristic neon lighting..."
              className="w-full bg-transparent border-none focus:ring-0 text-gray-300 placeholder:text-white/10 text-lg resize-none min-h-[120px]"
            />
            
            <button
              onClick={generateImage}
              disabled={isLoading || !prompt}
              className="w-full h-16 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              Synthesize Image
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 italic opacity-30 text-[10px] font-mono tracking-tighter uppercase font-bold text-center">
             <div className="p-4 border border-white/10 rounded-xl">RESOLUTION: 1440PX</div>
             <div className="p-4 border border-white/10 rounded-xl">CORE: FLUX_S</div>
             <div className="p-4 border border-white/10 rounded-xl">STATUS: IDLE</div>
          </div>
        </div>

        {/* RIGHT SIDE: VIEWPORT */}
        <div className="relative group min-h-[500px] flex items-center justify-center border border-white/5 bg-white/[0.01] rounded-3xl overflow-hidden backdrop-blur-sm">
           <AnimatePresence mode="wait">
             {imageUrl ? (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 className="relative w-full aspect-[4/3] group"
               >
                  <Image 
                    src={imageUrl} 
                    alt="AI Generated Marketing" 
                    fill 
                    className="object-cover"
                  />
                  {/* OVERLAY ACTIONS */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                     <button className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"><Download size={24}/></button>
                     <button className="p-4 bg-white/10 border border-white/20 text-white rounded-full hover:scale-110 transition-transform backdrop-blur-md"><Share2 size={24}/></button>
                  </div>
               </motion.div>
             ) : (
               <div className="flex flex-col items-center gap-4 text-white/10">
                  <ImageIcon size={100} strokeWidth={1} />
                  <p className="font-mono text-xs uppercase tracking-widest font-black">Waiting for Data Stream</p>
               </div>
             )}
           </AnimatePresence>

           {isLoading && (
              <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 border-t-2 border-purple-500 rounded-full animate-spin" />
                    <Wand2 className="absolute inset-0 m-auto text-purple-400 animate-pulse" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono font-black uppercase text-purple-400 tracking-[0.5em] mb-2 animate-pulse">Computing Image Pixels</span>
                    <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="h-full w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                       />
                    </div>
                  </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}