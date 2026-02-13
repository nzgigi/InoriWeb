"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 overflow-hidden">
      {/* Curseur custom */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Contenu principal */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-300">Création de sites web sur-mesure</span>
        </div>

        {/* Logo/Titre */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
          Inori Web
        </h1>
        
        {/* Sous-titre */}
        <p className="text-xl md:text-3xl text-slate-300 mb-4 max-w-3xl mx-auto font-light">
          Transformez vos idées en réalité digitale
        </p>
        
        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
          Sites web modernes • Applications web • Solutions sur-mesure
        </p>

        {/* CTA Principal */}
        <Link 
          href="/nz"
          className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
        >
          Découvrir nos services
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Link>

        {/* Contact rapide */}
        <div className="mt-8">
          <Link 
            href="/nz#contact"
            className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
          >
            Ou contactez-nous directement →
          </Link>
        </div>
      </div>

      {/* Footer minimaliste */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 text-sm">
        © 2026 Inori Web
      </footer>
    </div>
  );
}
