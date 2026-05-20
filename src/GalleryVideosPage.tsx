import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, ArrowLeft, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const GalleryVideosPage = () => {
  const videos = [
    { title: "Corporate Overview", id: "V_1", thumbnail: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80", duration: "03:45" },
    { title: "Advanced ETP Process", id: "V_2", thumbnail: "https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?auto=format&fit=crop&q=80", duration: "02:15" },
    { title: "Spinning Unit Tour", id: "V_3", thumbnail: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80", duration: "04:20" },
    { title: "Sustainable Chemicals", id: "V_4", thumbnail: "https://images.unsplash.com/photo-1532187875605-1ef6ec21c14d?auto=format&fit=crop&q=80", duration: "02:50" },
  ];

  return (
    <div className="bg-white font-sans min-h-screen text-slate-900 selection:bg-red-600 selection:text-white">
      
      {/* Header */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <Video className="mx-auto mb-6 text-red-600" size={48} />
             <h1 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4">Industrial <span className="text-red-600">Motion</span></h1>
             <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Experience our industrial excellence in motion. Watch our facilities, processes, and corporate highlights.</p>
          </motion.div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {videos.map((video, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer"
              >
                <img 
                  src={video.thumbnail} 
                  className="w-full aspect-video object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 hover:scale-105" 
                  alt={video.title} 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="p-6 bg-white/20 backdrop-blur-xl rounded-full text-white transform group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                     <PlayCircle size={64} strokeWidth={1} fill="currentColor" />
                   </div>
                </div>
                <div className="absolute top-8 left-8 p-6">
                   <h3 className="text-white text-3xl font-black tracking-tight uppercase leading-none">{video.title}</h3>
                   <div className="mt-4 inline-block px-4 py-1.5 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest">{video.duration} MIN</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Highlight Box */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="p-24 rounded-[4rem] bg-gradient-to-br from-red-600 to-red-800 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48 rounded-full"></div>
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 relative z-10">Experience the Scale of <br />Our Operations</h2>
             <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12 relative z-10">Our video documentation provides an inside look into the dedication and technology that drives SIM Group forward.</p>
             <button className="relative z-10 px-12 py-5 bg-white text-red-600 rounded-[2rem] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-2xl">
               Watch Corporate Film
             </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 text-white text-center border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">
          © {new Date().getFullYear()} SIM GROUP MEDIA DIVISION. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default GalleryVideosPage;
