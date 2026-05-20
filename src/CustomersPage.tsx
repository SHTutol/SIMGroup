import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Handshake, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomersPage = () => {
  // Note for user: To use your own logos, drag and drop them into the 'public/' directory in the file explorer.
  // Then update the 'logo' property with the relative path (e.g., logo: "/logos/my-logo.png").
  const brands = [
    { name: "H&M", logo: "/logo/hm.png" },
    { name: "PULL&BEAR", logo: "/logo/pullandbear.png" },
    { name: "Walmart", logo: "/logo/walmart.png" },
    { name: "lefties", logo: "/logo/lefties.png" },
    { name: "PIAZZA ITALIA", logo: "/logo/piazza_italia.png" },
    { name: "Bershka", logo: "/logo/bershka.png" },
    { name: "Auchan", logo: "/logo/auchan.png" },
    { name: "TESCO", logo: "/logo/tesco.png" },
    { name: "elPulpo", logo: "/logo/elpulpo.png" },
    { name: "ONE GROUP", logo: "/logo/one_group.png" },
    { name: "Lidl", logo: "/logo/lidl.png" },
    { name: "kiK", logo: "/logo/kik.png" },
  ];

  const keyCustomers = [
    { name: "ANANTA GROUP", logo: "/logo/ananta_group.png" },
    { name: "Majumder Group", logo: "/logo/majumder_group.png" },
    { name: "EURO DESIGN", logo: "/logo/euro_design.png" },
    { name: "KDS GROUP", logo: "/logo/kds_group.png" },
    { name: "NORP KNIT", logo: "/logo/norp_knit.png" },
    { name: "Sepal Group", logo: "/logo/sepal_group.png" },
    { name: "BAYAZID DRESSES", logo: "/logo/bayazid_dresses.png" },
    { name: "PRUDENT GROUP", logo: "/logo/prudent_group.png" },
    { name: "MS Group", logo: "/logo/ms_group.png" },
  ];

  return (
    <div className="bg-white font-sans min-h-screen text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-72 md:pt-12 md:pb-96 bg-slate-900 overflow-hidden text-white min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="Corporate Partnership"
            className="w-full h-full object-cover opacity-30 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] -mr-96 -mt-96 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] -ml-48 -mb-48" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="pt-40">
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none uppercase">
              Global <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                Relationships
              </span>
            </h1>
            <p className="text-lg md:text-2xl font-medium max-w-none mx-auto text-slate-300 leading-relaxed uppercase tracking-tight mt-8">
              A commitment to excellence that binds us with world’s most renowned brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="relative py-32 bg-white border-y border-slate-100 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/3 opacity-[0.03] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" 
            alt="Retail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-20 bg-green-100/50 border-2 border-green-200 py-3 rounded-xl shadow-sm backdrop-blur-sm">
            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">BRAND</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brands.map((client, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
                className="p-8 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center group transition-all"
              >
                <div className="h-16 w-full mb-3 flex items-center justify-center transition-all duration-500">
                  {client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-full max-w-[100px] object-contain group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const initials = client.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="font-black text-slate-900 text-lg uppercase tracking-tighter bg-slate-100 h-12 w-12 rounded-xl flex items-center justify-center border border-slate-200 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">${initials}</div>`;
                      }}
                    />
                  ) : (
                    <div className="font-black text-slate-900 text-lg uppercase tracking-tighter bg-slate-100 h-12 w-12 rounded-xl flex items-center justify-center border border-slate-200 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                  )}
                </div>
                <div className="text-[11px] font-black text-slate-600 uppercase tracking-tight mt-1 group-hover:text-blue-600 transition-colors">
                  {client.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Customer Section */}
      <section className="relative py-32 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
            alt="Collaboration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-24 bg-green-50 border-2 border-green-100 py-3 rounded-xl shadow-sm backdrop-blur-sm">
            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">KEY CUSTOMER</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {keyCustomers.map((client, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-10 bg-white border border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-center group transition-all shadow-sm hover:shadow-xl"
              >
                <div className="h-24 w-full mb-4 flex items-center justify-center transition-all duration-500 overflow-hidden">
                  {client.logo && client.logo !== "" ? (
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-full max-w-[140px] object-contain group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const initials = client.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="h-20 w-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-900 font-black text-3xl shadow-inner border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-all">${initials}</div>`;
                      }}
                    />
                  ) : (
                    <div className="h-20 w-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-900 font-black text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner border border-slate-200">
                      {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                  )}
                </div>
                <div className="text-sm font-black text-slate-700 transition-colors uppercase tracking-tight leading-tight group-hover:text-blue-600">
                  {client.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partnerships Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[4rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px] group"
            >
              <img 
                src="https://www.passionned.com/wp/wp-content/uploads/crm-768x512.png?v=0854" 
                alt="Customer Relationship Concept"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex flex-col justify-end p-12 text-white">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Customer Relationship</h3>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest leading-loose">
                  Harnessing digital integration to create transparent, real-time value for our partners.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[4rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px] group"
            >
              <img 
                src="https://cdn.corporatefinanceinstitute.com/assets/alliance-in-strategy-1024x480.jpg" 
                alt="Global Handshake Network"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent flex flex-col justify-end p-12 text-white">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Strategic Alliance</h3>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest leading-loose">
                  Our network extends globally, built on the rock-solid foundation of mutual trust.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Presence Map (Illustration placeholder) */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover grayscale invert" 
            alt="World Map"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-10">A Network Across <span className="text-blue-500">Continents</span></h2>
          <p className="text-xl max-w-2xl mx-auto text-slate-400 leading-relaxed">
            Our products reach retail shelves in Europe, North America, and Australia, representing the best of Bangladeshi craftsmanship.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 text-white text-center border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
          © {new Date().getFullYear()} SIM GROUP GLOBAL RELATIONS. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default CustomersPage;
