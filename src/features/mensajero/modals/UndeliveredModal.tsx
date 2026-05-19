import { useMemo, useState } from 'react';
import {
  HandMetal,
  LoaderCircle,
  MapPinOff,
  MoreHorizontal,
  PackageX,
  UserX,
  X,
} from 'lucide-react';
import type { CourierOrder } from '../types';



interface Props {
  order: CourierOrder;
  onClose: () => void;
  onConfirm: (
    order: CourierOrder,
    reason: string,
    notes: string
  ) => Promise<void>;
  updatingOrderId: string;
}

export default function UndeliveredModal({
  order,
  onClose,
  onConfirm,
  updatingOrderId,
}: Props) {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [notes, setNotes] = useState('');

  const reasons = [
    {
      id: 'ausente',
      label: 'Cliente ausente',
      icon: UserX,
    },
    {
      id: 'direccion',
      label: 'Dirección incorrecta',
      icon: MapPinOff,
    },
    {
      id: 'rechazo',
      label: 'Cliente rechazó pedido',
      icon: HandMetal,
    },
    {
      id: 'otros',
      label: 'Otro motivo',
      icon: MoreHorizontal,
    },
  ];

  const now = useMemo(() => {
    const date = new Date();

    return new Intl.DateTimeFormat('es-BO', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  }, []);

  const finalReason =
    selectedReason === 'otros'
      ? otherReason.trim()
      : selectedReason;

  const isValid =
    selectedReason !== '' &&
    (selectedReason !== 'otros' ||
      otherReason.trim().length > 3);

  const isLoading = updatingOrderId === order.id;

  const handleConfirm = async () => {
    if (!isValid || isLoading) return;

    await onConfirm(order, finalReason, notes);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/60
        backdrop-blur-sm
        p-4
        animate-in fade-in duration-200
      "
    >
      <div
        className="
          w-full max-w-lg
          overflow-hidden
          rounded-[2rem]
          border border-border-light
          bg-card-bg-light
          shadow-[0_25px_80px_rgba(0,0,0,0.18)]
          animate-in zoom-in-95 duration-200
        "
      >
        {/* HEADER */}
        <div
          className="
            relative
            overflow-hidden
            border-b border-border-light
            px-6 py-5
          "
        >
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-[#88B04B]/15
              via-transparent
              to-transparent
            "
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-14 w-14 items-center justify-center
                  rounded-[1.4rem]
                  bg-[#88B04B]/15
                  text-[#88B04B]
                "
              >
                <PackageX className="h-7 w-7" />
              </div>

              <div>
                <h2
                  className="
                    text-[1.35rem]
                    font-black
                    tracking-[-0.04em]
                    text-text-light
                  "
                >
                  Pedido no entregado
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    text-text-light/55
                  "
                >
                  Registra el motivo del incidente
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-border-light
                bg-secondary-bg-light/50
                text-text-light/70
                transition-all duration-200
                hover:scale-105
                hover:bg-secondary-bg-light
                hover:text-text-light
                active:scale-95
              "
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="space-y-6 px-6 py-6">
          {/* INFO */}
          <div
            className="
              grid grid-cols-1 gap-3
              rounded-[1.6rem]
              border border-border-light
              bg-secondary-bg-light/45
              p-4
              sm:grid-cols-3
            "
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-light/45">
                Cliente
              </p>

              <p className="mt-1 text-sm font-semibold text-text-light">
                {order.buyerName}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-light/45">
                Zona
              </p>

              <p className="mt-1 text-sm font-semibold text-text-light">
                {order.deliveryZone}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-light/45">
                Fecha
              </p>

              <p className="mt-1 text-sm font-semibold text-text-light">
                {now}
              </p>
            </div>
          </div>

          {/* MOTIVOS */}
          <div>
            <p
              className="
                mb-3
                text-xs font-bold uppercase
                tracking-[0.12em]
                text-text-light/50
              "
            >
              Selecciona un motivo
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                const active = selectedReason === reason.id;

                return (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => setSelectedReason(reason.id)}
                    className={`
                      group
                      flex items-center gap-3
                      rounded-[1.4rem]
                      border
                      px-4 py-4
                      text-left
                      transition-all duration-200
                      active:scale-[0.98]

                      ${
                        active
                          ? `
                            border-[#88B04B]/30
                            bg-[#88B04B]/12
                            shadow-[0_10px_30px_rgba(136,176,75,0.10)]
                          `
                          : `
                            border-border-light
                            bg-card-bg-light
                            hover:border-[#88B04B]/25
                            hover:bg-secondary-bg-light/40
                          `
                      }
                    `}
                  >
                    <div
                      className={`
                        flex h-11 w-11 items-center justify-center
                        rounded-full
                        transition-all duration-200

                        ${
                          active
                            ? `
                              bg-[#88B04B]
                              text-[#0A0B0D]
                            `
                            : `
                              bg-secondary-bg-light
                              text-text-light/70
                              group-hover:bg-[#88B04B]/15
                              group-hover:text-[#88B04B]
                            `
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className={`
                        text-sm font-semibold

                        ${
                          active
                            ? 'text-text-light'
                            : 'text-text-light/75'
                        }
                      `}
                    >
                      {reason.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* OTRO MOTIVO */}
          {selectedReason === 'otros' && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-text-light/70">
                Describe el motivo
              </label>

              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                rows={4}
                placeholder="Ej: El edificio estaba cerrado..."
                className="
                  w-full resize-none
                  rounded-[1.4rem]
                  border border-border-light
                  bg-secondary-bg-light/35
                  px-4 py-4
                  text-sm font-medium
                  text-text-light
                  outline-none
                  transition-all duration-200
                  placeholder:text-text-light/35
                  focus:border-[#88B04B]/40
                  focus:bg-secondary-bg-light/60
                  focus:ring-4
                  focus:ring-[#88B04B]/10
                "
              />
            </div>
          )}

          {/* OBSERVACIONES */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-light/70">
              Observaciones adicionales
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Ej: Se intentó llamar 2 veces..."
              className="
                w-full resize-none
                rounded-[1.4rem]
                border border-border-light
                bg-secondary-bg-light/35
                px-4 py-4
                text-sm font-medium
                text-text-light
                outline-none
                transition-all duration-200
                placeholder:text-text-light/35
                focus:border-[#88B04B]/40
                focus:bg-secondary-bg-light/60
                focus:ring-4
                focus:ring-[#88B04B]/10
              "
            />
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex flex-col gap-3
            border-t border-border-light
            bg-secondary-bg-light/25
            px-6 py-5
            sm:flex-row
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex flex-1 items-center justify-center
              rounded-full
              border border-border-light
              bg-card-bg-light
              px-5 py-3
              text-sm font-bold uppercase tracking-wide
              text-text-light
              transition-all duration-200
              hover:bg-secondary-bg-light/50
              active:scale-[0.98]
            "
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isValid || isLoading}
            className="
              inline-flex flex-[1.3] items-center justify-center gap-2
              rounded-full
              bg-[#1E1E1E]
              px-5 py-3
              text-sm font-bold uppercase tracking-wide
              text-[#FFF8F4]
              transition-all duration-200
              hover:scale-[1.01]
              hover:bg-black
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isLoading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <PackageX className="h-4 w-4" />
            )}

            Registrar incidente
          </button>
        </div>
      </div>
    </div>
  );
}