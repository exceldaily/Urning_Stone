'use client';
/**
 * Empties the basket once an order is genuinely confirmed. Deliberately not
 * called when payment could not be verified — a customer whose payment failed
 * should still have their basket.
 */
import { useEffect, useRef } from 'react';
import { useStore } from '@/components/store/StoreProvider';
import { track } from '@/lib/analytics';

export function ClearCartOnMount({ value }: { value?: number }) {
  const { clearCart } = useStore();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    clearCart();
    track('purchase_completed', value != null ? { value } : {});
  }, [clearCart, value]);

  return null;
}
