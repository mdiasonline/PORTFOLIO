
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Instagram, Facebook, Twitter, Menu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Dados das Fotos ---
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/95 py-4 shadow-xl border-b border-zinc-800/50' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-black italic tracking-tighter">
          <span className="text-red-600">MDIAS</span> FOTOGRAFIA
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <a href="#home" className="hover:text-red-600 transition-colors">Início</a>
          <a href="#portfolio" className="hover:text-red-600 transition-colors">Portfólio</a>
          <a href="#contato" className="hover:text-red-600 transition-colors">Contato</a>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800"
          >
            <div className="flex flex-col p-6 gap-4 text-center font-bold uppercase tracking-widest text-sm">
              <a href="#home" onClick={() => setIsMenuOpen(false)}>Início</a>
              <a href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfólio</a>
              <a href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PortfolioApp = () => {
  const [filter, setFilter] = useState('Todos');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = ['Todos', 'Futebol', 'Corrida', 'Basquete', 'Radicais'];
  
  const filteredPhotos = useMemo(() => {
    return filter === 'Todos' ? PHOTOS : PHOTOS.filter(p => p.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-red-600">
      <Navbar />
      
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1920" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950" />
        
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-4"
          >
            MDIAS <span className="text-red-600">SPORTS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
          >
            Capturando a alma competitiva em cada milésimo de segundo.
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10">
            <a href="#portfolio" className="bg-red-600 px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all inline-block">Ver Portfólio</a>
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-black italic uppercase text-red-600 tracking-tighter">Galeria</h2>
            <div className="h-1 w-20 bg-white mt-4" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${filter === cat ? 'bg-red-600 text-white border-red-600' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map(photo => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative aspect-[3/4] group cursor-pointer overflow-hidden bg-zinc-900 shadow-2xl"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.url} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  alt={photo.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{photo.category}</span>
                  <h3 className="font-bold text-xl leading-tight uppercase italic">{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <footer id="contato" className="py-24 bg-zinc-900/50 text-center px-6">
        <h2 className="text-3xl font-black italic uppercase mb-8">Vamos elevar o nível da sua imagem?</h2>
        <div className="flex flex-col items-center gap-6">
          <a href="mailto:contato@mdias.com" className="text-xl md:text-2xl font-bold hover:text-red-600 transition-colors">contato@mdiasfotografia.com</a>
          <div className="flex gap-6">
            <Instagram className="hover:text-red-600 cursor-pointer" />
            <Twitter className="hover:text-red-600 cursor-pointer" />
            <Facebook className="hover:text-red-600 cursor-pointer" />
          </div>
          <p className="mt-12 text-zinc-600 text-[10px] uppercase font-bold tracking-widest">© 2024 MDIAS FOTOGRAFIA. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-white"><X size={40} /></button>
            <motion.img 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={(selectedPhoto as any).url} 
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<PortfolioApp />);
}
