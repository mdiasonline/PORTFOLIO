import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Instagram, Facebook, Twitter, Menu, X, ArrowRight, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Banco de Imagens Esportivas ---
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

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/95 py-4 shadow-2xl border-b border-white/10 backdrop-blur-md' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
          <Camera className="text-red-600" size={28} />
          <span className="text-red-600">MDIAS</span> FOTOGRAFIA
        </div>
        
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="hover:text-red-600 transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white hover:text-red-600 transition-colors">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-zinc-950 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black italic uppercase text-white hover:text-red-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PortfolioApp = () => {
  const [filter, setFilter] = useState('Todos');
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const categories = ['Todos', 'Futebol', 'Corrida', 'Basquete', 'Radicais'];
  
  const filteredPhotos = useMemo(() => {
    return filter === 'Todos' ? PHOTOS : PHOTOS.filter(p => p.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-red-600 selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover grayscale"
            alt="Sports Hero"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-red-600 font-black italic uppercase tracking-[0.5em] text-xs mb-4 block">Action Photography</span>
            <h1 className="text-7xl md:text-[10rem] font-black italic uppercase tracking-tighter leading-none mb-6">
              REDEFINA O <br/>
              <span className="text-stroke">LIMITE.</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide mb-10">
              Capturando a intensidade, o suor e a glória em frames que eternizam a história do esporte.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="#portfolio" className="group bg-red-600 px-12 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3">
                Explorar Galeria <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl font-black italic uppercase text-red-600 tracking-tighter opacity-20 absolute -translate-y-12">GALERIA</h2>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter relative z-10">Portfolio <span className="text-red-600">Esportivo</span></h2>
            <div className="h-1 w-24 bg-red-600 mt-6" />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all ${filter === cat ? 'bg-red-600 text-white border-red-600' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[3/4] group cursor-pointer overflow-hidden bg-zinc-900 border border-white/5"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.url} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  alt={photo.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{photo.category}</span>
                  <h3 className="font-black text-2xl leading-tight uppercase italic">{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contato" className="py-32 bg-zinc-900/30 border-t border-white/5 text-center px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-6 tracking-tighter">
            PRONTO PARA <span className="text-red-600">VENCER?</span>
          </h2>
          <p className="text-zinc-500 mb-12 text-lg">Disponível para coberturas nacionais e internacionais. Vamos contar a sua história.</p>
          
          <div className="flex flex-col items-center gap-10">
            <a href="mailto:contato@mdiasfotografia.com" className="text-2xl md:text-4xl font-black hover:text-red-600 transition-colors border-b-2 border-zinc-800 pb-2">
              contato@mdiasfotografia.com
            </a>
            
            <div className="flex gap-8">
              <a href="#" className="p-4 bg-zinc-900 rounded-full hover:bg-red-600 transition-all text-white hover:-translate-y-2"><Instagram /></a>
              <a href="#" className="p-4 bg-zinc-900 rounded-full hover:bg-red-600 transition-all text-white hover:-translate-y-2"><Twitter /></a>
              <a href="#" className="p-4 bg-zinc-900 rounded-full hover:bg-red-600 transition-all text-white hover:-translate-y-2"><Facebook /></a>
            </div>
            
            <div className="mt-20 pt-10 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
              <span>© 2024 MDIAS FOTOGRAFIA. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-950/98 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedPhoto(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-red-600 transition-colors z-50">
              <X size={48} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto.url} 
                className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10"
                alt={selectedPhoto.title}
              />
              <div className="mt-6 text-center">
                <span className="text-red-600 font-black italic uppercase tracking-widest text-xs">{selectedPhoto.category}</span>
                <h4 className="text-3xl font-black italic uppercase tracking-tight">{selectedPhoto.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Inicialização Limpa
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<PortfolioApp />);
}