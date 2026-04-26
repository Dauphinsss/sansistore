export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-base font-bold text-slate-900">
          sansi<span className="text-indigo-600">store</span>
        </span>
        <p className="text-xs text-slate-400">
          © 2025 Sansistore. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-5">
          {['Instagram', 'TikTok', 'Facebook'].map((s) => (
            <a
              key={s}
              href="#"
              className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
