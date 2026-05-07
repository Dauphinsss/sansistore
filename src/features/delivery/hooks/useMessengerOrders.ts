import { useCallback, useEffect, useRef, useState } from 'react';
import {
  acceptMessengerOrder,
  getMessengerOrders,
  rejectMessengerOrder,
} from '../services/messengerOrdersService';
import type { DeliveryOrder } from '../types';

function validateOrderAction(
  orders: DeliveryOrder[],
  orderId: string,
  messengerId: string,
  actionLabel: 'aceptar' | 'rechazar',
) {
  const order = orders.find((currentOrder) => currentOrder.id === orderId);

  if (!order) {
    throw new Error('El pedido ya no esta disponible en la vista actual.');
  }

  if (order.assignedMessengerId !== messengerId) {
    throw new Error('No puedes modificar un pedido asignado a otro mensajero.');
  }

  if (order.status !== 'ASSIGNED') {
    throw new Error(
      `No puedes ${actionLabel} un pedido con estado ${order.status}.`,
    );
  }
}

export function useMessengerOrders(messengerId: string) {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const refreshOrders = useCallback(
    async (options?: { keepLoading?: boolean }) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      if (options?.keepLoading !== false) {
        setLoading(true);
      }

      setError(null);

      try {
        const nextOrders = await getMessengerOrders(messengerId);

        if (requestIdRef.current === requestId) {
          setOrders(nextOrders);
        }
      } catch {
        if (requestIdRef.current === requestId) {
          setError('No se pudieron cargar los pedidos asignados.');
        }
      } finally {
        if (requestIdRef.current === requestId) {
          setLoading(false);
        }
      }
    },
    [messengerId],
  );

  useEffect(() => {
    void refreshOrders();
  }, [refreshOrders]);

  const acceptOrder = async (orderId: string) => {
    if (activeOrderId) {
      return;
    }

    try {
      validateOrderAction(orders, orderId, messengerId, 'aceptar');
    } catch (validationError) {
      if (validationError instanceof Error) {
        setError(validationError.message);
      } else {
        setError('No se pudo validar el pedido antes de aceptarlo.');
      }
      return;
    }

    setActiveOrderId(orderId);
    setError(null);

    try {
      await acceptMessengerOrder(orderId, messengerId);
      await refreshOrders({ keepLoading: false });
    } catch (acceptError) {
      if (acceptError instanceof Error) {
        setError(acceptError.message);
      } else {
        setError('No se pudo aceptar el pedido.');
      }
    } finally {
      setActiveOrderId(null);
    }
  };

  const rejectOrder = async (orderId: string) => {
    if (activeOrderId) {
      return;
    }

    try {
      validateOrderAction(orders, orderId, messengerId, 'rechazar');
    } catch (validationError) {
      if (validationError instanceof Error) {
        setError(validationError.message);
      } else {
        setError('No se pudo validar el pedido antes de rechazarlo.');
      }
      return;
    }

    setActiveOrderId(orderId);
    setError(null);

    try {
      await rejectMessengerOrder(orderId, messengerId);
      await refreshOrders({ keepLoading: false });
    } catch (rejectError) {
      if (rejectError instanceof Error) {
        setError(rejectError.message);
      } else {
        setError('No se pudo rechazar el pedido.');
      }
    } finally {
      setActiveOrderId(null);
    }
  };

  return {
    orders,
    loading,
    error,
    activeOrderId,
    acceptOrder,
    rejectOrder,
    refreshOrders,
  };
}
