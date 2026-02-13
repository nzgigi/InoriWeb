"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
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
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.15), transparent 40%)`
        }}
      />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Contenu principal */}
      <div className={`relative z-10 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Code erreur */}
        <h1 className="text-9xl md:text-[12rem] font-bold mb-4 bg-gradient-to-r from-red-400 via-purple-400 to-red-400 bg-clip-text text-transparent animate-gradient">
          404
        </h1>
        
        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">
          Page introuvable
        </h2>
        
        <p className="text-lg text-slate-400 mb-12 max-w-md mx-auto">
          Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/nz"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          
          <Link 
            href="/nz#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Nous contacter
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
