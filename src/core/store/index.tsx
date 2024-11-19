import { create } from 'zustand';

import { type CartStore, type IndividualProductPageData } from '@/types';

// Define types

// i > 0  ?  true: false

export const useCart = create<CartStore>((set) => ({
  items: [],
  
  addProduct: ( product: IndividualProductPageData) =>
    set((state) => {
      const existingItem = state.items.find(item => item.product.productId === product.productId);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  updateQuantity: (productId: string, quantity: number) =>
    set((state) => ({
      items: state.items.map(item =>
          item.product.productId === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0),
    })),

  removeItem: (productId: string) =>
    set((state) => ({
      items: state.items.filter(item => item.product.productId !== productId),
    })),

  clearCart: () => set({ items: [] }),
}));