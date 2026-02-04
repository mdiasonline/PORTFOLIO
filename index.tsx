
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Camera, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Award, 
  Zap, 
  Users, 
  Menu, 
  X, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type Category = 'Todos' | 'Futebol' | 'Corrida' | 'Basquete' | 'Radicais';

interface Photo {
  id: number;
  url: string;
  category: Category;
  title: string;
}

// --- Data ---
const PHOTOS: Photo[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200', category: 'Futebol', title: 'O Chute Decisivo' },
  { id: 2, url: 'https://images.unsplash.com/photo-1461896736644-31911f99c722?auto=format&fit=crop&q=80&w=1200', category: 'Corrida', title: 'Explosão na Largada' },
  { id: 3, url: 'https://images.unsplash.com/photo-1519861531473-9200362f46b3?auto=format&fit=crop&q=80&w=1200', category: 'Basquete', title: 'Cesta no Último Segundo' },
  { id: 4, url: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&q=80&w=1200', category: 'Radicais', title: 'Voo no Skate' },
  { id: 5, url: 'https://images.unsplash.com/photo-1541252260730-0412e3e2104e?auto=format&fit=crop&q=80&w=1200', category: 'Futebol', title: 'Grito de Gol' },
  { id: 6, url: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=1200', category: 'Corrida', title: 'Foco Absoluto' },
  { id: 7, url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200', category: 'Basquete', title: 'Defesa Intransponível' },
  { id: 8, url: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&q=80&w=1200', category: 'Radicais', title: 'Surf nas Ondas Gigantes' },
];

const SERVICES = [
  {
    icon: <Camera className="w-8 h-8 text-red-600" />,
    title: 'Cobertura de Eventos',
    description: 'Captura profissional de torneios, campeonatos e competições de alto nível.'
  },
  {
    icon: <Zap className="w-8 h-8 text-red-600" />,
    title: 'Sessões para Atletas',
    description: 'Portfólio dinâmico focado na performance individual e técnica do esportista.'
  },
  {
    icon: <Users className="w-8 h-8 text-red-600" />,
    title: 'Clubes e Marcas',
    description: 'Produção de conteúdo visual para campanhas publicitárias e redes sociais de times.'
  }
];

// --- Components ---

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
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/95 py-4 shadow-xl border-b border-zinc-800' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <span className="text-red-600">ACTION</span>
          <span className="text-white">PHOTO</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 flex flex-col p-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="py-4 text-center text-lg font-medium text-zinc-300 hover:text-red-600 border-b border-zinc-800 last:border-0 transition-colors"
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

const Lightbox = ({ photo, onClose }: { photo: Photo; onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
      onClick={onClose}
    >
      <button 
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[101]"
        onClick={onClose}
      >
        <X size={40} />
      </button>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-6xl w-full max-h-[85vh] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={photo.url} 
          alt={photo.title} 
          className="w-full h-full object-contain shadow-2xl rounded"
        />
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">{photo.title}</h3>
          <p className="text-red-500 font-medium uppercase tracking-widest text-sm">{photo.category}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PortfolioApp() {
  const [filter, setFilter] = useState<Category>('Todos');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const categories: Category[] = ['Todos', 'Futebol', 'Corrida', 'Basquete', 'Radicais'];

  const filteredPhotos = useMemo(() => {
    return filter === 'Todos' ? PHOTOS : PHOTOS.filter(p => p.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <header id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-zinc-950" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-6 uppercase">
              CONGELE A <span className="text-red-600">EMOÇÃO</span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Fotografia esportiva profissional que captura o auge da performance, a intensidade do jogo e a alma do atleta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#portfolio" 
                className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest transition-all transform hover:scale-105"
              >
                Ver Portfólio
              </a>
              <a 
                href="#contato" 
                className="px-10 py-4 border border-white/20 hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest transition-all"
              >
                Trabalhe Comigo
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-red-600 to-transparent mx-auto" />
        </div>
      </header>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter italic">Portfólio</h2>
              <div className="w-20 h-1 bg-red-600 mb-6" />
              <p className="text-zinc-400 max-w-md">Uma seleção dos melhores momentos capturados em diversas modalidades.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 text-sm font-bold uppercase tracking-tighter transition-all ${filter === cat ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode='popLayout'>
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">{photo.category}</p>
                    <h3 className="text-xl font-bold text-white mb-4">{photo.title}</h3>
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <Maximize2 size={16} /> Ver Ampliada
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-zinc-900 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800" 
                alt="Fotógrafo em ação" 
                className="relative z-10 w-full rounded-none grayscale"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-red-600 z-0" />
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">O Olhar Por Trás <br /><span className="text-red-600">Da Lente</span></h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Olá, sou um fotógrafo especializado em capturar a essência crua dos esportes. Para mim, a fotografia não é apenas sobre o resultado final, mas sobre a jornada, o esforço e o suor que levam ao pódio.
              </p>
              <p className="text-zinc-400">
                Com mais de 10 anos cobrindo eventos nacionais e internacionais, meu objetivo é imortalizar momentos que duram frações de segundo, mas que contam histórias de uma vida inteira de dedicação. Minha paixão é transmitir a energia pulsante de um estádio lotado ou o silêncio focado de um corredor na linha de partida.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h4 className="text-3xl font-black text-red-600">500+</h4>
                  <p className="text-sm uppercase tracking-widest text-zinc-500 font-bold">Eventos Cobertos</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-red-600">12</h4>
                  <p className="text-sm uppercase tracking-widest text-zinc-500 font-bold">Países Visitados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter italic">Serviços</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-zinc-900/50 border border-zinc-800 p-10 hover:border-red-600/50 transition-all text-left"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter italic">{service.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{service.description}</p>
                <a href="#contato" className="mt-8 flex items-center gap-2 text-red-600 font-bold uppercase text-xs tracking-widest group">
                  Saiba mais <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter italic">Vamos Criar <br /><span className="text-red-600">Impacto?</span></h2>
              <p className="text-zinc-400 mb-10 text-lg">Pronto para elevar o nível das imagens do seu evento ou marca? Entre em contato e vamos conversar sobre seu próximo projeto.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 flex items-center justify-center rounded">
                    <Mail className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Email Profissional</p>
                    <p className="text-lg font-bold">contato@actionphoto.com</p>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-10">
                  <a href="#" className="w-12 h-12 bg-zinc-800 hover:bg-red-600 transition-colors flex items-center justify-center rounded group">
                    <Instagram className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-zinc-800 hover:bg-red-600 transition-colors flex items-center justify-center rounded group">
                    <Facebook className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-zinc-800 hover:bg-red-600 transition-colors flex items-center justify-center rounded group">
                    <Twitter className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            <form className="bg-zinc-950 p-10 border border-zinc-800 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-zinc-500">Seu Nome</label>
                  <input 
                    type="text" 
                    placeholder="Ex: João Silva" 
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 focus:outline-none focus:border-red-600 transition-colors text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-zinc-500">Seu Email</label>
                  <input 
                    type="email" 
                    placeholder="Ex: joao@email.com" 
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 focus:outline-none focus:border-red-600 transition-colors text-white"
                  />
                </div>
              </div>
              <div className="space-y-2 mb-8">
                <label className="text-xs uppercase font-bold tracking-widest text-zinc-500">Sua Mensagem</label>
                <textarea 
                  rows={6} 
                  placeholder="Como posso ajudar seu projeto?" 
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 focus:outline-none focus:border-red-600 transition-colors text-white resize-none"
                />
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest py-5 transition-all transform hover:scale-[1.02]">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-zinc-900 text-center">
        <div className="container mx-auto px-6">
          <div className="text-xl font-black tracking-tighter flex items-center justify-center gap-2 mb-6">
            <span className="text-red-600">ACTION</span>
            <span className="text-white">PHOTO</span>
          </div>
          <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Action Photo Portfólio. Todos os direitos reservados.</p>
          <p className="text-zinc-700 text-[10px] mt-4 uppercase tracking-[0.2em]">Especialista em Fotografia Esportiva de Alto Rendimento</p>
        </div>
      </footer>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

