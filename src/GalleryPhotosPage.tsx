import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Maximize2, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GalleryPhotosPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    { url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80", title: "Industrial Complex", category: "Facility" },
    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80", title: "Textile Textures", category: "Products" },
    { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80", title: "R&D Lab", category: "Innovation" },
    { url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80", title: "Agro Farm", category: "Agro" },
    { url: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80", title: "Spinning Unit", category: "Process" },
    { url: "https://images.unsplash.com/photo-1558444479-c84851727d21?auto=format&fit=crop&q=80", title: "Fabric Dyeing", category: "Process" },
    { url: "https://images.unsplash.com/photo-1584108656821-afc29a9ee3c8?auto=format&fit=crop&q=80", title: "Towel Production", category: "Products" },
    { url: "https://images.unsplash.com/photo-1528605248644-14dd04022211?auto=format&fit=crop&q=80", title: "Yarn Quality", category: "Innovation" },
  ];

  return (
    <div className="bg-white font-sans min-h-screen text-slate-900 selection:bg-purple-600 selection:text-white">
       
      {/* Header */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <ImageIcon className="mx-auto mb-6 text-purple-600" size={48} />
             <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4">Capturing <span className="text-purple-600">Excellence</span></h1>
             <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">A visual journey through our state-of-the-art facilities, innovative processes, and high-quality products.</p>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {photos.map((photo, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedImage(photo.url)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-100"
              >
                <img src={photo.url} alt={photo.title} className="w-full h-auto transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="text-white font-black uppercase text-xs tracking-widest mb-1">{photo.category}</div>
                  <h3 className="text-white text-2xl font-black tracking-tight">{photo.title}</h3>
                  <div className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-xl text-white">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors p-4"
              onClick={() => setSelectedImage(null)}
            >
              <X size={48} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage} 
              className="max-w-full max-h-full rounded-3xl shadow-2xl" 
              alt="Full Size" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 text-white text-center border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
          © {new Date().getFullYear()} SIM GROUP MEDIA DIVISION. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default GalleryPhotosPage;
