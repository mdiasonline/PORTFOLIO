import React, { useState, useEffect, useMemo } from 'react';
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
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 p-6 md:p-8 flex justify-between items-center ${scrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
          <Camera className="text-red-600" size={24} />
          <span className="text-xl font-black italic tracking-tighter uppercase">MDIAS<span className="text-red-600">.</span></span>
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-white text-black p-2 md:px-4 md:py-2 flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all"
        >
          <span className="mono text-[10px] font-bold uppercase tracking-widest hidden md:block">Menu</span>
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200] bg-zinc-950 p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="mono text-[10px] text-red-600 uppercase tracking-widest font-bold">Menu Principal</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-red-600 transition-colors"><X size={48} /></button>
            </div>
            
            <div className="flex flex-col gap-2">
              {['Início', 'Projetos', 'Contato'].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ x: -50, opacity: 0 }}
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
                BASED IN BRAZIL<br/>AVAILABLE WORLDWIDE
              </div>
              <div className="flex gap-6">
                <Instagram size={24} className="hover:text-red-600 cursor-pointer transition-colors" />
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=90&w=1920" 
          className="w-full h-full object-cover opacity-50 grayscale"
          alt="Sports Photography Background"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      
      <div className="relative z-10 text-center container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <span className="mono text-red-600 text-xs uppercase tracking-[0.5em] mb-4 block font-bold">Fotografia Esportiva de Elite</span>
          <h1 className="text-7xl md:text-[14rem] font-black italic uppercase tracking-tighter leading-[0.75] mb-8">
            VIVA A <br/><span className="text-red-600">GLÓRIA.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
            <p className="max-w-xs text-zinc-400 font-medium leading-relaxed italic text-sm md:text-base border-l-2 border-red-600 pl-4 text-left">
              Eternizando o momento exato onde o esforço se torna história. Sem filtros, apenas a verdade do esporte.
            </p>
            <a href="#projetos" className="bg-red-600 text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2">
              Ver Galeria <ArrowRight size={18} />
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
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-baseline justify-between border-b border-zinc-900 pb-8">
          <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter">Trabalhos</h2>
          <span className="mono text-xs text-zinc-600 uppercase">2023 — 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[400px] md:auto-rows-[550px] gap-4 px-4 md:px-8">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative group overflow-hidden bg-zinc-900 ${p.size === 'large' ? 'lg:col-span-8' : 'lg:col-span-4'}`}
            onClick={() => setSelected(p)}
          >
            <img 
              src={p.url} 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              alt={p.title}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
              <Maximize2 className="text-white scale-50 group-hover:scale-100 transition-transform" size={48} />
            </div>
            <div className="absolute bottom-8 left-8">
              <span className="mono text-[10px] text-red-600 uppercase tracking-widest block mb-2">{p.category}</span>
              <h3 className="text-3xl font-black italic uppercase tracking-tight">{p.title}</h3>
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
            className="fixed inset-0 z-[300] bg-black/98 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-10 right-10 hover:text-red-600 transition-colors"><X size={40} /></button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              src={selected.url} 
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contato" className="bg-zinc-950 py-32 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-[8rem] font-black italic uppercase tracking-tighter leading-none mb-12">
          CONTATO <span className="text-red-600">IMEDIATO</span>
        </h2>
        
        <div className="flex flex-col items-center gap-10">
          <a href="mailto:contato@mdias.photography" className="text-2xl md:text-5xl font-black italic border-b-2 border-red-600 pb-2 hover:text-red-600 transition-colors">
            CONTATO@MDIAS.COM.BR
          </a>
          
          <div className="flex gap-10">
            <Instagram size={32} className="hover:text-red-600 cursor-pointer transition-colors" />
            <div className="w-[1px] h-8 bg-zinc-800" />
            <span className="mono text-xs uppercase tracking-widest text-zinc-500 self-center">São Paulo / SP</span>
          </div>
        </div>

        <div className="mt-40 flex flex-col md:flex-row justify-between items-center gap-6 mono text-[10px] text-zinc-700 uppercase tracking-[0.3em]">
          <span>© 2024 MDIAS — DIREITOS RESERVADOS</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">BEHANCE</a>
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white selection:bg-red-600 selection:text-white">
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black flex items-center justify-center"
          >
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-3xl font-black italic tracking-tighter"
            >
              MDIAS<span className="text-red-600">.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Navbar />
          <Hero />
          <PortfolioGrid />
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

// Renderização segura
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Erro: Elemento #root não encontrado no DOM.");
}