import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Droplets, Zap, Leaf, Truck, Settings, CheckCircle2, Waves } from 'lucide-react';

const SimFabricsKnitDyeingPage = () => {
  const knittingSpecs = [
    { label: "Single Jersey", gsm: "100 - 300" },
    { label: "Spandex", gsm: "140 - 250" },
    { label: "Jersey", gsm: "180 - 400" },
    { label: "French Terry", gsm: "200 - 400" },
    { label: "Fleece", gsm: "160 - 250" },
    { label: "Pique", gsm: "140 - 450" },
    { label: "Rib/ Interlock", gsm: "100 - 300" }
  ];

  const finishingMachines = [
    { count: "2 SET", name: "SLITTING & SQUEEZING" },
    { count: "3 SET", name: "STENTER" },
    { count: "1 SET", name: "SQUEEZER" },
    { count: "1 SET", name: "DRYER" },
    { count: "1 SET", name: "BRUSH" },
    { count: "1 SET", name: "TUBE COMPACTOR" },
    { count: "2 SET", name: "FABRIC INSPECTION" },
    { count: "2 SET", name: "OPEN COMPACTOR" }
  ];

  return (
    <div className="bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Hero Header */}
      <section className="relative py-48 bg-slate-950 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80" 
            alt="Dyeing Factory" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none uppercase">
                SIM FABRICS LTD. 
                <span className="text-blue-500 block text-6xl md:text-6xl mt-6 font-medium">(KNIT DYEING Unit)</span>
            </h1>
            <div className="h-2 w-120 bg-blue-600 mx-auto rounded-full mb-10"></div>
            <p className="text-xl md:text-3xl font-light max-w-4xl mx-auto text-slate-300 leading-relaxed uppercase tracking-widest">
                A State-of-the-art Composite Textile Facility
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { label: "Total Monthly Capacity", value: "1,450", unit: "Tons", color: "bg-blue-600" },
                    { label: "High Speed Machines", value: "20+", unit: "Unit", color: "bg-indigo-600" },
                    { label: "Dyeing Solutions", value: "21", unit: "Machines", color: "bg-emerald-600" }
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -10 }}
                        className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 text-center"
                    >
                        <div className={`w-16 h-1 w-24 mx-auto mb-6 ${stat.color}`}></div>
                        <div className="text-6xl font-black text-slate-900 mb-2">{stat.value}</div>
                        <div className="text-slate-500 font-bold uppercase tracking-widest mb-4">{stat.unit}</div>
                        <div className="text-slate-400 text-sm font-medium uppercase">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 1. Knitting Facilities */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                        <Factory size={16} /> Knitting Division
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-12 text-slate-900 leading-tight uppercase">
                        Knitting <br /><span className="text-blue-600">Facilities</span>
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-8 mb-12">
                        <div className="p-8 bg-slate-900 text-white rounded-3xl">
                            <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-tighter">DIA Range</div>
                            <div className="text-4xl font-black italic">28" - 42"</div>
                        </div>
                        <div className="p-8 bg-blue-600 text-white rounded-3xl">
                            <div className="text-sm font-bold text-blue-200 mb-2 uppercase tracking-tighter">Gauze</div>
                            <div className="text-4xl font-black italic">18 - 28</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {knittingSpecs.map((spec, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="font-bold text-slate-700">{spec.label}</span>
                                <span className="font-black text-blue-600">{spec.gsm} <span className="text-[10px] text-slate-400">GSM</span></span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="lg:w-1/2 relative">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full -z-10 blur-3xl opacity-50"></div>
                    <div className="p-10 bg-white rounded-[4rem] shadow-2xl border border-slate-200">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <h4 className="text-7xl font-black text-slate-900">250 <span className="text-2xl text-slate-400">Ton</span></h4>
                                <p className="text-xs font-black uppercase text-blue-600 tracking-widest mt-2">Monthly Capacity</p>
                            </div>
                            <div className="text-right">
                                <h4 className="text-5xl font-black text-slate-900">20+</h4>
                                <p className="text-xs font-black uppercase text-slate-400 tracking-widest">High Speed Machines</p>
                            </div>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80" 
                            className="w-full h-[400px] object-cover rounded-3xl mb-10" 
                            alt="Knitting Machine"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-slate-50 rounded-2xl text-center border border-slate-100">
                                <span className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Machine Brand</span>
                                <span className="text-xl font-black text-slate-800">FUKAHAMA</span>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl text-center border border-slate-100">
                                <span className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Efficiency</span>
                                <span className="text-xl font-black text-emerald-600">99.2%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. Dyeing Facilities */}
      <section className="py-32 bg-slate-900 text-white relative">
        <div className="absolute top-0 right-0 p-24 opacity-5">
            <Droplets size={400} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-24">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                    <Droplets size={16} /> Wet Processing
                </div>
                <h2 className="text-5xl md:text-8xl font-black mb-8 leading-none uppercase italic">
                    Dyeing <span className="text-blue-500">Facilities</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-12 mt-12">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl"><Zap size={24} /></div>
                        <span className="font-black uppercase tracking-tighter text-2xl">Efficient</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 rounded-2xl"><Settings size={24} /></div>
                        <span className="font-black uppercase tracking-tighter text-2xl">Energy Saver</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-600 rounded-2xl"><Leaf size={24} /></div>
                        <span className="font-black uppercase tracking-tighter text-2xl">Eco Friendly</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="group relative rounded-[4rem] overflow-hidden shadow-2xl h-[600px]">
                    <img 
                        src="https://images.unsplash.com/photo-1590216654030-9988e7d44692?auto=format&fit=crop&q=80" 
                        className="w-full h-full object-cover opacity-60" 
                        alt="Dyeing Machines"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 p-16 w-full bg-gradient-to-t from-slate-950 to-transparent">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">Total Dyeing Power</div>
                                <div className="text-8xl font-black">21</div>
                                <div className="text-lg font-black uppercase mt-2">Machines Installed</div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                    <div className="text-[10px] font-black uppercase text-blue-300">Bulk Machines</div>
                                    <div className="text-3xl font-black">14</div>
                                </div>
                                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                    <div className="text-[10px] font-black uppercase text-blue-300">Sample Machines</div>
                                    <div className="text-3xl font-black">07</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex-1 bg-white p-12 rounded-[4rem] text-slate-900 relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <h4 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div> Bulk Monthly Capacity
                            </h4>
                            <div className="flex items-baseline gap-4">
                                <span className="text-8xl font-black text-slate-900 tracking-tighter italic">500</span>
                                <span className="text-3xl font-black text-blue-600 uppercase italic">Tons</span>
                            </div>
                            <p className="text-slate-400 mt-6 text-sm font-medium italic">Scaling precision for global demand.</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-blue-600 p-12 rounded-[4rem] text-white relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <h4 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded-lg"></div> Sample Monthly Capacity
                            </h4>
                            <div className="flex items-baseline gap-4">
                                <span className="text-8xl font-black text-white tracking-tighter italic">05</span>
                                <span className="text-3xl font-black text-blue-200 uppercase italic">Tons</span>
                            </div>
                            <p className="text-blue-200 mt-6 text-sm font-medium italic">Prototyping excellence at speed.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand Partners */}
            <div className="mt-24 pt-24 border-t border-slate-800">
                <div className="text-center mb-16">
                    <span className="text-xs font-black uppercase text-slate-500 tracking-[0.4em]">Technology Partners</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
                    {["FONG'S", "DILMENLER", "BRAZZOLI", "THIES"].map((brand, i) => (
                        <div key={i} className="text-center text-2xl font-black text-white tracking-tighter uppercase italic">{brand}</div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* 3. Finishing Facilities */}
      <section className="py-32 bg-white flex flex-col items-center">
        <div className="container mx-auto px-6">
            <div className="text-center mb-24">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                    <Settings size={16} /> Post Processing
                </div>
                <h2 className="text-5xl md:text-8xl font-black mb-8 text-slate-900 uppercase">
                    Finishing <span className="text-indigo-600 italic">Facilities</span>
                </h2>
                <div className="h-2 w-32 bg-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 text-center">
                {finishingMachines.map((machine, i) => (stat(machine, i)))}
            </div>

            <div className="group relative rounded-[4rem] overflow-hidden shadow-2xl h-[500px]">
                <img 
                    src="https://images.unsplash.com/photo-1590632386992-0b190f845763?auto=format&fit=crop&q=80" 
                    className="w-full h-full object-cover" 
                    alt="Finishing Unit"
                />
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-all duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="p-16 bg-white/90 backdrop-blur-md rounded-[3rem] text-center shadow-2xl border border-white">
                        <div className="text-8xl font-black text-slate-900 tracking-tighter">700 <span className="text-3xl text-indigo-600">Ton</span></div>
                        <div className="text-sm font-black uppercase text-slate-400 tracking-widest mt-2">Monthly Finishing Capacity</div>
                    </div>
                </div>
            </div>

            {/* Brand Partners for Finishing */}
            <div className="mt-24 pt-24 border-t border-slate-100">
                <div className="flex flex-wrap justify-center gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
                    {["TUBE-TEX", "ICOMATEX", "DONG NAM", "LAFER", "BIANCO", "HELINT", "IL SUNG"].map((brand, i) => (
                        <div key={i} className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">{brand}</div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase italic leading-none">
                Experience Professional <br />Textile Manufacturing
            </h2>
            <button className="px-12 py-6 bg-white text-blue-600 rounded-full font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl">
                Contact Our Team
            </button>
        </div>
      </section>
    </div>
  );
};

// Helper stat card component for finishing
const stat = (machine, i) => {
    return (
        <motion.div 
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl transition-all"
        >
            <div className="text-blue-600 font-black text-3xl mb-2">{machine.count}</div>
            <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest leading-tight">{machine.name}</div>
        </motion.div>
    );
}

export default SimFabricsKnitDyeingPage;
