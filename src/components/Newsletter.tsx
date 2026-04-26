export default function Newsletter() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4 block">
          Newsletter
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Sé el primero en enterarte
        </h2>
        <p className="text-slate-400 mb-10">
          Recibe novedades, ofertas exclusivas y lanzamientos antes que nadie
          directamente en tu correo.
        </p>

        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="tu@correo.com"
            className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all hover:scale-105 whitespace-nowrap"
          >
            Suscribirme
          </button>
        </form>

        <p className="text-slate-600 text-xs mt-4">
          Sin spam. Cancela cuando quieras.
        </p>
      </div>
    </section>
  );
}
