import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCheckoutStore = create(
  persist(
    (set) => ({
      orderItems: [],
      couponCode: null,
      addressId: null,
      paymentMethod: null,
      shippingTime: null,
      note: null,

      // Order Items
      addOderItem: (item) => {
        set((state) => {
          const isDuplicate = state.orderItems.find((i) => i.id === item.id && i.variant.id === item.variant.id);
          if (isDuplicate) {
            return {
              orderItems: state.orderItems.map((i) =>
                i.id === item.id && i.variant.id === item.variant.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { orderItems: [...state.orderItems, { ...item }] };
        });
      },
      removeOderItem: (item) => {
        set((state) => {
          return { orderItems: state.orderItems.filter((i) => i !== item) };
        });
      },
      clearOderItems: () => {
        set({ orderItems: [] });
      },
      incrementOderItemQuantity: (item) => {
        set((state) => {
          return {
            orderItems: state.orderItems.map((i) =>
              i.id === item.id && i.variant.id === item.variant.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        });
      },
      decrementOderItemQuantity: (item) => {
        set((state) => {
          return {
            orderItems: state.orderItems.map((i) =>
              i.id === item.id && i.variant.id === item.variant.id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        });
      },

      // Coupon Code
      setCouponCode: (code) => {
        set({ couponCode: code });
      },

      clearCouponCode: () => {
        set({ couponCode: null });
      },

      // Address
      setAddressId: (addressId) => {
        set({ addressId: addressId });
      },
      clearAddressId: () => {
        set({ addressId: null });
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

      // All
      clearCheckoutData: () => {
        set({
          orderItems: [],
          couponCode: null,
          addressId: null,
          paymentMethod: null,
          shippingTime: null,
          note: null,
        });
      },
    }),
    {
      name: "quadbiteCheckout",
    }
  )
);

export default useCheckoutStore;
