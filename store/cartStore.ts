import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductInterface } from "../interfaces/ProductInterface";

export interface SizeAndColor {
  size: string;
  color: string;
  quantity: number;
}

export interface ProductWithQuantity extends ProductInterface {
  sizeColorQuantity?: SizeAndColor[];
}

type QuantityAction = "increase" | "decrease" | "reset";

interface Store {
  cart: ProductWithQuantity[];
  addToCart: (product: ProductInterface) => void;
  modifyQuantity: (
    productId: string,
    size: string,
    color: string,
    action: QuantityAction
  ) => void;
  removeProduct: (productId: string) => void;
  isInCart: (productId: string) => boolean;
}

export const cartStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {


          const productExists = state.cart.find(s => s._id == product._id);

          if(!productExists) {

            const productDefaultSCQ = product.sizeAndColor.map((s) => ({
              size: s.size,
              color: s.color,
              quantity: 0
            }));

            const newProduct: ProductWithQuantity = product;

            newProduct.sizeColorQuantity = productDefaultSCQ;

            return {cart: [newProduct, ...state.cart]}

          } else {
            return {cart: state.cart}
          }
        }),
      modifyQuantity: (productId, size, color, action) =>
        set((state) => {

          const product = state.cart.find(p => p._id == productId);

          if(!product) return {cart: state.cart};

          const newSCQ = product.sizeColorQuantity?.map(SCQ => {
            if(SCQ.color == color && SCQ.size == size) {
              if(action == "increase") {
                SCQ.quantity += 1;
              } else if(action == "decrease") {
                if(SCQ.quantity > 0) {
                  SCQ.quantity -= 1;
                }
              } else if (action == "reset") {
                SCQ.quantity = 0;
              }
            }
            return SCQ;
          });

          product.sizeColorQuantity = newSCQ;

            return {cart: state.cart.map(p => {
              if(p._id == product._id) {
                return product;
              } else {
                return p
              }
            })}
          
        }),
      removeProduct: (productId) =>
        set((state) => {

          const product = state.cart.find(s => s._id == productId);

          if(product) {

            const updatedCart = state.cart.filter(c => c._id != product._id);

            return { cart: updatedCart };

          } else {
            return { cart: state.cart }
          }
        }),
        isInCart: (productId) => {
          const cart = get().cart;
          const product = cart.find(c => c._id == productId);

          if(product) {
            return true;
          } else {
            return false;
          }

        }
    }),
    {
      name: "cartstore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
