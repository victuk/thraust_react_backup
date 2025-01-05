import { ForYou, Products, Shops } from "@/utils/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ProductWithQuantity extends Products {
  quantity?: number;
}

export interface Cart {
  shopDetails: Shops;
  products: ProductWithQuantity[];
}

type QuantityAction = "increase" | "decrease" | "reset";

interface Store {
  cart: Cart[];
  addToCart: (Shop: Shops, product: ProductWithQuantity) => void;
  modifyQuantity: (
    shopId: string,
    productId: string,
    action: QuantityAction
  ) => void;
  removeShop: (shopId: string) => void;
  removeProduct: (shopId: string, productId: string) => void;
  isInCart: (shopId: string, productId: string) => boolean;
  productQuantity: (shopId: string, productId: string) => number;
}

export const cartStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (shop, product) =>
        set((state) => {

          product.quantity = 1;

          const storeExists = state.cart.find(s => s.shopDetails._id == shop._id);

          if(storeExists) {
            const updatedProducts = [...storeExists.products, product];

            return {cart: state.cart.map(c => {
              if(c.shopDetails._id == shop._id) {
                c.products = updatedProducts
              }
              return c;
            })}

          } else {
            return {
              cart: [...state.cart, {shopDetails: shop, products: [product]}]
            };
          }
        }),
      modifyQuantity: (shopId, productId, action) =>
        set((state) => {

          const shop = state.cart.find(s => s.shopDetails._id == shopId);

          const product = shop!!.products.find(p => p._id == productId);
          
          if(!shop || !product) return {cart: state.cart};
          
          const productQuantity = shop!!.products.find(p => p._id == productId)?.quantity;

          let updatedCart;

          if(productQuantity == 1 && action == "decrease") {
            updatedCart = state.cart.filter(c => c.shopDetails._id != shopId)
          } else {
            updatedCart = state.cart.map(c => {
              if(c.shopDetails._id == shopId) {
  
                return {
                  shopDetails: c.shopDetails,
                  products: c.products.map(p => {
                    if (p._id == productId) {
                      let product = p;
                      if(action == "increase") {
                        product!!.quantity = product!!.quantity as number + 1;
                      } else if(action == "decrease") {
                        product!!.quantity = product!!.quantity as number - 1;
                      } else if(action == "reset") {
                        product!!.quantity = 1;
                      }
                      return product;
                    }
                    return p;
                  })
                }
                
              }
              return c;
            });
          }
          
          return { cart: updatedCart };
        }),
      removeShop: (shopId) =>
        set((state) => {
          return { cart: state.cart.filter(c => c.shopDetails._id != shopId) };
        }),
      removeProduct: (shopId, productId) =>
        set((state) => {

          const shop = state.cart.find(s => s.shopDetails._id == shopId);

          const product = shop!!.products.find(p => p._id == productId);
          
          if(!shop || !product) return {cart: state.cart};          

          const updatedCart = state.cart.map(c => {
            if(c.shopDetails._id == shopId) {
              return {
                shopDetails: c.shopDetails,
                products: c.products.filter(p => p._id != productId)
              }
            }
            return c;
          });

          const shopCheck = updatedCart.find(s => s.shopDetails._id == shopId);

          if(shopCheck?.products.length == 0) {
            return {cart: updatedCart.filter(c => c.shopDetails._id != shopId)}
          }

          return { cart: updatedCart };
        }),
        isInCart: (storeId, productId) => {
          const cart = get().cart;
          const shopDetails = cart.find(c => c.shopDetails._id == storeId);

          if(!shopDetails) {
            return false;
          }

          const foundTheProduct = shopDetails.products.find(p => p._id == productId);

          if(foundTheProduct) {
            return true;
          } else {
            return false;
          }
        },
        productQuantity: (storeId, productId) => {
          const cart = get().cart;
          const shopDetails = cart.find(c => c.shopDetails._id == storeId);

          if(!shopDetails) {
            return 0;
          }

          const foundTheProduct = shopDetails!!.products.find(p => p._id == productId);

          if(!foundTheProduct) {
            return 0;
          }

          return foundTheProduct?.quantity as number;
        }
    }),
    {
      name: "cartstore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
