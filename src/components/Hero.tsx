import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-14 min-h-[80vh] flex items-center bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center gap-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          Nueva colección
        </span>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight max-w-3xl">
          Encuentra tu estilo <span className="text-indigo-600">único</span>
        </h1>

        <p className="text-slate-500 text-lg max-w-md">
          Productos cuidadosamente seleccionados. Calidad y estilo en un solo
          lugar.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <a
            href="#productos"
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
          >
            Ver colección
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-sm transition-colors"
          >
            Explorar
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
