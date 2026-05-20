import React from 'react';
import { motion } from 'framer-motion';
import { 
  Factory, Settings, Zap, ShieldCheck, 
  ArrowRight, Activity, Globe, CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MHSMLPage = () => {
  // Current year for footer
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1558444479-c84851727d21?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Spinning Mill" 
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#6A0DAD] to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-[#228B22] text-white text-sm font-black tracking-[0.3em] mb-8 uppercase">
              SIM Group Concern
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none uppercase mb-8 tracking-tighter">
              Mozaffar Hossain <br />
              <span className="text-[#FF4500]">Spinning Mills Ltd.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl leading-relaxed">
              Global leaders in high-tenacity yarn production, leveraging Swiss and Japanese technology for a sustainable future.
            </p>
            <div className="mt-12 flex gap-6">
              <a href="#capacity" className="px-10 py-5 bg-[#6A0DAD] text-white font-black rounded-2xl uppercase tracking-widest hover:bg-[#FF4500] transition-all shadow-2xl shadow-purple-500/20">
                Explore Capacity
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INDUSTRIAL OVERVIEW (RING & ROTOR) */}
      <section id="capacity" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-[#6A0DAD] uppercase mb-6 tracking-tighter">Production Powerhouse</h2>
            <div className="h-2 w-24 bg-[#FF4500] mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Ring Spinning Unit */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[4rem] shadow-xl border border-slate-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Factory size={150} />
              </div>
              <h3 className="text-3xl font-black text-[#6A0DAD] uppercase mb-8">Ring Spinning Unit</h3>
              <div className="space-y-8">
                <div className="flex items-end gap-4">
                  <span className="text-7xl font-black text-[#FF4500]">20</span>
                  <span className="text-xl font-bold text-slate-400 uppercase mb-3">Tons / Day</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-3xl">
                    <p className="text-[#228B22] font-black text-2xl">35,000</p>
                    <p className="text-xs font-bold uppercase text-slate-500 tracking-widest">Current Spindles</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border-l-4 border-[#FF4500]">
                    <p className="text-[#FF4500] font-black text-2xl">+15,000</p>
                    <p className="text-xs font-bold uppercase text-slate-500 tracking-widest">Projected</p>
                  </div>
                </div>
                <p className="text-[18px] text-slate-600 font-medium">
                  Specializing in <span className="font-bold text-slate-900">20-40 Count</span> yarn including 10, 16, & 20 Core Spun & Slub varieties.
                </p>
              </div>
            </motion.div>

            {/* Rotor Spinning Unit */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[#6A0DAD] p-12 rounded-[4rem] shadow-xl text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                <Settings size={150} />
              </div>
              <h3 className="text-3xl font-black uppercase mb-8">Rotor Spinning Unit</h3>
              <div className="space-y-8">
                <div className="flex items-end gap-4">
                  <span className="text-7xl font-black text-[#FF4500]">15</span>
                  <span className="text-xl font-bold opacity-60 uppercase mb-3">Tons / Day</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-md">
                    <p className="text-white font-black text-2xl">11</p>
                    <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest">High-End Machines</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-md">
                    <p className="text-white font-black text-2xl">2,540</p>
                    <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Specialized Heads</p>
                  </div>
                </div>
                <p className="text-[18px] opacity-80 font-medium">
                  Project executed by <span className="font-bold text-white uppercase">Rieter</span> for counts ranging from <span className="font-bold text-white uppercase">7-20</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TECHNOLOGY PARTNERS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <h2 className="text-3xl font-black text-slate-900 uppercase">Global Technology Partners</h2>
            <div className="flex gap-4">
               <div className="px-6 py-3 bg-slate-50 rounded-2xl font-black text-[#6A0DAD]">RIETER</div>
               <div className="px-6 py-3 bg-slate-50 rounded-2xl font-black text-[#6A0DAD]">SAVIO</div>
               <div className="px-6 py-3 bg-slate-50 rounded-2xl font-black text-[#6A0DAD]">ELECTRO-JET</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Precision Engineering", desc: "Switzerland's Rieter technology for yarn consistency." },
              { title: "Smart Automation", desc: "Electro-Jet Spain for robotic material handling." },
              { title: "Quality Control", desc: "Savio Italy for world-class winding solutions." },
              { title: "Sustainable Energy", desc: "Eco-friendly spinning systems for reduced carbon footprint." }
            ].map((box, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-[#6A0DAD] transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <Zap className="text-[#FF4500]" size={24} />
                </div>
                <h4 className="font-black text-slate-900 uppercase mb-4">{box.title}</h4>
                <p className="text-slate-500 font-medium">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BIOLOGICAL ETP (SUSTAINABILITY) */}
      <section className="py-32 bg-[#fdf2f2] relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-12 bg-[#228B22]"></div>
                <span className="text-[#228B22] font-black uppercase tracking-widest text-sm">Environmental Leadership</span>
              </div>
              <h2 className="text-5xl font-black text-[#6A0DAD] uppercase mb-10 leading-tight">
                Advanced Biological <br /> <span className="text-[#228B22]">ETP Solution</span>
              </h2>
              
              <div className="space-y-6">
                <motion.div whileHover={{ x: 10 }} className="flex gap-6 items-start bg-white p-8 rounded-[3rem] shadow-sm">
                  <div className="p-4 bg-[#f0fff4] rounded-2xl">
                    <CheckCircle2 className="text-[#228B22]" size={32} />
                  </div>
                  <div>
                    <h5 className="font-black text-xl text-slate-900 uppercase mb-2">97.9% Efficiency</h5>
                    <p className="text-slate-500 text-[18px]">Suspended solid removal using PVA GEL Technology from Koray Japan.</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 10 }} className="flex gap-6 items-start bg-white p-8 rounded-[3rem] shadow-sm">
                  <div className="p-4 bg-[#f0fff4] rounded-2xl">
                    <ShieldCheck className="text-[#228B22]" size={32} />
                  </div>
                  <div>
                    <h5 className="font-black text-xl text-slate-900 uppercase mb-2">Eco-Balance</h5>
                    <p className="text-slate-500 text-[18px]">Self-sustaining mechanical system protecting the local ecosystem.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ইটিপি ইমেজ গ্রিড */}
            <div className="relative">
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white h-[600px]">
                <img 
                  src="https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&q=80" 
                  className="w-full h-full object-cover" 
                  alt="ETP Plant" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80";
                  }}
                />
              </div>
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 w-64 h-64 rounded-[3rem] border-[8px] border-white shadow-2xl overflow-hidden z-20 hidden md:block"
              >
                <img 
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80" 
                    className="w-full h-full object-cover" 
                  alt="PVA Gel Technology" 
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCTION EXCELLENCE GALLERY */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
              Production <span className="text-[#6A0DAD]">Excellence</span>
            </h2>
            <p className="text-slate-500 font-bold mt-2 italic uppercase tracking-widest text-[10px]">Inside Mozaffar Hossain Spinning Mills Ltd.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 group relative overflow-hidden rounded-[3rem] h-[500px] border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Factory Exterior" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-12 flex items-end">
                <p className="text-white font-black text-2xl uppercase italic">State-of-the-Art Infrastructure</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[3rem] h-[500px] border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Spinning Unit" 
              />
              <div className="absolute inset-0 bg-[#6A0DAD]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Activity className="text-white" size={64} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER / CONTACT CTA */}
      <footer className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black uppercase mb-8 tracking-tighter">Ready to Partner with MHSML?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
            Join the elite circle of global garment manufacturers who trust our yarn for their premium collections.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-3">
              <Activity className="text-[#FF4500]" />
              <span className="font-black uppercase text-xs">DSE: MHSML</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="text-[#228B22]" />
              <span className="font-black uppercase text-xs">Export Oriented</span>
            </div>
          </div>
          <div className="mt-16 pt-16 border-t border-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
            © {currentYear} SIM Group — MHSML Division. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MHSMLPage;
