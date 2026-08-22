'use client';

/**
 * Client-side store: cart, saved items, comparison and recently viewed.
 * Persisted to localStorage so a returning visitor does not lose their basket.
 *
 * >> When a commerce backend is connected, replace the reducer's persistence
 *    with cart API calls. The component API below should not need to change.
 */

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { products, type Product } from '@/data/products';
import { track } from '@/lib/analytics';

export interface Personalisation {
  name?: string;
  dates?: string;
  inscription?: string;
  font?: string;
  motif?: string;
  confirmed: boolean;
}

export interface CartLine {
  lineId: string;
  productId: string;
  quantity: number;
  personalization?: Personalisation;
}

interface StoreState {
  lines: CartLine[];
  saved: string[];
  compare: string[];
  recentlyViewed: string[];
  hydrated: boolean;
}

type Action =
  | { type: 'hydrate'; state: Partial<StoreState> }
  | { type: 'add'; line: CartLine }
  | { type: 'remove'; lineId: string }
  | { type: 'qty'; lineId: string; quantity: number }
  | { type: 'personalize'; lineId: string; personalization: Personalisation }
  | { type: 'clear' }
  | { type: 'toggleSaved'; id: string }
  | { type: 'toggleCompare'; id: string }
  | { type: 'clearCompare' }
  | { type: 'viewed'; id: string };

const initial: StoreState = { lines: [], saved: [], compare: [], recentlyViewed: [], hydrated: false };
const KEY = 'ls.store.v1';

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.state, hydrated: true };
    case 'add': {
      const plain = !action.line.personalization;
      const existing = plain && state.lines.find((l) => l.productId === action.line.productId && !l.personalization);
      if (existing) {
        return { ...state, lines: state.lines.map((l) => l.lineId === existing.lineId ? { ...l, quantity: l.quantity + action.line.quantity } : l) };
      }
      return { ...state, lines: [...state.lines, action.line] };
    }
    case 'remove':
      return { ...state, lines: state.lines.filter((l) => l.lineId !== action.lineId) };
    case 'qty':
      return { ...state, lines: state.lines.map((l) => l.lineId === action.lineId ? { ...l, quantity: Math.max(1, Math.min(20, action.quantity)) } : l) };
    case 'personalize':
      return { ...state, lines: state.lines.map((l) => l.lineId === action.lineId ? { ...l, personalization: action.personalization } : l) };
    case 'clear':
      return { ...state, lines: [] };
    case 'toggleSaved':
      return { ...state, saved: state.saved.includes(action.id) ? state.saved.filter((i) => i !== action.id) : [...state.saved, action.id] };
    case 'toggleCompare': {
      if (state.compare.includes(action.id)) return { ...state, compare: state.compare.filter((i) => i !== action.id) };
      if (state.compare.length >= 3) return state;
      return { ...state, compare: [...state.compare, action.id] };
    }
    case 'clearCompare':
      return { ...state, compare: [] };
    case 'viewed':
      return { ...state, recentlyViewed: [action.id, ...state.recentlyViewed.filter((i) => i !== action.id)].slice(0, 8) };
    default:
      return state;
  }
}

interface StoreApi extends StoreState {
  addToCart: (product: Product, quantity?: number, personalization?: Personalisation) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  updatePersonalisation: (lineId: string, p: Personalisation) => void;
  clearCart: () => void;
  toggleSaved: (id: string) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  markViewed: (id: string) => void;
  cartCount: number;
  subtotalCents: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  lineProduct: (line: CartLine) => Product | undefined;
}

const StoreContext = createContext<StoreApi | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      dispatch({ type: 'hydrate', state: raw ? JSON.parse(raw) : {} });
    } catch {
      dispatch({ type: 'hydrate', state: {} });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      const { lines, saved, compare, recentlyViewed } = state;
      window.localStorage.setItem(KEY, JSON.stringify({ lines, saved, compare, recentlyViewed }));
    } catch { /* storage unavailable — the session still works */ }
  }, [state]);

  const api = useMemo<StoreApi>(() => {
    const lineProduct = (line: CartLine) => products.find((p) => p.id === line.productId);
    const subtotalCents = state.lines.reduce((sum, l) => sum + (lineProduct(l)?.priceCents ?? 0) * l.quantity, 0);
    return {
      ...state,
      lineProduct,
      cartCount: state.lines.reduce((n, l) => n + l.quantity, 0),
      subtotalCents,
      cartOpen,
      setCartOpen,
      addToCart: (product, quantity = 1, personalization) => {
        dispatch({ type: 'add', line: { lineId: `${product.id}-${Date.now().toString(36)}`, productId: product.id, quantity, personalization } });
        track('add_to_cart', { sku: product.sku, quantity, personalized: Boolean(personalization) });
        setCartOpen(true);
      },
      removeLine: (lineId) => dispatch({ type: 'remove', lineId }),
      setQuantity: (lineId, quantity) => dispatch({ type: 'qty', lineId, quantity }),
      updatePersonalisation: (lineId, personalization) => dispatch({ type: 'personalize', lineId, personalization }),
      clearCart: () => dispatch({ type: 'clear' }),
      toggleSaved: (id) => { dispatch({ type: 'toggleSaved', id }); track('product_saved', { id }); },
      toggleCompare: (id) => { dispatch({ type: 'toggleCompare', id }); track('product_compared', { id }); },
      clearCompare: () => dispatch({ type: 'clearCompare' }),
      markViewed: (id) => dispatch({ type: 'viewed', id }),
    };
  }, [state, cartOpen]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
