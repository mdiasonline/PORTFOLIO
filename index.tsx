import React, { useState, useEffect, useMemo, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Instagram, Facebook, Twitter, Menu, X, ArrowRight, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PHOTOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200', category: 'Futebol', title: 'O Chute Decisivo' },
  { id: 2, url: 'https://images.unsplash.com/photo-1461896736644-31911f99c722?auto=format&fit=crop&q=80&w=1200', category: 'Corrida', title: 'Explosão na Largada' },
  { id: 3, url: 'https://images.unsplash.com/photo-1519861531473-9200362f46b3?auto=format&fit=crop&q=80&w=1200', category: 'Basquete', title: 'Cesta no Último Segundo' },
  { id: 4, url: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&q=80&w=1200', category: 'Radicais', title: 'Voo no Skate' },
  { id: 5, url: 'https://images.unsplash.com/photo-1541252260730-0412e3e2104e?auto=format&fit=crop&q=80&w=1200', category: 'Futebol', title: 'Grito de Gol' },
  { id: 6, url: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=1200', category: 'Corrida', title: 'Foco Absoluto' },
  { id: 7, url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200', category: 'Basquete', title: 'Defesa Intransponível' },
  { id: 8, url: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&q=80&w=1200', category: 'Radicais', title: 'Surf nas Ondas Gigantes' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Início', href: '#home' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/95 py-4 border-b border-white/10 backdrop-blur-md' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-black italic tracking-tighter flex items-center gap-2">
          <Camera className="text-red-600" size={24} />
          <span>MDIAS <span className="text-red-600">FOTOGRAFIA</span></span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
          {links.map(l => (
            <a key={l.name} href={l.href} className="hover:text-red-600 transition-colors">{l.name}</a>
          ))}
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-900 border-b border-white/5 flex flex-col p-8 gap-4 text-center font-black uppercase italic tracking-widest"
          >
            {links.map(l => (
              <a key={l.name} href={l.href} onClick={() => setIsMenuOpen(false)}>{l.name}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PortfolioApp = () => {
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<any>(null);
  const categories = ['Todos', 'Futebol', 'Corrida', 'Basquete', 'Radicais'];
  
  const filtered = useMemo(() => 
    filter === 'Todos' ? PHOTOS : PHOTOS.filter(p => p.category === filter), 
  [filter]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      
      {/* Hero */}
      <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1920" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 scale-105"
          alt="Hero"
        />
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-6"
          >
            AÇÃO EM <br/><span className="text-red-600">FOCO.</span>
          </motion.h1>
          <a href="#portfolio" className="inline-flex items-center gap-3 bg-red-600 px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Ver Portfólio <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Grid */}
      <section id="portfolio" className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Galeria <span className="text-red-600">2024</span></h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button 
                key={c} onClick={() => setFilter(c)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border ${filter === c ? 'bg-red-600 border-red-600' : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <motion.div
                key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="relative aspect-[3/4] group cursor-pointer overflow-hidden bg-zinc-900"
                onClick={() => setSelected(p)}
              >
                <img src={p.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={p.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all p-6 flex flex-col justify-end">
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-1">{p.category}</span>
                  <p className="font-bold uppercase italic">{p.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="py-32 bg-zinc-900/30 border-t border-white/5 text-center px-6">
        <h3 className="text-4xl md:text-6xl font-black italic uppercase mb-12 tracking-tighter">CONTATE O <span className="text-red-600">FOTÓGRAFO</span></h3>
        <div className="flex flex-col items-center gap-8">
          <a href="mailto:contato@mdias.com" className="text-2xl md:text-4xl font-black hover:text-red-600 transition-colors">contato@mdiasfotografia.com</a>
          <div className="flex gap-6">
            <Instagram className="hover:text-red-600 cursor-pointer" />
            <Twitter className="hover:text-red-600 cursor-pointer" />
            <Facebook className="hover:text-red-600 cursor-pointer" />
          </div>
          <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.4em] mt-12">© 2024 MDIAS FOTOGRAFIA</p>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white"><X size={40} /></button>
            <motion.img 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={selected.url} className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<StrictMode><PortfolioApp /></StrictMode>);
}