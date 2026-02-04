import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Instagram, 
  Camera, 
  Menu, 
  X, 
  Maximize2,
  ArrowRight
} from 'lucide-react';

// --- Data ---
const PROJECTS = [
  { id: 1, title: 'Velocity', category: 'Futebol', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=90&w=1200', size: 'large' },
  { id: 2, title: 'Adrenaline', category: 'Skate', url: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&q=90&w=1200', size: 'small' },
  { id: 3, title: 'Gravity', category: 'Basquete', url: 'https://images.unsplash.com/photo-1519861531473-9200362f46b3?auto=format&fit=crop&q=90&w=1200', size: 'small' },
  { id: 4, title: 'Horizon', category: 'Corrida', url: 'https://images.unsplash.com/photo-1461896736644-31911f99c722?auto=format&fit=crop&q=90&w=1200', size: 'large' },
  { id: 5, title: 'The Peak', category: 'Escalada', url: 'https://images.unsplash.com/photo-1522163182402-834f60b58e76?auto=format&fit=crop&q=90&w=1200', size: 'small' },
  { id: 6, title: 'Flow', category: 'Surf', url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=90&w=1200', size: 'small' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 p-6 md:p-8 flex justify-between items-center ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
          <Camera className="text-red-600" size={24} />
          <span className="text-xl font-black italic tracking-tighter uppercase">MDIAS<span className="text-red-600">.</span></span>
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-white text-black p-2 md:px-5 md:py-2.5 flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all transform active:scale-95"
        >
          <span className="mono text-[10px] font-bold uppercase tracking-widest hidden md:block">Explorar</span>
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[200] bg-zinc-950 p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="mono text-[10px] text-red-600 uppercase tracking-widest font-bold">Diretório</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-red-600 transition-colors p-2"><X size={48} /></button>
            </div>
            
            <div className="flex flex-col gap-2">
              {['Início', 'Projetos', 'Contato'].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-6xl md:text-[10rem] font-black italic uppercase tracking-tighter hover:text-red-600 transition-all leading-none"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-10">
              <div className="mono text-[10px] text-zinc-500">
                FOTOGRAFIA ESPORTIVA<br/>BRAZIL BASED
              </div>
              <div className="flex gap-6">
                <Instagram size={28} className="hover:text-red-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=90&w=1920" 
          className="w-full h-full object-cover opacity-60 grayscale brightness-50"
          alt="Action"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      
      <div className="relative z-10 text-center container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono text-red-600 text-[10px] md:text-xs uppercase tracking-[0.6em] mb-6 block font-bold">Capturando a Essência do Esporte</span>
          <h1 className="text-[14vw] md:text-[13rem] font-black italic uppercase tracking-tighter leading-[0.75] mb-12">
            RAW <br/><span className="text-red-600">POWER.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <p className="max-w-xs text-zinc-400 font-medium leading-relaxed italic text-sm border-l border-red-600 pl-6 text-left">
              Não é apenas sobre a foto. É sobre o suor, a tensão e o milésimo de segundo que define um campeão.
            </p>
            <a href="#projetos" className="group bg-red-600 text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3">
              Explorar Obras <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioGrid = () => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section id="projetos" className="py-32 bg-black">
      <div className="container mx-auto px-6 mb-20">
        <div className="flex items-end justify-between border-b border-zinc-900 pb-10">
          <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">Arquivo</h2>
          <span className="mono text-[10px] text-zinc-700 uppercase tracking-widest mb-2">PROJETOS SELECIONADOS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[450px] md:auto-rows-[600px] gap-6 px-4 md:px-10">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.05 }}
            className={`relative group overflow-hidden bg-zinc-950 ${p.size === 'large' ? 'lg:col-span-8' : 'lg:col-span-4'}`}
            onClick={() => setSelected(p)}
          >
            <img 
              src={p.url} 
              className="w-full h-full object-cover grayscale transition-all duration-[1s] group-hover:grayscale-0 group-hover:scale-110"
              alt={p.title}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                <Maximize2 className="text-white" size={24} />
              </div>
            </div>
            <div className="absolute bottom-10 left-10 transition-transform duration-500 group-hover:-translate-y-2">
              <span className="mono text-[10px] text-red-600 uppercase tracking-widest block mb-2 font-bold">{p.category}</span>
              <h3 className="text-4xl font-black italic uppercase tracking-tight">{p.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/98 flex items-center justify-center p-4 md:p-16"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-red-600 transition-colors z-[310]"><X size={48} /></button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              src={selected.url} 
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contato" className="bg-zinc-950 py-40 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-[10rem] font-black italic uppercase tracking-tighter leading-none mb-16">
          BOOK A <span className="text-red-600 text-outline">SESSION</span>
        </h2>
        
        <div className="flex flex-col items-center gap-12">
          <a href="mailto:hello@mdias.com" className="text-2xl md:text-6xl font-black italic hover:text-red-600 transition-all border-b-4 border-red-600/20 hover:border-red-600 pb-4">
            HELLO@MDIASFOTO.COM
          </a>
          
          <div className="flex gap-12 mt-10">
            <Instagram size={36} className="hover:text-red-600 cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="mt-48 flex flex-col md:flex-row justify-between items-center gap-8 mono text-[10px] text-zinc-700 uppercase tracking-[0.5em]">
          <span>© 2024 MDIAS — ALL RIGHTS RESERVED</span>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors underline-offset-8 underline decoration-red-600/50">INSTAGRAM</a>
            <a href="#" className="hover:text-white transition-colors underline-offset-8 underline decoration-red-600/50">BEHANCE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white selection:bg-red-600 selection:text-white">
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[500] bg-black flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-4xl font-black italic tracking-tighter"
            >
              MDIAS<span className="text-red-600">.</span>
            </motion.div>
            <div className="mt-4 w-32 h-[1px] bg-zinc-900 relative overflow-hidden">
               <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-red-600"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Navbar />
          <Hero />
          <PortfolioGrid />
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}