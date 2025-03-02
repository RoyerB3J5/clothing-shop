import { create } from "zustand";
import { persist } from "zustand/middleware";
interface CartItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size: string;
}
interface CartStore {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addProduct: (product: CartItem) => void;
  removeProduct: (name: string, size: string) => void;
  updateProductQuantity: (
    name: string,
    size: string,
    newQuantity: number
  ) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      setCart: (cart) => set({ cart }),
      addProduct: (product) => {
        const { cart } = get();
        const existingProductIndex = cart.findIndex(
          (item) => item.name === product.name && item.size === product.size
        );

        if (existingProductIndex !== -1) {
          const updatedCart = [...cart];
          updatedCart[existingProductIndex].quantity += product.quantity;
          set({ cart: updatedCart });
        } else {
          set({ cart: [...cart, product] });
        }
      },
      removeProduct: (name, size) => {
        const { cart } = get();
        const updatedCart = cart.filter(
          (item) => !(item.name === name && item.size === size)
        );
        set({ cart: updatedCart });
      },
      updateProductQuantity: (name, size, newQuantity) => {
        const { cart } = get();
        const updatedCart = cart.map((item) =>
          item.name === name && item.size === size
            ? { ...item, quantity: newQuantity }
            : item
        );
        set({ cart: updatedCart });
      }
    }),
    { name: "cart-store" }
  )
);
