import { useState } from 'react';

interface Category {
  categoryId: string;
  name: string;
  description?: string;
  active: boolean;
}

// Datos de prueba — se reemplazarán con Firestore en el backend
const MOCK_CATEGORIES: Category[] = [
  { categoryId: 'cat_001', name: 'Nacional', description: 'Comida típica boliviana', active: true },
  { categoryId: 'cat_002', name: 'Pizzas', description: 'Pizzas artesanales y al horno', active: true },
  { categoryId: 'cat_003', name: 'Sushi', description: 'Rolls y platos japoneses', active: true },
  { categoryId: 'cat_004', name: 'Burgers', description: 'Hamburguesas artesanales', active: true },
  { categoryId: 'cat_005', name: 'Café', description: 'Bebidas calientes y frías', active: false },
];

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggle = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.categoryId === id ? { ...cat, active: !cat.active } : cat
      )
    );
    const cat = categories.find((c) => c.categoryId === id);
    if (cat) {
      showToast('ok', `"${cat.name}" ${cat.active ? 'desactivada' : 'activada'} correctamente.`);
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = categories.filter((c) => c.active).length;

  return (
    <div className="min-h-screen bg-[#FFFBF4]">
      {/* Topbar */}
      <nav className="bg-[#0A0B0D] px-4 h-14 flex items-center gap-3">
        <a href="/admin" className="text-white/50 text-sm hover:text-white transition-colors">
          ← Dashboard
        </a>
        <span className="text-white font-semibold text-sm">Categorías</span>
        <span className="ml-auto text-[11px] font-semibold text-[#88B04B] border border-[#88B04B] px-2 py-0.5 rounded-full">
          Área 7
        </span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-[15px] font-semibold text-[#1A1A1A]">Gestión de categorías</h1>
            <p className="text-[11px] text-[#888880] mt-0.5">
              {categories.length} categorías · {activeCount} activas
            </p>
          </div>
          <a
            href="/admin/categories/new"
            className="flex items-center gap-1.5 bg-[#88B04B] text-white text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#5E7E2F] transition-colors"
          >
            + Nueva categoría
          </a>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 mb-4">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-[13px] bg-transparent outline-none text-[#1A1A1A] placeholder-gray-400"
          />
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-2">
          {filtered.length === 0 && (
            <div className="text-center py-10 text-[13px] text-gray-400">
              No se encontraron categorías.
            </div>
          )}
          {filtered.map((cat) => (
            <div
              key={cat.categoryId}
              className={`flex items-center gap-3 px-4 py-3 bg-white border rounded-xl transition-opacity ${
                cat.active ? 'border-gray-200' : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-[#1A1A1A]">{cat.name}</div>
                {cat.description && (
                  <div className="text-[11px] text-gray-400 mt-0.5 truncate">{cat.description}</div>
                )}
                <div className="text-[9px] text-gray-300 font-mono mt-0.5">{cat.categoryId}</div>
              </div>

              {/* Status pill */}
              <span
                className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                  cat.active
                    ? 'bg-[rgba(136,176,75,0.15)] text-[#5E7E2F]'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {cat.active ? 'Activa' : 'Inactiva'}
              </span>

              {/* Toggle */}
              <button
                onClick={() => handleToggle(cat.categoryId)}
                className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
                  cat.active ? 'bg-[#88B04B]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    cat.active ? 'left-[18px]' : 'left-0.5'
                  }`}
                />
              </button>

              {/* Editar */}
              <a
                href={`/admin/categories/edit/${cat.categoryId}`}
                className="text-[11px] font-medium text-[#5E7E2F] bg-[rgba(136,176,75,0.12)] border border-[rgba(136,176,75,0.3)] px-2.5 py-1 rounded-md hover:bg-[rgba(136,176,75,0.2)] transition-colors whitespace-nowrap"
              >
                Editar
              </a>
            </div>
          ))}
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-3 rounded-xl text-[12px] font-medium shadow-lg transition-all ${
              toast.type === 'ok'
                ? 'bg-[rgba(136,176,75,0.12)] border border-[rgba(136,176,75,0.3)] text-[#5E7E2F]'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                toast.type === 'ok' ? 'bg-[#88B04B]' : 'bg-red-500'
              }`}
            >
              {toast.type === 'ok' ? '✓' : '!'}
            </span>
            {toast.msg}
          </div>
        )}
      </div>
    </div>
  );
}