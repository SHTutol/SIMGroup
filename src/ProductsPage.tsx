import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, Info, Waves, Droplets, Zap, 
  Settings, CheckCircle2, Factory, 
  Layers, Hammer, FlaskConical, Search, Award
} from 'lucide-react';

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All", "Sustainable", "Functional", "Spandex", "Blended", "Print & Design", "RFD"
  ];

  const products = [
    // --- SUSTAINABLE DYES (PRINTED/DYED) ---
    {
      code: "SIM # 3900-B",
      category: "Sustainable",
      subCategory: "Sustainable Dyes (Printed)",
      description: "Coloration done by using less than 1.5 liters / kg fabric. No Washing is required. Very low effluent load.",
      specs: {
        composition: "Re-20 BP Sul, NAT",
        savings: "Water reduced by (80~90)%, Effluent (70~80)% less treated",
        advantages: "Excellent wash down effect, shorter lengths, quick delivery",
        finish: "No smell on fabric"
      },
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 3561",
      category: "Sustainable",
      subCategory: "Sustainable Dyes (Dyed)",
      description: "Richly dyed fabric using sustainable BP Sul dyes with minimal environmental impact.",
      specs: {
        composition: "BP Sul Sustainable Dyes",
        savings: "Water usage reduced by (80~90)%",
        advantages: "Short lead times, no smell, eco-friendly"
      },
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 3082",
      category: "Sustainable",
      subCategory: "Sustainable Printed",
      description: "Sophisticated prints using sustainable reactive dyes for premium fashion.",
      specs: {
        composition: "Sustainable Reactive Dyes",
        quality: "High-definition print",
        gsm: "220 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1524234107056-1c1f48f4367f?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 6504-R",
      category: "Sustainable",
      subCategory: "Sustainable Dyed",
      description: "Eco-friendly dyeing with high color fastness and zero hazardous chemicals.",
      specs: {
        composition: "Cotton Blend",
        gsm: "145 +/- 5%",
        width: "56 inch"
      },
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 1080-Z",
      category: "Sustainable",
      subCategory: "Sustainable Dyes",
      description: "Low water consumption processing for durable and smooth textures.",
      specs: {
        composition: "100% BCI Cotton",
        gsm: "265 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1541604193435-225878996ac3?auto=format&fit=crop&q=80"
    },
    // --- DISCHARGEABLE & PRINT ---
    {
      code: "SIM # 1104-Dis",
      category: "Print & Design",
      subCategory: "Dischargeable Tye Dyes",
      description: "Premium cotton with dischargeable reactive dyes for vintage aesthetic.",
      specs: {
        composition: "100% Cotton",
        quality: "Peach Finish",
        gsm: "275 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 2003-RD AOP",
      category: "Print & Design",
      subCategory: "RD AOP Printing",
      description: "All-over printed fabric using reactive dyes for vibrant and lasting patterns.",
      specs: {
        composition: "Cotton / Viscose Blend",
        quality: "RD Printed",
        gsm: "135 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80"
    },
    // --- BLENDED & SIRO ---
    {
      code: "SIM # 0036",
      category: "Blended",
      subCategory: "Siro Cotton & Tencel",
      description: "High-strength Siro-spun fabric with superior drape and silk-like feel.",
      specs: {
        composition: "70% BCI Cotton, 30% Tencel",
        construction: "SIRO Spun",
        advantages: "Ultra smooth texture"
      },
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 9074",
      category: "Blended",
      subCategory: "Linen & Tencel Blended",
      description: "Breathable linen blend perfect for casual summer sophisticated wear.",
      specs: {
        composition: "55% Tencel, 45% Linen",
        gsm: "160 +/- 5%",
        width: "55 inch"
      },
      image: "https://images.unsplash.com/photo-1563820242250-984bb300938f?auto=format&fit=crop&q=80"
    },
    // --- ELASTOMULTIESTER & SPANDEX ---
    {
      code: "SIM # 0052",
      category: "Functional",
      subCategory: "Elastomultiester Polyester",
      description: "High recovery polyester blend that maintains shape after repeated washes.",
      specs: {
        composition: "Cotton / Tencel / Elastomultiester",
        quality: "Super Stretch",
        gsm: "270 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 0064",
      category: "Functional",
      subCategory: "Elastomultiester Fabrics",
      description: "Advanced technical fabric with excellent tenacity and shape retention.",
      specs: {
        composition: "Polyester / Cotton / Spandex",
        quality: "Technical Blend",
        gsm: "265 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 3383",
      category: "Spandex",
      subCategory: "Poly Cotton Spandex",
      description: "Workwear grade spandex fabric designed for comfort and high-durability.",
      specs: {
        composition: "65% Cotton, 33% Poly, 2% Spandex",
        gsm: "310 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 3309",
      category: "Spandex",
      subCategory: "Poly Cotton Spandex",
      description: "Satin weave spandex fabric for a glossy, high-end commercial finish.",
      specs: {
        composition: "Cotton Poly Spandex",
        quality: "High Density Satin",
        gsm: "290 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 0074",
      category: "Spandex",
      subCategory: "CVC Spandex",
      description: "Balanced poly-cotton ratio with added stretch for versatile uniforms.",
      specs: {
        composition: "55% Cotton, 43% Poly, 2% Spandex",
        gsm: "235 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 0092",
      category: "Spandex",
      subCategory: "CVC Spandex",
      description: "Lightweight stretch CVC fabric optimized for agility and breathability.",
      specs: {
        composition: "Cotton Poly Mix",
        gsm: "180 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80"
    },
    // --- FUNCTIONAL (Paper Touch, AMB, WR) ---
    {
      code: "SIM # 6012-PT",
      category: "Functional",
      subCategory: "Paper Touch Finish",
      description: "Delicate and crisp finish technique for premium poplin garments.",
      specs: {
        composition: "100% BCI Cotton",
        finish: "Functional Paper Touch",
        gsm: "125 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 3108-PT",
      category: "Functional",
      subCategory: "Paper Touch Finish",
      description: "Heavier twill with paper touch finish for structural yet soft apparel.",
      specs: {
        composition: "100% Cotton",
        gsm: "245 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 3821-AMB",
      category: "Functional",
      subCategory: "Anti-Microbial Finish",
      description: "Odor-resistant and bacteria-fighting finish for long-lasting freshness.",
      specs: {
        composition: "98% Cotton 2% Spandex",
        finish: "Anti-Microbial",
        advantages: "Stays fresh longer"
      },
      image: "https://images.unsplash.com/photo-1576091727342-aa003835c67e?auto=format&fit=crop&q=80"
    },
    // --- NATURAL / SUSTAINABLE ---
    {
      code: "SIM # 3916-NAT",
      category: "Sustainable",
      subCategory: "Natural Selection",
      description: "Earth-tone fabrics dyed with minerals and plant-based organic components.",
      specs: {
        composition: "100% Organic Cotton",
        dye: "Natural Organic Pigments",
        gsm: "285 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 1336-NAT",
      category: "Sustainable",
      subCategory: "Natural Dyes",
      description: "Soft Sky color achieved through zero-effluent natural dyeing processes.",
      specs: {
        composition: "BCI Cotton",
        gsm: "240 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1541604193435-225878996ac3?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 2556-Z",
      category: "Sustainable",
      subCategory: "Natural Garment Dyed",
      description: "Unique uneven color textures from heritage natural dyeing techniques.",
      specs: {
        composition: "100% Cotton",
        quality: "3/1 Z Twill",
        gsm: "310 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1524234107056-1c1f48f4367f?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 7074-NAT",
      category: "Sustainable",
      subCategory: "Natural Finish",
      description: "Minimalist aesthetic with completely biodegradable processing.",
      specs: {
        composition: "Recycled/BCI Cotton Mix",
        gsm: "190 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 1358-NAT",
      category: "Sustainable",
      subCategory: "Sustainable Selection",
      description: "Forest green shades using extracts from botanical sources.",
      specs: {
        composition: "100% Cotton",
        gsm: "275 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 6228-NAT",
      category: "Sustainable",
      subCategory: "Eco-Natural",
      description: "Lightweight poplin with natural softness from enzyme-free treatments.",
      specs: {
        composition: "100% Cotton",
        gsm: "120 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1563820242250-984bb300938f?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 1954-NAT",
      category: "Sustainable",
      subCategory: "Natural Dyed",
      description: "Deep indigo-like shades derived from natural mineral sources.",
      specs: {
        composition: "Organic Cotton Blend",
        gsm: "290 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 8061",
      category: "Sustainable",
      subCategory: "Recycled Dyes",
      description: "Innovative dye recycling system for minimal chemical waste footprint.",
      specs: {
        composition: "80% BCI, 20% Recycle",
        gsm: "260 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 3578-NAT",
      category: "Sustainable",
      subCategory: "Global Natural",
      description: "Export-grade natural dyed twill for international eco-conscience brands.",
      specs: {
        composition: "100% Cotton",
        gsm: "305 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&q=80"
    },
    // --- PRINTS & MORE ---
    {
      code: "SIM # 6012-SD AOP",
      category: "Print & Design",
      subCategory: "SD AOP Printing",
      description: "Sustainable dye based all-over print for environmental safety.",
      specs: {
        composition: "100% Cotton Poplin",
        gsm: "125 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1524234107056-1c1f48f4367f?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 1080-SD AOP",
      category: "Print & Design",
      subCategory: "Printed Twill",
      description: "Heavier twill with delicate sustainable prints for outerwear.",
      specs: {
        composition: "100% BCI Cotton",
        gsm: "265 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1541604193435-225878996ac3?auto=format&fit=crop&q=80"
    },
    // --- RFD & DESIGN ---
    {
      code: "SIM # 3901",
      category: "RFD",
      subCategory: "Ready For Dyeing",
      description: "Cleanest RFD base in the market, ready for your signature colors.",
      specs: {
        composition: "98% Cotton 2% Spandex",
        gsm: "260 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 3411-Z",
      category: "RFD",
      subCategory: "RFD Base",
      description: "Dense 3/1 Z Twill construction providing a robust dyeing platform.",
      specs: {
        composition: "100% Cotton",
        gsm: "315 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 3291",
      category: "Print & Design",
      subCategory: "Structural Design",
      description: "Textured dobby structural weave for premium formal trousers.",
      specs: {
        composition: "Cotton Blend",
        quality: "Dobby Weave",
        gsm: "250 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 6455-R",
      category: "Print & Design",
      subCategory: "Design Structural",
      description: "Sustainable herringbone structural fabric with recycled fibers.",
      specs: {
        composition: "Recycled Mix",
        gsm: "230 +/- 5%"
      },
      image: "https://images.unsplash.com/photo-1548810237-775f0a202cb7?auto=format&fit=crop&q=80"
    },
    {
      code: "SIM # 6540-NAT",
      category: "Sustainable",
      subCategory: "Natural Plain",
      description: "Plain weave fabric using natural dyes for a minimalist organic look.",
      specs: {
        composition: "100% BCI Cotton",
        gsm: "140 +/- 5%",
        finish: "Natural Eco-Wash"
      },
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80"
    }
  ];


  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic"
          >
            Product <span className="text-blue-600">Catalog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Explore SIM Fabrics Ltd's diverse range of sustainable and high-performance textile solutions.
          </motion.p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 bg-slate-50 p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by code or category..."
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TOP BEST SELLING ITEMS Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
              TOP BEST <span className="text-blue-600">SELLING ITEMS</span>
            </h1>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">Core qualities for global fashion brands</p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* H&M Section */}
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute right-0 top-0 p-10 opacity-[0.03] rotate-12">
                <CheckCircle2 size={300} />
              </div>
              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-slate-100">
                  <span className="text-3xl font-black italic text-blue-600">H&M</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Qualities</p>
                  <h3 className="text-2xl font-black uppercase italic leading-none">Global Standards</h3>
                </div>
              </div>
              
              <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Article #</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Construction</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Composition</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Weave</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">GSM</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">QTY/Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {[
                      { art: "SIM # 3901-B", const: "20x16+70D/132x60", comp: "98% BCI Cotton + 2% Elastene", weave: "3/1 'S' Twill", gsm: "260", qty: "2.0 Million+" },
                      { art: "SIM # 3847-B", const: "16x16+70D/103x52", comp: "98% BCI Cotton + 2% Elastene", weave: "2/1 'S' Twill", gsm: "240", qty: "2.0 Million+" },
                      { art: "SIM # 3831-B", const: "16x16+70D/114x53", comp: "98% BCI Cotton + 2% Elastene", weave: "3/1 'S' Twill", gsm: "250", qty: "0.6 Million+" },
                      { art: "SIM # 1073", const: "10x7/72x42", comp: "100% BCI Cotton", weave: "3/1 'S' Twill", gsm: "300", qty: "0.6 Million+" },
                      { art: "SIM # 3033", const: "30x20+70D/154x58", comp: "98% BCI Cotton + 2% Elastene", weave: "2/1 'S' Twill", gsm: "190", qty: "0.5 Million" },
                      { art: "SIM # 3701", const: "10+7x12+70D/80x55", comp: "98% BCI Cotton + 2% Elastene", weave: "3/1 'Z' Twill", gsm: "330", qty: "0.5 Million" },
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-white hover:shadow-sm transition-all duration-300">
                        <td className="py-5 text-sm font-black italic text-blue-600">{item.art}</td>
                        <td className="py-5 text-xs font-bold text-slate-600">{item.const}</td>
                        <td className="py-5 text-xs font-medium text-slate-500 italic">{item.comp}</td>
                        <td className="py-5 text-[10px] font-black uppercase text-slate-400">{item.weave}</td>
                        <td className="py-5 text-sm font-black text-slate-900">{item.gsm}</td>
                        <td className="py-5 text-xs font-black bg-blue-50 text-blue-700 px-4 rounded-full inline-block mt-4">{item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* M&S and COSTCO Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900 text-white rounded-[4rem] p-12 border border-white/5 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                  <span className="text-6xl font-black italic">M&S</span>
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-10 flex items-center gap-3">
                  <CheckCircle2 className="text-blue-500" /> Core Selection
                </h3>
                <div className="space-y-6">
                  {[
                    { art: "SIM # 3825", const: "20x16+70D/128x60", qty: "2.0 Million+" },
                    { art: "SIM # 1021", const: "40x20+70D/170x80", qty: "0.35 Million" },
                    { art: "SIM # 6540", const: "40x30/148x100", qty: "0.3 Million" }
                  ].map((it, idx) => (
                    <div key={idx} className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group">
                      <div className="text-xl font-black italic group-hover:text-blue-400 transition-colors">{it.art}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider font-mono">{it.const}</span>
                        <span className="text-xs font-black text-blue-500 uppercase italic">{it.qty} Yearly</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                  <span className="text-6xl font-black italic text-slate-900 uppercase">COSTCO</span>
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-10 text-slate-900 flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" /> Premium Qualities
                </h3>
                <div className="space-y-6">
                  {[
                    { art: "SIM # 3591", const: "Panama Canvas", qty: "3.0 Million+" },
                    { art: "SIM # 3763-B", const: "3/1 'S' Twill", qty: "2.5 Million" },
                    { art: "SIM # 3370", const: "Dobby Weave", qty: "1.5 Million" }
                  ].map((it, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group-hover:border-blue-100 transition-all">
                      <div className="text-xl font-black italic text-slate-900 group-hover:text-blue-600 transition-colors">{it.art}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{it.const}</span>
                        <span className="text-xs font-black text-slate-900 uppercase italic">{it.qty} Yearly</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Sellers & Primark */}
            <div className="grid md:grid-cols-2 gap-8">
               {/* Best Seller Section */}
               <div className="bg-blue-600 text-white rounded-[4rem] p-12 shadow-2xl relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 opacity-20">
                    <Award size={200} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-10 flex items-center gap-3">
                    BEST <span className="text-blue-200">SELLERS</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { art: "SIM # 3827", qty: "0.6M+" },
                      { art: "SIM # 3811", qty: "0.3M+" },
                      { art: "SIM # 3040", qty: "0.3M+" },
                      { art: "SIM # 3735", qty: "0.2M+" }
                    ].map((s, idx) => (
                      <div key={idx} className="p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                        <div className="text-lg font-black italic">{s.art}</div>
                        <div className="text-[10px] font-black uppercase text-blue-200 mt-1">{s.qty} / Year</div>
                      </div>
                    ))}
                  </div>
               </div>

                {/* Primark Section */}
                <div className="bg-slate-50 rounded-[4rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                  <h3 className="text-2xl font-black uppercase italic mb-10 text-slate-900">
                    PRIMARK <span className="text-blue-600">Core</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { art: "SIM # 3561", detail: "98% BCI + 2% Elastene", qty: "1.5M+" },
                      { art: "SIM # 1961", detail: "100% BCI Cotton", qty: "0.5M" },
                      { art: "SIM # 3125-A", detail: "Canvas Quality", qty: "1.0M+" }
                    ].map((p, idx) => (
                      <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-100 flex justify-between items-center group hover:border-blue-600 transition-all">
                        <div>
                          <div className="text-lg font-black italic text-slate-900 group-hover:text-blue-600">{p.art}</div>
                          <div className="text-[9px] font-bold uppercase text-slate-400">{p.detail}</div>
                        </div>
                        <div className="text-xs font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">{p.qty}</div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            {/* GORIA JEANS and Tesco/Walmart Section */}
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[4rem] p-12 shadow-xl border border-slate-100">
                  <h3 className="text-2xl font-black uppercase italic mb-8 text-slate-900">GORIA JEANS <span className="text-blue-600">Selection</span></h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { art: "SIM # 6540", const: "40x30/148x100" },
                      { art: "SIM # 1051", const: "16x12/108x56" },
                      { art: "SIM # 3530", const: "Dobby Weave" },
                      { art: "SIM # 6500", const: "Poplin/Cotton" }
                    ].map((g, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:bg-blue-50 transition-colors">
                        <div className="text-lg font-black italic text-slate-900">{g.art}</div>
                        <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">{g.const}</div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-slate-900 text-white rounded-[4rem] p-12 shadow-2xl relative overflow-hidden">
                  <h3 className="text-2xl font-black uppercase italic mb-8 text-white">Tesco / Walmart / Next</h3>
                  <div className="space-y-4">
                    {[
                      { art: "SIM # 3901", const: "20x16+70D/132-128x60", qty: "2.5M+" },
                      { art: "SIM # 1073", const: "10x7/72x42 (Canvas)", qty: "0.6M+" },
                      { art: "SIM # 3561", const: "10+10RSLx10+70D/88x46", qty: "1.5M+" }
                    ].map((t, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all">
                        <div>
                          <div className="text-lg font-black italic text-white group-hover:text-blue-400">{t.art}</div>
                          <div className="text-[9px] font-bold uppercase text-slate-500 tracking-wider font-mono">{t.const}</div>
                        </div>
                        <div className="text-xs font-black text-blue-500 italic">{t.qty} Yearly</div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </section>



        {/* Existing Products Grid */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
            Full <span className="text-blue-600">Inventory</span>
          </h2>
          <p className="text-slate-500 font-medium tracking-wide font-black uppercase text-[10px]">Our complete range of textile solutions.</p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col product-card"
              >
                {/* Category Badge */}
                <div className="p-8 pb-4 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 bg-blue-50 text-blue-600 rounded-full">
                    {product.category}
                  </span>
                  <div className="text-slate-300 group-hover:text-blue-600 transition-colors">
                    <Info size={20} />
                  </div>
                </div>

                {/* Product Image Area */}
                {product.image && (
                  <div className="px-8 mb-6 overflow-hidden">
                    <div className="h-48 w-full rounded-2xl overflow-hidden bg-slate-100 relative group-hover:shadow-lg transition-shadow">
                      <img 
                        src={product.image} 
                        alt={product.code} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                )}

                <div className="px-8 pb-8 flex-1">
                  <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight uppercase italic">{product.code}</h3>
                  <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">{product.subCategory}</p>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    {product.description}
                  </p>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1 px-3 border-l-2 border-blue-600">
                      Savings
                    </span>
                    <div className="flex gap-2 px-3">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        <Waves size={10} /> Water (80~90)%
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        <Zap size={10} /> Energy Efficient
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 pt-6 border-t border-slate-50">
                    {Object.entries(product.specs || {}).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1 px-3 border-l-2 border-blue-600">
                          {key}
                        </span>
                        <span className="text-xs font-bold text-slate-700 px-3">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 group-hover:bg-blue-600 transition-colors">
                  <button className="w-full text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-colors py-2">
                    Request Specification Sheet
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold uppercase">No products found matching your criteria.</p>
          </div>
        )}

        {/* Technical Capabilities Banner */}
        <section className="mt-32 p-12 bg-slate-950 rounded-[4rem] text-white relative overflow-hidden">

          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Factory size={200} />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-12 uppercase italic leading-none">
              Commitment to <br /><span className="text-blue-500">Circularity</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { label: "Water Savings", value: "up to 90%", icon: <Waves /> },
                { label: "Effluent Load", value: "Minimised", icon: <Droplets /> },
                { label: "Energy Efficiency", value: "High", icon: <Zap /> },
                { label: "BCI Standard", value: "Certified", icon: <CheckCircle2 /> }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5">
                  <div className="text-blue-500 mb-4">{item.icon}</div>
                  <div className="text-xl font-black italic">{item.value}</div>
                  <div className="text-[10px] font-bold uppercase text-slate-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductsPage;
