import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Beaker, Lightbulb, TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RDPage = () => {
  return (
    <div className="bg-white font-sans min-h-screen text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-900 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://img.magnific.com/premium-photo/textile-engineer-conducting-advanced-fabric-research-modern-lab_1304707-2480.jpg?semt=ais_hybrid&w=740&q=80" 
            className="w-full h-full object-cover opacity-40" 
            alt="R&D Lab"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="pt-16">
            <span className="inline-block bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.4em] mb-8">
              Innovating Tomorrow
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none uppercase">
              RESEARCH & <br /><span className="text-blue-500 italic">DEVELOPMENT</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-slate-300">
              Pushing the boundaries of textile technology through continuous scientific exploration and innovative engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fabric Innovation Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Fabric <span className="text-blue-600">Innovation</span></h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Objectives */}
            <div className="space-y-6">
              {[
                { t: "New Fabric Innovation & Development", desc: "Developing next-generation luxury structures and functional materials." },
                { t: "Continuous Fabric Quality Improvement", desc: "Rigorous refinement of processes to ensure world-class quality." },
                { t: "Research On Price & Process Loss Reduction", desc: "Optimizing efficiency to deliver maximum value." },
                { t: "Special Finish on Fabric", desc: "Advanced surface treatments for enhanced feel and durability." },
                { t: "New Print Design Innovation", desc: "Pioneering creative digital and mechanical printing techniques." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-slate-50 rounded-2xl border-l-4 border-l-blue-600 border border-slate-100 flex gap-6 items-center group hover:bg-white hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <span className="font-black">0{i+1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight leading-tight mb-1">{item.t}</h3>
                    <p className="text-slate-500 font-medium text-xs">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Fabric Samples Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "https://images.surferseo.art/512b1b0d-e90e-4cb5-8904-19c7d0500406.png",
                "https://chiuvention.com/wp-content/uploads/2024/04/fabric-ir-lab-dyeing.jpeg",
                "https://innotex.com.hk/wp-content/uploads/2023/12/pretreatment-process-2.jpg",
                "https://www.polyestermfg.com/wp-content/uploads/2021/11/Fabric-Finishing-Process%EF%BC%881%EF%BC%89-2.jpg"
              ].map((img, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white"
                >
                  <img src={img} className="w-full h-full object-cover" alt={`Fabric Sample ${i+1}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testing Lab Highlight */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <img 
                src="https://www.enviotech.com.bd/images/product/textile/Laboratoire-physique.jpg" 
                className="rounded-[4rem] shadow-2xl w-full h-[600px] object-cover" 
                alt="Testing Laboratory" 
              />
              <div className="absolute inset-0 rounded-[4rem] bg-blue-600/10 mix-blend-overlay"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600 rounded-[3rem] -z-10 opacity-10 animate-pulse"></div>
            </div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
                <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">Quality Assurance</span>
              </div>
              <h2 className="text-5xl font-black mb-8 text-slate-900 leading-tight uppercase tracking-tighter">
                Advanced <span className="text-blue-600">Testing Lab</span>
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                Our world-class testing lab ensures every yard of fabric meets stringent global quality parameters through high-precision scientific evaluation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  "Spectrophotometer (Data Color)",
                  "Digital Martindale Abrasion & Pilling Tester",
                  "Electronic Strength Tester (TITAN-05)",
                  "Fully Automatic Washing Shrinkage Tester",
                  "Light Fastness Tester",
                  "Rubbing Tester",
                  "Dryer",
                  "Digital Shaker",
                  "Electronic Balance",
                  "VeriVide Light BOX",
                  "PH Meter",
                  "Perspiration Machine"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-800 font-bold group">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                      <Microscope size={14} />
                    </div>
                    <span className="text-sm tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment Gallery Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Precision <span className="text-blue-600">Instruments</span></h2>
              <p className="text-slate-500 font-medium">A glimpse into our high-precision technical setup.</p>
            </div>
            <div className="flex gap-4">
              <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Spectrophotometer", img: "https://www.emc-lab.de/media/content_single/emc-61pc-uv.png" },
              { name: "Strength Tester", img: "https://www.gester-instruments.com/js/htmledit/kindeditor-en/attached/20200711/20200711154032_88625.jpg" },
              { name: "Martindale Tester", img: "https://darongtester.com/wp-content/uploads/2023/05/YGB401T-Martindale-pilling-and-abrasion-tester-scaled-e1704970537410-1536x852-optimized.jpg" },
              { name: "Chemical Lab", img: "https://www.acrossinternational.com.au/web/image/28268-29c10fb8/Chemistry%20Lab%20Equipment%20.jpg" },
              { name: "Washing Tester", img: "https://en.refondtex.com/data/upload/2022-10-30/635e4724db99a.jpg" },
              { name: "Light Box", img: "https://labasiabd.com/wp-content/uploads/2021/02/Verivide-Light-Box-CAC-60-5-2-Feet-5-Options.jpg" },
              { name: "Micro-Analysis", img: "https://images.squarespace-cdn.com/content/v1/608bd20afc841c1e93bac72e/09544bbc-5bcc-4f0e-9219-4345009ccd86/Textile.png" },
              { name: "Data Center", img: "https://cdn.prod.website-files.com/6372566a009c668000cc7cd6/639b6eda40e76ba09613b7e5_Leaf-Spine-Topology-Architecture_updated.png" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-lg"
              >
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-white text-xs font-black uppercase tracking-widest mb-1 opacity-70">Laboratory</p>
                  <h4 className="text-white text-xl font-black uppercase tracking-tight">{item.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 text-white text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
          © {new Date().getFullYear()} SIM GROUP R&D DIVISION. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default RDPage;
