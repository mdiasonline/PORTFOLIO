import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Instagram, 
  ArrowUpRight, 
  Camera, 
  Menu, 
  X, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

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
  
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] mix-blend-difference p-6 md:p-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Camera className="text-white" size={24} />
          <span className="text-xl font-black italic tracking-tighter uppercase">MDIAS</span>
        </div>
        <button onClick={() => setIsOpen(true)} className="group flex items-center gap-3">
          <span className="mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Menu</span>
          <Menu size={32} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-zinc-950 p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="mono text-[10px] text-zinc-500 uppercase tracking-widest">Navegação</span>
              <button onClick={() => setIsOpen(false)}><X size={48} /></button>
            </div>
            
            <div className="flex flex-col gap-4">
              {['Início', 'Projetos', 'Sobre', 'Contato'].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter hover:text-red-600 transition-colors inline-block"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex justify-between items-end">
              <div className="mono text-[10px] text-zinc-500">
                DISPONÍVEL PARA TRABALHOS<br/>EM TODO O MUNDO
              </div>
              <div className="flex gap-6">
                <Instagram size={24} className="hover:text-red-600 cursor-pointer" />
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
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=90&w=1920" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      
      <div className="relative z-10 text-center container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="mono text-[10px] uppercase tracking-[0.6em] mb-6 opacity-60">Visual Storytelling</h2>
          <h1 className="text-8xl md:text-[15rem] font-black italic uppercase tracking-tighter leading-[0.8]">
            RAW <br/><span className="text-red-600">ACTION</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-10">
            <p className="max-w-xs text-left text-zinc-400 font-medium leading-relaxed italic border-l border-red-600 pl-4">
              Cada segundo conta. Cada frame é um legado. Capturando a essência bruta do esporte de elite.
            </p>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="hidden md:block"
            >
              <div className="w-[1px] h-20 bg-gradient-to-b from-red-600 to-transparent mx-auto" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section id="projetos" className="py-20 bg-black">
      <div className="container mx-auto px-6 mb-20">
        <div className="flex justify-between items-end border-b border-zinc-900 pb-10">
          <div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Selected<br/>Works</h2>
          </div>
          <div className="mono text-[10px] text-zinc-500 uppercase tracking-widest hidden md:block">
            01 — GALERIA ATUALIZADA
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[300px] md:auto-rows-[450px] gap-4 px-4 md:px-10">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative group cursor-none overflow-hidden bg-zinc-900 ${
              project.size === 'large' ? 'lg:col-span-8' : 'lg:col-span-4'
            }`}
            onClick={() => setSelected(project)}
          >
            <img 
              src={project.url} 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <Maximize2 className="text-white scale-0 group-hover:scale-100 transition-transform duration-500" size={40} />
            </div>
            <div className="absolute bottom-6 left-6 z-20">
               <p className="mono text-[10px] uppercase text-red-600 mb-1">{project.category}</p>
               <h3 className="text-2xl font-black italic uppercase tracking-tighter">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black p-4 md:p-12 flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-10 right-10 z-50"><X size={40} /></button>
            <motion.img 
              layoutId={`img-${selected.id}`}
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
    <footer id="contato" className="bg-zinc-950 py-40 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-4xl md:text-[6rem] font-black italic uppercase tracking-tighter leading-none mb-10"
          >
            LET'S SHOOT <br/>
            <span className="text-red-600">TOGETHER</span>
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
            <a href="mailto:hello@mdias.co" className="text-2xl font-bold border-b-2 border-red-600 pb-2 hover:text-red-600 transition-colors">
              HELLO@MDIAS.CO
            </a>
            <div className="flex gap-6">
              <span className="mono text-xs uppercase tracking-widest text-zinc-500">Instagram / Behance / LinkedIn</span>
            </div>
          </div>
        </div>

        <div className="mt-40 pt-10 border-t border-zinc-900 flex justify-between items-center text-zinc-600 mono text-[8px] uppercase tracking-widest">
          <span>MDIAS — © 2024 PORTFOLIO</span>
          <span>CRAFTED FOR SPEED</span>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de assets
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black selection:bg-red-600 selection:text-white">
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ y: '-100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[500] bg-zinc-950 flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-2xl font-black italic tracking-tighter"
            >
              MDIAS<span className="text-red-600">.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <Hero />
      <Portfolio />
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);