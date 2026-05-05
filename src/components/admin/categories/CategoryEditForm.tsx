import { useState } from 'react';

interface Category {
  categoryId: string;
  name: string;
  description?: string;
  active: boolean;
}

interface Props {
  category: Category;
}

export default function CategoryEditForm({ category }: Props) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description ?? '');
  const [active, setActive] = useState(category.active);
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const showToast = (type: 'ok' | 'err', msg: string) => {
    setToast({ type, msg });
    if (type === 'ok') setTimeout(() => setToast(null), 3000);
  };

  const validate = () => {
    const newErrors: { name?: string } = {};
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
    else if (name.trim().length < 2) newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    // TODO: reemplazar con llamada real a Firestore (updateCategory)
    await new Promise((r) => setTimeout(r, 800));

    showToast('ok', 'Cambios guardados correctamente en Firestore.');
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    // TODO: reemplazar con llamada real a Firestore (deleteCategory)
    await new Promise((r) => setTimeout(r, 600));

    // Redirigir a la lista después de eliminar
    window.location.href = '/admin/categories';
  };

  return (
    <div className="min-h-screen bg-[#FFFBF4]">
      {/* Topbar */}
      <nav className="bg-[#0A0B0D] px-4 h-14 flex items-center gap-3">
        <a
          href="/admin/categories"
          className="text-white/50 text-sm hover:text-white transition-colors"
        >
          ← Categorías
        </a>
        <span className="text-white font-semibold text-sm">Editar categoría</span>
        <span className="ml-auto text-[11px] font-semibold text-[#88B04B] border border-[#88B04B] px-2 py-0.5 rounded-full">
          Área 7
        </span>
      </nav>

      {/* Edit header con nombre e ID */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[rgba(136,176,75,0.12)] flex items-center justify-center text-lg">
          🍽️
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#1A1A1A]">{category.name}</div>
          <div className="text-[9px] font-mono text-gray-400">categoryId: {category.categoryId}</div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">

        {/* Sección datos */}
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100 mb-4">
          Datos de la categoría
        </div>

        {/* Campo nombre */}
        <div className="mb-4">
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Nombre *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({});
            }}
            className={`w-full bg-gray-50 border rounded-lg px-3 py-2.5 text-[13px] text-[#1A1A1A] outline-none transition-colors ${
              errors.name ? 'border-red-400' : 'border-gray-200 focus:border-[#88B04B]'
            }`}
          />
          {errors.name ? (
            <p className="text-[10px] text-red-600 mt-1">{errors.name}</p>
          ) : (
            <p className="text-[10px] text-gray-400 mt-1">
              Si cambia el nombre, se validará que no exista otro igual.
            </p>
          )}
        </div>

        {/* Campo descripción */}
        <div className="mb-4">
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1A1A1A] outline-none focus:border-[#88B04B] transition-colors resize-none"
          />
        </div>

        {/* Sección estado */}
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100 mb-4">
          Estado
        </div>

        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 mb-6">
          <div>
            <p className="text-[12px] font-medium text-[#1A1A1A]">
              {active ? 'Categoría activa' : 'Categoría inactiva'}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {active
                ? 'Visible en la tienda virtual'
                : 'No visible en la tienda virtual'}
            </p>
          </div>
          <button
            onClick={() => setActive(!active)}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              active ? 'bg-[#88B04B]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                active ? 'left-[18px]' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Botones guardar / cancelar */}
        <div className="flex gap-3 mb-3">
          <a
            href="/admin/categories"
            className="flex-1 text-center text-[13px] text-gray-500 border border-gray-200 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </a>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-[#88B04B] text-white text-[13px] font-semibold py-2.5 rounded-full hover:bg-[#5E7E2F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>

        {/* Botón eliminar */}
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full text-[13px] text-red-600 border border-red-200 py-2.5 rounded-full hover:bg-red-50 transition-colors"
          >
            Eliminar categoría
          </button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-[12px] font-semibold text-red-700 mb-1">¿Confirmar eliminación?</p>
            <p className="text-[11px] text-red-500 mb-3">
              Esta acción no se puede deshacer. La categoría será eliminada de Firestore.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 text-[12px] text-gray-500 border border-gray-200 py-2 rounded-full hover:bg-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 text-[12px] font-semibold text-white bg-red-500 py-2 rounded-full hover:bg-red-600 transition-colors disabled:opacity-60"
              >
                {loading ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div
            className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-xl text-[12px] font-medium ${
              toast.type === 'ok'
                ? 'bg-[rgba(136,176,75,0.12)] border border-[rgba(136,176,75,0.3)] text-[#5E7E2F]'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${
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