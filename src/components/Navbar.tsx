import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, Youtube, Instagram, 
  ChevronDown, Menu, X, ArrowUpRight 
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { SIM_LOGO } from '../constants';

const MotionLink = motion(RouterLink);

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleClose = () => setOpenDropdown(null);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  return (
    <nav className="fixed top-4 inset-x-4 md:inset-x-6 z-[100] flex justify-center pointer-events-none">
      <div className="bg-white/70 backdrop-blur-3xl px-5 py-2.5 rounded-full border border-white/50 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] flex items-center gap-4 xl:gap-8 pointer-events-auto">
        {/* Branding */}
        <RouterLink 
          to="/" 
          onClick={() => {
            if (window.location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 xl:gap-3 group"
        >
          <div className="relative p-1 bg-white rounded-lg shadow-sm border border-slate-100/50">
            <div className="absolute -inset-1.5 bg-primary-purple/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src={SIM_LOGO} 
              className="relative h-7 md:h-8 w-auto object-contain group-hover:scale-110 transition-transform duration-500" 
              alt="SIM Group"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-display font-black text-slate-900 leading-none uppercase tracking-tighter group-hover:text-primary-purple transition-colors">SIM GROUP</span>
            <span className="text-[7.5px] md:text-[8px] font-black text-primary-purple tracking-[0.2em] uppercase mt-0.5 whitespace-nowrap">Way Forward to Sustainability</span>
          </div>
        </RouterLink>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {[
            { name: "Home", slug: "/" },
            { 
              name: "About", 
              slug: "/#about",
              dropdown: [
                { name: "Research & Development", slug: "/research-development" },
                { name: "Customers", slug: "/customers" },
                { name: "Sustainability", slug: "/sustainability" },
                { name: "Certifications", slug: "/certifications" }
              ]
            },
            { name: "History", slug: "/#history" },
            { name: "Vision", slug: "/#vision" },
            { name: "Mission", slug: "/#mission" },
            { name: "Leadership", slug: "/#leadership" },
            { 
              name: "Concerns", 
              slug: "/#concerns",
              dropdown: [
              { name: "SIM FABRICS LTD.", slug: "/concerns/sim-fabrics"}, 
              { name: "Mozaffar Hossain Spinning Mills Ltd.", slug: "/concerns/mhsml"},
              { name: "SIM FABRICS LTD.(Knit Dyeing Unit)", slug: "/concerns/SimFabricsKnitDyeingPage"},
              { name: "SIM FABRICS LTD.(Denim Unit)", slug: "/concerns/azlan-denim"},
              { name: "Authentic Color Tex", slug: "/concerns/authentic-color"},
              { name: "SIM Towel Ind.", slug: "/concerns/sim-towel"},
              { name: "SIM FABRICS LTD. (Chemical Process Unit)", slug: "/concerns/ef-chemicals"},
              { name: "Suntech Energy", slug: "/concerns/suntech-energy"},
              { name: "Azlan Agro Food", slug: "/concerns/azlan-agro"},
              ]
            },
            { 
              name: "Gallery", 
              slug: "/#gallery",
              dropdown: [
                { name: "Photos", slug: "/gallery/photos" },
                { name: "Videos", slug: "/gallery/videos" }
              ]
            },
            { 
              name: "Products", 
              slug: "/#products",
              dropdown: [
                { name: "Raw Yarn", slug: "/#product-yarn" },
                { name: "Woven Fabrics", slug: "/#product-woven" },
                { name: "Knit Fabrics", slug: "/#product-knit" },
                { name: "Denim Fabrics", slug: "/#product-denim" },
                { name: "Sustainable Chemicals", slug: "/#product-chemicals" },
                { name: "Agro Products", slug: "/#product-agro" }
              ]
            }
          ].map((item) => (
            <div 
              key={item.name} 
              className="relative py-1"
              onClick={(e) => {
                if (item.dropdown) {
                  e.stopPropagation();
                }
              }}
              onMouseEnter={() => {
                if (item.dropdown) setOpenDropdown(item.name);
              }}
              onMouseLeave={() => {
                if (item.dropdown) setOpenDropdown(null);
              }}
            >
              <RouterLink 
                to={item.slug}
                onClick={(e) => {
                  if (item.dropdown) {
                    e.preventDefault();
                    setOpenDropdown(openDropdown === item.name ? null : item.name);
                  } else {
                    if (item.slug === "/" && window.location.pathname === "/") {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (item.slug.startsWith("/#") && window.location.pathname === "/") {
                      const id = item.slug.replace('/#', '');
                      const element = document.getElementById(id);
                      if (element) {
                        e.preventDefault();
                        element.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', item.slug);
                      }
                    }
                    setOpenDropdown(null);
                  }
                }}
                className={`px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1 ${
                  openDropdown === item.name
                    ? "text-primary-purple bg-primary-purple/5"
                    : "text-slate-500 hover:text-primary-purple hover:bg-primary-purple/5"
                }`}
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDown 
                    size={10} 
                    className={`transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : ""}`} 
                  />
                )}
              </RouterLink>

              {item.dropdown && (
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[110]"
                    >
                      <div className="bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl border border-slate-100 p-3 min-w-[200px]">
                        <div className="space-y-0.5">
                          {item.dropdown.map((subItem, idx) => (
                            <motion.div
                              key={subItem.slug}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.02 }}
                            >
                              <RouterLink 
                                to={subItem.slug}
                                onClick={() => setOpenDropdown(null)}
                                className="block px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:bg-primary-purple/5 hover:text-primary-purple rounded-xl transition-all"
                              >
                                {subItem.name}
                              </RouterLink>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 md:gap-3">
          <motion.a 
            href="/#contact"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                const element = document.getElementById("contact");
                if (element) {
                  e.preventDefault();
                  element.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', "/#contact");
                }
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-slate-900 text-white px-5 xl:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-primary-orange transition-all duration-500"
          >
            Connect
          </motion.a>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 bg-slate-100 rounded-full text-slate-600"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Grid */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white/95 backdrop-blur-2xl border-b px-6 py-10 space-y-4 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "home", path: "/" },
                { name: "about", path: "/#about" },
                { name: "history", path: "/#history" },
                { name: "vision", path: "/#vision" },
                { name: "mission", path: "/#mission" },
                { name: "leadership", path: "/#leadership" },
                { name: "concerns", path: "/#concerns" },
                { name: "products", path: "/#products" },
                { name: "Research & Development", path: "/research-development" },
                { name: "customers", path: "/customers" },
                { name: "Sustainability", path: "/sustainability" },
                { name: "Certifications", path: "/certifications" },
                { name: "gallery photos", path: "/gallery/photos" },
                { name: "gallery videos", path: "/gallery/videos" }
              ].map((item) => (
                <RouterLink 
                  key={item.path + item.name} 
                  to={item.path} 
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.path === "/" && window.location.pathname === "/") {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (item.path.startsWith("/#") && window.location.pathname === "/") {
                      const id = item.path.replace('/#', '');
                      const element = document.getElementById(id);
                      if (element) {
                        e.preventDefault();
                        element.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', item.path);
                      }
                    }
                  }} 
                  className="p-5 bg-slate-50 border border-slate-100 rounded-3xl text-center text-[12px] font-black uppercase text-[#6A0DAD] active:bg-[#6A0DAD] active:text-white transition-all shadow-sm"
                >
                  {item.name}
                </RouterLink>
              ))}
            </div>
            <RouterLink 
              to="/#contact" 
              onClick={(e) => {
                setIsMenuOpen(false);
                if (window.location.pathname === "/") {
                  const element = document.getElementById("contact");
                  if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', "/#contact");
                  }
                }
              }} 
              className="block w-full p-5 bg-gradient-to-r from-[#6A0DAD] via-[#FF4500] to-[#228B22] text-white rounded-3xl text-center font-black uppercase text-[14px] shadow-xl shadow-orange-100"
            >
              Get In Touch
            </RouterLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
