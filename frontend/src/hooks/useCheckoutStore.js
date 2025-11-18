import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCheckoutStore = create(
  persist(
    (set) => ({
      oderItems: [],
      couponCode: null,
      addressId: null,
      paymentMethod: null,
      shippingTime: null,
      note: null,

      // Order Items
      addOderItem: (item) => {
        set((state) => {
          const isDuplicate = state.oderItems.find((i) => i.id === item.id && i.variantId === item.variantId);
          if (isDuplicate) {
            return {
              oderItems: state.oderItems.map((i) =>
                i.id === item.id && i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }

          return { oderItems: [...state.oderItems, { ...item }] };
        });
      },
      removeOderItem: (item) => {
        set((state) => {
          return { oderItems: state.oderItems.filter((i) => i !== item) };
        });
      },
      clearOderItems: () => {
        set({ oderItems: [] });
      },

      // Coupon Code
      setCouponCode: (code) => {
        set({ couponCode: code });
      },

      clearCouponCode: () => {
        set({ couponCode: null });
      },

      // Address
      setAddress: (address) => {
        set({ address: address });
      },
      clearAddress: () => {
        set({ address: null });
      },

      // Payment Method
      setPaymentMethod: (method) => {
        set({ paymentMethod: method });
      },
      clearPaymentMethod: () => {
        set({ paymentMethod: null });
      },

      // Shipping Time
      setShippingTime: (time) => {
        set({ shippingTime: time });
      },
      clearShippingTime: () => {
        set({ shippingTime: null });
      },

      // Note
      setNote: (note) => {
        set({ note: note });
      },
      clearNote: () => {
        set({ note: null });
      },
    }),
    {
      name: "quadbiteCheckout",
    }
  )
);

export default useCheckoutStore;
