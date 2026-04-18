import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, LogOut } from 'lucide-react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return unsub;
  }, []);

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, googleProvider);
    } catch (e: any) {
      if (e?.code !== 'auth/popup-closed-by-user' && e?.code !== 'auth/cancelled-popup-request') {
        console.error(e);
      }
    }
  };

  const handleLogout = () => signOut(auth).catch(console.error);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          <a href="/" className="text-lg font-bold text-slate-900">
            sansi<span className="text-indigo-600">store</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Novedades</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Ofertas</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Colecciones</a>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-slate-500 hover:text-slate-900 transition-colors p-1">
              <Search size={18} />
            </button>
            <button className="relative text-slate-500 hover:text-slate-900 transition-colors p-1">
              <ShoppingBag size={18} />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
            </button>

            {authReady && (
              user ? (
                <div className="flex items-center gap-2">
                  {user.photoURL && (
                    <img src={user.photoURL} alt={user.displayName ?? ''} className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
                  )}
                  <span className="hidden sm:inline text-sm text-slate-700 max-w-30 truncate">{user.displayName}</span>
                  <button onClick={handleLogout} className="text-slate-400 hover:text-slate-700 transition-colors p-1" title="Cerrar sesión">
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 text-sm text-slate-700 hover:text-slate-900 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Iniciar sesión
                </button>
              )
            )}

            <button className="md:hidden text-slate-500 p-1" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 flex flex-col gap-3">
            <a href="#" className="text-sm text-slate-600">Novedades</a>
            <a href="#" className="text-sm text-slate-600">Ofertas</a>
            <a href="#" className="text-sm text-slate-600">Colecciones</a>
          </div>
        )}
      </div>
    </nav>
  );
}
