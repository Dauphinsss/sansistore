const categories = [
  {
    name: 'Novedades',
    description: 'Lo último en tendencias',
    emoji: '✨',
    bg: 'from-indigo-500 to-violet-600',
  },
  {
    name: 'Más vendidos',
    description: 'Los favoritos del momento',
    emoji: '🔥',
    bg: 'from-orange-400 to-rose-500',
  },
  {
    name: 'Ofertas',
    description: 'Hasta 50% de descuento',
    emoji: '🏷️',
    bg: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Colecciones',
    description: 'Selecciones exclusivas',
    emoji: '🎁',
    bg: 'from-amber-400 to-orange-500',
  },
];

export default function Categories() {
  return (
    <section id="categorias" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Explora por categoría
          </h2>
          <p className="text-slate-500">Encuentra exactamente lo que buscas</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.bg} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="text-4xl mb-3">{cat.emoji}</span>
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-sm text-white/80 mt-1">{cat.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
