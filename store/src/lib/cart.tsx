import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { ReactNode } from "react";
import type { CartLine, Size } from "./types";
import { getProductById } from "../data/products";

const STORAGE_KEY = "kaisen-cart-v1";

type CartState = { lines: CartLine[] };

type CartAction =
  | { type: "ADD"; productId: string; size: Size; quantity: number }
  | { type: "REMOVE"; productId: string; size: Size }
  | { type: "SET_QUANTITY"; productId: string; size: Size; quantity: number }
  | { type: "CLEAR" };

function stockFor(productId: string, size: Size): number {
  const product = getProductById(productId);
  const sizeStock = product?.sizes.find((s) => s.size === size);
  return sizeStock?.stock ?? 0;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const max = stockFor(action.productId, action.size);
      if (max <= 0) return state;

      const existing = state.lines.find(
        (l) => l.productId === action.productId && l.size === action.size,
      );

      if (existing) {
        const nextQty = Math.min(existing.quantity + action.quantity, max);
        return {
          lines: state.lines.map((l) =>
            l === existing ? { ...l, quantity: nextQty } : l,
          ),
        };
      }

      return {
        lines: [
          ...state.lines,
          {
            productId: action.productId,
            size: action.size,
            quantity: Math.min(action.quantity, max),
          },
        ],
      };
    }

    case "REMOVE":
      return {
        lines: state.lines.filter(
          (l) => !(l.productId === action.productId && l.size === action.size),
        ),
      };

    case "SET_QUANTITY": {
      const max = stockFor(action.productId, action.size);
      const clamped = Math.max(0, Math.min(action.quantity, max));
      if (clamped === 0) {
        return {
          lines: state.lines.filter(
            (l) =>
              !(l.productId === action.productId && l.size === action.size),
          ),
        };
      }
      return {
        lines: state.lines.map((l) =>
          l.productId === action.productId && l.size === action.size
            ? { ...l, quantity: clamped }
            : l,
        ),
      };
    }

    case "CLEAR":
      return { lines: [] };

    default:
      return state;
  }
}

function loadInitialState(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!Array.isArray(parsed.lines)) return { lines: [] };
    return parsed;
  } catch {
    return { lines: [] };
  }
}

export interface CartLineDetail extends CartLine {
  name: string;
  color: string;
  image: string;
  unitPrice: number;
  lineTotal: number;
  availableStock: number;
}

interface CartContextValue {
  lines: CartLineDetail[];
  itemCount: number;
  subtotal: number;
  total: number;
  addItem: (productId: string, size: Size, quantity?: number) => void;
  removeItem: (productId: string, size: Size) => void;
  setQuantity: (productId: string, size: Size, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage puede fallar en modo privado; el carrito sigue
      // funcionando en memoria durante la sesión.
    }
  }, [state]);

  const addItem = useCallback(
    (productId: string, size: Size, quantity = 1) =>
      dispatch({ type: "ADD", productId, size, quantity }),
    [],
  );

  const removeItem = useCallback(
    (productId: string, size: Size) =>
      dispatch({ type: "REMOVE", productId, size }),
    [],
  );

  const setQuantity = useCallback(
    (productId: string, size: Size, quantity: number) =>
      dispatch({ type: "SET_QUANTITY", productId, size, quantity }),
    [],
  );

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const lines = useMemo<CartLineDetail[]>(() => {
    return state.lines.flatMap((line) => {
      const product = getProductById(line.productId);
      if (!product) return [];
      const sizeStock =
        product.sizes.find((s) => s.size === line.size)?.stock ?? 0;
      return [
        {
          ...line,
          name: product.name,
          color: product.color,
          image: product.image,
          unitPrice: product.price,
          lineTotal: product.price * line.quantity,
          availableStock: sizeStock,
        },
      ];
    });
  }, [state.lines]);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.lineTotal, 0),
    [lines],
  );

  // Por ahora no hay costos adicionales (envío, descuentos), así que el
  // total es igual al subtotal. Se deja separado para agregarlos después
  // sin tocar el resto del flujo.
  const total = subtotal;

  const value: CartContextValue = {
    lines,
    itemCount,
    subtotal,
    total,
    addItem,
    removeItem,
    setQuantity,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
