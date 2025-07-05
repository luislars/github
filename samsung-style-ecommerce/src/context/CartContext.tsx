import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '../types/product';

/**
 * Interfaz para un ítem dentro del carrito.
 * Extiende la interfaz Product y añade la cantidad.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Interfaz para el estado del carrito.
 * Contiene un array de CartItem.
 */
interface CartState {
  items: CartItem[];
}

/**
 * Define las acciones que se pueden realizar en el carrito.
 * ADD_ITEM: Añade un producto al carrito o incrementa su cantidad si ya existe.
 * REMOVE_ITEM: Elimina un producto completamente del carrito.
 * UPDATE_QUANTITY: Actualiza la cantidad de un producto específico en el carrito.
 * CLEAR_CART: Vacía todos los productos del carrito.
 */
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { id: number | string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number | string; quantity: number } }
  | { type: 'CLEAR_CART' };

/**
 * Interfaz para el valor del contexto del carrito.
 * Incluye el estado del carrito (items) y la función dispatch para modificarlo.
 * También incluye funciones helper para facilitar la interacción con el carrito.
 */
interface CartContextType extends CartState {
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product, quantity?: number) => void; // addItem ahora puede aceptar una cantidad
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getCartTotal: () => number;
}

// Crear el contexto del carrito con un valor inicial undefined.
// Se chequeará en `useCart` si el contexto está disponible.
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Tipo para la acción ADD_ITEM que puede incluir una cantidad.
 */
type AddItemActionPayload = Product & { quantity?: number };


/**
 * Reducer para manejar las acciones del carrito y actualizar el estado.
 * @param {CartState} state - El estado actual del carrito.
 * @param {CartAction} action - La acción a realizar.
 * @returns {CartState} El nuevo estado del carrito.
 */
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const productToAdd = action.payload as Product; // El producto completo
      const quantityToAdd = (action.payload as any).quantity || 1; // Cantidad opcional, default 1

      const existingItemIndex = state.items.findIndex(item => item.id === productToAdd.id);

      if (existingItemIndex > -1) {
        // El producto ya está en el carrito, incrementar cantidad
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
        return { ...state, items: updatedItems };
      } else {
        // Añadir nuevo producto al carrito
        return { ...state, items: [...state.items, { ...productToAdd, quantity: quantityToAdd }] };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        // Si la cantidad es 0 o menor, eliminar el ítem
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

/**
 * Proveedor del contexto del carrito.
 * Envuelve la aplicación o partes de ella para proveer acceso al carrito.
 * Carga el estado inicial del carrito desde localStorage (si existe).
 * Guarda el estado del carrito en localStorage cada vez que cambia.
 * @param {object} props - Propiedades del componente, incluye `children`.
 * @param {ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 */
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const loadState = (): CartState => {
    try {
      const serializedState = localStorage.getItem('cartState');
      if (serializedState === null) {
        return { items: [] };
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error("Could not load cart state from localStorage", error);
      return { items: [] };
    }
  };

  const [state, dispatch] = useReducer(cartReducer, loadState());

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('cartState', serializedState);
    } catch (error) {
      console.error("Could not save cart state to localStorage", error);
    }
  }, [state]);

  // Funciones helper para interactuar con el carrito
  const addItem = (product: Product, quantity: number = 1) => {
    // Aquí aseguramos que el payload incluya el producto y la cantidad.
    // El tipo AddItemActionPayload no es estrictamente necesario si casteamos aquí,
    // pero es bueno para la claridad del tipo de acción.
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } as AddItemActionPayload });
  };
  const removeItem = (id: number | string) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const updateQuantity = (id: number | string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const getItemCount = (): number => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotal = (): number => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ ...state, dispatch, addItem, removeItem, updateQuantity, clearCart, getItemCount, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto del carrito.
 * Proporciona una forma fácil de consumir el estado y las funciones del carrito.
 * @throws Error si se usa fuera de un CartProvider.
 * @returns {CartContextType} El valor del contexto del carrito.
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
