import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, LogOut } from 'lucide-react';
import { FirebaseError } from 'firebase/app';
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
    } catch (e: unknown) {
      const ignored = [
        'auth/popup-closed-by-user',
        'auth/cancelled-popup-request',
      ];

      if (!(e instanceof FirebaseError) || !ignored.includes(e.code)) {
        console.error(e);
      }
    }
  };

  const handleLogout = () => signOut(auth).catch(console.error);

  // Use Tailwind classes for colors and hover states (colors defined in tailwind.config.cjs)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg-light/85 border-b border-border-light font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* LOGO */}
          <a href="/" className="font-black tracking-tight text-[16px] text-text-light">
            sansi<span className="text-primary">store</span>
          </a>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {['Novedades', 'Ofertas', 'Colecciones'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[13px] text-text-light opacity-[0.55] font-semibold tracking-[0.02em] transition-all hover:text-primary hover:opacity-100"
              >
                {item}
              </a>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            {/* SEARCH */}
            <button className="transition-all text-text-light opacity-[0.55] hover:text-primary hover:opacity-100">
              <Search size={18} />
            </button>

            {/* CART */}
            <button className="relative transition-all text-text-light opacity-[0.55] hover:text-primary hover:opacity-100">
              <ShoppingBag size={18} />
              <span
                className="absolute -top-1 -right-1 text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold bg-primary-action text-bg-light"
              >
                0
              </span>
            </button>

            {/* AUTH */}
            {authReady &&
              (user ? (
                <div className="flex items-center gap-2">

                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  )}

                  <span className="hidden sm:inline text-[13px] text-text-light opacity-70">
                    {user.displayName}
                  </span>

                  <button onClick={handleLogout} className="opacity-50 transition-all hover:text-primary">
                    <LogOut size={16} />
                  </button>

                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-4 py-1.5 rounded-full border transition-all active:scale-95 text-[13px] font-semibold text-text-light border-border-light hover:border-primary hover:text-primary"
                >
                  Iniciar sesión
                </button>
              ))}

            {/* MOBILE */}
            <button className="md:hidden text-text-light opacity-60 hover:text-primary" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden py-3 flex flex-col gap-3 border-t border-border-light">
            {['Novedades', 'Ofertas', 'Colecciones'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[13px] text-text-light opacity-[0.55] font-semibold tracking-[0.02em] transition-all hover:text-primary hover:opacity-100"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
