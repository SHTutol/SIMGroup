import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Factory, Cpu, Layers, 
  CheckCircle2, Gauge, Maximize2, Zap,
  Droplets, Wind, Thermometer, FlaskConical
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SimFabricsPage = () => {
  const currentYear = new Date().getFullYear();
  const [activeDivision, setActiveDivision] = useState<'weaving' | 'dyeing' | 'aop'>('weaving');

  const weavingUnits = [
    {
      id: "Unit - 1",
      title: "TSUDAKOMA Air Jet",
      count: "140 Units",
      desc: "High-speed air jet technology for precision weaving.",
      icon: <Zap className="text-blue-500" />
    },
    {
      id: "Unit - 2",
      title: "PICANOL Air Jet",
      count: "94 Units",
      desc: "Brand new weaving machines optimized for fabric consistency.",
      icon: <Cpu className="text-orange-500" />
    },
    {
      id: "Unit - 3",
      title: "Rapier Weaving",
      count: "30 Units",
      desc: "Wider Width (210 CM) machines equipped with Dobby facility for complex patterns.",
      icon: <Maximize2 className="text-purple-500" />
    },
    {
      id: "Unit - 4",
      title: "New TSUDAKOMA",
      count: "26 Units",
      desc: "Latest generation Air Jet units for high-performance output.",
      icon: <Zap className="text-blue-400" />
    }
  ];

  const dyeingFeatures = [
    {
      title: "Automated Dyeing",
      desc: "High-pressure, high-temperature (HPHT) dyeing systems for vibrant and durable colors.",
      icon: <Droplets className="text-indigo-500" />
    },
    {
      title: "Advanced Finishing",
      desc: "Stenters and compactors ensuring precise fabric shrinkage and hand-feel control.",
      icon: <Wind className="text-teal-500" />
    },
    {
      title: "Chemical Lab",
      desc: "State-of-the-art color matching and testing laboratory for international quality standards.",
      icon: <FlaskConical className="text-rose-500" />
    },
    {
      title: "Heat Recovery",
      desc: "Eco-friendly heat exchange systems to minimize energy waste during high-temp processes.",
      icon: <Thermometer className="text-orange-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={
              activeDivision === 'weaving' 
                ? "https://images.unsplash.com/photo-1558444479-c84851727d21?auto=format&fit=crop&q=80" 
                : activeDivision === 'dyeing'
                ? "https://images.unsplash.com/photo-1620712943543-bcc4628c9456?auto=format&fit=crop&q=80"
                : "https://images.unsplash.com/photo-1504194104404-433180773017?auto=format&fit=crop&q=80"
            } 
            className="w-full h-full object-cover opacity-40 transition-all duration-700" 
            alt="SIM Fabrics Factory" 
          />
          <div className={`absolute inset-0 bg-gradient-to-r transition-colors duration-700 ${
            activeDivision === 'weaving' ? 'from-blue-900/80' : 
            activeDivision === 'dyeing' ? 'from-indigo-900/80' : 
            'from-rose-900/80'
          } to-transparent`}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeDivision}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="max-w-4xl"
            >
              <span className={`inline-block px-6 py-2 rounded-full text-white text-sm font-black tracking-[0.3em] mb-8 uppercase transition-colors ${
                activeDivision === 'weaving' ? 'bg-blue-600' : 
                activeDivision === 'dyeing' ? 'bg-indigo-600' : 
                'bg-rose-600'
              }`}>
                {activeDivision === 'weaving' ? 'Elite Weaving Facility' : 
                 activeDivision === 'dyeing' ? 'Advanced Processing Unit' : 
                 'Multi-Color Printing Excellence'}
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-none uppercase mb-8 tracking-tighter">
                SIM FABRICS <br />
                <span className={
                  activeDivision === 'weaving' ? 'text-blue-400' : 
                  activeDivision === 'dyeing' ? 'text-indigo-400' : 
                  'text-rose-400'
                }>LIMITED</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl leading-relaxed">
                {activeDivision === 'weaving' 
                  ? 'Redefining textile production through high-speed automated weaving and German engineering excellence.'
                  : activeDivision === 'dyeing'
                  ? 'Delivering precision colors and sustainable finishes through world-class dyeing and chemical processing.'
                  : 'Masters of All Over Print (AOP) with up to 10-color precision on both woven and knit fabrics.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* DIVISION SELECTOR */}
      <section className="relative z-30 -mt-10 py-4">
        <div className="container mx-auto px-6">
          <div className="flex bg-white p-2 rounded-[2rem] shadow-2xl border border-slate-100 max-w-4xl mx-auto overflow-hidden">
            <button 
              onClick={() => setActiveDivision('weaving')}
              className={`flex-1 py-4 px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeDivision === 'weaving' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Weaving
            </button>
            <button 
              onClick={() => setActiveDivision('dyeing')}
              className={`flex-1 py-4 px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeDivision === 'dyeing' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Dyeing & Finishing
            </button>
            <button 
              onClick={() => setActiveDivision('aop')}
              className={`flex-1 py-4 px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeDivision === 'aop' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'text-slate-400 hover:text-slate-600'}`}
            >
              All Over Print (AOP)
            </button>
          </div>
        </div>
      </section>

      {/* DYNAMIC CONTENT AREA */}
      <AnimatePresence mode="wait">
        {activeDivision === 'weaving' ? (
          <motion.div 
            key="weaving-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* WEAVING STATS */}
            <section className="py-24">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { val: "290", label: "High Speed Machines", sub: "Global Tech Integration" },
                    { val: "2.5M", label: "Monthly Capacity", sub: "Yards / Meters per Month" },
                    { val: "100K+", label: "Floor Area", sub: "Total Industrial Space" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 text-center">
                      <h3 className="text-7xl font-black text-blue-600 mb-2 tracking-tighter">{stat.val}</h3>
                      <p className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4">{stat.label}</p>
                      <div className="h-1 w-12 bg-blue-100 mx-auto rounded-full mb-4"></div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WEAVING UNITS */}
            <section className="py-24 bg-slate-50">
              <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-6">Machinery Breakdown</h2>
                  <div className="h-2 w-24 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {weavingUnits.map((unit, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -10 }}
                      className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-8 items-center"
                    >
                      <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0">
                        {unit.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full">{unit.id}</span>
                          <span className="text-2xl font-black text-slate-900 uppercase">{unit.title}</span>
                        </div>
                        <p className="text-3xl font-black text-blue-600 mb-4">{unit.count}</p>
                        <p className="text-slate-500 font-medium leading-relaxed">{unit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : activeDivision === 'dyeing' ? (
          <motion.div 
            key="dyeing-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* DYEING STATS */}
            <section className="py-24">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { val: "50+", label: "Process Vessels", sub: "Automated Control" },
                    { val: "1.2M", label: "Monthly Output", sub: "Dyed Fabric Yards" },
                    { val: "ISO", label: "Certified Grade", sub: "Environmental Standards" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 text-center">
                      <h3 className="text-7xl font-black text-indigo-600 mb-2 tracking-tighter">{stat.val}</h3>
                      <p className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4">{stat.label}</p>
                      <div className="h-1 w-12 bg-indigo-100 mx-auto rounded-full mb-4"></div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* DYEING FEATURES */}
            <section className="py-24 bg-slate-50">
              <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-6">Processing Excellence</h2>
                  <div className="h-2 w-24 bg-indigo-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {dyeingFeatures.map((feature, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -10 }}
                      className="bg-white p-10 rounded-[3rem] shadow-lg border border-slate-100 text-center"
                    >
                      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-black text-slate-900 uppercase mb-4">{feature.title}</h4>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div 
            key="aop-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* AOP STATS */}
            <section className="py-24">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { val: "300K", label: "Woven Per Month", sub: "Total Yards Capacity" },
                    { val: "120", label: "Knit Per Month", sub: "Total Tons Capacity" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 text-center">
                      <h3 className="text-7xl font-black text-rose-600 mb-2 tracking-tighter">{stat.val}</h3>
                      <p className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4">{stat.label}</p>
                      <div className="h-1 w-12 bg-rose-100 mx-auto rounded-full mb-4"></div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* AOP PROCESSES & MACHINE */}
            <section className="py-24 bg-slate-50">
              <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-6">AOP Printing Process</h2>
                  <div className="h-2 w-24 bg-rose-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* JILONG MACHINE CARD */}
                  <div className="lg:col-span-1 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center mb-8">
                      <Factory className="text-rose-600" size={48} />
                    </div>
                    <span className="px-4 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase rounded-full mb-4">Prime Machinery</span>
                    <h3 className="text-3xl font-black text-slate-900 uppercase mb-2">JILONG Rotary</h3>
                    <p className="text-xl font-black text-rose-600 mb-6 tracking-widest uppercase italic">Up to 10 Colors</p>
                    <p className="text-slate-500 font-medium leading-relaxed italic">High-precision multi-color industrial rotary printing system.</p>
                  </div>

                  {/* PROCESSES GRID */}
                  <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Pigment", color: "bg-blue-50 text-blue-700" },
                      { name: "Rubber", color: "bg-orange-50 text-orange-700" },
                      { name: "Discharge", color: "bg-purple-50 text-purple-700" },
                      { name: "Burnout", color: "bg-emerald-50 text-emerald-700" },
                      { name: "Fluorescent", color: "bg-yellow-50 text-yellow-700" },
                      { name: "Reactive", color: "bg-indigo-50 text-indigo-700" },
                      { name: "Sulphur", color: "bg-neutral-50 text-neutral-700" },
                      { name: "Indigo", color: "bg-blue-50 text-blue-900" }
                    ].map((proc, i) => (
                      <div key={i} className={`p-6 rounded-3xl flex items-center justify-center font-black uppercase text-[10px] tracking-[0.2em] shadow-sm hover:shadow-md transition-shadow text-center ${proc.color}`}>
                        {proc.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MACHINERY PROFILE & PARTNERS (Dynamic Based on Division) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase mb-8 leading-tight">
                Global Technology <br /> <span className={
                  activeDivision === 'weaving' ? 'text-blue-600' : 
                  activeDivision === 'dyeing' ? 'text-indigo-600' : 
                  'text-rose-600'
                }>Partners</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-12">
                Our facilities are powered by the world's most advanced machine manufacturers, ensuring every inch of fabric meets international standards.
              </p>
              
              <div className="space-y-6">
                {activeDivision === 'weaving' ? (
                  <>
                    {[
                      { t: "Karl Mayer (Germany)", d: "Advanced Sizing systems for warp preparation." },
                      { t: "Zell Pr-comet (Germany)", d: "High-end chemical sizing and processing." },
                      { t: "Air Jet Excellence", d: "Tsudakoma & Picanol integration for zero-defect weaving." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 items-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <CheckCircle2 className="text-blue-600" size={32} />
                        <div>
                          <h4 className="font-black text-slate-900 uppercase">{item.t}</h4>
                          <p className="text-sm text-slate-500">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : activeDivision === 'dyeing' ? (
                  <>
                    {[
                      { t: "Thies (Germany)", d: "Automated yarn and fabric dyeing machines." },
                      { t: "Bruckner (Germany)", d: "World-leading stenter frames for perfect finishing." },
                      { t: "Fongs (China)", d: "High-efficiency environment-friendly dyeing solutions." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 items-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <CheckCircle2 className="text-indigo-600" size={32} />
                        <div>
                          <h4 className="font-black text-slate-900 uppercase">{item.t}</h4>
                          <p className="text-sm text-slate-500">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { t: "JILONG (China)", d: "State-of-the-art Rotary Printing machinery." },
                      { t: "Color Precision", d: "Digital and analog color registration for 10-color prints." },
                      { t: "Knit & Woven", d: "Versatile systems for multiple fabric constructions." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 items-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <CheckCircle2 className="text-rose-600" size={32} />
                        <div>
                          <h4 className="font-black text-slate-900 uppercase">{item.t}</h4>
                          <p className="text-sm text-slate-500">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {(activeDivision === 'weaving' 
                ? [
                    { name: "KARL MAYER", img: "https://images.unsplash.com/photo-1581091221433-35f532697133?auto=format&fit=crop&q=80" },
                    { name: "PICANOL", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" },
                    { name: "TSUDAKOMA", img: "https://images.unsplash.com/photo-1558444479-c84851727d21?auto=format&fit=crop&q=80" },
                    { name: "ZELL-EM", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80" }
                  ]
                : activeDivision === 'dyeing' 
                ? [
                    { name: "THIES", img: "https://images.unsplash.com/photo-1563206767-5b18f218e7de?auto=format&fit=crop&q=80" },
                    { name: "BRUCKNER", img: "https://images.unsplash.com/photo-1504194104404-433180773017?auto=format&fit=crop&q=80" },
                    { name: "FONGS", img: "https://images.unsplash.com/photo-1620712943543-bcc4628c9456?auto=format&fit=crop&q=80" },
                    { name: "LAIP", img: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=80" }
                  ]
                : [
                    { name: "JILONG", img: "https://images.unsplash.com/photo-1504194104404-433180773017?auto=format&fit=crop&q=80" },
                    { name: "ROTARY TECH", img: "https://images.unsplash.com/photo-1558444479-c84851727d21?auto=format&fit=crop&q=80" },
                    { name: "COLOR PRECISION", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" },
                    { name: "MHSML PRINT", img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80" }
                  ]
              ).map((partner, i) => (
                <div key={i} className="relative group overflow-hidden rounded-[2.5rem] h-48 border border-slate-100">
                  <img src={partner.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60" alt={partner.name} />
                  <div className={`absolute inset-0 transition-all flex items-center justify-center ${
                    activeDivision === 'weaving' ? 'bg-blue-600/10 group-hover:bg-blue-600/40' : 
                    activeDivision === 'dyeing' ? 'bg-indigo-600/10 group-hover:bg-indigo-600/40' : 
                    'bg-rose-600/10 group-hover:bg-rose-600/40'
                  }`}>
                    <span className="text-white font-black uppercase text-xs tracking-widest">{partner.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black uppercase mb-8 tracking-tighter">SIM FABRICS LIMITED</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium lowercase italic">
            WAY FORWARD TO SUSTAINABILITY
          </p>
          <div className="flex justify-center gap-10">
             <div className="flex items-center gap-3">
               <Layers className={
                 activeDivision === 'weaving' ? 'text-blue-500' : 
                 activeDivision === 'dyeing' ? 'text-indigo-500' : 
                 'text-rose-500'
               } />
               <span className="font-black uppercase text-xs tracking-widest text-slate-400 italic">
                 {activeDivision === 'weaving' ? '2.5 Million Yards Weaving' : 
                  activeDivision === 'dyeing' ? '1.2 Million Yards Dyeing' : 
                  '300K Yds & 120 Ton Printing'} Capacity
               </span>
             </div>
          </div>
          <div className="mt-16 pt-16 border-t border-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
            © {currentYear} SIM Group — SIM Fabrics {
              activeDivision === 'weaving' ? 'Weaving' : 
              activeDivision === 'dyeing' ? 'Dyeing' : 
              'AOP'
            } Division.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimFabricsPage;
