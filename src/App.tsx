import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
// আপনার ইম্পোর্ট করা আইকনগুলো
import { 
  Factory, Palette, Repeat, Waves, Printer, 
  Shirt, CircleDot, TestTube2, Utensils, Globe, 
  Layers, Construction, Milestone, Target, Users, 
  ShieldCheck, Leaf, HeartPulse, Building2, Quote, Truck, Car, 
  CheckCircle2, Mail, MapPin, Phone, Menu, X, Award,
  ArrowUpRight, ArrowRight,
  ChevronDown,
  Facebook, Youtube, Instagram,
  Link as LinkIcon // lucide-react এর Link কে নাম পরিবর্তন করলাম যাতে সংঘাত না হয়
} from 'lucide-react';

// পেজ পরিবর্তনের জন্য ইম্পোর্ট
import { BrowserRouter as Router, Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import { SIM_LOGO } from './constants';

const MotionLink = motion(RouterLink);

import MHSMLPage from './MHSMLPage'; // আপনার তৈরি করা ফাইলটি
import SimFabricsPage from './SimFabricsPage';
import RDPage from './RDPage';
import CustomersPage from './CustomersPage';
import EnvironmentPage from './EnvironmentPage';
import CertificationsPage from './CertificationsPage';
import SimFabricsKnitDyeingPage from './SimFabricsKnitDyeingPage';
import ProductsPage from './ProductsPage';
import GalleryPhotosPage from './GalleryPhotosPage';
import GalleryVideosPage from './GalleryVideosPage';
import Navbar from './components/Navbar';

// --- স্ক্রল টপ সলিউশন ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- হ্যাশ লিংক স্ক্রলিং সমাধান ---
const HashLinkObserver = () => {
  const { hash, pathname } = useLocation();
  
  useEffect(() => {
    if (hash) {
      // একটু সময় দিলে রিঅ্যাক্ট রাউটার পেজ লোড ফিনিশ করতে পারে
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [hash, pathname]);
  return null;
};

// --- Custom Cursor Component ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary-purple pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(106, 13, 173, 0.1)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    />
  );
};

// --- সংখ্যা গণনার জন্য কাউন্টার কম্পোনেন্ট ---
const StatCounter = ({ value, label }: { value: string, label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const numericPart = parseInt(value.replace(/\D/g, ''));
      let start = 0;
      const duration = 2000;
      const increment = numericPart / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericPart) {
          setDisplayValue(numericPart);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black mb-2 flex justify-center items-baseline">
        {displayValue}{value.includes('M') ? 'M' : ''}{value.includes('+') ? '+' : ''}
      </div>
      <div className="text-xs uppercase tracking-widest text-primary-orange font-bold">{label}</div>
    </div>
  );
};

const HomePage = ({ 
  yearsOfExcellence, 
  currentYear, 
  visionYear, 
  roadmapRef, 
  truckY, 
  truckRotate,
  milestones 
}: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    "/company.jpg",
    "MD SIR Incame Tax.jpeg",
    "team-photo.jpg",
    "3 Man.jpeg",
    "Director.jpeg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="bg-slate-50 font-sans min-h-screen text-slate-900 scroll-smooth selection:bg-blue-600 selection:text-white">
      
      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-32 overflow-hidden bg-slate-50">
        {/* Background Mesh Gradients for depth */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-purple/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-orange/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[85vh]">
            
            {/* Left side: Immersive Content */}
            <div className="lg:col-span-6 space-y-10 py-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm"
              >
                <div className="w-2 h-2 bg-primary-purple rounded-full animate-ping"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Established Since 2000</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[9rem] font-display font-black leading-[0.85] tracking-tighter text-slate-900"
              >
                {yearsOfExcellence} Years <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple via-primary-orange to-primary-green">
                  of Vision
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl text-slate-500 max-w-xl leading-relaxed font-medium"
              >
                Leading Bangladesh's industrial evolution through <span className="text-slate-900 font-bold">sustainable innovation</span> & unwavering precision.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <RouterLink to="/concerns/mhsml" className="px-10 py-5 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-primary-purple hover:-translate-y-1 transition-all duration-300 shadow-2xl shadow-slate-900/20">
                  Explore Concerns
                </RouterLink>
                <a href="#about" className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  Our Story
                </a>
              </motion.div>

              {/* Stat Bento Row */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-3 gap-6 pt-12 border-t border-slate-200"
              >
                <div className="space-y-1">
                  <div className="text-3xl font-display font-black text-slate-900">102M+</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-primary-purple">Revenue USD</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-display font-black text-slate-900">4000+</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-primary-purple">Workforce</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-display font-black text-slate-900">1.1M</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-primary-purple">Sq. Ft Area</div>
                </div>
              </motion.div>
            </div>

            {/* Right side: Modern Image Slider Card */}
            <div className="lg:col-span-6 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white group"
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentSlide}
                    src={heroImages[currentSlide]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="w-full h-full object-cover" 
                    alt="Hero"
                  />
                </AnimatePresence>
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {heroImages.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-10 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                    />
                  ))}
                </div>

                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-12 left-12 bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl border border-white/50 hidden md:block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-purple rounded-2xl flex items-center justify-center text-white">
                      <Award size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-slate-400">Award Winning</div>
                      <div className="text-lg font-black text-slate-900">Industrial Leader</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10"
              ></motion.div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -z-10"
              ></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION - MODERN BENTO GRID */}
      <section id="about" className="py-40 bg-slate-50 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex items-center gap-4 mb-8">
              <span className="h-1 w-12 bg-primary-purple rounded-full"></span>
              <span className="text-primary-purple font-black uppercase tracking-[0.4em] text-[10px]">The Foundation</span>
            </motion.div>
            <h2 className="text-7xl font-display font-black text-slate-900 leading-[0.9] uppercase tracking-tighter mb-10">
              Global Impact. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple to-primary-orange">Local Roots.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8 h-full">
            {/* Main Story Bento Tile */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-4 lg:col-span-8 bg-white p-12 rounded-[4rem] shadow-xl border border-slate-100 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="space-y-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-10 group-hover:scale-110 transition-transform">
                  <Globe size={32} />
                </div>
                <p className="text-2xl text-slate-600 leading-relaxed font-medium">
                  SIM Group started its journey with Woven fabrics back in 2000. Through hard work and sincerity, we expanded to highly dignified buyers across <span className="text-slate-900 font-bold">UK, USA, and the European Union</span>.
                </p>
                <div className="pt-8 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="Buyer" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">+50 Global Clients</span>
                </div>
              </div>
            </motion.div>

            {/* Visionary Tile */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 lg:col-span-4 bg-slate-900 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <Quote className="text-blue-500 mb-10 opacity-50" size={48} />
                <p className="text-xl text-white font-medium italic leading-relaxed mb-10">
                  "Leading with intellect and integrity is the only way forward."
                </p>
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.4em] text-blue-400 mb-2">The Visionary</div>
                  <div className="text-2xl font-display font-black text-white">Engr. Md. Mozaffar Hossain, CRP</div>
                </div>
              </div>
            </motion.div>

            {/* HQ Visual Tile */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 lg:col-span-5 bg-white rounded-[4rem] shadow-xl border border-slate-100 overflow-hidden relative group transition-all duration-500 hover:shadow-2xl h-[450px]"
            >
              <img src="/About.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="SIM Headquarters" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <div className="text-2xl font-display font-black uppercase tracking-tighter">SIM Industrial Park.</div>
                <div className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-80 mt-1">Established 2000</div>
              </div>
            </motion.div>

            {/* Stat Tiles - Small Bento Pieces */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 lg:col-span-3 h-[450px] rounded-[4rem] overflow-hidden relative group shadow-xl border border-slate-100 transition-all duration-500 hover:shadow-2xl"
            >
              <img 
                src="https://img.magnific.com/premium-photo/through-business-analysis-financial-investment-tech-concept-journey-unfolds-from-development-success-growing-growth-financial-graph-virtual-screen-captures-narrative_143683-14488.jpg" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Representative Scale" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6A0DAD] via-slate-900/45 to-transparent"></div>
              <div className="absolute inset-0 p-12 flex flex-col justify-end text-left z-10">
                <div className="text-5xl font-display font-black text-white mb-2">$102M+</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-slate-200">Annual Turnover</div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 lg:col-span-4 h-[450px] rounded-[4rem] overflow-hidden relative group shadow-xl transition-all duration-500 hover:shadow-2xl"
            >
              <img 
                src="https://media.istockphoto.com/id/1180345915/photo/proud-staff-of-mumbai-textile-factory-celebrating-success.jpg?s=612x612&w=0&k=20&c=dNN-j5O1AslgxB-1BjjB2DjsAZ3i4cW0pjL-gT-_-8M=" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Representative Professionals" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent"></div>
              <div className="absolute inset-0 p-12 flex flex-col justify-between z-10 text-white">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Users size={24} />
                  </div>
                  <ArrowUpRight className="opacity-60" />
                </div>
                <div>
                  <div className="text-5xl font-display font-black mb-1">4000+</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-[#FF4500]">Industrial Professionals</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. THE JOURNEY ROAD */}
      <section id="history" className="py-40 bg-slate-50 overflow-hidden relative">
        <div className="container mx-auto px-6 text-center mb-40">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-7xl md:text-8xl font-display font-black uppercase tracking-tighter text-slate-900 mb-8 leading-none">
              A Legacy in <br />
              <span className="text-blue-600">Motion</span>
            </h2>
            <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">Scroll to navigate through our history</p>
            <div className="h-1 w-24 bg-blue-600 mx-auto mt-12 rounded-full"></div>
          </motion.div>
        </div>

  <div ref={roadmapRef} className="relative container mx-auto px-6">
    {/* মাঝখানের রাস্তা (যেখানে ট্রাক চলে) */}
    <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-full bg-slate-900 hidden lg:block rounded-full shadow-2xl border-x-4 border-slate-700 overflow-hidden">
      <div className="w-1 h-full border-l-4 border-dashed border-yellow-400 mx-auto opacity-60 animate-[dash_3s_linear_infinite]"></div>
      
      {/* ট্রাক এনিমেশন */}
      <motion.div 
        style={{ top: truckY, rotate: truckRotate }} 
        className="absolute left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center"
      >
        <div className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-t-md whitespace-nowrap mb-[-1px] border border-white/20 shadow-xl uppercase">
          SIM GROUP
        </div>
        <div className="bg-blue-700 p-2.5 rounded-lg shadow-2xl border-2 border-white">
          <Car className="text-white" size={36} fill="white" />
        </div>
        <motion.div animate={{ opacity: [0.2, 0.6, 0], scale: [1, 2.5, 1] }} transition={{ repeat: Infinity, duration: 0.4 }}
          className="w-5 h-5 bg-slate-400 rounded-full blur-md mt-1"></motion.div>
      </motion.div>
    </div>

    {/* মাইলস্টোন স্লাইডিং এনিমেশন */}
    <div className="space-y-40 relative">
      {milestones.map((item: any, i: number) => {
        const isOdd = (i + 1) % 2 !== 0; // ১, ৩, ৫...
        const isEven = (i + 1) % 2 === 0; // ২, ৪, ৬...

        return (
          <div key={i} className="flex flex-col lg:flex-row items-center w-full">
            
            {/* বাম সাইড কলাম (জোড় সংখ্যা ২, ৪, ৬ এর জন্য) */}
            <div className="lg:w-1/2 w-full flex justify-end pr-0 lg:pr-10">
              {isEven && (
                <motion.div 
                  initial={{ opacity: 0, x: 200 }} // ডান পাশ থেকে শুরু হবে
                  whileInView={{ opacity: 1, x: 0 }} // বাম পাশে এসে থামবে
                  transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="flex items-center gap-6 flex-row"
                >
                    {/* কার্ড */}
                    <div className="flex flex-col items-end">
                      {item.link ? (
                        <RouterLink to={item.link} className="p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 hover:border-blue-400 group text-right max-w-md transition-all block">
                          <div className="text-4xl mb-4 text-blue-600 group-hover:scale-110 transition-transform flex justify-end">{item.icon}</div>
                          <div className="text-blue-600 font-black text-2xl mb-1">{item.year}</div>
                          <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight uppercase">{item.event}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                          <div className="flex items-center justify-end gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            View Details <ArrowUpRight size={14} />
                          </div>
                        </RouterLink>
                      ) : (
                        <div className="p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 group text-right max-w-md">
                          <div className="text-4xl mb-4 text-blue-600 group-hover:scale-110 transition-transform flex justify-end">{item.icon}</div>
                          <div className="text-blue-600 font-black text-2xl mb-1">{item.year}</div>
                          <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight uppercase">{item.event}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                    </div>
                  {/* নাম্বার সার্কেল */}
                  <div className="shrink-0 w-16 h-16 bg-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white font-black text-xl ring-8 ring-blue-50/50">
                    {i + 1}
                  </div>
                </motion.div>
              )}
            </div>

            {/* রাস্তার খালি জায়গা (মাঝখানের স্পেস) */}
            <div className="lg:w-20 hidden lg:block"></div>

            {/* ডান সাইড কলাম (বিজোড় সংখ্যা ১, ৩, ৫ এর জন্য) */}
            <div className="lg:w-1/2 w-full flex justify-start pl-0 lg:pl-10">
              {isOdd && (
                <motion.div 
                  initial={{ opacity: 0, x: -200 }} // বাম পাশ থেকে শুরু হবে
                  whileInView={{ opacity: 1, x: 0 }} // ডান পাশে এসে থামবে
                  transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="flex items-center gap-6 flex-row-reverse"
                >
                    {/* কার্ড */}
                    <div className="flex flex-col items-start">
                      {item.link ? (
                        <RouterLink to={item.link} className="p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 hover:border-blue-400 group text-left max-w-md transition-all block">
                          <div className="text-4xl mb-4 text-blue-600 group-hover:scale-110 transition-transform flex justify-start">{item.icon}</div>
                          <div className="text-blue-600 font-black text-2xl mb-1">{item.year}</div>
                          <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight uppercase">{item.event}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                          <div className="flex items-center justify-start gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            View Details <ArrowUpRight size={14} />
                          </div>
                        </RouterLink>
                      ) : (
                        <div className="p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 group text-left max-w-md">
                          <div className="text-4xl mb-4 text-blue-600 group-hover:scale-110 transition-transform flex justify-start">{item.icon}</div>
                          <div className="text-blue-600 font-black text-2xl mb-1">{item.year}</div>
                          <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight uppercase">{item.event}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                    </div>
                  {/* নাম্বার সার্কেল */}
                  <div className="shrink-0 w-16 h-16 bg-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white font-black text-xl ring-8 ring-blue-50/50">
                    {i + 1}
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        );
      })}
    </div>

    {/* রোড ডেস্টিনেশন সাইন */}
    <div className="flex justify-center mt-48 pb-32">
      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring" }} viewport={{ once: true }}
        className="bg-slate-900 p-16 rounded-[3rem] border-4 border-blue-600 shadow-2xl text-center transform -rotate-2 relative group">
        <div className="absolute -inset-2 bg-blue-600 rounded-[3rem] blur opacity-20 animate-pulse"></div>
        <div className="relative">
          <Milestone className="text-yellow-400 mx-auto mb-6" size={64} />
          <div className="text-yellow-400 font-black text-sm uppercase tracking-[0.4em] mb-4">Destination</div>
          <h3 className="text-white text-5xl font-black italic tracking-tighter uppercase">Vision {visionYear}</h3>
          <p className="text-slate-500 text-xs mt-8 font-black uppercase tracking-[0.2em] italic">Continuing through {currentYear}</p>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* 5. STRATEGIC VISION (Header Right, Content Left - Modernized) */}
<section id="vision" className="py-32 bg-[#020617] text-white relative overflow-hidden">
  {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] -z-10"></div>
  <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] -z-10"></div>

  <div className="container mx-auto px-6">
    {/* ১. হেডার সেকশন (ডানপাশে অ্যালাইন করা) */}
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="mb-20 text-right flex flex-col items-end"
    >
      <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-xs mb-4 block">
        Future Roadmap
      </span>
      <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight">
        Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">Vision</span> {visionYear}
      </h2>
      <div className="h-1.5 w-48 bg-gradient-to-l from-blue-600 to-transparent mt-6 ml-auto rounded-full"></div>
    </motion.div>

    {/* ২. গ্রিড কন্টেন্ট (বামপাশে অ্যালাইন করা) */}
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl"> {/* গ্রিডকে বামে রাখতে ml-0 রাখা হয়েছে */}
      {[
        { n: "01", t: "Material Innovation", p: `Developing Man-Made Fibers (MMF) to reduce cotton dependence by 25% by ${visionYear}.`, color: "from-blue-500 to-cyan-400" },
        { n: "02", t: "Water Management", p: "Achievement of 25% ETP water re-use through advanced Reverse Osmosis (RO) systems.", color: "from-indigo-500 to-blue-500" },
        { n: "03", t: "Circular Economy", p: "Recycling 30% of total produce to strengthen our existing sustainable capacity.", color: "from-purple-500 to-indigo-500" },
        { n: "04", t: "Global Growth", p: "Targeting 12 Million annual orders from global top-tier brands like H&M.", color: "from-blue-600 to-purple-600" }
      ].map((v, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ x: 10 }} // হোভার করলে সামান্য ডানে সরবে
          className="relative group text-left"
        >
          {/* কার্ড ডিজাইন */}
          <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] h-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-blue-500/30">
            
            <div className="flex items-center gap-6 mb-8">
              {/* নম্বর ইন্ডিকেটর */}
              <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${v.color} opacity-40 group-hover:opacity-100 transition-opacity`}>
                {v.n}
              </div>
              <div className={`h-px flex-grow bg-gradient-to-r ${v.color} opacity-20`}></div>
            </div>

            <h4 className="text-2xl font-black mb-4 tracking-tight uppercase group-hover:text-blue-400 transition-colors">
              {v.t}
            </h4>
            
            <p className="text-lg font-medium leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors">
              {v.p}
            </p>
          </div>

          {/* হোভার গ্লো ইফেক্ট */}
          <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-[0.03] blur-[50px] transition-opacity duration-500`}></div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* 6. MISSION SECTION (Modernized & Fully English) */}
<section id="mission" className="py-32 bg-white overflow-hidden relative">
  {/* ব্যাকগ্রাউন্ড এলিমেন্ট */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
  
  <div className="container mx-auto px-6">
    <div className="flex flex-col lg:flex-row gap-20 items-start">
      
      {/* বাম পাশ: হেডার অংশ */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-1/3 lg:sticky lg:top-40"
      >
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100">
          <span className="text-blue-600 text-xs font-black uppercase tracking-[0.3em]">Our Purpose</span>
        </div>
        
        <h2 className="text-6xl md:text-7xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
          Our <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 underline decoration-blue-200 underline-offset-8">
            Mission
          </span>
        </h2>
        
        <p className="mt-10 text-slate-600 font-medium text-xl leading-relaxed max-w-sm">
          SIM Group is dedicated to manufacturing world-class textile products by integrating cutting-edge technology with unwavering integrity.
        </p>

        {/* ডেকোরেটিভ লাইন */}
        <div className="flex gap-2 mt-8">
          <div className="h-1.5 w-12 bg-blue-600 rounded-full"></div>
          <div className="h-1.5 w-4 bg-blue-200 rounded-full"></div>
          <div className="h-1.5 w-2 bg-blue-100 rounded-full"></div>
        </div>
      </motion.div>

      {/* ডান পাশ: মিশন কার্ড গ্রিড */}
      <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
        {[
          { 
            t: "World-Class Quality", 
            d: "Committed to manufacturing products of outstanding quality that give our customers a strategic competitive advantage.", 
            i: <Target size={36} />,
            color: "group-hover:border-blue-500"
          },
          { 
            t: "Team Empowerment", 
            d: "Fostering an environment of ownership and empowerment through a collaborative team-based organizational structure.", 
            i: <Users size={36} />,
            color: "group-hover:border-indigo-500"
          },
          { 
            t: "Highest Integrity", 
            d: "Maintaining the absolute highest levels of operational efficiency, professional integrity, and honesty across all sectors.", 
            i: <ShieldCheck size={36} />,
            color: "group-hover:border-blue-400"
          },
          { 
            t: "Agile Innovation", 
            d: "Continuously evolving our production facilities and developing new fabric varieties to stay ahead of global trends.", 
            i: <Repeat size={36} />,
            color: "group-hover:border-indigo-400"
          }
        ].map((m, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -12 }}
            className={`group p-10 bg-slate-50 rounded-[3.5rem] border-2 border-transparent transition-all duration-500 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] ${m.color}`}
          >
            {/* আইকন বক্স */}
            <div className="mb-8 relative">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue-600 shadow-sm transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
                {m.i}
              </div>
              {/* ছোট গ্রেডিয়েন্ট ডট */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>

            <h3 className="font-black text-slate-900 mb-4 text-2xl tracking-tight leading-tight uppercase">
              {m.t}
            </h3>
            
            <p className="text-slate-500 leading-relaxed font-medium text-lg">
              {m.d}
            </p>

            {/* কার্ডের নিচে ছোট ইন্ডিকেটর */}
            <div className="mt-8 w-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
          </motion.div>
        ))}
      </div>
      
    </div>
  </div>
</section>

      {/* 7. CORE VALUES SECTION */}
      <section id="values" className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-24">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">OUR CORE <span className="text-blue-500">VALUES</span></h2>
            <div className="h-2 w-32 bg-blue-600 mx-auto mt-8 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { t: "Customer Satisfaction", i: "😊" }, { t: "Passionate Excellence", i: "💎" },
              { t: "Human Capital", i: "👥" }, { t: "Fair to All", i: "⚖️" },
              { t: "Environment First", i: <Leaf className="text-green-400" /> }, { t: "Safety and Health", i: <HeartPulse className="text-red-400" /> },
              { t: "Responsible Citizen", i: <Building2 className="text-blue-400" /> }, { t: "Integrity & Trust", i: "🛡️" }
            ].map((v, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-slate-800/50 p-10 rounded-[3rem] border border-slate-700 hover:bg-blue-600 transition-all group">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{typeof v.i === 'string' ? v.i : v.i}</div>
                <h3 className="text-xl font-bold mb-3 tracking-tight leading-tight">{v.t}</h3>
                <p className="text-sm text-slate-400 group-hover:text-blue-100 transition-colors">Foundation of our sustainable success.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LEADERSHIP TEAM */}
      <section id="leadership" className="py-40 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-24">
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="h-1 w-12 bg-blue-600 rounded-full"></span>
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px]">Executive Board</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-display font-black uppercase tracking-tighter text-slate-900 leading-none">
              Visionary <br />
              <span className="text-blue-600">Leadership</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "Mrs. Rahima Mozaffar", r: "Chairman", img: "/Charman.png" },
              { n: "Engr. Md. Mozaffar Hossain, MP", r: "Managing Director", img: "/MD.png" },
              { n: "A.S.M. Rakibul Hasan", r: "Deputy Managing Director", img: "/DMD.png" },
              { n: "A.S.M. Raisul Hasan", r: "Director", img: "/Director PP.jpeg" }
            ].map((l, i) => (
              <motion.div key={i} whileHover={{ y: -20 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100 group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                <div className="w-48 h-58 mx-auto mb-10 relative">
                  <div className="absolute -inset-4 bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-10"></div>
                  <img src={l.img} alt={l.n} className="w-full h-full rounded-[2rem] object-cover relative z-10 border-4 border-slate-50 shadow-lg" 
                   onError={(e) => {e.currentTarget.src = `https://ui-avatars.com/api/?name=${l.n}&background=3b82f6&color=fff&size=256`}} />
                </div>
                <h3 className="font-display font-black text-slate-900 text-xl mb-2 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  {l.n}
                </h3>
                <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.3em]">
                  {l.r}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GROUP CONCERNS - FULL WIDTH BENTO SHOWCASE */}
      <section id="concerns" className="py-40 bg-white relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-1.5 w-12 bg-blue-600 rounded-full"></span>
                <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px]">Strategic Business Units</span>
              </div>
              <h2 className="text-7xl md:text-8xl font-display font-black text-slate-900 leading-[0.85] uppercase tracking-tighter">
                Our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Concerns</span>
              </h2>
            </motion.div>
            <motion.p initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-slate-500 max-w-sm text-lg font-medium leading-relaxed lg:text-right">
              A diversified portfolio of industry-leading companies dedicated to setting new standards in textile and industrial innovation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "SIM FABRICS LTD.", slug: "/concerns/sim-fabrics", desc: "Premium Woven Textiles & Dyeing", icon: <Waves size={32} />, color: "blue" },
              { name: "Mozaffar Hossain Spinning Mills Ltd.", slug: "/concerns/mhsml", desc: "Advanced Spinning & Yarn Technology", icon: <Repeat size={32} />, color: "indigo" },
              { name: "SIM FABRICS LTD.(Knit Dyeing Unit)", slug: "/concerns/SimFabricsKnitDyeingPage", desc: "High-Performance Knit Processing", icon: <Shirt size={32} />, color: "emerald" },
              { name: "SIM FABRICS LTD.(Denim Unit)", slug: "/concerns/azlan-denim", desc: "Modern Denim Manufacturing", icon: <Layers size={32} />, color: "blue" },
              { name: "Authentic Color Tex", slug: "/concerns/authentic-color", desc: "Sustainable Chemical Processing", icon: <TestTube2 size={32} />, color: "purple" },
              { name: "SIM Towel Ind.", slug: "/concerns/sim-towel", desc: "Quality Terry Towel Export", icon: <Palette size={32} />, color: "indigo" },
              { name: "SIM FABRICS LTD. (Chemical Process Unit)", slug: "/concerns/ef-chemicals", desc: "Textile Process Auxiliaries", icon: <Waves size={32} />, color: "blue" },
              { name: "Suntech Energy", slug: "/concerns/suntech-energy", desc: "Renewable Power Solutions", icon: <Globe size={32} />, color: "yellow" },
              { name: "Azlan Agro Food", slug: "/concerns/azlan-agro", desc: "Quality Agro-Food Processing", icon: <Utensils size={32} />, color: "emerald" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -12 }}
              >
                <RouterLink 
                  to={item.slug} 
                  className="group block p-10 bg-slate-50 rounded-[3.5rem] border border-slate-100 hover:bg-white transition-all duration-500 relative overflow-hidden h-full hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-500 shadow-sm">
                      {item.icon}
                    </div>
                    <ArrowUpRight className="text-slate-300 group-hover:text-blue-600 transition-colors" size={24} />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-display font-black text-slate-900 leading-tight uppercase group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">{item.desc}</p>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">View Concern Profile</span>
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </RouterLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. COMPREHENSIVE BIOLOGICAL ETP */}
      <section id="sustainability" className="py-40 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
              <span className="h-1 w-12 bg-emerald-500 rounded-full"></span>
              <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px]">Environment First</span>
            </motion.div>
            <h2 className="text-7xl font-display font-black text-slate-900 uppercase tracking-tighter leading-[0.9] mb-10">
              Advanced <br /> 
              <span className="text-emerald-600">Biological ETP</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Powered by <span className="text-slate-900 font-bold">PVA GEL Technology (KORAY JAPAN)</span>. Our biological treatment plant leads the industry in water sustainability and waste removal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { id: 1, label: "Primary Treatment", desc: "Mechanical removal" },
              { id: 2, label: "Fixed Film Process", desc: "Biological oxidation" },
              { id: 3, label: "Solid Separation", desc: "Clearing clarifiers" },
              { id: 4, label: "Final Discharge", desc: "Pure water output" }
            ].map((img, i) => (
              <motion.div key={i} whileHover={{ y: -15 }} className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={`/images/etp-${img.id}.jpg`} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={img.label}
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                  <div className="text-white font-display font-black text-2xl uppercase tracking-tighter leading-none mb-1">{img.label}</div>
                  <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em]">{img.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            
            {/* Left: Main Features */}
            <div className="lg:col-span-7 space-y-12">
              <div className="bg-white rounded-[4rem] p-12 md:p-20 border border-slate-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                  <Waves className="text-emerald-600" size={150} />
                </div>
                
                <h3 className="text-4xl font-display font-black text-slate-900 uppercase mb-16 flex items-center gap-6">
                  <div className="w-4 h-12 bg-emerald-500 rounded-full"></div>
                  Main Features
                </h3>
                
                <div className="grid md:grid-cols-2 gap-10">
                  {[
                    "Capable of removing 97.9% of suspended solids",
                    "Biological nitrification without adding chemicals",
                    "Oxidation and nitrogen removal achieved",
                    "Biological phosphorous removal",
                    "Efficient Solids and liquid separation",
                    "Easily maintained mechanical work",
                    "Completely Self-sustaining system"
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-5 items-start group">
                      <div className="mt-1 p-1.5 bg-emerald-500/10 rounded-xl text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                        <CheckCircle2 size={18} />
                      </div>
                      <p className="text-slate-600 font-medium text-lg leading-snug">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* technical process */}
              <div className="p-16 bg-slate-900 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-700"></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-10 text-emerald-400">Operational Excellence</h4>
                <p className="text-2xl leading-relaxed font-medium">
                  Our system utilizes <span className="text-white font-black border-b-4 border-emerald-500 pb-1">Activated Sludge</span> and <span className="text-white font-black border-b-4 border-emerald-500 pb-1">Fixed Film</span> processes. Treated effectively via Rotating Biological Contactors.
                </p>
              </div>
            </div>

            {/* Right: Stats Dashboard */}
            <div className="lg:col-span-5 space-y-10">
              <div className="bg-white border border-slate-200 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden">
                <h3 className="text-3xl font-display font-black text-slate-900 uppercase mb-4 tracking-tighter">Performance</h3>
                <p className="text-slate-500 font-bold text-[10px] mb-12 leading-relaxed uppercase tracking-[0.4em]">
                  Operational Parameters
                </p>
                <div className="space-y-8">
                  {[
                    { label: "BOD removal", value: "98%+", color: "text-emerald-500" },
                    { label: "COD reduction", value: "95%+", color: "text-blue-500" },
                    { label: "Water Re-use", value: "25%", color: "text-indigo-500" },
                    { label: "Sludge Volume", value: "Minimal", color: "text-emerald-500" }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-emerald-200 transition-all duration-300">
                      <span className="font-black text-slate-400 uppercase text-[10px] tracking-[0.4em]">{stat.label}</span>
                      <span className={`font-display font-black text-3xl tracking-tighter ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. PRODUCT SHOWCASE SECTION (সংশোধিত) */}
      <section id="products" className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">Our <span className="text-blue-500">Products</span></h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Excellence in every fiber</p>
            <div className="h-2 w-32 bg-blue-600 mx-auto mt-8 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { id: "product-yarn", t: "Raw Yarn", d: "Premium ring and rotor spun yarns for versatile applications.", img: "https://www.alagendran.com/img/alagendran/spinningmills/coneyarn.jpg" },
              { id: "product-woven", t: "Woven Fabrics", d: "High-quality woven fabrics for global fashion brands.", img: "https://indoweave.in/wp-content/uploads/2023/03/Linen.png" },
              { id: "product-knit", t: "Knit Fabrics", d: "Luxury knit fabrics with superior comfort and finish.", img: "https://i.etsystatic.com/24965335/r/il/eeee11/6432230745/il_fullxfull.6432230745_aoay.jpg" },
              { id: "product-denim", t: "Denim Fabrics", d: "Performance denim fabrics with superior stretch and durability.", img: "https://image.made-in-china.com/202f0j00fSmbJaPMwvcn/Denim-Fabrics-for-Jeans-Twill-Non-Stretch-Washed-Cotton-Denim-Fabric-for-Clothing.webp" },
              { id: "product-chemicals", t: "Sustainable Chemicals", d: "Eco-friendly chemical solutions for the textile industry.", img: "https://shreekrishnacorporation.com/wp-content/uploads/2024/09/Screenshot-2023-08-29-at-20.24.47-e1725558460458.png" },
              { id: "product-agro", t: "Agro Products", d: "Quality agro-food processing for the domestic and global market.", img: "https://simgroup-bd.com/public/frontend/wp-content/uploads/azlan-agro-foods-ltd/Product%20Catalog.PNG" }
            ].map((p, i) => {
              return (
                <motion.div 
                  key={i} 
                  id={p.id}
                  whileHover={{ y: -10 }} 
                  className="group relative rounded-[3rem] overflow-hidden border border-slate-700 h-[500px] flex flex-col product-card"
                >
                  <RouterLink to="/products" className="relative h-full block">
                    <img src={p.img} alt={p.t} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <div className="absolute top-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <ArrowUpRight className="text-white" size={24} />
                      </div>

                      <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                        <h3 className="text-3xl font-black mb-4 uppercase tracking-tight text-white italic">{p.t}</h3>
                        <p className="text-slate-200 leading-relaxed mb-8 text-sm opacity-90">{p.d}</p>
                        
                        <div className="pt-6 border-t border-white/20 flex items-center justify-between group/link">
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover/link:text-blue-300 transition-colors italic">
                            SEE FULL PRODUCT PROFILE
                          </span>
                          <ArrowRight size={16} className="text-blue-400 -translate-x-2 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                        </div>
                      </div>
                    </div>
                  </RouterLink>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. FOOTER SECTION - IMMERSIVE DARK FIELD */}
      <footer id="contact" className="relative bg-[#020617] py-40 text-white border-t border-white/5 overflow-hidden">
        {/* Background Map Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none grayscale">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover" 
            alt="Map Background"
          />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-4 gap-20 mb-32">
            
            {/* Branding Column */}
            <div className="lg:col-span-1 space-y-10">
              <div className="group cursor-pointer">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={SIM_LOGO} 
                    className="h-16 w-auto object-contain group-hover:scale-110 transition-transform duration-500" 
                    alt="SIM Group"
                  />
                  <h2 className="text-5xl font-display font-black uppercase tracking-tighter group-hover:text-blue-500 transition-colors text-white">SIM<br/>GROUP</h2>
                </div>
                <div className="h-1 w-12 bg-blue-600 rounded-full group-hover:w-24 transition-all duration-500"></div>
                <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[9px] mt-6 leading-relaxed">Way forward to sustainability</p>
              </div>
              <p className="text-slate-500 leading-relaxed font-medium text-lg">
                Pioneering industrial growth through precision and excellence for over 24 years.
              </p>
              <div className="flex gap-4">
                 {[
                   { icon: <Facebook size={18} />, href: "https://www.facebook.com/simgroup2000" },
                   { icon: <Youtube size={18} />, href: "#" },
                   { icon: <Instagram size={18} />, href: "#" }
                 ].map((social, i) => (
                   <motion.a 
                     key={i}
                     href={social.href} 
                     target="_blank" 
                     rel="noreferrer"
                     whileHover={{ y: -5, backgroundColor: '#2563eb', color: '#fff' }}
                     className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 transition-all border border-white/10"
                   >
                     {social.icon}
                   </motion.a>
                 ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-12">Core Navigation</h4>
              <ul className="space-y-5">
                {["Home", "About", "History", "Concerns", "Products"].map(link => (
                  <li key={link}>
                    <RouterLink 
                      to={link === "Home" ? "/" : `/#${link.toLowerCase()}`} 
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group text-sm uppercase font-black tracking-widest"
                    >
                      <span className="w-0 h-px bg-blue-500 group-hover:w-6 transition-all"></span>
                      {link}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Presence */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-12">
               <div className="space-y-12">
                 <div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8">Corporate Hub</h4>
                   <div className="space-y-6">
                     <div className="flex gap-5">
                       <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                         <MapPin className="text-blue-500" size={18} />
                       </div>
                       <p className="text-slate-400 text-sm leading-relaxed">House # 315, Road # 04, Baridhara D.O.H.S, Dhaka, Bangladesh.</p>
                     </div>
                     <div className="flex gap-5">
                       <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                         <Phone className="text-blue-500" size={18} />
                       </div>
                       <p className="text-slate-400 text-sm italic font-medium">+88 02 8415961-3</p>
                     </div>
                   </div>
                 </div>
                 <div className="pt-8 border-t border-white/5">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-8">Industrial Presence</h4>
                   <div className="flex gap-5">
                     <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                       <Factory className="text-indigo-500" size={18} />
                     </div>
                     <p className="text-slate-400 text-sm leading-relaxed italic">Thakurbari Teac, Masumabad, Bhulta, Rupganj , Narayanganj, Bangladesh.</p>
                   </div>
                 </div>
               </div>

               <div className="flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] relative overflow-hidden group shadow-2xl">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
                  <Quote className="text-white opacity-30 mb-8" size={48} />
                  <div>
                    <p className="text-2xl font-display font-black leading-tight text-white mb-8">"Integrity is the foundation of our industrial evolution."</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-1 bg-white/30 rounded-full"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Legal Excellence</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-slate-600">
             <p>© {currentYear} SIM GROUP. ALL RIGHTS RESERVED.</p>
             <p className="text-slate-900 bg-white px-4 py-1 rounded-full">High-End Industrial standards</p>
          </div>
        </div>
      </footer>

      {/* কাস্টম এনিমেশন স্টাইল */}
      <style>{`
        @keyframes dash {
          to {
            background-position: 0 100px;
          }
        }
      `}</style>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // ডাইনামিক সাল ক্যালকুলেশন
  const currentYear = new Date().getFullYear(); 
  const yearsOfExcellence = currentYear - 2000;
  const visionYear = Math.ceil((currentYear + 1) / 5) * 5; 

  // রোডম্যাপ স্ক্রল এনিমেশন
  const roadmapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 800, damping: 70 });
  const truckY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const truckRotate = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 5, -5, 5, -5, 0]);

  const milestones = [
    { year: "2000", event: "SIM FABRICS LTD.(Weaving Unit)", icon: <Factory />, desc: "The foundation of SIM Group's textile excellence.", link: "/concerns/sim-fabrics" },
    { year: "2002", event: "Authentic Color Ltd.", icon: <Palette />, desc: "Entry into specialized dyeing and chemical world." },
    { year: "2006", event: "MOZAFFAR HOSSAIN SPINNING MILLS LTD. (Rotor)", icon: <Repeat />, desc: "Backward integration for sustainable yarn supply.", link: "/concerns/mhsml" },
    { year: "2012", event: "SIM FABRICS LTD.(Woven Dyeing & Finishing Unit)", icon: <Waves />, desc: "Advanced processing for high-end woven fabrics.", link: "/concerns/sim-fabrics" },
    { year: "2015", event: "SIM FABRICS LTD.(Printing Unit)", icon: <Printer />, desc: "State-of-the-art multi-color printing solutions.", link: "/concerns/sim-fabrics" },
    { year: "2017", event: "SIM FABRICS LTD.(KNIT DYEING Unit)", icon: <Shirt />, desc: "Knitting, dyeing, and finishing for global brands.", link: "/concerns/knit-dyeing" },
    { year: "2018", event: "MOZAFFAR HOSSAIN SPINNING MILLS LTD. (Ring Unit)", icon: <CircleDot />, desc: "Expanding capacity in high-quality ring spinning.", link: "/concerns/mhsml" },
    { year: "2019", event: "SIM FABRICS LTD.(Chemical Process Unit)", icon: <TestTube2 />, desc: "Innovation in textile chemical solutions." },
    { year: "2019", event: "Azlan Foods Ltd.", icon: <Utensils />, desc: "Diversification into premium agro-food processing." },
    { year: "2021", event: "Sim Trade International", icon: <Globe />, desc: "Global trade and strategic business integration." },
    { year: "2022", event: "SIM FABRICS LTD.(Denim Unit)", icon: <Layers />, desc: "High-performance denim manufacturing facility.", link: "/concerns/sim-fabrics" },
    { year: "2022", event: "SIM Towel Ind. Ltd.", icon: <Construction />, desc: "Home textile and premium towel production." }
  ];

  return (
    <Router>
      {/* <CustomCursor /> */}
      <ScrollToTop />
      <HashLinkObserver />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Routes>
        <Route path="/" element={
          <HomePage 
            yearsOfExcellence={yearsOfExcellence}
            currentYear={currentYear}
            visionYear={visionYear}
            roadmapRef={roadmapRef}
            truckY={truckY}
            truckRotate={truckRotate}
            milestones={milestones}
          />
        } />
        <Route path="/concerns/mhsml" element={<MHSMLPage />} />
        <Route path="/concerns/SimFabricsKnitDyeingPage" element={<SimFabricsKnitDyeingPage />} />
        <Route path="/concerns/sim-fabrics" element={<SimFabricsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/research-development" element={<RDPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/sustainability" element={<EnvironmentPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/gallery/photos" element={<GalleryPhotosPage />} />
        <Route path="/gallery/videos" element={<GalleryVideosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
