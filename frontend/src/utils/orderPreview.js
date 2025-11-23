import apiRequest from "./apiRequest";

import useCheckoutStore from "../hooks/useCheckoutStore";

const orderPreview = async () => {
  const { orderItems, couponCode, addressId, paymentMethod } = useCheckoutStore.getState();
  const response = await apiRequest.post("/orders/preview", {
    orderItems: orderItems,
    couponCode: couponCode,
    addressId: addressId,
    paymentMethod: paymentMethod,
  });

  return response.data.data;
};

export default orderPreview;
